// Beyond The Bell - Audio Engine
// Supports native AAC theme tracks, click SFX, and Web Audio retro synth fallbacks

class SoundEngine {
  constructor() {
    this.musicVolume = 0.5;
    this.sfxVolume = 0.7;
    this.muted = false;
    this.currentTrackIndex = 0;
    this.tracks = [
      { name: 'Theme 1 (Ceria)', src: 'assets/audio/Theme 1.aac' },
      { name: 'Theme 2 (Semangat)', src: 'assets/audio/Theme2.aac' },
      { name: 'Theme 4 (Santai)', src: 'assets/audio/Theme 4.aac' }
    ];
    this.audioElement = null;
    this.initialized = false;
    this.ctx = null;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn('Web Audio not supported', e);
    }

    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.audioElement.volume = this.muted ? 0 : this.musicVolume;
    this.audioElement.src = this.tracks[this.currentTrackIndex].src;
    this.initialized = true;
  }

  playBGM() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.audioElement) {
      this.audioElement.play().catch(() => {
        // Will play upon first user interaction
      });
    }
  }

  // Khusus saat membuka kuis buku anomali di dimensi lain
  playBookQuizBGM() {
    this.init();
    if (!this.audioElement) return;
    if (this.isQuizBgmActive) return; // Sudah memainkan lagu kuis
    this.isQuizBgmActive = true;
    this.previousBgmSrc = this.audioElement.src;
    this.previousBgmTime = this.audioElement.currentTime || 0;
    this.audioElement.src = 'assets/audio/Theme 4.aac';
    this.audioElement.loop = true;
    this.audioElement.volume = this.muted ? 0 : this.musicVolume;
    this.audioElement.play().catch(() => {});
  }

  stopBookQuizBGM() {
    if (!this.audioElement) return;
    if (!this.isQuizBgmActive) return;
    this.isQuizBgmActive = false;
    if (this.previousBgmSrc) {
      this.audioElement.src = this.previousBgmSrc;
      this.audioElement.currentTime = this.previousBgmTime || 0;
      this.audioElement.loop = true;
      this.audioElement.volume = this.muted ? 0 : this.musicVolume;
      this.audioElement.play().catch(() => {});
    }
  }

  // Khusus suasana sore hari jam pulang sekolah (jam 4 sore santai dan damai)
  playAfternoonBGM() {
    this.init();
    if (!this.audioElement) return;
    this.isQuizBgmActive = false;
    this.audioElement.src = 'assets/audio/Theme 4.aac';
    this.audioElement.currentTime = 0;
    this.audioElement.loop = true;
    this.audioElement.volume = this.muted ? 0 : this.musicVolume;
    this.audioElement.play().catch(() => {});
  }

  pauseBGM() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    if (this.audioElement) {
      const wasPlaying = !this.audioElement.paused;
      this.audioElement.src = this.tracks[this.currentTrackIndex].src;
      this.audioElement.volume = this.muted ? 0 : this.musicVolume;
      if (wasPlaying) {
        this.audioElement.play().catch(() => {});
      }
    }
    return this.tracks[this.currentTrackIndex].name;
  }

  setVolume(vol) {
    this.setMusicVolume(vol);
  }

  setMusicVolume(vol) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.audioElement && !this.muted) {
      this.audioElement.volume = this.musicVolume;
    }
  }

  setSfxVolume(vol) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.audioElement) {
      this.audioElement.volume = this.muted ? 0 : this.musicVolume;
    }
    return this.muted;
  }

  // Play click / select sound
  playClick() {
    if (this.muted) return;
    try {
      const snd = new Audio('assets/audio/Click_03.aac');
      snd.volume = this.sfxVolume;
      snd.play().catch(() => {
        this.playTone(660, 0.05, 'sine');
      });
    } catch (e) {
      this.playTone(660, 0.05, 'sine');
    }
  }

  // Text blip for typewriter dialogues
  playBlip() {
    if (this.muted) return;
    this.playTone(440 + Math.random() * 80, 0.03, 'triangle', 0.15 * this.sfxVolume);
  }

  // School Bell Chime ("Teng... Teng... Teng..." Jam Istirahat)
  playSchoolBell() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const now = this.ctx.currentTime;
    // Westminster chime 4-note cadence: E5 -> C5 -> D5 -> G4
    const notes = [
      { pitch: 659.25, time: 0.0, dur: 1.4 },  // E5 (Teng)
      { pitch: 523.25, time: 0.65, dur: 1.4 }, // C5 (Teng)
      { pitch: 587.33, time: 1.3, dur: 1.4 },  // D5 (Teng)
      { pitch: 392.00, time: 1.95, dur: 2.2 }, // G4 (Tung)
    ];

    notes.forEach(note => {
      this.strikeBell(note.pitch, now + note.time, note.dur);
    });
  }

  strikeBell(freq, startTime, duration = 1.5) {
    if (!this.ctx || this.muted) return;
    // Metallic bell overtones (harmonics with exponential decay)
    const partials = [
      { ratio: 1.0, gain: 0.5 },
      { ratio: 2.0, gain: 0.25 },
      { ratio: 3.01, gain: 0.15 },
      { ratio: 4.18, gain: 0.08 }
    ];

    partials.forEach(p => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * p.ratio, startTime);

        const peakGain = p.gain * 0.45 * this.sfxVolume;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      } catch (e) {
        // Fallback tone
      }
    });
  }

  get playlist() {
    return this.tracks;
  }

  stopBGM() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }

  // Pickup sound
  playPickup() {
    if (this.muted) return;
    this.playArpeggio([523.25, 659.25, 783.99, 1046.50], 0.06);
  }

  // Satpam shout / alert SFX
  playShoutAlert() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(1350, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.28);

      gain.gain.setValueAtTime(this.sfxVolume * 0.85, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.34);
    } catch (e) {}
  }

  // Horror Glitch Static Screech
  playGlitchSFX() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Harsh fluctuating noise
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.linearRampToValueAtTime(800, now + 0.08);
      osc1.frequency.linearRampToValueAtTime(60, now + 0.2);
      osc1.frequency.linearRampToValueAtTime(950, now + 0.35);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.linearRampToValueAtTime(150, now + 0.15);
      osc2.frequency.linearRampToValueAtTime(600, now + 0.35);

      gain.gain.setValueAtTime(this.sfxVolume * 0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.46);
      osc2.stop(now + 0.46);
    } catch (e) {}
  }

  // Sword Attack Slash SFX
  playSlashSFX() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

      gain.gain.setValueAtTime(this.sfxVolume * 0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // Boss / Monster Hit SFX
  playMonsterHit() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

      gain.gain.setValueAtTime(this.sfxVolume * 1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch (e) {}
  }

  // Low Horror Glitch Roar
  playGlitchRoar() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.linearRampToValueAtTime(95, now + 0.3);
      osc.frequency.linearRampToValueAtTime(45, now + 0.8);

      gain.gain.setValueAtTime(this.sfxVolume * 0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.95);
    } catch (e) {}
  }

  // Countdown Beep
  playCountdownBeep(urgent = false) {
    if (this.muted) return;
    const freq = urgent ? 880 : 587.33;
    this.playTone(freq, 0.08, 'square', 0.25 * this.sfxVolume);
  }

  // Quiz correct
  playCorrect() {
    if (this.muted) return;
    this.playArpeggio([440, 554.37, 659.25, 880], 0.08);
  }

  // Quiz wrong
  playWrong() {
    if (this.muted) return;
    this.playTone(180, 0.25, 'sawtooth', 0.25 * this.sfxVolume);
  }

  // Quest complete fanfare
  playVictory() {
    if (this.muted) return;
    this.playArpeggio([523.25, 659.25, 783.99, 1046.50, 1318.51], 0.12);
  }

  playTone(freq, duration, type = 'sine', vol = null) {
    if (!this.ctx || this.muted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const v = vol !== null ? vol : 0.2 * this.sfxVolume;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(v, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio context error fallback
    }
  }

  playArpeggio(notes, delay) {
    if (!this.ctx || this.muted) return;
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.1, 'sine', 0.2 * this.sfxVolume);
      }, idx * delay * 1000);
    });
  }
}

export const sound = new SoundEngine();
