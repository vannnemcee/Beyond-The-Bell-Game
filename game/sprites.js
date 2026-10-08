// Beyond The Bell - Sprite & Asset Preloader
import { generateSatpamSprites } from './satpam_sprite.js';
import { generateCharacterSprites } from './character_sprites.js';

class SpriteManager {
  constructor() {
    this.images = new Map();
    this.loadedCount = 0;
    this.totalCount = 0;
    this.isReady = false;

    // Generate authentic Indonesian Satpam and custom characters (Bu Rina, Rian, Siti) immediately
    try {
      generateSatpamSprites(this);
      generateCharacterSprites(this);
    } catch (e) {
      console.warn('Could not generate custom sprites immediately:', e);
    }
  }

  loadImage(name, src) {
    if (this.images.has(name)) return this.images.get(name);
    this.totalCount++;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.loadedCount++;
      if (this.loadedCount >= this.totalCount) {
        this.isReady = true;
      }
    };
    img.onerror = () => {
      console.warn('Failed to load sprite:', src);
      this.loadedCount++;
      if (this.loadedCount >= this.totalCount) {
        this.isReady = true;
      }
    };
    this.images.set(name, img);
    return img;
  }

  get(name) {
    return this.images.get(name) || null;
  }

  preloadAll(onProgress, onComplete) {
    if (this.isReady) {
      if (onProgress) onProgress(this.totalAssetsCount || 50, this.totalAssetsCount || 50);
      if (onComplete) onComplete();
      return;
    }

    if (this.isLoading) {
      if (onProgress) this.progressCallbacks.push(onProgress);
      if (onComplete) this.completeCallbacks.push(onComplete);
      return;
    }

    this.isLoading = true;
    this.progressCallbacks = onProgress ? [onProgress] : [];
    this.completeCallbacks = onComplete ? [onComplete] : [];

    const assetList = [
      // Ryzen (Boy) sprites
      { name: 'boy_down_0', src: 'assets/characters/boy1.png' },
      { name: 'boy_down_1', src: 'assets/characters/boy2.png' },
      { name: 'boy_down_2', src: 'assets/characters/boy3.png' },
      { name: 'boy_down_3', src: 'assets/characters/boy4.png' },

      { name: 'boy_up_0', src: 'assets/characters/backwalkboy1.png' },
      { name: 'boy_up_1', src: 'assets/characters/backwalkboy2.png' },
      { name: 'boy_up_2', src: 'assets/characters/backwalkboy3.png' },
      { name: 'boy_up_3', src: 'assets/characters/backwalkboy4.png' },
      { name: 'boy_up_4', src: 'assets/characters/backwalkboy5.png' },

      // Wintel (Girl) Authentic Character Idle & Movement sprites (alisha_00.png to alisha_18.png)
      { name: 'girl_idle_0', src: 'assets/characters/alisha_00.png' },
      { name: 'girl_idle_1', src: 'assets/characters/alisha_01.png' },
      { name: 'girl_idle_2', src: 'assets/characters/alisha_02.png' },
      { name: 'girl_idle_3', src: 'assets/characters/alisha_03.png' },
      { name: 'girl_idle_4', src: 'assets/characters/alisha_04.png' },
      { name: 'girl_idle_5', src: 'assets/characters/alisha_05.png' },
      { name: 'girl_idle_6', src: 'assets/characters/alisha_06.png' },
      { name: 'girl_idle_7', src: 'assets/characters/alisha_07.png' },
      { name: 'girl_idle_8', src: 'assets/characters/alisha_08.png' },
      { name: 'girl_idle_9', src: 'assets/characters/alisha_09.png' },
      { name: 'girl_idle_10', src: 'assets/characters/alisha_10.png' },
      { name: 'girl_idle_11', src: 'assets/characters/alisha_11.png' },
      { name: 'girl_idle_12', src: 'assets/characters/alisha_12.png' },
      { name: 'girl_idle_13', src: 'assets/characters/alisha_13.png' },
      { name: 'girl_idle_14', src: 'assets/characters/alisha_14.png' },
      { name: 'girl_idle_15', src: 'assets/characters/alisha_15.png' },
      { name: 'girl_idle_16', src: 'assets/characters/alisha_16.png' },
      { name: 'girl_idle_17', src: 'assets/characters/alisha_17.png' },
      { name: 'girl_idle_18', src: 'assets/characters/alisha_18.png' },

      { name: 'girl_portrait', src: 'assets/characters/alisha_00.png' },
      { name: 'girl_portrait_happy', src: 'assets/characters/alisha_09.png' },

      // Title Screen Assets (Authentic Start Screen)
      { name: 'title_bg', src: 'assets/backgrounds/title_bg.png' },
      { name: 'lobby_bg', src: 'assets/backgrounds/hallway_bg.jpg' },
      { name: 'title_logo', src: 'assets/backgrounds/title_logo.png' },
      { name: 'btn_play_idle', src: 'assets/buttons/btn_play_idle.png' },
      { name: 'btn_play_hover', src: 'assets/buttons/btn_play_hover.png' },
      { name: 'btn_play_pressed', src: 'assets/buttons/btn_play_pressed.png' },
      { name: 'btn_about_idle', src: 'assets/buttons/btn_about_idle.png' },
      { name: 'tombol', src: 'assets/buttons/btn_about_idle.png' },
      { name: 'btn_about_hover', src: 'assets/buttons/btn_about_idle.png' },
      { name: 'btn_about_pressed', src: 'assets/buttons/btn_about_idle.png' },
      { name: 'lobby_play_idle', src: 'assets/buttons/Desain tanpa judul (30).png' },
      { name: 'lobby_play_hover', src: 'assets/buttons/Hovered.png' },
      { name: 'lobby_play_pressed', src: 'assets/buttons/Pressed.png' },
      { name: 'lobby_setting_idle', src: 'assets/buttons/Red Button With Gold Frame_Idle.png2.png' },
      { name: 'lobby_setting_hover', src: 'assets/buttons/Red Button With Gold Frame_Hovered.png2.png' },
      { name: 'lobby_setting_pressed', src: 'assets/buttons/Red Button With Gold Frame_Pressed.png2.png' },

      // Key Locations & Backgrounds
      { name: 'bg_classroom', src: 'assets/backgrounds/classs.jpg' },
      { name: 'bg_hallway', src: 'assets/backgrounds/ChatGPT Image 31 Agu 2026, 18.14.52.png' },
      { name: 'bg_hallway_banner', src: 'assets/buttons/Desain tanpa judul (27).png' },
      { name: 'bg_school_map', src: 'assets/backgrounds/ChatGPT Image 31 Agu 2026, 17.05.29.png' },
      { name: 'erd_diagram', src: 'assets/backgrounds/ERD BUSUSAN.drawio.png' },

      // UI & HUD Elements
      { name: 'dialog_box', src: 'assets/ui/dialog box medium.png' },
      { name: 'dialog_box_small', src: 'assets/ui/dialog box small.png' },
      { name: 'btn_a', src: 'assets/buttons/A button.png' },
      { name: 'joystick_base', src: 'assets/buttons/Flat light joystick border.png' },
      { name: 'joystick_knob', src: 'assets/buttons/Flat light joystick thumb.png' },
      { name: 'btn_gold_idle', src: 'assets/buttons/Red Button With Gold Frame_Idle.png' },
      { name: 'btn_gold_hover', src: 'assets/buttons/Red Button With Gold Frame_Hovered.png' },
      { name: 'btn_gold_pressed', src: 'assets/buttons/Red Button With Gold Frame_Pressed.png' }
    ];

    let loaded = 0;
    const total = assetList.length;
    this.totalAssetsCount = total;

    const checkDone = () => {
      loaded++;
      this.progressCallbacks.forEach(cb => {
        try { cb(loaded, total); } catch (e) { console.error(e); }
      });
      if (loaded >= total) {
        this.isReady = true;
        this.isLoading = false;
        this.completeCallbacks.forEach(cb => {
          try { cb(); } catch (e) { console.error(e); }
        });
        this.completeCallbacks = [];
      }
    };

    assetList.forEach(item => {
      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        this.images.set(item.name, img);
        checkDone();
      };
      img.onerror = () => {
        console.warn('Could not load:', item.src);
        checkDone();
      };
    });
  }
}

export const sprites = new SpriteManager();
