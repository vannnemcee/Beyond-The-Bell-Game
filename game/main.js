// Beyond The Bell - Main Game Engine
import { sound } from './audio.js';
import { sprites } from './sprites.js';
import { MAPS } from './world.js';
import { DIALOGUES } from './dialogue.js';
import { QUIZ_QUESTIONS, BOOK_QUIZZES } from './quiz.js';

class GameEngine {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Display resolution
    this.viewWidth = 800;
    this.viewHeight = 450;
    this.scale = 1;

    // Game state
    this.state = 'TITLE'; // TITLE | PLAYING | DIALOGUE | QUIZ | INVENTORY | MAP | ERD_VIEW | VICTORY
    this.currentMapId = 'classroom';

    // Player Data (100x100 natural aspect ratio, not squished/gepeng)
    this.player = {
      name: 'Wintel',
      gender: 'girl', // 'boy' or 'girl'
      x: 470,
      y: 460,
      w: 100,
      h: 100,
      speed: 180, // pixels per second
      sprintMultiplier: 1.4,
      facing: 'down',
      isMoving: false,
      animTimer: 0,
      animFrame: 0
    };

    // Camera
    this.camera = { x: 0, y: 0 };

    // Inventory & Quests
    this.inventory = [];
    this.quests = {
      step: 0, // 0: Recess bell starts in class, 1: Go to Hallway, 2: Find Flashdisk, 3: Quiz with Bu Rina, 4: Collect Trophy
      titles: [
        'Jam Istirahat: Pergi ke Kantin untuk istirahat & jajan!',
        'Beli Makanan Bebas di Kantin',
        'Kembali Masuk ke Ruang Kelas',
        'Bicara dengan Bapa (Pak Satpam)',
        'Masuk Kembali ke Ruang Kelas RPL',
        'Cari Flashdisk Proyek RPL yang Tertinggal di Kelas',
        'Ikuti Kuis Uji Kompetensi RPL bersama Bu Rina',
        'Ambil Piagam Bintang RPL di Laboratorium Komputer',
        'Pameran RPL Sukses Besar!'
      ]
    };

    // Story Progression Flags
    this.canteenArrived = false;
    this.hasBoughtFood = false;
    this.satpamShoutTriggered = false;
    this.talkedToSatpam = false;
    this.walkingAfterSatpam = false;
    this.satpamTalkPos = null;

    // Glitch Horror Dimension & 60s Timer State
    this.glitchTriggered = false;
    this.isGlitching = false;
    this.blackout = false;
    this.classroomTimerActive = false;
    this.classroomTimeLeft = 60.0;
    this.hasKeyRuangan = false;
    this.glitchDeathActive = false;
    this.glitchMonster = null;
    this.glitchKilledPlayer = false;
    this.waitingForFirstMoveInGlitchClassroom = false;

    // Courtyard Glitch Items & Sword
    this.courtyardGlitchStarted = false;
    this.glitchBooks = 0;
    this.glitchKeys = 0;
    this.glitchArtifact = 0;
    this.hasSword = false;

    // Boss Battle ("Satpam ?")
    this.bossBattleStarted = false;
    this.bossDefeated = false;
    this.escapePortalActive = false;
    this.playerHp = 100;
    this.playerMaxHp = 100;
    this.attackCooldown = 0;
    this.isAttacking = false;
    this.attackAnimTimer = 0;
    this.boss = {
      name: 'Satpam ?',
      hp: 200,
      maxHp: 200,
      x: 1250,
      y: 120,
      w: 100,
      h: 100,
      facing: 'down',
      attackTimer: 1.5,
      flashTimer: 0
    };
    this.bossProjectiles = [];
    this.damagePopups = [];

    // Dialogue State
    this.dialogue = {
      active: false,
      queue: [],
      currentIndex: 0,
      textProgress: 0,
      timer: 0,
      currentLine: null,
      finishedTyping: false,
      slideX: -30,
      alpha: 0
    };

    // Cutscene NPCs
    this.cutsceneNpcs = [];

    // Quiz State
    this.quiz = {
      currentQuestion: 0,
      score: 0,
      selectedOption: null,
      answered: false,
      isCorrect: false
    };

    // Inputs
    this.keys = {};
    this.touchJoystick = {
      active: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      dx: 0,
      dy: 0,
      touchId: null
    };

    // Particles
    this.particles = [];

    // Auto-walk / Cutscene pathing
    this.autoWalkPath = [];
    this.onAutoWalkComplete = null;

    // Notification toast
    this.toast = null;

    this.lastTime = performance.now();

    this.initEvents();
  }

  start() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Preload sprites in background without blocking title screen
    sprites.preloadAll(
      () => {},
      () => {}
    );

    // Start game loop immediately
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  resize() {
    const container = document.getElementById('gameContainer');
    if (!container) return;
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || (window.innerHeight - 56);

    // Mentok edge-to-edge kiri-kanan tanpa bayangan hitam/letterbox:
    // Gunakan aspect ratio dinamis dari kontainer layar pengguna
    const baseH = 480;
    const aspect = w / Math.max(1, h);

    this.viewHeight = baseH;
    this.viewWidth = Math.round(baseH * aspect);

    this.canvas.width = this.viewWidth;
    this.canvas.height = this.viewHeight;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
  }

  initEvents() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      this.keys[e.code] = true;

      // Spasi / Space: Menyerang jika sudah punya pedang, atau memajukan dialog jika dialog aktif
      if (e.key === ' ' || e.code === 'Space') {
        if (this.state === 'DIALOGUE') {
          e.preventDefault();
          this.handleActionPress();
          return;
        }
        if (this.hasSword && (this.state === 'BATTLE' || this.state === 'PLAYING')) {
          e.preventDefault();
          this.playerAttack();
          return;
        }
      }

      // Tombol Aksi / Interaksi (E, Enter, atau Spasi jika belum ada pedang)
      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        this.handleActionPress();
      } else if ((e.key === ' ' || e.code === 'Space') && !this.hasSword) {
        this.handleActionPress();
      }

      if (e.key === 'Escape') {
        if (this.state === 'INVENTORY' || this.state === 'MAP' || this.state === 'ERD_VIEW') {
          this.state = 'PLAYING';
        }
      }

      if (e.key === 'i' || e.key === 'I') {
        if (this.state === 'PLAYING') this.openInventory();
        else if (this.state === 'INVENTORY') this.state = 'PLAYING';
      }

      if (e.key === 'm' || e.key === 'M') {
        if (this.state === 'PLAYING') this.openMap();
        else if (this.state === 'MAP') this.state = 'PLAYING';
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
      this.keys[e.code] = false;
    });

    // Touch Virtual Joystick
    const joyZone = document.getElementById('touchJoystickZone');
    const joyKnob = document.getElementById('touchJoystickKnob');

    if (joyZone) {
      joyZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.changedTouches[0];
        const rect = joyZone.getBoundingClientRect();
        this.touchJoystick.active = true;
        this.touchJoystick.touchId = touch.identifier;
        this.touchJoystick.startX = rect.left + rect.width / 2;
        this.touchJoystick.startY = rect.top + rect.height / 2;
        this.updateJoystick(touch.clientX, touch.clientY, joyKnob);
      }, { passive: false });

      joyZone.addEventListener('touchmove', (e) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === this.touchJoystick.touchId) {
            this.updateJoystick(e.changedTouches[i].clientX, e.changedTouches[i].clientY, joyKnob);
            break;
          }
        }
      }, { passive: false });

      const resetJoy = (e) => {
        e.preventDefault();
        this.touchJoystick.active = false;
        this.touchJoystick.dx = 0;
        this.touchJoystick.dy = 0;
        if (joyKnob) {
          joyKnob.style.transform = `translate(0px, 0px)`;
        }
      };

      joyZone.addEventListener('touchend', resetJoy, { passive: false });
      joyZone.addEventListener('touchcancel', resetJoy, { passive: false });
    }

    // Touch Action Button
    const btnAction = document.getElementById('btnTouchAction');
    if (btnAction) {
      btnAction.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.handleActionPress();
      }, { passive: false });
    }

    // Touch Attack Button (Saat Punya Pedang / Boss Battle)
    const btnAtk = document.getElementById('btnTouchAttack');
    if (btnAtk) {
      btnAtk.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.playerAttack();
      }, { passive: false });
      btnAtk.addEventListener('click', (e) => {
        e.preventDefault();
        this.playerAttack();
      });
    }

    // Canvas click to interact / attack
    if (this.canvas) {
      this.canvas.addEventListener('click', () => {
        if (this.hasSword && (this.state === 'BATTLE' || this.state === 'PLAYING')) {
          this.playerAttack();
        }
      });
    }
  }

  updateJoystick(clientX, clientY, knob) {
    const maxDist = 40;
    const dx = clientX - this.touchJoystick.startX;
    const dy = clientY - this.touchJoystick.startY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist === 0) {
      this.touchJoystick.dx = 0;
      this.touchJoystick.dy = 0;
      if (knob) knob.style.transform = 'translate(0px, 0px)';
      return;
    }

    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(dist, maxDist);
    const finalX = Math.cos(angle) * clampedDist;
    const finalY = Math.sin(angle) * clampedDist;

    this.touchJoystick.dx = finalX / maxDist;
    this.touchJoystick.dy = finalY / maxDist;

    if (knob) {
      knob.style.transform = `translate(${finalX}px, ${finalY}px)`;
    }
  }

  setAttackButtonVisible(visible) {
    const btnAtk = document.getElementById('btnTouchAttack');
    const wrap = document.getElementById('touchAttackWrapper');
    if (btnAtk) {
      if (visible) btnAtk.classList.remove('hidden');
      else btnAtk.classList.add('hidden');
    }
    if (wrap) {
      if (visible) wrap.classList.remove('hidden');
      else wrap.classList.add('hidden');
    }
  }

  handleActionPress() {
    sound.playClick();

    if (this.state === 'DIALOGUE') {
      this.advanceDialogue();
      return;
    }

    if (this.state === 'CUTSCENE') {
      return;
    }

    if (this.state === 'PLAYING') {
      this.checkInteractions();
    }
  }

  setPlayer(name, gender) {
    this.player.name = name;
    this.player.gender = gender;
  }

  returnToTitle() {
    this.state = 'TITLE';
    this.isCutsceneActive = false;
    const vig = document.getElementById('cutsceneVignette');
    if (vig) {
      vig.style.opacity = '0';
      vig.classList.add('hidden');
    }
    const hud = document.getElementById('missionNotificationHUD');
    if (hud) {
      hud.classList.remove('translate-y-0', 'opacity-100');
      hud.classList.add('translate-y-36', 'opacity-0', 'pointer-events-none');
    }
    const lobbyScreen = document.getElementById('lobbyScreen');
    if (lobbyScreen) {
      lobbyScreen.classList.remove('hidden');
      lobbyScreen.style.opacity = '1';
    }
  }

  setupClassroomScene() {
    this.state = 'CUTSCENE';
    this.isCutsceneActive = true;
    this.player.isMoving = false;
    this.keys = {};
    if (this.touchJoystick) this.touchJoystick.active = false;
    this.switchMap('classroom', 208, 138);
    this.player.isSitting = true;
    this.player.facing = 'up';
    this.cutsceneNpcs = [];

    // Tampilkan efek vignette sinematik gelap di pinggir layar
    const vig = document.getElementById('cutsceneVignette');
    if (vig) {
      vig.classList.remove('hidden');
      vig.style.opacity = '1';
    }

    // Reset NPC positions to classroom desks
    const map = MAPS['classroom'];
    if (map) {
      const rian = map.npcs.find(n => n.id === 'teman_rian');
      if (rian) { rian.x = 127; rian.y = 138; rian.facing = 'up'; }
      const siti = map.npcs.find(n => n.id === 'teman_siti');
      if (siti) { siti.x = 288; siti.y = 138; siti.facing = 'up'; }
    }
  }

  triggerClassroomRecessIntro() {
    sound.playBGM();
    const vig = document.getElementById('cutsceneVignette');
    if (vig) {
      vig.classList.remove('hidden');
      vig.style.opacity = '1';
    }
    this.startDialogue(DIALOGUES.classroom_recess_intro(this.player));
  }

  startGame() {
    this.setupClassroomScene();
  }

  startDialogue(lines) {
    if (lines && lines.length > 0) {
      this.state = 'DIALOGUE';
      this.dialogue.active = true;
      this.dialogue.queue = lines;
      this.dialogue.currentIndex = 0;
      this.dialogue.textProgress = 0;
      this.dialogue.finishedTyping = false;
      this.dialogue.currentLine = lines[0];
      this.dialogue.slideX = -35;
      this.dialogue.alpha = 0;
    }
  }

  updateMissionHUD(questText) {
    if (typeof window !== 'undefined' && window.updateMissionHUD) {
      window.updateMissionHUD(questText, true);
    }
  }

  startAutoWalk(waypoints, callback) {
    this.state = 'CUTSCENE';
    this.player.isSitting = false;
    this.autoWalkPath = [...waypoints];
    this.onAutoWalkComplete = callback;
  }

  switchMap(mapId, x, y) {
    const map = MAPS[mapId];
    if (!map) return;
    this.currentMapId = mapId;
    this.player.x = x ?? map.spawnX;
    this.player.y = y ?? map.spawnY;

    // Toast current area
    this.showToast(`Memasuki: ${map.name}`);
  }

  showToast(msg) {
    this.toast = {
      text: msg,
      timer: 3.5
    };
  }

  openInventory() {
    this.state = 'INVENTORY';
    sound.playClick();
  }

  openMap() {
    this.state = 'MAP';
    sound.playClick();
  }

  openErd() {
    this.state = 'ERD_VIEW';
    sound.playClick();
  }

  checkInteractions() {
    const map = MAPS[this.currentMapId];
    if (!map) return;

    // 1. Check NPC
    for (const npc of map.npcs) {
      const dist = Math.hypot((this.player.x + this.player.w / 2) - (npc.x + npc.w / 2), (this.player.y + this.player.h / 2) - (npc.y + npc.h / 2));
      if (dist <= Math.max(npc.interactionRadius + 45, 95)) {
        if (!this.hasLineOfSight(this.player, npc)) continue;
        this.triggerNpcDialogue(npc);
        return;
      }
    }

    // 2. Check Items
    for (const item of map.items) {
      if (!item.collected) {
        const dist = Math.hypot((this.player.x + this.player.w / 2) - (item.x + item.w / 2), (this.player.y + this.player.h / 2) - (item.y + item.h / 2));
        if (dist <= 75) {
          // Buku Anomali: Harus jawab 5 soal dan benar semua baru bisa diambil!
          if (item.id.startsWith('glitch_buku_')) {
            this.openBookQuiz(item);
            return;
          }

          item.collected = true;
          this.inventory.push(item);
          sound.playPickup();
          this.spawnParticles(item.x, item.y, '#f59e0b', 20);
          this.showToast(`Mendapatkan: ${item.name}!`);

          if (item.id === 'es_teh' || item.id === 'roti_bakar') {
            this.hasBoughtFood = true;
            this.quests.step = 2;
            this.updateMissionHUD('Kembali Masuk ke Ruang Kelas');
            setTimeout(() => {
              this.startDialogue(DIALOGUES.canteen_food_bought(this.player));
            }, 300);
          } else if (item.id === 'kunci_ruangan_kelas') {
            this.hasKeyRuangan = true;
            this.startDialogue(DIALOGUES.glitch_found_classroom_key(this.player));
          } else if (item.id === 'pedang_semak') {
            this.hasSword = true;
            this.setAttackButtonVisible(true);
            this.startDialogue(DIALOGUES.sword_found(this.player));
            this.updateGlitchCourtyardHUD();
          } else if (item.id.startsWith('glitch_kunci_')) {
            this.glitchKeys++;
            this.showToast(`Kunci Gerbang Ditemukan (${this.glitchKeys}/3)!`);
            this.updateGlitchCourtyardHUD();
          } else if (item.id === 'glitch_artefak') {
            this.glitchArtifact = 1;
            this.showToast(`Artefak Anomali {(@&@(&!*@(@) Didapatkan!`);
            sound.playVictory();
            this.updateGlitchCourtyardHUD();
          } else if (item.id === 'flashdisk_rpl' && this.quests.step < 3) {
            this.quests.step = 3;
            this.showToast(`Quest Diperbarui: Bawa Flashdisk ke Rian di Koridor!`);
          } else if (item.id === 'piagam_rpl') {
            this.quests.step = 5;
            this.state = 'VICTORY';
            sound.playVictory();
          }
          return;
        }
      }
    }

    // 3. Check Doors
    for (const door of map.doors) {
      const dist = Math.hypot((this.player.x + this.player.w / 2) - (door.x + door.w / 2), (this.player.y + this.player.h / 2) - (door.y + door.h / 2));
      if (dist <= 85) {
        // Locked door check for classroom entrance from courtyard
        if (this.currentMapId === 'courtyard' && door.targetMap === 'classroom') {
          if (!this.hasBoughtFood) {
            this.showToast('Jajan makanan bebas di kantin dulu sebelum kembali ke kelas!');
            return;
          }
          if (this.satpamShoutTriggered && !this.talkedToSatpam) {
            this.showToast('Pak Satpam memanggilmu! Bicara dengan Bapa dulu.');
            return;
          }
          // Saat sudah bicara dengan satpam & melangkah masuk kelas -> glitch twist horror!
          if (this.talkedToSatpam && !this.glitchTriggered) {
            this.triggerGlitchTransition();
            return;
          }
        }

        // Pintu keluar dari Ruang Kelas Dimensi Glitch ke Halaman Glitch
        if (this.currentMapId === 'glitch_classroom' && door.targetMap === 'glitch_courtyard') {
          if (!this.hasKeyRuangan) {
            this.showToast('Pintu terkunci rapat dari luar! Cari kunci ruangan kelas!');
            sound.playWrong();
            return;
          }
          // Buka pintu dan keluar ke halaman luas dimensi glitch
          this.classroomTimerActive = false;
          const timerHUD = document.getElementById('glitchTimerHUD');
          if (timerHUD) timerHUD.classList.add('hidden');
          this.switchMap('glitch_courtyard', 1300, 1540);
          this.state = 'CUTSCENE';
          sound.playGlitchRoar();
          setTimeout(() => {
            this.startDialogue(DIALOGUES.glitch_courtyard_voice(this.player));
          }, 400);
          return;
        }

        // Interaksi Gerbang Utama di Halaman Dimensi Glitch
        if (this.currentMapId === 'glitch_courtyard') {
          if (this.escapePortalActive) {
            this.triggerEscapeToNormalClass();
            return;
          } else {
            this.showToast('Gerbang terkunci oleh aura anomali! Kumpulkan semua item & pedang!');
            sound.playWrong();
            return;
          }
        }

        // Locked door check for lab
        if (door.targetMap === 'lab' && this.quests.step < 3) {
          this.showToast('Laboratorium terkunci! Selesaikan tugas Rian terlebih dahulu.');
          sound.playWrong();
          return;
        }
        this.switchMap(door.targetMap, door.targetX, door.targetY);
        sound.playClick();
        return;
      }
    }

    // 4. Check Props action (e.g., ERD booth)
    for (const prop of map.props) {
      if (prop.action === 'view_erd') {
        const dist = Math.hypot((this.player.x + this.player.w / 2) - (prop.x + prop.w / 2), (this.player.y + this.player.h / 2) - (prop.y + prop.h / 2));
        if (dist <= 95) {
          this.openErd();
          return;
        }
      }
    }
  }

  triggerNpcDialogue(npc) {
    let lines = [];
    if (npc.id === 'satpam') {
      if (this.satpamShoutTriggered && !this.talkedToSatpam) {
        lines = DIALOGUES.satpam_bapa_talk(this.player);
      } else if (this.talkedToSatpam) {
        lines = DIALOGUES.satpam_repeat(this.player);
      } else {
        lines = DIALOGUES.satpam_intro(this.player);
      }
    } else if (npc.id === 'rian') {
      const hasUsb = this.inventory.some(i => i.id === 'flashdisk_rpl');
      if (hasUsb && this.quests.step <= 3) {
        lines = DIALOGUES.rian_turn_in(this.player);
      } else if (this.quests.step >= 3) {
        lines = DIALOGUES.rian_done();
      } else {
        lines = DIALOGUES.rian_intro(this.player);
      }
    } else if (npc.id === 'siti') {
      lines = DIALOGUES.siti_intro(this.player);
    } else if (npc.id === 'bu_rina') {
      if (this.quests.step >= 4) {
        lines = DIALOGUES.bu_rina_done(this.player);
      } else {
        lines = DIALOGUES.bu_rina_intro(this.player);
      }
    } else if (npc.id === 'ibu_kantin') {
      lines = DIALOGUES.ibu_kantin_intro(this.player);
    } else if (npc.id === 'budi') {
      lines = DIALOGUES.budi_intro(this.player);
    } else if (npc.id === 'teman_siti') {
      lines = DIALOGUES.teman_siti(this.player);
    } else if (npc.id === 'teman_rian') {
      lines = DIALOGUES.teman_rian(this.player);
    }

    if (lines && lines.length > 0) {
      this.state = 'DIALOGUE';
      this.dialogue.active = true;
      this.dialogue.queue = lines;
      this.dialogue.currentIndex = 0;
      this.dialogue.textProgress = 0;
      this.dialogue.finishedTyping = false;
      this.dialogue.currentLine = lines[0];
    }
  }

  advanceDialogue() {
    if (!this.dialogue.finishedTyping) {
      // Instantly finish line
      this.dialogue.textProgress = this.dialogue.currentLine.text.length;
      this.dialogue.finishedTyping = true;
      return;
    }

    // Check actions on current line
    const action = this.dialogue.currentLine.action;
    if (action === 'start_auto_walk_to_doorway') {
      this.dialogue.active = false;
      this.dialogue.currentLine = null;
      this.state = 'CUTSCENE';
      this.player.isSitting = false;
      this.player.facing = 'down';

      // 1. NPC 2 (Rian dan Siti) jalan bebas ke arah berbeda (tidak mengikuti player)
      const map = MAPS['classroom'];
      this.cutsceneNpcs = [];
      if (map) {
        const rian = map.npcs.find(n => n.id === 'teman_rian');
        if (rian) {
          rian.isSitting = false;
          this.cutsceneNpcs.push({
            npc: rian,
            waypoints: [
              { x: 127, y: 220 },
              { x: 90, y: 220 },
              { x: 90, y: 280 }
            ],
            speed: 80,
            finalFacing: 'down'
          });
        }
        const siti = map.npcs.find(n => n.id === 'teman_siti');
        if (siti) {
          siti.isSitting = false;
          this.cutsceneNpcs.push({
            npc: siti,
            waypoints: [
              { x: 288, y: 220 },
              { x: 340, y: 220 },
              { x: 340, y: 290 }
            ],
            speed: 75,
            finalFacing: 'down'
          });
        }
      }

      // 2. Karakter utama jalan dari bangku menuju sekat bukaan kelas depan (x: 408, y: 340)
      this.startAutoWalk([
        { x: 208, y: 165 },
        { x: 408, y: 165 },
        { x: 408, y: 340 }
      ], () => {
        // Tiba tepat di pintu sekat depan (sesuai foto pengguna), muncul monolog
        this.startDialogue(DIALOGUES.classroom_recess_doorway(this.player));
      });
      return;
    } else if (action === 'recess_intro_complete') {
      this.state = 'PLAYING';
      this.isCutsceneActive = false;
      this.player.isSitting = false;
      this.player.facing = 'down';
      const vig = document.getElementById('cutsceneVignette');
      if (vig) {
        vig.style.opacity = '0.45'; // Pertahankan nuansa gelap sinematik elegan pada UI & kanvas
      }
      this.quests.step = 0;
      this.updateMissionHUD('Jam Istirahat: Pergi ke Kantin untuk istirahat & jajan!');
      this.showToast('Jam Istirahat! Pergilah ke Kantin untuk jajan.');
    } else if (action === 'canteen_buy_food_quest') {
      this.quests.step = 1;
      this.updateMissionHUD('Beli Makanan Bebas di Kantin');
      this.showToast('Misi: Beli Makanan Bebas di Kantin!');
    } else if (action === 'canteen_food_done') {
      this.quests.step = 2;
      this.updateMissionHUD('Kembali Masuk ke Ruang Kelas');
      this.showToast('Misi: Kembali Masuk ke Ruang Kelas');
    } else if (action === 'satpam_shouted_action') {
      this.state = 'PLAYING';
      this.quests.step = 3;
      this.updateMissionHUD('Bicara dengan Bapa (Pak Satpam) di Pos Satpam');
      this.showToast('Misi Baru: Bicara dengan Bapa di Pos Satpam!');
    } else if (action === 'satpam_talk_done') {
      this.talkedToSatpam = true;
      this.walkingAfterSatpam = true;
      this.satpamTalkPos = { x: this.player.x, y: this.player.y };
      this.quests.step = 4;
      this.updateMissionHUD('Kembali Masuk ke Ruang Kelas RPL');
      this.showToast('Misi: Kembali Masuk ke Ruang Kelas RPL...');
      this.state = 'PLAYING';
    } else if (action === 'reveal_glitch_classroom_post_blackout' || action === 'reveal_glitch_classroom') {
      this.dialogue.active = false;
      this.dialogue.currentLine = null;
      // Hilangkan layar hitam: ruang kelas anomali kini terlihat
      this.blackout = false;
      this.player.isSitting = false;
      this.state = 'PLAYING';
      this.waitingForFirstMoveInGlitchClassroom = true;
      sound.playGlitchRoar();
      this.showToast('⚠️ Ruang kelas sepi dan mencekam... Coba melangkah!');
    } else if (action === 'start_classroom_60s_timer') {
      this.state = 'PLAYING';
      this.classroomTimerActive = true;
      this.classroomTimeLeft = 60.0;
      const timerHUD = document.getElementById('glitchTimerHUD');
      if (timerHUD) timerHUD.classList.remove('hidden');
      const timerTxt = document.getElementById('glitchTimerNumber');
      if (timerTxt) timerTxt.textContent = '60';
      this.updateMissionHUD('Cari Kunci Ruangan Kelas Sebelum Waktu Habis! (60s)');
      this.showToast('⏱️ CARI KUNCI KELAS! Waktu: 60 Detik!');
    } else if (action === 'classroom_key_obtained') {
      this.state = 'PLAYING';
      this.updateMissionHUD('Kunci Ruangan Didapatkan! Buka Pintu Keluar Depan Kelas!');
      this.showToast('Pintu kelas terbuka! Cepat lari ke pintu depan!');
    } else if (action === 'courtyard_glitch_quest_start') {
      this.state = 'PLAYING';
      this.courtyardGlitchStarted = true;
      this.updateGlitchCourtyardHUD();
    } else if (action === 'sword_obtained') {
      this.state = 'PLAYING';
      this.setAttackButtonVisible(true);
      this.updateGlitchCourtyardHUD();
      this.showToast('Pedang Siap! Gunakan [Spasi / Tombol Pedang / Klik] untuk Menyerang.');
    } else if (action === 'start_boss_battle') {
      this.state = 'BATTLE';
      this.playerHp = 100;
      this.boss.hp = 200;
      this.boss.maxHp = 200;
      // Tetap pertahankan posisi Satpam ? di depan gerbang utama (1250, 120) - TIDAK berteleportasi!
      if (!this.boss.x || this.boss.x < 1000) {
        this.boss.x = 1250;
        this.boss.y = 120;
      }
      if (this.player.y < 200) {
        this.player.y = 230;
      }
      this.player.facing = 'up';
      this.player.isMoving = false;
      const battleHUD = document.getElementById('battleHUD');
      if (battleHUD) battleHUD.classList.remove('hidden');
      this.setAttackButtonVisible(true);
      this.updateBattleUI();
      sound.playGlitchRoar();
      this.showToast('TARUNG BOS: LAWAN SATPAM ? DENGAN TEBASAN PEDANG!');
    } else if (action === 'escape_portal_spawn') {
      this.state = 'PLAYING';
      this.escapePortalActive = true;
      this.updateMissionHUD('DIMENSI RUNTUH! Masuk ke Portal Cahaya di Gerbang!');
      this.showToast('Lari ke portal di gerbang secepat mungkin!');
    } else if (action === 'normal_dimension_restored') {
      this.state = 'PLAYING';
      this.updateMissionHUD('Pameran RPL: Temui Bu Rina & Teman-Teman di Kelas!');
      this.showToast('Kamu telah kembali ke dunia nyata! Pameran berlanjut!');
    } else if (action === 'quest_1_start') {
      this.quests.step = 1;
      this.updateMissionHUD(this.quests.titles[1]);
      this.showToast('Quest Diperbarui: Nikmati Jajan Kantin & Masuk Kembali ke Ruang Kelas!');
    } else if (action === 'quest_2_start') {
      this.quests.step = 2;
      this.updateMissionHUD(this.quests.titles[2]);
      this.showToast('Quest Diperbarui: Temukan Flashdisk di Ruang Kelas RPL!');
    } else if (action === 'quest_2_complete') {
      this.quests.step = 4;
      this.updateMissionHUD(this.quests.titles[4]);
      this.showToast('Quest Diperbarui: Kunci Lab Terbuka! Temui Bu Rina di Kelas.');
    } else if (action === 'show_erd_option') {
      this.openErd();
    } else if (action === 'offer_quiz') {
      this.state = 'QUIZ';
      this.startQuiz();
      return;
    }

    this.dialogue.currentIndex++;
    if (this.dialogue.currentIndex < this.dialogue.queue.length) {
      this.dialogue.currentLine = this.dialogue.queue[this.dialogue.currentIndex];
      this.dialogue.textProgress = 0;
      this.dialogue.finishedTyping = false;
      this.dialogue.slideX = -30;
      this.dialogue.alpha = 0;
    } else {
      // Dialogue ended
      this.state = 'PLAYING';
      this.dialogue.active = false;
    }
  }

  startQuiz() {
    this.quiz.currentQuestion = 0;
    this.quiz.score = 0;
    this.quiz.selectedOption = null;
    this.quiz.answered = false;
    this.renderQuizUI();
  }

  renderQuizUI() {
    const modal = document.getElementById('quizModal');
    if (!modal) return;
    modal.classList.remove('hidden');

    const q = QUIZ_QUESTIONS[this.quiz.currentQuestion];
    const questionText = document.getElementById('quizQuestionText');
    const optionsContainer = document.getElementById('quizOptionsContainer');
    const progressText = document.getElementById('quizProgress');
    const scoreBadge = document.getElementById('quizScoreBadge');

    if (progressText) progressText.textContent = `Soal ${this.quiz.currentQuestion + 1} dari ${QUIZ_QUESTIONS.length}`;
    if (scoreBadge) scoreBadge.textContent = `Skor: ${this.quiz.score * 20}`;
    if (questionText) questionText.textContent = q.question;

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-emerald-500 text-slate-100 font-mono text-sm transition-colors cursor-pointer';
        btn.textContent = opt.text;
        btn.onclick = () => this.handleQuizAnswer(idx, opt.correct, q.explanation);
        optionsContainer.appendChild(btn);
      });
    }

    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) nextBtn.classList.add('hidden');
    const feedbackBox = document.getElementById('quizFeedback');
    if (feedbackBox) feedbackBox.classList.add('hidden');
  }

  handleQuizAnswer(idx, isCorrect, explanation) {
    if (this.quiz.answered) return;
    this.quiz.answered = true;

    const optionsContainer = document.getElementById('quizOptionsContainer');
    const buttons = optionsContainer.querySelectorAll('button');

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === idx) {
        if (isCorrect) {
          btn.className = 'w-full text-left px-4 py-3 rounded-lg border border-emerald-500 bg-emerald-950 text-emerald-200 font-mono text-sm';
          sound.playCorrect();
          this.quiz.score++;
        } else {
          btn.className = 'w-full text-left px-4 py-3 rounded-lg border border-rose-500 bg-rose-950 text-rose-200 font-mono text-sm';
          sound.playWrong();
        }
      }
    });

    const scoreBadge = document.getElementById('quizScoreBadge');
    if (scoreBadge) scoreBadge.textContent = `Skor: ${this.quiz.score * 20}`;

    const feedbackBox = document.getElementById('quizFeedback');
    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      feedbackBox.innerHTML = `<span class="font-semibold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}">${isCorrect ? 'Benar!' : 'Kurang Tepat!'}</span> ${explanation}`;
    }

    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      nextBtn.onclick = () => this.nextQuizStep();
    }
  }

  nextQuizStep() {
    this.quiz.answered = false;
    this.quiz.currentQuestion++;

    if (this.quiz.currentQuestion < QUIZ_QUESTIONS.length) {
      this.renderQuizUI();
    } else {
      // Quiz Complete!
      const modal = document.getElementById('quizModal');
      if (modal) modal.classList.add('hidden');

      this.state = 'PLAYING';
      const finalScore = this.quiz.score * 20;
      sound.playVictory();
      this.showToast(`Kuis Selesai! Skor Akhir: ${finalScore}/100.`);

      if (this.quiz.score >= 3) {
        this.quests.step = 4;
        this.showToast(`Selamat! Masuk ke Lab Komputer untuk mengambil Piagam Juara!`);
      }
    }
  }

  // --- TANTANGAN BUKU ANOMALI DIMENSI (5 SOAL WAJIB BENAR SEMUA) ---
  openBookQuiz(item) {
    const quizData = BOOK_QUIZZES[item.id];
    if (!quizData) {
      item.collected = true;
      this.inventory.push(item);
      this.glitchBooks++;
      this.updateGlitchCourtyardHUD();
      return;
    }

    this.currentBookQuiz = {
      item: item,
      quizData: quizData,
      currentIndex: 0,
      total: quizData.questions.length
    };

    this.state = 'QUIZ_BOOK';
    this.player.isMoving = false;
    this.keys = {};
    if (this.touchJoystick) this.touchJoystick.active = false;

    const modal = document.getElementById('bookQuizModal');
    if (modal) modal.classList.remove('hidden');

    this.renderBookQuizQuestion();
  }

  renderBookQuizQuestion() {
    if (!this.currentBookQuiz) return;
    const { quizData, currentIndex, total, item } = this.currentBookQuiz;
    const q = quizData.questions[currentIndex];
    if (!q) return;

    const titleEl = document.getElementById('bookQuizTitle');
    const stepEl = document.getElementById('bookQuizStep');
    const questionEl = document.getElementById('bookQuizQuestion');
    const optionsContainer = document.getElementById('bookQuizOptions');
    const feedbackEl = document.getElementById('bookQuizFeedback');

    if (titleEl) titleEl.textContent = quizData.title.toUpperCase();
    if (stepEl) stepEl.textContent = `${currentIndex + 1}`;
    if (questionEl) questionEl.textContent = q.question;

    if (feedbackEl) {
      feedbackEl.className = 'hidden font-mono text-xs p-2.5 rounded-xl text-center font-bold';
      feedbackEl.textContent = '';
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left p-3 rounded-xl bg-slate-950/80 hover:bg-purple-950/50 border border-purple-900/60 hover:border-purple-400 text-slate-200 hover:text-white transition flex items-center justify-between cursor-pointer active:scale-[0.99]';
        btn.innerHTML = `
          <div class="flex items-center gap-2.5">
            <span class="w-6 h-6 rounded-lg bg-purple-900/50 border border-purple-600/50 flex items-center justify-center font-bold text-purple-300 text-[11px]">${String.fromCharCode(65 + idx)}</span>
            <span class="font-medium text-xs sm:text-sm">${opt.text.replace(/^[A-D]\.\s*/, '')}</span>
          </div>
          <span class="text-slate-500 text-[10px] hidden sm:inline">[${idx + 1}]</span>
        `;

        btn.onclick = () => {
          this.handleBookQuizAnswer(opt, btn, optionsContainer);
        };
        optionsContainer.appendChild(btn);
      });
    }

    const cancelBtn = document.getElementById('btnCancelBookQuiz');
    if (cancelBtn) {
      cancelBtn.onclick = () => {
        this.closeBookQuiz();
      };
    }
  }

  handleBookQuizAnswer(chosenOpt, chosenBtn, container) {
    if (!this.currentBookQuiz) return;
    const { quizData, currentIndex, total, item } = this.currentBookQuiz;
    const feedbackEl = document.getElementById('bookQuizFeedback');
    const allBtns = container.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);

    if (chosenOpt.correct) {
      sound.playPickup();
      chosenBtn.className = 'w-full text-left p-3 rounded-xl bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 flex items-center justify-between font-bold';
      if (feedbackEl) {
        feedbackEl.className = 'font-mono text-xs p-2.5 rounded-xl text-center font-bold bg-emerald-950/90 border border-emerald-500/70 text-emerald-300';
        feedbackEl.textContent = `✅ BENAR! Jawaban Anda tepat.`;
      }

      if (currentIndex + 1 < total) {
        setTimeout(() => {
          if (this.currentBookQuiz) {
            this.currentBookQuiz.currentIndex++;
            this.renderBookQuizQuestion();
          }
        }, 650);
      } else {
        // All 5 questions answered correctly! (5/5)
        sound.playVictory();
        this.spawnParticles(item.x + 12, item.y + 12, '#a855f7', 40);
        if (feedbackEl) {
          feedbackEl.className = 'font-mono text-xs p-3 rounded-xl text-center font-bold bg-gradient-to-r from-purple-900 to-emerald-900 border-2 border-amber-400 text-amber-200 animate-pulse';
          feedbackEl.innerHTML = `🎉 SEMPURNA! ${total}/${total} SOAL BENAR! Segel Buku Bengkel Berhasil Terbuka!`;
        }

        item.collected = true;
        this.inventory.push(item);
        this.glitchBooks++;
        this.showToast(`Buku Bengkel Berhasil Diambil (${this.glitchBooks}/7)!`);
        this.updateGlitchCourtyardHUD();

        setTimeout(() => {
          this.closeBookQuiz();
        }, 1300);
      }
    } else {
      // Jawaban Salah: Segel menolak! Wajib benar semua
      sound.playGlitchSFX();
      chosenBtn.className = 'w-full text-left p-3 rounded-xl bg-red-950/90 border-2 border-red-500 text-red-200 flex items-center justify-between font-bold';
      if (feedbackEl) {
        feedbackEl.className = 'font-mono text-xs p-3 rounded-xl text-center font-bold bg-red-950/90 border-2 border-red-500 text-red-200';
        feedbackEl.innerHTML = `❌ JAWABAN SALAH! Segel bengkel menolakmu...<br><span class="text-amber-300 text-[11px] font-normal">Syarat mutlak: Anda harus menjawab SEMUA ${total} SOAL DENGAN BENAR (${total}/${total}) untuk mengamankan buku ini!</span>`;
      }

      container.innerHTML = `
        <div class="flex flex-col gap-2 pt-2">
          <button id="btnRetryBookQuiz" class="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer transition shadow-lg flex items-center justify-center gap-2">
            <span>🔄</span>
            <span>COBA LAGI DARI SOAL 1</span>
          </button>
          <button id="btnCloseFailedBookQuiz" class="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition text-[11px]">
            Tutup & Coba Nanti
          </button>
        </div>
      `;

      const btnRetry = document.getElementById('btnRetryBookQuiz');
      if (btnRetry) {
        btnRetry.onclick = () => {
          sound.playClick();
          this.currentBookQuiz.currentIndex = 0;
          this.renderBookQuizQuestion();
        };
      }

      const btnClose = document.getElementById('btnCloseFailedBookQuiz');
      if (btnClose) {
        btnClose.onclick = () => {
          this.closeBookQuiz();
        };
      }
    }
  }

  closeBookQuiz() {
    const modal = document.getElementById('bookQuizModal');
    if (modal) modal.classList.add('hidden');
    this.currentBookQuiz = null;
    this.state = 'PLAYING';
    sound.playClick();
  }

  // Particle Effects
  spawnParticles(x, y, color, count = 15) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 20 + Math.random() * 80;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.6 + Math.random() * 0.4,
        maxLife: 1.0,
        color,
        size: 2 + Math.random() * 3
      });
    }
  }

  updateParticles(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  // Collision Helper
  checkCollision(x, y, w, h) {
    const map = MAPS[this.currentMapId];
    if (!map) return false;

    // Check bounds
    if (x < 0 || y < 0 || x + w > map.width || y + h > map.height) {
      return true;
    }

    // Check custom colliders
    for (const box of map.colliders) {
      if (
        x < box.x + box.w &&
        x + w > box.x &&
        y < box.y + box.h &&
        y + h > box.y
      ) {
        return true;
      }
    }
    return false;
  }

  // Line of Sight Helper (Blocks interaction through solid walls)
  hasLineOfSight(player, npc) {
    const map = MAPS[this.currentMapId];
    if (!map || !map.colliders || map.colliders.length === 0) return true;

    const pX = player.x + player.w / 2;
    const pY = player.y + player.h / 2;
    const nX = npc.x + npc.w / 2;
    const nY = npc.y + npc.h / 2;

    for (const c of map.colliders) {
      // Wall barriers block line of sight (not small furniture like desks w: 30, h: 32)
      const isWall = (c.w >= 30 && c.h >= 70) || (c.w >= 70 && c.h >= 30);
      if (isWall) {
        if (this.lineIntersectsRect(pX, pY, nX, nY, c.x, c.y, c.w, c.h)) {
          return false;
        }
      }
    }
    return true;
  }

  lineIntersectsRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    if (x1 >= rx && x1 <= rx + rw && y1 >= ry && y1 <= ry + rh) return true;
    if (x2 >= rx && x2 <= rx + rw && y2 >= ry && y2 <= ry + rh) return true;

    const rLeft = rx;
    const rRight = rx + rw;
    const rTop = ry;
    const rBottom = ry + rh;

    return this.lineIntersectsSegment(x1, y1, x2, y2, rLeft, rTop, rRight, rTop) ||
           this.lineIntersectsSegment(x1, y1, x2, y2, rRight, rTop, rRight, rBottom) ||
           this.lineIntersectsSegment(x1, y1, x2, y2, rRight, rBottom, rLeft, rBottom) ||
           this.lineIntersectsSegment(x1, y1, x2, y2, rLeft, rBottom, rLeft, rTop);
  }

  lineIntersectsSegment(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom === 0) return false;
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
  }

  update(dt) {
    // Update Toast
    if (this.toast) {
      this.toast.timer -= dt;
      if (this.toast.timer <= 0) this.toast = null;
    }

    // Update Particles
    this.updateParticles(dt);

    if (this.state === 'DIALOGUE') {
      if (this.dialogue.slideX < 0) {
        this.dialogue.slideX = Math.min(0, this.dialogue.slideX + dt * 140);
      }
      if (this.dialogue.alpha < 1) {
        this.dialogue.alpha = Math.min(1, this.dialogue.alpha + dt * 4);
      }

      if (!this.dialogue.finishedTyping && this.dialogue.currentLine) {
        this.dialogue.timer += dt;
        if (this.dialogue.timer >= 0.025) {
          this.dialogue.timer = 0;
          this.dialogue.textProgress++;
          if (this.dialogue.textProgress % 3 === 0) {
            sound.playBlip();
          }
          if (this.dialogue.textProgress >= this.dialogue.currentLine.text.length) {
            this.dialogue.finishedTyping = true;
          }
        }
      }
      return;
    }

    // Update Jumpscare Glitch Monster (???) Mengejar & Membunuh Player (Waktu 60 detik habis)
    if (this.glitchMonster && this.glitchDeathActive) {
      this.glitchMonster.animTimer += dt * 8;
      if (this.glitchMonster.animTimer >= 1) {
        this.glitchMonster.animTimer = 0;
        this.glitchMonster.frame = (this.glitchMonster.frame + 1) % 4;
      }
      const targetX = this.player.x + (this.player.w - this.glitchMonster.w) / 2;
      const targetY = this.player.y + (this.player.h - this.glitchMonster.h) / 2;
      const dx = targetX - this.glitchMonster.x;
      const dy = targetY - this.glitchMonster.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 14) {
        this.glitchMonster.x += (dx / dist) * this.glitchMonster.speed * dt;
        this.glitchMonster.y += (dy / dist) * this.glitchMonster.speed * dt;
        if (Math.random() < 0.45) {
          this.spawnParticles(this.glitchMonster.x + 26, this.glitchMonster.y + 26, '#ef4444', 3);
        }
      } else if (!this.glitchKilledPlayer) {
        this.glitchKilledPlayer = true;
        this.killPlayerWithGlitchMonster();
      }
      this.updateCamera();
      return;
    }

    if (this.state === 'CUTSCENE') {
      // 1. Update Cutscene NPCs walking independently
      if (this.cutsceneNpcs && this.cutsceneNpcs.length > 0) {
        for (const data of this.cutsceneNpcs) {
          if (data.waypoints && data.waypoints.length > 0) {
            const target = data.waypoints[0];
            const dx = target.x - data.npc.x;
            const dy = target.y - data.npc.y;
            const dist = Math.hypot(dx, dy);
            const step = data.speed * dt;
            if (dist <= step) {
              data.npc.x = target.x;
              data.npc.y = target.y;
              data.waypoints.shift();
              if (data.waypoints.length === 0) {
                data.npc.facing = data.finalFacing || 'down';
              }
            } else {
              const nx = dx / dist;
              const ny = dy / dist;
              data.npc.x += nx * step;
              data.npc.y += ny * step;
              if (Math.abs(dx) > Math.abs(dy)) {
                data.npc.facing = dx > 0 ? 'right' : 'left';
              } else {
                data.npc.facing = dy > 0 ? 'down' : 'up';
              }
            }
          }
        }
      }

      // 2. Update Protagonist walking to top doorway
      if (this.autoWalkPath && this.autoWalkPath.length > 0) {
        const target = this.autoWalkPath[0];
        const dx = target.x - this.player.x;
        const dy = target.y - this.player.y;
        const dist = Math.hypot(dx, dy);
        const speed = 145; // Smooth walking speed
        const step = speed * dt;

        if (dist <= step) {
          this.player.x = target.x;
          this.player.y = target.y;
          this.autoWalkPath.shift();
          if (this.autoWalkPath.length === 0) {
            this.player.isMoving = false;
            this.player.facing = 'down';
            if (this.onAutoWalkComplete) {
              const cb = this.onAutoWalkComplete;
              this.onAutoWalkComplete = null;
              cb();
            }
          }
        } else {
          this.player.isMoving = true;
          this.player.animTimer += dt;
          if (this.player.animTimer >= 0.12) {
            this.player.animTimer = 0;
            this.player.animFrame++;
          }
          const nx = dx / dist;
          const ny = dy / dist;
          this.player.x += nx * step;
          this.player.y += ny * step;
          if (Math.abs(dx) > Math.abs(dy)) {
            this.player.facing = dx > 0 ? 'right' : 'left';
          } else {
            this.player.facing = dy > 0 ? 'down' : 'up';
          }
        }
        this.updateCamera();
      }
      return;
    }

    // Cooldown update for player sword attack
    if (this.attackCooldown > 0) this.attackCooldown -= dt;
    if (this.attackAnimTimer > 0) {
      this.attackAnimTimer -= dt;
      if (this.attackAnimTimer <= 0) this.isAttacking = false;
    }

    // Cegah pemain bergerak jika sedang duduk, cutscene aktif, atau bukan state bermain
    if (this.player.isSitting || this.isCutsceneActive || (this.state !== 'PLAYING' && this.state !== 'BATTLE')) {
      this.player.isMoving = false;
      return;
    }

    // Movement logic
    let moveX = 0;
    let moveY = 0;

    // Keyboard controls
    if (this.keys['arrowup'] || this.keys['w'] || this.keys['KeyW']) moveY -= 1;
    if (this.keys['arrowdown'] || this.keys['s'] || this.keys['KeyS']) moveY += 1;
    if (this.keys['arrowleft'] || this.keys['a'] || this.keys['KeyA']) moveX -= 1;
    if (this.keys['arrowright'] || this.keys['d'] || this.keys['KeyD']) moveX += 1;

    // Touch joystick
    if (this.touchJoystick.active) {
      moveX = this.touchJoystick.dx;
      moveY = this.touchJoystick.dy;
    }

    const isMoving = Math.abs(moveX) > 0.1 || Math.abs(moveY) > 0.1;
    this.player.isMoving = isMoving;

    // Story Trigger: Saat karakter digerakkan untuk pertama kali di kelas glitch setelah layar hitam hilang
    if (this.currentMapId === 'glitch_classroom' && this.waitingForFirstMoveInGlitchClassroom && isMoving) {
      this.waitingForFirstMoveInGlitchClassroom = false;
      this.player.isMoving = false;
      this.keys = {};
      if (this.touchJoystick) this.touchJoystick.active = false;
      this.state = 'CUTSCENE';
      sound.playGlitchSFX();
      setTimeout(() => {
        this.startDialogue(DIALOGUES.glitch_entity_voice(this.player));
      }, 100);
      return;
    }

    if (isMoving) {
      // Normalize
      const len = Math.hypot(moveX, moveY);
      const dirX = (moveX / len);
      const dirY = (moveY / len);

      // Facing
      if (Math.abs(dirX) > Math.abs(dirY)) {
        this.player.facing = dirX > 0 ? 'right' : 'left';
      } else {
        this.player.facing = dirY > 0 ? 'down' : 'up';
      }

      // Sprint check
      const sprint = (this.keys['shift'] || this.keys['ShiftLeft'] || this.keys['ShiftRight']) ? this.player.sprintMultiplier : 1.0;
      const speed = this.player.speed * sprint * dt;

      // Axis-by-axis collision with compact, responsive feet hitbox
      const newX = this.player.x + dirX * speed;
      const newY = this.player.y + dirY * speed;

      const feetW = 20;
      const feetH = 10;
      const feetOffsetX = (this.player.w - feetW) / 2;
      const feetOffsetY = Math.round(this.player.h * 0.76);

      if (!this.checkCollision(newX + feetOffsetX, this.player.y + feetOffsetY, feetW, feetH)) {
        this.player.x = newX;
      }

      if (!this.checkCollision(this.player.x + feetOffsetX, newY + feetOffsetY, feetW, feetH)) {
        this.player.y = newY;
      }

      // Animation frame cycle
      this.player.animTimer += dt * (sprint > 1 ? 12 : 8);
      if (this.player.animTimer >= 1) {
        this.player.animTimer = 0;
        this.player.animFrame = (this.player.animFrame + 1) % 4;
      }
    } else {
      this.player.animFrame = 0;
    }

    // Story Trigger 1: Ketika player sudah berada di kantin (x >= 1720, y antara 300 s/d 680), muncul monolog "hmm beli apa ya"
    // CATATAN: Diperbaiki agar HANYA muncul di area Kantin (bukan di dekat Gudang Arsip yang posisinya di y >= 1100!)
    if (this.currentMapId === 'courtyard' && !this.canteenArrived && this.player.x >= 1720 && this.player.y >= 300 && this.player.y <= 680 && this.state === 'PLAYING') {
      this.canteenArrived = true;
      this.player.isMoving = false;
      this.keys = {};
      if (this.touchJoystick) this.touchJoystick.active = false;
      this.startDialogue(DIALOGUES.canteen_arrival(this.player));
      return;
    }

    // Story Trigger 2: Setelah jajan & berjalan di jalan ke arah tengah/tiang bendera (jangan terlalu dekat kantin alias dekat bendera)
    if (this.currentMapId === 'courtyard' && this.hasBoughtFood && !this.satpamShoutTriggered && this.state === 'PLAYING') {
      const nearFlag = Math.hypot(this.player.x - 1300, this.player.y - 880) <= 240;
      const onRoadNearFlag = this.player.x <= 1650 && this.player.x >= 1200 && this.player.y >= 720 && this.player.y <= 1020;
      if (nearFlag || onRoadNearFlag) {
        this.satpamShoutTriggered = true;
        this.player.isMoving = false;
        this.keys = {};
        if (this.touchJoystick) this.touchJoystick.active = false;
        this.state = 'CUTSCENE';

        // Play alert shout / whistle sound!
        sound.playShoutAlert();

        // Pak Satpam di pos menoleh ke arah player & spawn partikel tanda seru
        const map = MAPS['courtyard'];
        if (map) {
          const satpam = map.npcs.find(n => n.id === 'satpam');
          if (satpam) {
            satpam.facing = 'down';
            this.spawnParticles(satpam.x + satpam.w / 2, satpam.y, '#f59e0b', 25);
          }
        }

        // Munculkan dialog teriakan Pak Satpam
        setTimeout(() => {
          this.startDialogue(DIALOGUES.satpam_shout(this.player));
        }, 300);
        return;
      }
    }

    // Story Trigger 2b: Setelah bicara dengan satpam di pos, saat player berjalan dan sudah dekat pintu masuk kelas -> tiba-tiba pingsan!
    if (this.currentMapId === 'courtyard' && this.talkedToSatpam && !this.glitchTriggered && this.state === 'PLAYING') {
      const nearClassDoor = this.player.y >= 1490 && Math.abs(this.player.x - 1300) <= 150;
      if (nearClassDoor) {
        this.triggerGlitchTransition();
        return;
      }
    }

    // Story Trigger 3: Di Halaman Dimensi Glitch, setelah item terkumpul & pedang dibawa, saat mau ke gerbang muncul Satpam ?
    if (this.currentMapId === 'glitch_courtyard' && this.state === 'PLAYING' && !this.bossBattleStarted) {
      const allCollected = this.glitchBooks >= 7 && this.glitchKeys >= 3 && this.glitchArtifact >= 1 && this.hasSword;
      if (allCollected && this.player.y <= 240 && this.player.x >= 1150 && this.player.x <= 1450) {
        this.bossBattleStarted = true;
        this.player.isMoving = false;
        this.keys = {};
        if (this.touchJoystick) this.touchJoystick.active = false;
        this.state = 'CUTSCENE';

        // Spawn Boss Satpam ? di depan gerbang utama
        this.boss.x = 1250;
        this.boss.y = 120;
        this.boss.hp = 200;
        this.boss.maxHp = 200;

        sound.playGlitchSFX();
        this.spawnParticles(this.boss.x + 50, this.boss.y + 50, '#a855f7', 35);

        setTimeout(() => {
          this.startDialogue(DIALOGUES.boss_satpam_appear(this.player));
        }, 400);
        return;
      }
    }

    // Update Classroom 60s Countdown Timer
    if (this.classroomTimerActive && this.state === 'PLAYING') {
      const prevSec = Math.ceil(this.classroomTimeLeft);
      this.classroomTimeLeft -= dt;
      const curSec = Math.ceil(this.classroomTimeLeft);
      const timerTxt = document.getElementById('glitchTimerNumber');
      if (timerTxt) timerTxt.textContent = Math.max(0, curSec);

      if (curSec < prevSec && curSec <= 15 && curSec > 0) {
        sound.playCountdownBeep(curSec <= 5);
      }

      if (this.classroomTimeLeft <= 0 && !this.glitchDeathActive) {
        // WAKTU 60 DETIK HABIS! Sosok glitch hitam muncul, player terkunci, monster menerjang membunuh player!
        this.glitchDeathActive = true;
        this.classroomTimerActive = false;
        const timerHUD = document.getElementById('glitchTimerHUD');
        if (timerHUD) timerHUD.classList.add('hidden');

        // Kunci total pergerakan pemain
        this.state = 'CUTSCENE';
        this.player.isMoving = false;
        this.keys = {};
        if (this.touchJoystick) this.touchJoystick.active = false;

        sound.playGlitchSFX();
        sound.playGlitchRoar();

        // Spawn sosok glitch hitam di seberang ruangan
        const spawnX = Math.hypot(this.player.x - 408, this.player.y - 340) > 130 ? 408 : 90;
        const spawnY = Math.hypot(this.player.x - 408, this.player.y - 340) > 130 ? 340 : 130;
        this.glitchMonster = {
          x: spawnX,
          y: spawnY,
          w: 52,
          h: 52,
          speed: 320,
          frame: 0,
          animTimer: 0
        };
        this.spawnParticles(spawnX + 26, spawnY + 26, '#a855f7', 40);
        this.showToast('⚠️ WAKTU 60 DETIK HABIS! ??? MENGEJAR!');
      }
    }

    // Battle Update
    if (this.state === 'BATTLE') {
      this.updateBattle(dt);
    }

    // Update Floating Damage Popups
    for (let i = this.damagePopups.length - 1; i >= 0; i--) {
      const dp = this.damagePopups[i];
      dp.y -= 35 * dt;
      dp.life -= dt;
      if (dp.life <= 0) this.damagePopups.splice(i, 1);
    }

    // Camera follow with boundary clamping & centering on widescreen
    this.updateCamera();
  }

  triggerGlitchTransition() {
    this.glitchTriggered = true;
    this.state = 'CUTSCENE';
    this.player.isMoving = false;
    this.keys = {};
    if (this.touchJoystick) this.touchJoystick.active = false;

    // 1. Play screeching glitch / fainting SFX & stop music
    sound.playGlitchSFX();
    sound.stopBGM();
    this.isGlitching = true;
    this.showToast('⚡ Tiba-tiba pandanganmu berputar & pusing... ⚡');

    // 2. Blackout overlay (fainting)
    setTimeout(() => {
      const blackoutEl = document.getElementById('glitchBlackoutOverlay');
      if (blackoutEl) {
        blackoutEl.classList.remove('opacity-0');
        blackoutEl.classList.add('opacity-100');
      }
      this.blackout = true;
    }, 700);

    // 3. Bangun di dalam kelas, TAPI LAYAR TETAP HITAM PEKAT
    setTimeout(() => {
      this.switchMap('glitch_classroom', 208, 138);
      this.player.x = 208;
      this.player.y = 138;
      this.player.isSitting = true;
      this.player.facing = 'down';
      this.blackout = true; // Canvas blackout tetap aktif (layar hitam pekat)

      // Hilangkan overlay html agar kanvas bisa menggambar kotak dialog di atas layar hitam canvas
      const blackoutEl = document.getElementById('glitchBlackoutOverlay');
      if (blackoutEl) {
        blackoutEl.classList.remove('opacity-100');
        blackoutEl.classList.add('opacity-0');
      }

      // Dialog monolog kita di kegelapan layar hitam ("d dimana aku?", "ko pada sepi!?")
      setTimeout(() => {
        this.startDialogue(DIALOGUES.glitch_blackout_wakeup(this.player));
      }, 600);
    }, 1800);
  }

  killPlayerWithGlitchMonster() {
    sound.playGlitchSFX();
    sound.playGlitchRoar();
    sound.playWrong();
    this.spawnParticles(this.player.x + this.player.w / 2, this.player.y + this.player.h / 2, '#dc2626', 80);

    // Screen flash blackout jumpscare
    const blackoutEl = document.getElementById('glitchBlackoutOverlay');
    if (blackoutEl) {
      blackoutEl.classList.remove('opacity-0');
      blackoutEl.classList.add('opacity-100');
    }
    this.blackout = true;
    this.state = 'CUTSCENE';
    this.player.isMoving = false;
    this.keys = {};
    if (this.touchJoystick) this.touchJoystick.active = false;

    this.showToast('💀 MISI GAGAL! Kamu tertangkap oleh ???! 💀');

    // Munculkan layar Game Over (Mengulangi atau Menyerah) setelah efek jumpscare (~700ms)
    setTimeout(() => {
      if (blackoutEl) {
        blackoutEl.classList.remove('opacity-100');
        blackoutEl.classList.add('opacity-0');
      }
      this.blackout = false;
      const modal = document.getElementById('gameOverModal');
      if (modal) modal.classList.remove('hidden');
    }, 700);
  }

  retryClassroomGlitch() {
    const modal = document.getElementById('gameOverModal');
    if (modal) modal.classList.add('hidden');

    this.player.x = 208;
    this.player.y = 138;
    this.player.facing = 'down';
    this.player.isSitting = false;
    this.glitchMonster = null;
    this.glitchDeathActive = false;
    this.glitchKilledPlayer = false;
    this.classroomTimeLeft = 60.0;
    this.classroomTimerActive = true;
    this.hasKeyRuangan = false;
    this.blackout = false;
    this.state = 'PLAYING';

    // Reset kunci ruangan kelas jika sempat terambil
    const gcMap = MAPS['glitch_classroom'];
    if (gcMap && gcMap.items) {
      const keyItem = gcMap.items.find(i => i.id === 'kunci_ruangan_kelas');
      if (keyItem) keyItem.collected = false;
    }
    this.inventory = this.inventory.filter(i => i.id !== 'kunci_ruangan_kelas');

    const timerHUD = document.getElementById('glitchTimerHUD');
    if (timerHUD) timerHUD.classList.remove('hidden');
    const timerTxt = document.getElementById('glitchTimerNumber');
    if (timerTxt) timerTxt.textContent = '60';

    this.updateMissionHUD('Cari Kunci Ruangan Kelas Sebelum Waktu Habis! (60s)');
    this.showToast('⏱️ Misi Diulang! Waktu 60 detik dimulai lagi!');
  }

  resetToClassroomRecess(selectedName, selectedGender) {
    if (selectedName && selectedGender) {
      this.setPlayer(selectedName, selectedGender);
    }

    // Story Progression Flags reset
    this.canteenArrived = false;
    this.hasBoughtFood = false;
    this.satpamShoutTriggered = false;
    this.talkedToSatpam = false;
    this.walkingAfterSatpam = false;
    this.satpamTalkPos = null;

    // Glitch Horror Flags reset
    this.glitchTriggered = false;
    this.isGlitching = false;
    this.blackout = false;
    this.classroomTimerActive = false;
    this.classroomTimeLeft = 60.0;
    this.hasKeyRuangan = false;
    this.glitchDeathActive = false;
    this.glitchMonster = null;
    this.glitchKilledPlayer = false;
    this.waitingForFirstMoveInGlitchClassroom = false;

    // Courtyard Glitch Items & Boss reset
    this.courtyardGlitchStarted = false;
    this.glitchBooks = 0;
    this.glitchKeys = 0;
    this.glitchArtifact = 0;
    this.hasSword = false;
    this.bossBattleStarted = false;
    this.bossDefeated = false;
    this.escapePortalActive = false;
    this.playerHp = 100;
    this.boss.hp = 200;
    this.inventory = [];

    // Reset all collected items in all maps
    for (const mapKey in MAPS) {
      if (MAPS[mapKey] && MAPS[mapKey].items) {
        MAPS[mapKey].items.forEach(item => { item.collected = false; });
      }
    }

    // Reset UI HUDs
    const timerHUD = document.getElementById('glitchTimerHUD');
    if (timerHUD) timerHUD.classList.add('hidden');
    const courtyardHUD = document.getElementById('glitchCourtyardHUD');
    if (courtyardHUD) courtyardHUD.classList.add('hidden');
    const bossHUD = document.getElementById('bossBattleHUD');
    if (bossHUD) bossHUD.classList.add('hidden');
    const touchAttackWrapper = document.getElementById('touchAttackWrapper');
    if (touchAttackWrapper) touchAttackWrapper.classList.add('hidden');
    const gameOverModal = document.getElementById('gameOverModal');
    if (gameOverModal) gameOverModal.classList.add('hidden');

    this.quests = {
      title: 'Jam Istirahat',
      step: 1,
      target: 'Beli Jajanan di Kantin SMKN 1 Katapang',
      completed: false
    };

    // Setup Ruang Kelas awal jam istirahat
    this.setupClassroomScene();
  }

  triggerEscapeToNormalClass() {
    this.state = 'CUTSCENE';
    this.escapePortalActive = false;
    this.bossBattleStarted = false;
    this.bossDefeated = true;
    this.isGlitching = false;
    const battleHUD = document.getElementById('battleHUD');
    if (battleHUD) battleHUD.classList.add('hidden');
    const timerHUD = document.getElementById('glitchTimerHUD');
    if (timerHUD) timerHUD.classList.add('hidden');
    this.setAttackButtonVisible(false);

    // Blackout
    const blackoutEl = document.getElementById('glitchBlackoutOverlay');
    if (blackoutEl) {
      blackoutEl.classList.remove('opacity-0');
      blackoutEl.classList.add('opacity-100');
    }
    sound.playVictory();

    // After 1.8s, wake up in classroom with normal state!
    setTimeout(() => {
      this.switchMap('classroom', 208, 138);
      this.player.x = 208;
      this.player.y = 138;
      this.player.isSitting = true;
      this.player.facing = 'down';

      // Resume happy BGM
      sound.playBGM();

      // Fade in
      if (blackoutEl) {
        blackoutEl.classList.remove('opacity-100');
        blackoutEl.classList.add('opacity-0');
      }

      setTimeout(() => {
        this.player.isSitting = false;
        this.startDialogue(DIALOGUES.wake_up_in_class_normal(this.player));
      }, 700);
    }, 1800);
  }

  updateGlitchCourtyardHUD() {
    const allCollected = this.glitchBooks >= 7 && this.glitchKeys >= 3 && this.glitchArtifact >= 1 && this.hasSword;
    if (allCollected) {
      this.updateMissionHUD('Semua Terkumpul! Pergi ke Gerbang Utama Sekolah!');
      this.showToast('Semua item & pedang terkumpul! Lari ke gerbang sekolah!');
    } else {
      const swordTxt = this.hasSword ? '⚔️ Pedang: Siap' : '⚔️ Pedang: Di Semak';
      this.updateMissionHUD(`Buku (${this.glitchBooks}/7) | Kunci (${this.glitchKeys}/3) | Artefak (${this.glitchArtifact}/1) | ${swordTxt}`);
    }
  }

  playerAttack() {
    if (!this.hasSword) return;
    if (this.attackCooldown > 0) return;
    this.attackCooldown = 0.28;
    this.isAttacking = true;
    this.attackAnimTimer = 0.22;
    sound.playSlashSFX();

    // Slash particle effect in front of player
    const slashX = this.player.facing === 'left' ? this.player.x - 8 : (this.player.facing === 'right' ? this.player.x + this.player.w + 8 : this.player.x + this.player.w / 2);
    const slashY = this.player.facing === 'up' ? this.player.y - 8 : (this.player.facing === 'down' ? this.player.y + this.player.h + 8 : this.player.y + this.player.h / 2);
    this.spawnParticles(slashX, slashY, '#38bdf8', 12);

    // Check hit on boss
    if ((this.state === 'BATTLE' || this.bossBattleStarted) && this.boss && this.boss.hp > 0) {
      const dist = Math.hypot((this.player.x + this.player.w / 2) - (this.boss.x + this.boss.w / 2), (this.player.y + this.player.h / 2) - (this.boss.y + this.boss.h / 2));
      if (dist <= 150) {
        const dmg = 25;
        this.boss.hp = Math.max(0, this.boss.hp - dmg);
        this.boss.flashTimer = 0.2;
        sound.playMonsterHit();
        this.spawnDamagePopup(this.boss.x + 50, this.boss.y + 10, `-${dmg}`, '#f43f5e');
        this.spawnParticles(this.boss.x + 50, this.boss.y + 50, '#c084fc', 22);
        this.updateBattleUI();

        if (this.boss.hp <= 0) {
          // Boss defeated!
          this.state = 'CUTSCENE';
          const battleHUD = document.getElementById('battleHUD');
          if (battleHUD) battleHUD.classList.add('hidden');
          sound.playGlitchSFX();
          this.spawnParticles(this.boss.x + 50, this.boss.y + 50, '#e879f9', 50);
          setTimeout(() => {
            this.startDialogue(DIALOGUES.boss_defeated_escape(this.player));
          }, 500);
        }
      }
    }
  }

  updateBattle(dt) {
    if (this.boss.hp <= 0) return;
    if (this.boss.flashTimer > 0) this.boss.flashTimer -= dt;

    // Boss smooth tracking towards player
    const dx = this.player.x - this.boss.x;
    const dy = this.player.y - this.boss.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 85) {
      const speed = 75;
      this.boss.x += (dx / dist) * speed * dt;
      this.boss.y += (dy / dist) * speed * dt;
      this.boss.facing = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    }

    // Boss attack timer (shoots glitch orb)
    this.boss.attackTimer -= dt;
    if (this.boss.attackTimer <= 0) {
      this.boss.attackTimer = 1.35;
      sound.playGlitchSFX();
      const dirX = dist > 0 ? dx / dist : 0;
      const dirY = dist > 0 ? dy / dist : 1;
      this.bossProjectiles.push({
        x: this.boss.x + this.boss.w / 2,
        y: this.boss.y + this.boss.h / 2,
        vx: dirX * 190,
        vy: dirY * 190,
        life: 3.0,
        r: 10
      });
    }

    // Update projectiles
    for (let i = this.bossProjectiles.length - 1; i >= 0; i--) {
      const p = this.bossProjectiles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;

      // Hit player
      const hitDist = Math.hypot(p.x - (this.player.x + this.player.w / 2), p.y - (this.player.y + this.player.h / 2));
      if (hitDist <= 35) {
        this.playerHp = Math.max(10, this.playerHp - 10);
        this.spawnDamagePopup(this.player.x + 50, this.player.y + 10, '-10', '#ef4444');
        this.spawnParticles(this.player.x + 50, this.player.y + 50, '#ef4444', 12);
        sound.playWrong();
        this.updateBattleUI();
        this.bossProjectiles.splice(i, 1);
        continue;
      }

      if (p.life <= 0) {
        this.bossProjectiles.splice(i, 1);
      }
    }
  }

  updateBattleUI() {
    const bossBar = document.getElementById('bossHpBar');
    const bossTxt = document.getElementById('bossHpText');
    const playerBar = document.getElementById('playerHpBar');

    if (bossBar) {
      const pct = Math.max(0, (this.boss.hp / this.boss.maxHp) * 100);
      bossBar.style.width = `${pct}%`;
    }
    if (bossTxt) {
      bossTxt.textContent = `${Math.max(0, Math.round(this.boss.hp))} / ${this.boss.maxHp} HP`;
    }
    if (playerBar) {
      const pct = Math.max(0, (this.playerHp / this.playerMaxHp) * 100);
      playerBar.style.width = `${pct}%`;
    }
  }

  spawnDamagePopup(x, y, text, color = '#ef4444') {
    this.damagePopups.push({
      x,
      y,
      text,
      color,
      life: 0.85,
      maxLife: 0.85
    });
  }

  updateCamera() {
    const map = MAPS[this.currentMapId];
    if (map) {
      const targetCamX = this.player.x + this.player.w / 2 - this.viewWidth / 2;
      const targetCamY = this.player.y + this.player.h / 2 - this.viewHeight / 2;

      const maxX = Math.max(0, map.width - this.viewWidth);
      const maxY = Math.max(0, map.height - this.viewHeight);

      const clampedX = map.width < this.viewWidth ? -(this.viewWidth - map.width) / 2 : Math.max(0, Math.min(maxX, targetCamX));
      const clampedY = map.height < this.viewHeight ? -(this.viewHeight - map.height) / 2 : Math.max(0, Math.min(maxY, targetCamY));

      this.camera.x += (clampedX - this.camera.x) * 0.15;
      this.camera.y += (clampedY - this.camera.y) * 0.15;
    }
  }

  render() {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);

    const map = MAPS[this.currentMapId];
    if (!map) return;

    this.ctx.save();
    this.ctx.translate(-Math.round(this.camera.x), -Math.round(this.camera.y));

    // 1. Draw Map Background
    this.renderMapBackground(map);

    // 2. Draw Props
    this.renderProps(map);

    // 3. Draw Items
    this.renderItems(map);

    // 4. Draw NPCs
    this.renderNpcs(map);

    // 4b. Draw Boss Satpam ? if active
    if (this.currentMapId === 'glitch_courtyard' && (this.state === 'BATTLE' || this.bossBattleStarted)) {
      this.renderBoss();
    }

    // 4c. Draw Escape Portal if dimension is collapsing
    if (this.escapePortalActive) {
      this.renderEscapePortal();
    }

    // 4d. Draw Glitch Monster (???) during classroom timeout
    if (this.glitchMonster) {
      this.renderGlitchMonster();
    }

    // 5. Draw Player
    this.renderPlayer();

    // 5b. Draw Damage Popups
    this.renderDamagePopups();

    // 6. Draw Particles
    this.renderParticles();

    this.ctx.restore();

    // Screen Space Glitch Scanlines & Jitter
    if (this.isGlitching || (map && map.isGlitch)) {
      this.renderGlitchEffect();
    }

    // Screen Space Blackout
    if (this.blackout) {
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);
    }

    // 7. Screen Space HUD
    this.renderHUD();

    // 8. Screen Space Dialogue
    if (this.state === 'DIALOGUE') {
      this.renderDialogueBox();
    }

    // 9. Toast Notification
    if (this.toast) {
      this.renderToast();
    }
  }

  renderMapBackground(map) {
    if (map.bgType === 'tile_courtyard') {
      const isGlitch = !!map.isGlitch;

      // 1. Lush Green Grass or Corrupted Dimension Ground
      this.ctx.fillStyle = isGlitch ? '#12071f' : '#26573a';
      this.ctx.fillRect(0, 0, map.width, map.height);

      // Ground texture accents
      this.ctx.fillStyle = isGlitch ? '#1f0d35' : '#204b32';
      for (let x = 30; x < map.width; x += 120) {
        for (let y = 30; y < map.height; y += 120) {
          this.ctx.fillRect(x, y, 40, 20);
        }
      }

      // Glitch ground cracks & runes
      if (isGlitch) {
        this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        for (let gx = 100; gx < map.width; gx += 300) {
          this.ctx.moveTo(gx, 150);
          this.ctx.lineTo(gx + 80, 450);
          this.ctx.lineTo(gx + 40, 950);
          this.ctx.lineTo(gx + 120, 1500);
        }
        this.ctx.stroke();

        // Pulsing Dimensional Ritual Circle for the Artifact {(@&@(&!*@(@)
        const ritualX = 1680;
        const ritualY = 1280;
        const pulse = Math.sin(Date.now() / 250) * 6;
        this.ctx.save();
        this.ctx.strokeStyle = '#c084fc';
        this.ctx.lineWidth = 2.5;
        this.ctx.beginPath();
        this.ctx.arc(ritualX + 13, ritualY + 13, 40 + pulse, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.strokeStyle = '#e879f9';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(ritualX + 13, ritualY + 13, 24, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.fillStyle = 'rgba(168, 85, 247, 0.18)';
        this.ctx.fill();
        this.ctx.restore();
      }

      // 2. Central Grand Avenue & Connecting Crosswalks
      // Main central avenue from Gate (y: 90) to School Building (y: 1640)
      this.ctx.fillStyle = isGlitch ? '#261b3d' : '#64748b';
      this.ctx.fillRect(1200, 90, 200, map.height - 150);

      // West avenue branch (connecting to Sports Field & Maze Entrance)
      this.ctx.fillRect(100, 650, 1100, 100);

      // East avenue branch (connecting to Canteen & Warehouse)
      this.ctx.fillRect(1400, 440, 1050, 100);
      this.ctx.fillRect(1400, 1200, 520, 80);

      // Pathway stone border curbs
      this.ctx.strokeStyle = isGlitch ? '#7e22ce' : '#cbd5e1';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(1200, 90, 200, map.height - 150);
      this.ctx.strokeRect(100, 650, 1100, 100);
      this.ctx.strokeRect(1400, 440, 1050, 100);

      // 3. NORTHWEST AREA: LABIRIN SEMAK RIMBUN & ALKOF RAHASIA PEDANG (x: 80..1050, y: 80..650)
      // Labyrinth hedges (Green dense foliage in normal, dark violet thorny hedges in glitch)
      const hedgeColor = isGlitch ? '#1e1136' : '#14532d';
      const hedgeBorder = isGlitch ? '#a855f7' : '#22c55e';
      const drawHedge = (hx, hy, hw, hh) => {
        this.ctx.fillStyle = hedgeColor;
        this.ctx.fillRect(hx, hy, hw, hh);
        this.ctx.strokeStyle = hedgeBorder;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(hx, hy, hw, hh);
        // Leaf texture
        this.ctx.fillStyle = isGlitch ? '#3b0764' : '#166534';
        for (let px = hx + 4; px < hx + hw - 4; px += 16) {
          for (let py = hy + 4; py < hy + hh - 4; py += 16) {
            this.ctx.fillRect(px, py, 8, 8);
          }
        }
      };

      // Outer & Inner Hedge Maze Walls
      drawHedge(80, 80, 950, 35);
      drawHedge(80, 610, 750, 35);
      drawHedge(80, 80, 35, 540);
      drawHedge(220, 80, 35, 420);
      drawHedge(380, 200, 35, 420);
      drawHedge(540, 80, 35, 420);
      drawHedge(700, 200, 35, 420);

      // Hidden Sword Altar Grove (at dead-end corner x: 140, y: 160)
      this.ctx.save();
      this.ctx.fillStyle = isGlitch ? '#311054' : '#1e3a2b';
      this.ctx.fillRect(115, 120, 105, 110);
      this.ctx.strokeStyle = '#fbbf24';
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeRect(115, 120, 105, 110);
      // Stone Pedestal
      this.ctx.fillStyle = '#475569';
      this.ctx.fillRect(128, 148, 52, 52);
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.fillRect(132, 152, 44, 44);
      // Mystic Glow
      const swordGlow = Math.sin(Date.now() / 200) * 8 + 12;
      this.ctx.shadowColor = '#38bdf8';
      this.ctx.shadowBlur = swordGlow;
      this.ctx.fillStyle = '#38bdf8';
      this.ctx.font = 'bold 9px monospace';
      this.ctx.fillText('⚔️ ALKOF PEDANG', 120, 140);
      this.ctx.restore();

      // 4. SOUTHWEST AREA: LAPANGAN BASKET SMKN 1 KATAPANG (x: 180, y: 850, w: 640, h: 420)
      this.ctx.fillStyle = isGlitch ? '#16192e' : '#0f766e';
      this.ctx.fillRect(180, 850, 640, 420);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2.5;
      this.ctx.strokeRect(190, 860, 620, 400);
      // Center court line & circle
      this.ctx.beginPath();
      this.ctx.moveTo(500, 860);
      this.ctx.lineTo(500, 1260);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(500, 1060, 60, 0, Math.PI * 2);
      this.ctx.stroke();
      // Hoops
      this.ctx.fillStyle = '#cbd5e1';
      this.ctx.fillRect(190, 1045, 6, 30);
      this.ctx.strokeStyle = '#f97316';
      this.ctx.strokeRect(196, 1050, 16, 16);
      this.ctx.fillStyle = '#cbd5e1';
      this.ctx.fillRect(804, 1045, 6, 30);
      this.ctx.strokeStyle = '#f97316';
      this.ctx.strokeRect(788, 1050, 16, 16);
      // Court label
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      this.ctx.font = 'bold 12px monospace';
      this.ctx.fillText(isGlitch ? '🏀 LAPANGAN BASKET [ANOMALI]' : '🏀 LAPANGAN BASKET SMKN 1 KATAPANG', 320, 885);

      // Spectator Bleachers West
      this.ctx.fillStyle = isGlitch ? '#1e1b2e' : '#334155';
      this.ctx.fillRect(110, 950, 60, 240);
      this.ctx.strokeStyle = '#64748b';
      this.ctx.strokeRect(110, 950, 60, 240);

      // 5. EAST AREA: AREA KANTIN SMKN 1 KATAPANG (x: 1800, y: 320, w: 580, h: 450)
      this.ctx.fillStyle = isGlitch ? '#281c3b' : '#fef3c7';
      this.ctx.fillRect(1800, 320, 580, 450);
      this.ctx.strokeStyle = isGlitch ? '#3b2554' : '#fde68a';
      this.ctx.lineWidth = 2;
      for (let tx = 1800; tx < 2380; tx += 45) {
        this.ctx.beginPath();
        this.ctx.moveTo(tx, 320);
        this.ctx.lineTo(tx, 770);
        this.ctx.stroke();
      }
      for (let ty = 320; ty < 770; ty += 45) {
        this.ctx.beginPath();
        this.ctx.moveTo(1800, ty);
        this.ctx.lineTo(2380, ty);
        this.ctx.stroke();
      }

      // Kantin Stall Building
      this.ctx.fillStyle = isGlitch ? '#180c2b' : '#334155';
      this.ctx.fillRect(1800, 320, 580, 115);
      // Wooden counter
      this.ctx.fillStyle = isGlitch ? '#4c1d95' : '#92400e';
      this.ctx.fillRect(1820, 390, 540, 38);
      // Striped Awning Canopy
      const awningW = 580 / 12;
      for (let i = 0; i < 12; i++) {
        this.ctx.fillStyle = isGlitch
          ? (i % 2 === 0 ? '#581c87' : '#1e1b4b')
          : (i % 2 === 0 ? '#dc2626' : '#f8fafc');
        this.ctx.fillRect(1800 + i * awningW, 308, awningW, 20);
      }
      // Kantin Signboard
      this.ctx.fillStyle = '#0f172a';
      this.ctx.fillRect(1940, 335, 300, 28);
      this.ctx.strokeStyle = isGlitch ? '#a855f7' : '#facc15';
      this.ctx.strokeRect(1940, 335, 300, 28);
      this.ctx.fillStyle = isGlitch ? '#e879f9' : '#facc15';
      this.ctx.font = 'bold 12px sans-serif';
      this.ctx.fillText(isGlitch ? '🍴 KANTIN SEHAT [TERKUTUK] 🍴' : '🍴 KANTIN SMKN 1 KATAPANG 🍴', 1970, 353);

      // Canteen Tables & Parasols
      const drawCanteenTable = (tx, ty) => {
        this.ctx.fillStyle = isGlitch ? '#311042' : '#78350f';
        this.ctx.fillRect(tx, ty, 140, 50);
        this.ctx.fillStyle = isGlitch ? '#581c87' : '#a16207';
        this.ctx.fillRect(tx + 4, ty + 4, 132, 42);
        // Parasol
        this.ctx.fillStyle = isGlitch ? '#9333ea' : '#0284c7';
        this.ctx.beginPath();
        this.ctx.arc(tx + 70, ty + 16, 42, Math.PI, 0, false);
        this.ctx.fill();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(tx + 68, ty + 16, 4, 32);
      };
      drawCanteenTable(1820, 520);
      drawCanteenTable(2060, 520);
      drawCanteenTable(2280, 520);

      // 6. SOUTHEAST AREA: GUDANG ARSIP & BENGKEL SEKOLAH (x: 1920, y: 1160, w: 380, h: 140)
      this.ctx.fillStyle = isGlitch ? '#1f132e' : '#475569';
      this.ctx.fillRect(1920, 1160, 380, 135);
      this.ctx.strokeStyle = '#334155';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(1920, 1160, 380, 135);
      // Warehouse Iron Door
      this.ctx.fillStyle = isGlitch ? '#3b0764' : '#1e293b';
      this.ctx.fillRect(2050, 1210, 120, 85);
      this.ctx.fillStyle = '#e2e8f0';
      this.ctx.font = 'bold 11px monospace';
      this.ctx.fillText(isGlitch ? '🏚️ GUDANG TERTINGGAL' : '📦 GUDANG ARSIP', 1980, 1190);

      // Wooden Crates stacked near warehouse
      this.ctx.fillStyle = '#854d0e';
      this.ctx.fillRect(2380, 1360, 50, 50);
      this.ctx.fillRect(2330, 1380, 45, 45);
      this.ctx.fillRect(2385, 1420, 50, 50);

      // 7. NORTHEAST AREA: GAZEBO SANTAI (x: 2280, y: 120, w: 140, h: 100)
      this.ctx.fillStyle = isGlitch ? '#2e1065' : '#78350f';
      this.ctx.fillRect(2280, 120, 140, 95);
      this.ctx.fillStyle = isGlitch ? '#581c87' : '#92400e';
      this.ctx.fillRect(2290, 130, 120, 75);
      this.ctx.fillStyle = '#fde047';
      this.ctx.font = 'bold 10px monospace';
      this.ctx.fillText('GAZEBO', 2325, 170);

      // 8. TOP AREA: PINTU GERBANG UTAMA (x: 1200..1400, y: 0..90)
      // Perimeter Boundary Wall along full map.width
      this.ctx.fillStyle = isGlitch ? '#0f051d' : '#1e293b';
      this.ctx.fillRect(0, 0, map.width, 90);
      this.ctx.strokeStyle = isGlitch ? '#4c1d95' : '#334155';
      this.ctx.lineWidth = 1;
      for (let by = 10; by < 90; by += 15) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, by);
        this.ctx.lineTo(map.width, by);
        this.ctx.stroke();
      }

      // Gate Pillars (Left & Right)
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.fillRect(1190, 15, 30, 80);
      this.ctx.fillRect(1380, 15, 30, 80);
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.fillRect(1185, 10, 40, 10);
      this.ctx.fillRect(1375, 10, 40, 10);

      // Arch School Title Signboard
      this.ctx.fillStyle = '#0f172a';
      this.ctx.fillRect(1160, 12, 280, 28);
      this.ctx.strokeStyle = isGlitch ? '#a855f7' : '#fbbf24';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(1160, 12, 280, 28);
      this.ctx.fillStyle = isGlitch ? '#e879f9' : '#fbbf24';
      this.ctx.font = 'bold 12px monospace';
      this.ctx.fillText(isGlitch ? 'S̶M̶K̶N̶ ̶1̶ ̶K̶A̶T̶A̶P̶A̶N̶G̶ [ANOMALI]' : 'SMKN 1 KATAPANG', 1215, 31);

      // Steel Gate Bars
      this.ctx.fillStyle = '#334155';
      this.ctx.fillRect(1220, 40, 160, 50);
      this.ctx.strokeStyle = '#94a3b8';
      this.ctx.lineWidth = 3;
      for (let gx = 1225; gx < 1380; gx += 16) {
        this.ctx.beginPath();
        this.ctx.moveTo(gx, 40);
        this.ctx.lineTo(gx, 90);
        this.ctx.stroke();
      }

      // Big Padlock
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.beginPath();
      this.ctx.arc(1300, 65, 10, 0, Math.PI * 2);
      this.ctx.fill();

      // Pos Satpam Building next to Gate (x: 1440, y: 80, w: 160, h: 95)
      this.ctx.fillStyle = isGlitch ? '#2e1065' : '#334155';
      this.ctx.fillRect(1440, 80, 160, 95);
      this.ctx.strokeStyle = '#64748b';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(1440, 80, 160, 95);
      // Window
      this.ctx.fillStyle = isGlitch ? '#7e22ce' : '#38bdf8';
      this.ctx.fillRect(1460, 105, 50, 40);
      // Signboard
      this.ctx.fillStyle = '#0f172a';
      this.ctx.fillRect(1450, 85, 140, 16);
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.font = 'bold 9px monospace';
      this.ctx.fillText(isGlitch ? 'POS SATPAM ?' : 'POS SATPAM UTAMA', 1465, 97);

      // 9. BOTTOM AREA: GEDUNG UTAMA SEKOLAH (y: 1640..1700)
      this.ctx.fillStyle = isGlitch ? '#090314' : '#0f172a';
      this.ctx.fillRect(0, 1640, map.width, 60);
      this.ctx.fillStyle = isGlitch ? '#3b0764' : '#1e293b';
      this.ctx.fillRect(0, 1640, map.width, 8);

      this.ctx.fillStyle = '#38bdf8';
      this.ctx.font = 'bold 12px monospace';
      this.ctx.fillText('GEDUNG UTAMA & RUANG KELAS SMKN 1 KATAPANG', 1060, 1630);

    } else if (map.bgType === 'hallway_scenery') {
      // Floor
      this.ctx.fillStyle = '#334155';
      this.ctx.fillRect(0, 0, map.width, map.height);

      // Wall banner backdrop
      const bannerImg = sprites.get('bg_hallway');
      if (bannerImg) {
        this.ctx.drawImage(bannerImg, 0, 0, map.width, 180);
      } else {
        this.ctx.fillStyle = '#0f172a';
        this.ctx.fillRect(0, 0, map.width, 140);
      }

    } else if (map.bgType === 'classroom_full') {
      const classImg = sprites.get('bg_classroom');
      if (classImg) {
        this.ctx.drawImage(classImg, 0, 0, map.width, map.height);
      } else {
        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(0, 0, map.width, map.height);
      }

    } else if (map.bgType === 'tile_lab') {
      this.ctx.fillStyle = '#090d16';
      this.ctx.fillRect(0, 0, map.width, map.height);

      this.ctx.fillStyle = '#0284c7';
      this.ctx.font = '12px monospace';
      this.ctx.fillText('LABORATORIUM RPL & CLOUD DATA CENTER', 310, 45);
    }

    // Render Doors
    for (const door of map.doors) {
      this.ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      this.ctx.fillRect(door.x, door.y, door.w, door.h);
      this.ctx.strokeStyle = '#38bdf8';
      this.ctx.strokeRect(door.x, door.y, door.w, door.h);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 10px monospace';
      this.ctx.fillText(door.label ? door.label : '▼ PINTU', door.x + 8, door.y + door.h / 2 + 4);
    }
  }

  renderProps(map) {
    for (const prop of map.props) {
      if (prop.type === 'flagpole') {
        // Pedestal base
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.fillRect(prop.x - 8, prop.y + prop.h - 10, 36, 10);
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.fillRect(prop.x - 4, prop.y + prop.h - 18, 28, 8);
        // Aluminum Pole
        this.ctx.fillStyle = '#cbd5e1';
        this.ctx.fillRect(prop.x + 8, prop.y - 25, 4, prop.h + 8);
        // Gold finial top
        this.ctx.fillStyle = '#fbbf24';
        this.ctx.beginPath();
        this.ctx.arc(prop.x + 10, prop.y - 25, 4, 0, Math.PI * 2);
        this.ctx.fill();
        // Indonesian Red & White Flag waving
        const wave = Math.sin(Date.now() / 250) * 3;
        this.ctx.fillStyle = '#dc2626'; // Merah
        this.ctx.fillRect(prop.x + 12, prop.y - 23 + wave, 26, 9);
        this.ctx.fillStyle = '#ffffff'; // Putih
        this.ctx.fillRect(prop.x + 12, prop.y - 14 + wave, 26, 9);

      } else if (prop.type === 'booth') {
        // Exhibition Booth
        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(prop.x, prop.y, prop.w, prop.h);
        this.ctx.strokeStyle = '#38bdf8';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(prop.x, prop.y, prop.w, prop.h);

        // Canopy roof
        this.ctx.fillStyle = '#0284c7';
        this.ctx.fillRect(prop.x - 4, prop.y - 10, prop.w + 8, 12);

        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.font = '9px sans-serif';
        this.ctx.fillText(prop.label, prop.x + 6, prop.y + 25);

        // Laptop / monitor on booth
        this.ctx.fillStyle = '#64748b';
        this.ctx.fillRect(prop.x + prop.w / 2 - 12, prop.y + 32, 24, 16);
        this.ctx.fillStyle = '#38bdf8';
        this.ctx.fillRect(prop.x + prop.w / 2 - 10, prop.y + 34, 20, 10);

      } else if (prop.type === 'building') {
        // Security booth
        this.ctx.fillStyle = '#334155';
        this.ctx.fillRect(prop.x, prop.y, prop.w, prop.h);
        this.ctx.fillStyle = '#0f172a';
        this.ctx.fillRect(prop.x + 20, prop.y + 30, 40, 40); // window
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '10px monospace';
        this.ctx.fillText('POS SATPAM', prop.x + 30, prop.y + 20);

      } else if (prop.type === 'tree') {
        // Trees
        this.ctx.fillStyle = '#78350f';
        this.ctx.fillRect(prop.x + prop.w / 2 - 6, prop.y + prop.h - 20, 12, 20);
        this.ctx.fillStyle = '#15803d';
        this.ctx.beginPath();
        this.ctx.arc(prop.x + prop.w / 2, prop.y + prop.h / 2 - 8, prop.w / 2, 0, Math.PI * 2);
        this.ctx.fill();

      } else if (prop.type === 'server') {
        // Server racks with blinking LEDs
        this.ctx.fillStyle = '#111827';
        this.ctx.fillRect(prop.x, prop.y, prop.w, prop.h);
        this.ctx.strokeStyle = '#0284c7';
        this.ctx.strokeRect(prop.x, prop.y, prop.w, prop.h);

        // Blinking LEDs
        const blink = Math.floor(Date.now() / 300) % 2 === 0;
        this.ctx.fillStyle = blink ? '#22c55e' : '#0ea5e9';
        this.ctx.fillRect(prop.x + 10, prop.y + 15, 6, 6);
        this.ctx.fillRect(prop.x + 22, prop.y + 15, 6, 6);
        this.ctx.fillStyle = !blink ? '#f59e0b' : '#38bdf8';
        this.ctx.fillRect(prop.x + 34, prop.y + 15, 6, 6);

        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '8px monospace';
        this.ctx.fillText(prop.label, prop.x + 6, prop.y + 40);
      }
    }
  }

  renderItems(map) {
    for (const item of map.items) {
      if (!item.collected) {
        const isBook = item.id.startsWith('glitch_buku_');
        const isSword = item.id === 'pedang_semak';
        const isArtifact = item.id === 'glitch_artefak';

        // Pulsing glow
        const glow = Math.sin(Date.now() / 200) * 4 + 8;
        this.ctx.save();
        if (isBook) {
          this.ctx.shadowColor = '#c084fc';
          this.ctx.fillStyle = '#9333ea';
        } else if (isSword) {
          this.ctx.shadowColor = '#38bdf8';
          this.ctx.fillStyle = '#0284c7';
        } else if (isArtifact) {
          this.ctx.shadowColor = '#e879f9';
          this.ctx.fillStyle = '#d946ef';
        } else {
          this.ctx.shadowColor = '#f59e0b';
          this.ctx.fillStyle = '#fbbf24';
        }
        this.ctx.shadowBlur = glow;
        this.ctx.fillRect(item.x - 2, item.y - 2, item.w + 4, item.h + 4);
        this.ctx.restore();

        this.ctx.font = '16px sans-serif';
        this.ctx.fillText(item.icon, item.x + 2, item.y + 18);

        // Floating indicator (hidden during cutscene/dialogue)
        if (!this.isCutsceneActive && this.state !== 'DIALOGUE') {
          this.ctx.fillStyle = '#ffffff';
          this.ctx.font = 'bold 9px monospace';
          if (isBook) {
            this.ctx.fillStyle = '#e9d5ff';
            this.ctx.fillText('[E] Buka Soal (5/5)', item.x - 24, item.y - 6);
          } else if (isSword) {
            this.ctx.fillStyle = '#bae6fd';
            this.ctx.fillText('[E] Ambil Pedang', item.x - 20, item.y - 6);
          } else {
            this.ctx.fillText('[E] Ambil', item.x - 8, item.y - 6);
          }
        }
      }
    }
  }

  renderNpcs(map) {
    for (const npc of map.npcs) {
      // Re-created natural contact shadow specifically for NPCs:
      // Snugly positioned at the actual sole of feet (y + h * 0.94)
      const npcCenterX = npc.x + npc.w / 2;
      const npcFootY = npc.y + npc.h * 0.94;

      // Soft ambient ground shadow
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      this.ctx.beginPath();
      this.ctx.ellipse(npcCenterX, npcFootY, 21, 6.5, 0, 0, Math.PI * 2);
      this.ctx.fill();

      // Deep contact core shadow right under the shoes
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      this.ctx.beginPath();
      this.ctx.ellipse(npcCenterX, npcFootY, 14, 3.5, 0, 0, Math.PI * 2);
      this.ctx.fill();

      // Sprite
      let sprite = null;
      if (npc.spriteName === 'satpam') {
        const frame = Math.floor(Date.now() / 250) % 8;
        sprite = sprites.get(`satpam_${frame}`) || sprites.get('satpam_0');
      } else if (npc.spriteName === 'teacher') {
        const frame = Math.floor(Date.now() / 350) % 4;
        sprite = sprites.get(`teacher_${frame}`) || sprites.get('teacher_portrait');
      } else if (npc.spriteName === 'rian') {
        const frame = Math.floor(Date.now() / 350) % 4;
        sprite = sprites.get(`rian_${frame}`) || sprites.get('rian_portrait');
      } else if (npc.spriteName === 'siti') {
        const frame = Math.floor(Date.now() / 350) % 4;
        sprite = sprites.get(`siti_${frame}`) || sprites.get('siti_portrait');
      }

      if (sprite && ((sprite.naturalWidth && sprite.naturalWidth > 0) || (sprite.width && sprite.width > 0))) {
        this.ctx.drawImage(sprite, npc.x, npc.y, npc.w, npc.h);
      } else {
        this.ctx.fillStyle = '#38bdf8';
        this.ctx.fillRect(npc.x, npc.y, npc.w, npc.h);
      }

      // Name & Role Tag with Clean Black Outline
      this.ctx.font = 'bold 11px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.lineJoin = 'round';
      this.ctx.miterLimit = 2;
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 3;
      this.ctx.strokeText(npc.name, npc.x + npc.w / 2, npc.y - 6);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText(npc.name, npc.x + npc.w / 2, npc.y - 6);
      this.ctx.textAlign = 'start';

      // Quest attention beacon on Pak Satpam when called
      if (this.satpamShoutTriggered && !this.talkedToSatpam && npc.id === 'satpam') {
        const bounce = Math.sin(Date.now() / 150) * 3;
        this.ctx.fillStyle = '#ef4444';
        this.ctx.font = 'bold 15px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('❗', npc.x + npc.w / 2, npc.y - 22 + bounce);
        this.ctx.fillStyle = '#fbbf24';
        this.ctx.font = 'bold 10px monospace';
        this.ctx.fillText('[E] Bicara dengan Bapa', npc.x + npc.w / 2, npc.y - 9 + bounce);
        this.ctx.textAlign = 'start';
      }

      // Check distance for interaction prompt (hidden during cutscene/dialogue)
      if (!this.isCutsceneActive && this.state !== 'DIALOGUE') {
        const dist = Math.hypot((this.player.x + this.player.w / 2) - (npc.x + npc.w / 2), (this.player.y + this.player.h / 2) - (npc.y + npc.h / 2));
        if (dist <= Math.max(npc.interactionRadius + 50, 110) && this.hasLineOfSight(this.player, npc)) {
          this.ctx.fillStyle = '#fbbf24';
          this.ctx.font = '10px monospace';
          this.ctx.textAlign = 'center';
          this.ctx.fillText('[E] Bicara', npc.x + npc.w / 2, npc.y - 18);
          this.ctx.textAlign = 'start';
        }
      }
    }
  }

  renderPlayer() {
    const p = this.player;

    // Grounded shadow snugly aligned beneath feet
    const shadowY = (p.gender === 'boy' && (p.facing === 'left' || p.facing === 'right'))
      ? p.y + p.h * 0.86
      : p.y + p.h * 0.805;

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    this.ctx.beginPath();
    this.ctx.ellipse(p.x + p.w / 2, shadowY, 20, 6.5, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Sprite selection based on gender & facing
    let spriteKey = '';
    if (p.gender === 'boy') {
      if (p.isSitting) {
        spriteKey = 'boy_down_0';
      } else if (p.facing === 'down') {
        spriteKey = `boy_down_${p.isMoving ? p.animFrame : 0}`;
      } else if (p.facing === 'up') {
        spriteKey = `boy_up_${p.isMoving ? (p.animFrame % 5) : 0}`;
      } else if (p.facing === 'right') {
        spriteKey = 'boy_down_0';
      } else if (p.facing === 'left') {
        spriteKey = 'boy_down_0';
      }
    } else {
      // Wintel (Girl) - Sequence animation from 00 to 18 (19 frames)
      if (p.isSitting) {
        spriteKey = 'girl_idle_0';
      } else {
        const frameSpeed = p.isMoving ? 75 : 95;
        const frame = Math.floor(Date.now() / frameSpeed) % 19;
        spriteKey = `girl_idle_${frame}`;
      }
    }

    const sprite = sprites.get(spriteKey) || (p.gender === 'boy' ? sprites.get('boy_down_0') : sprites.get('girl_idle_0'));
    if (sprite && sprite.complete && sprite.naturalWidth > 0) {
      const bounce = (p.isMoving && p.gender === 'girl') ? Math.sin(Date.now() / 80) * 1.5 : 0;
      const sittingYOffset = p.isSitting ? 3 : 0;
      if (p.gender === 'girl' && p.facing === 'left') {
        this.ctx.save();
        this.ctx.translate(p.x + p.w, p.y + bounce + sittingYOffset);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(sprite, 0, 0, p.w, p.h);
        this.ctx.restore();
      } else {
        this.ctx.drawImage(sprite, p.x, p.y + bounce + sittingYOffset, p.w, p.h);
      }
    } else {
      this.ctx.fillStyle = p.gender === 'boy' ? '#3b82f6' : '#ec4899';
      this.ctx.fillRect(p.x, p.y, p.w, p.h);
    }

    // Render Equipped Sword & Slash Attack
    if (this.hasSword) {
      const handX = p.facing === 'left' ? p.x + 18 : p.x + p.w - 18;
      const handY = p.y + p.h * 0.62;

      // Draw shiny sword in hand
      this.ctx.save();
      this.ctx.translate(handX, handY);
      const angle = this.isAttacking
        ? (p.facing === 'left' ? -Math.PI / 1.4 : Math.PI / 1.4)
        : (p.facing === 'left' ? -Math.PI / 4 : Math.PI / 4);
      this.ctx.rotate(angle);

      // Blade
      this.ctx.fillStyle = '#e2e8f0';
      this.ctx.fillRect(-2, -26, 4, 26);
      this.ctx.fillStyle = '#38bdf8'; // Glowing edge
      this.ctx.fillRect(0, -26, 2, 26);
      // Crossguard & hilt
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.fillRect(-6, 0, 12, 3);
      this.ctx.fillStyle = '#78350f';
      this.ctx.fillRect(-2, 3, 4, 8);
      this.ctx.restore();

      // Draw Sword Slash Arc when attacking
      if (this.isAttacking) {
        this.ctx.save();
        this.ctx.beginPath();
        const slashRadius = 45;
        const centerX = p.x + p.w / 2 + (p.facing === 'left' ? -35 : (p.facing === 'right' ? 35 : 0));
        const centerY = p.y + p.h / 2 + (p.facing === 'up' ? -35 : (p.facing === 'down' ? 25 : 0));
        this.ctx.arc(centerX, centerY, slashRadius, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    // Player name overhead
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 11px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(p.name, p.x + p.w / 2, p.y - 6);
    this.ctx.textAlign = 'start';
  }

  renderBoss() {
    if (!this.boss || this.boss.hp <= 0) return;
    const b = this.boss;

    // Glitch shadow
    this.ctx.fillStyle = 'rgba(147, 51, 234, 0.4)';
    this.ctx.beginPath();
    this.ctx.ellipse(b.x + b.w / 2, b.y + b.h * 0.85, 24, 8, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Glitch jitter offset
    const jitterX = (Math.random() - 0.5) * 6;
    const jitterY = (Math.random() - 0.5) * 4;

    // Boss Sprite (Satpam with glitching purple aura)
    const frame = Math.floor(Date.now() / 200) % 8;
    const sprite = sprites.get(`satpam_${frame}`) || sprites.get('satpam_0');
    if (sprite && ((sprite.naturalWidth && sprite.naturalWidth > 0) || (sprite.width && sprite.width > 0))) {
      this.ctx.save();
      if (b.flashTimer > 0) {
        this.ctx.filter = 'brightness(2) drop-shadow(0 0 10px #f43f5e)';
      } else {
        this.ctx.filter = 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.85)) hue-rotate(240deg)';
      }
      this.ctx.drawImage(sprite, b.x + jitterX, b.y + jitterY, b.w, b.h);
      this.ctx.restore();
    } else {
      this.ctx.fillStyle = '#9333ea';
      this.ctx.fillRect(b.x, b.y, b.w, b.h);
    }

    // Overhead Boss Name & Mini Bar
    this.ctx.fillStyle = '#e879f9';
    this.ctx.font = 'bold 11px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('⚡ Satpam ? [GLITCH] ⚡', b.x + b.w / 2, b.y - 12);

    // Mini HP bar
    const barW = 60;
    const barH = 5;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    this.ctx.fillRect(b.x + b.w / 2 - barW / 2, b.y - 8, barW, barH);
    this.ctx.fillStyle = '#a855f7';
    this.ctx.fillRect(b.x + b.w / 2 - barW / 2, b.y - 8, barW * (Math.max(0, b.hp) / b.maxHp), barH);
    this.ctx.textAlign = 'start';

    // Render Boss Projectiles
    for (const p of this.bossProjectiles) {
      this.ctx.save();
      this.ctx.fillStyle = '#d946ef';
      this.ctx.shadowColor = '#a855f7';
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  renderGlitchMonster() {
    const gm = this.glitchMonster;
    if (!gm) return;
    const sprite = sprites.get(`shadow_glitch_${gm.frame || 0}`) || sprites.get('shadow_glitch_0');

    this.ctx.save();
    // Menacing red/purple shadow aura
    this.ctx.shadowColor = '#dc2626';
    this.ctx.shadowBlur = 20;

    // Draw jittering shadow glitch sprite
    const jitterX = (Math.random() - 0.5) * 4;
    const jitterY = (Math.random() - 0.5) * 3;

    if (sprite && ((sprite.naturalWidth && sprite.naturalWidth > 0) || (sprite.width && sprite.width > 0))) {
      this.ctx.drawImage(sprite, gm.x + jitterX, gm.y + jitterY, gm.w, gm.h);
    } else {
      this.ctx.fillStyle = '#050508';
      this.ctx.fillRect(gm.x, gm.y, gm.w, gm.h);
    }

    // Overhead Glitch Name Tag: "???"
    this.ctx.fillStyle = '#ef4444';
    this.ctx.font = 'bold 12px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('???', gm.x + gm.w / 2, gm.y - 8);
    this.ctx.textAlign = 'start';
    this.ctx.restore();
  }

  renderEscapePortal() {
    const px = 1300;
    const py = 100;
    const time = Date.now() / 300;

    this.ctx.save();
    this.ctx.translate(px, py);

    // Pulsing outer vortex
    const outerR = 36 + Math.sin(time) * 4;
    const grad = this.ctx.createRadialGradient(0, 0, 5, 0, 0, outerR);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#38bdf8');
    grad.addColorStop(1, 'rgba(168, 85, 247, 0)');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, outerR, 0, Math.PI * 2);
    this.ctx.fill();

    // Rotating celestial ring
    this.ctx.rotate(time * 0.8);
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, outerR * 0.7, 0, Math.PI * 1.5);
    this.ctx.stroke();

    this.ctx.restore();

    // Portal Prompt
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 11px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🌀 PORTAL KELUAR DIMENSI', px, py - 42);
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.font = 'bold 9px monospace';
    this.ctx.fillText('[MASUK KE SINI]', px, py - 30);
    this.ctx.textAlign = 'start';
  }

  renderDamagePopups() {
    for (const dp of this.damagePopups) {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, dp.life / dp.maxLife);
      this.ctx.fillStyle = dp.color;
      this.ctx.font = 'bold 14px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(dp.text, dp.x, dp.y);
      this.ctx.restore();
    }
  }

  renderGlitchEffect() {
    // Subtle CRT scanlines & chromatic flicker
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
    this.ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);

    // Scanlines
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let y = 0; y < this.viewHeight; y += 4) {
      this.ctx.fillRect(0, y, this.viewWidth, 1.5);
    }

    // Occasional horizontal glitch tear
    if (Math.random() < 0.3) {
      const tearY = Math.random() * this.viewHeight;
      const tearH = 2 + Math.random() * 8;
      this.ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      this.ctx.fillRect(0, tearY, this.viewWidth, tearH);
    }
    this.ctx.restore();
  }

  renderParticles() {
    for (const p of this.particles) {
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.life / p.maxLife;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1.0;
  }

  renderHUD() {
    if (this.blackout) return;
    // Desktop Controls Hint (Tanpa Tas & Peta yang sedang dihapus sementara)
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.font = '9px monospace';
    this.ctx.fillText('[WASD/Panah] Jalan  [Shift] Lari  [E/Spasi] Interaksi  [Esc/Menu] Pengaturan', 16, this.viewHeight - 12);
  }

  renderDialogueBox() {
    const d = this.dialogue;
    if (!d.currentLine) return;

    this.ctx.save();
    if (d.alpha !== undefined) {
      this.ctx.globalAlpha = Math.max(0, Math.min(1, d.alpha));
    }

    const slideX = d.slideX || 0;
    const boxW = Math.min(this.viewWidth - 32, 780);
    const boxH = 138;
    const boxX = Math.round((this.viewWidth - boxW) / 2) + slideX;
    const boxY = this.viewHeight - boxH - 12;

    // Stylized RPG Dialogue Box Background
    const bgGrad = this.ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
    bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.97)');
    bgGrad.addColorStop(1, 'rgba(2, 6, 23, 0.98)');
    this.ctx.fillStyle = bgGrad;

    // Outer glow & shadow
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    this.ctx.shadowBlur = 14;
    this.drawRoundedRect(boxX, boxY, boxW, boxH, 12);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Sleek border frame
    const isGlitch = this.isGlitching || (this.currentMapId && this.currentMapId.includes('glitch'));
    const borderCol = isGlitch ? '#c084fc' : '#38bdf8';
    this.ctx.strokeStyle = borderCol;
    this.ctx.lineWidth = 2.5;
    this.ctx.stroke();

    // Inner subtle highlight border
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    this.ctx.lineWidth = 1;
    this.drawRoundedRect(boxX + 3, boxY + 3, boxW - 6, boxH - 6, 10);
    this.ctx.stroke();

    // Corner decorative bracket accents
    const bLen = 14;
    this.ctx.strokeStyle = isGlitch ? '#f43f5e' : '#fbbf24';
    this.ctx.lineWidth = 3;
    // Top-left
    this.ctx.beginPath();
    this.ctx.moveTo(boxX + 16, boxY);
    this.ctx.lineTo(boxX + 4, boxY);
    this.ctx.lineTo(boxX, boxY + 4);
    this.ctx.lineTo(boxX, boxY + 16);
    this.ctx.stroke();
    // Top-right
    this.ctx.beginPath();
    this.ctx.moveTo(boxX + boxW - 16, boxY);
    this.ctx.lineTo(boxX + boxW - 4, boxY);
    this.ctx.lineTo(boxX + boxW, boxY + 4);
    this.ctx.lineTo(boxX + boxW, boxY + 16);
    this.ctx.stroke();
    // Bottom-left
    this.ctx.beginPath();
    this.ctx.moveTo(boxX, boxY + boxH - 16);
    this.ctx.lineTo(boxX, boxY + boxH - 4);
    this.ctx.lineTo(boxX + 4, boxY + boxH);
    this.ctx.lineTo(boxX + 16, boxY + boxH);
    this.ctx.stroke();
    // Bottom-right
    this.ctx.beginPath();
    this.ctx.moveTo(boxX + boxW - 16, boxY + boxH);
    this.ctx.lineTo(boxX + boxW - 4, boxY + boxH);
    this.ctx.lineTo(boxX + boxW, boxY + boxH - 4);
    this.ctx.lineTo(boxX + boxW, boxY + boxH - 16);
    this.ctx.stroke();

    // Speaker Portrait Frame
    const portrait = sprites.get(d.currentLine.portrait);
    const portSize = 96;
    const portX = boxX + 16;
    const portY = boxY + 20;

    // Portrait backdrop
    this.ctx.fillStyle = '#090d16';
    this.drawRoundedRect(portX, portY, portSize, portSize, 8);
    this.ctx.fill();

    // Draw Portrait image (sharp pixel art)
    if (portrait && ((portrait.naturalWidth && portrait.naturalWidth > 0) || (portrait.width && portrait.width > 0))) {
      this.ctx.save();
      this.ctx.imageSmoothingEnabled = false;
      this.drawRoundedRect(portX + 2, portY + 2, portSize - 4, portSize - 4, 6);
      this.ctx.clip();
      this.ctx.drawImage(portrait, portX, portY, portSize, portSize);
      this.ctx.restore();
    }

    // Portrait border
    this.ctx.strokeStyle = isGlitch ? '#a855f7' : '#0284c7';
    this.ctx.lineWidth = 2;
    this.drawRoundedRect(portX, portY, portSize, portSize, 8);
    this.ctx.stroke();

    // Text Area Positioning
    const textX = portX + portSize + 18;
    const textW = boxW - portSize - 50;

    // Speaker Name Tag Badge
    const speakerName = (d.currentLine.speaker || '').toUpperCase();
    this.ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const nameWidth = this.ctx.measureText(speakerName).width;
    const nameBadgeW = Math.max(80, nameWidth + 24);
    const nameBadgeH = 22;
    const nameBadgeX = textX;
    const nameBadgeY = boxY + 16;

    // Badge Background
    this.ctx.fillStyle = isGlitch ? 'rgba(88, 28, 135, 0.75)' : 'rgba(2, 132, 199, 0.6)';
    this.drawRoundedRect(nameBadgeX, nameBadgeY, nameBadgeW, nameBadgeH, 5);
    this.ctx.fill();
    this.ctx.strokeStyle = borderCol;
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    // Speaker Name Text with Black Outline
    this.ctx.lineJoin = 'round';
    this.ctx.miterLimit = 2;
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 3;
    this.ctx.strokeText(speakerName, nameBadgeX + 12, nameBadgeY + 16);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(speakerName, nameBadgeX + 12, nameBadgeY + 16);

    // Typewriter Text (with Black Outline and Larger Font)
    const visibleText = d.currentLine.text.substring(0, d.textProgress);
    const textStartY = boxY + 62;
    const lineHeight = 22;
    this.ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    this.wrapText(visibleText, textX, textStartY, textW, lineHeight);

    // Prompt icon when done
    if (d.finishedTyping) {
      const blink = Math.floor(Date.now() / 350) % 2 === 0;
      if (blink) {
        const promptTxt = '▼ [Spasi / Sentuh untuk Lanjut]';
        this.ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const pWidth = this.ctx.measureText(promptTxt).width;
        const pX = boxX + boxW - pWidth - 20;
        const pY = boxY + boxH - 12;

        this.ctx.lineJoin = 'round';
        this.ctx.miterLimit = 2;
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(promptTxt, pX, pY);
        this.ctx.fillStyle = '#fbbf24';
        this.ctx.fillText(promptTxt, pX, pY);
      }
    }

    this.ctx.restore();
  }

  drawRoundedRect(x, y, w, h, r) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + r, y);
    this.ctx.arcTo(x + w, y, x + w, y + h, r);
    this.ctx.arcTo(x + w, y + h, x, y + h, r);
    this.ctx.arcTo(x, y + h, x, y, r);
    this.ctx.arcTo(x, y, x + w, y, r);
    this.ctx.closePath();
  }

  renderToast() {
    const t = this.toast;
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    this.ctx.strokeStyle = '#fbbf24';
    this.ctx.lineWidth = 1;

    const w = 440;
    const h = 34;
    const x = (this.viewWidth - w) / 2;
    const y = 54;

    this.ctx.fillRect(x, y, w, h);
    this.ctx.strokeRect(x, y, w, h);

    this.ctx.fillStyle = '#fef08a';
    this.ctx.font = '11px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(t.text, x + w / 2, y + 21);
    this.ctx.restore();
  }

  wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currY = y;

    this.ctx.save();
    this.ctx.lineJoin = 'round';
    this.ctx.miterLimit = 2;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = this.ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        // Black outline stroke first
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3.5;
        this.ctx.strokeText(line, x, currY);
        // Pure white fill
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(line, x, currY);

        line = words[n] + ' ';
        currY += lineHeight;
      } else {
        line = testLine;
      }
    }
    // Final line
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 3.5;
    this.ctx.strokeText(line, x, currY);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(line, x, currY);

    this.ctx.restore();
  }

  gameLoop(currentTime) {
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

export const game = new GameEngine();
window.game = game;
