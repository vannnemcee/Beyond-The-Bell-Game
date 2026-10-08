// Beyond The Bell - Procedural Pixel Art Generator for Indonesian Security Guard (Pak Satpam)
// Authentic uniform: Peaked visor cap with gold shield, crisp white shirt with tie, gold badge,
// shoulder rank epaulets, radio HT holster, dark navy trousers, polished black dress shoes,
// and friendly Indonesian bapak mustache face.

export function generateSatpamSprites(spriteManager) {
  // 1. Generate 8-frame walking/idle sprites for in-game NPC & Boss
  for (let frame = 0; frame < 8; frame++) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    drawSatpamCharacterFrame(ctx, frame);
    spriteManager.images.set(`satpam_${frame}`, canvas);
  }

  // 2. Generate high-resolution 128x128 dialogue portrait
  const portraitCanvas = document.createElement('canvas');
  portraitCanvas.width = 128;
  portraitCanvas.height = 128;
  const pCtx = portraitCanvas.getContext('2d');
  pCtx.imageSmoothingEnabled = false;

  drawSatpamPortrait(pCtx);
  spriteManager.images.set('satpam_portrait', portraitCanvas);

  // 3. Generate pure black glitch shadow figure portrait and monster frames
  generateGlitchShadowSprites(spriteManager);
}

export function generateGlitchShadowSprites(spriteManager) {
  // 1. Generate 128x128 dialogue portrait for ??? (Orang full hitam glitch)
  const portraitCanvas = document.createElement('canvas');
  portraitCanvas.width = 128;
  portraitCanvas.height = 128;
  const pCtx = portraitCanvas.getContext('2d');
  pCtx.imageSmoothingEnabled = false;
  drawGlitchShadowPortrait(pCtx);
  spriteManager.images.set('glitch_shadow_portrait', portraitCanvas);

  // 2. Generate 4 frames of charging shadow monster (64x64)
  for (let frame = 0; frame < 4; frame++) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const mCtx = canvas.getContext('2d');
    mCtx.imageSmoothingEnabled = false;
    drawGlitchShadowMonsterFrame(mCtx, frame);
    spriteManager.images.set(`glitch_shadow_${frame}`, canvas);
  }
}

function drawSatpamCharacterFrame(ctx, frame) {
  // Idle bob & leg swing animation calculation
  const isWalking = (frame % 4) !== 0;
  const step = frame % 4;
  let bobY = 0;
  let leftLegOffset = 0;
  let rightLegOffset = 0;
  let leftArmOffset = 0;
  let rightArmOffset = 0;

  if (step === 1) {
    bobY = -1;
    leftLegOffset = -3;
    rightLegOffset = 3;
    leftArmOffset = 2;
    rightArmOffset = -2;
  } else if (step === 2) {
    bobY = 0;
    leftLegOffset = 0;
    rightLegOffset = 0;
    leftArmOffset = 0;
    rightArmOffset = 0;
  } else if (step === 3) {
    bobY = -1;
    leftLegOffset = 3;
    rightLegOffset = -3;
    leftArmOffset = -2;
    rightArmOffset = 2;
  }

  const cx = 32;
  const baseY = 32 + bobY;

  // --- 2. Legs & Shoes (Dark Navy Pants & Shiny Black Shoes) ---
  // Left Leg
  ctx.fillStyle = '#0f172a'; // Deep navy blue
  ctx.fillRect(cx - 7, baseY + 12, 5, 11 + leftLegOffset);
  // Left Shoe
  ctx.fillStyle = '#020617'; // Shiny black dress shoe
  ctx.fillRect(cx - 9, baseY + 23 + leftLegOffset, 7, 4);
  ctx.fillStyle = '#475569'; // Specular highlight
  ctx.fillRect(cx - 8, baseY + 23 + leftLegOffset, 2, 1);

  // Right Leg
  ctx.fillStyle = '#1e293b'; // Deep navy blue
  ctx.fillRect(cx + 2, baseY + 12, 5, 11 + rightLegOffset);
  // Right Shoe
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx + 2, baseY + 23 + rightLegOffset, 7, 4);
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx + 4, baseY + 23 + rightLegOffset, 2, 1);

  // --- 3. Torso & Official White Uniform Shirt (Kemeja Satpam Putih) ---
  // White button-down shirt
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 9, baseY - 6, 18, 16);
  // Shirt contour & shading
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(cx - 9, baseY + 7, 18, 3);
  ctx.fillRect(cx + 8, baseY - 6, 1, 16);

  // Dark Navy Necktie (Dasi Satpam)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 1.5, baseY - 4, 3, 11);
  ctx.fillStyle = '#334155';
  ctx.fillRect(cx - 1, baseY - 5, 2, 2); // Tie knot

  // Shoulder Epaulets (Tanda Pangkat Bahu Hitam-Emas)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 10, baseY - 6, 4, 2);
  ctx.fillRect(cx + 6, baseY - 6, 4, 2);
  ctx.fillStyle = '#fbbf24'; // Gold rank stripes
  ctx.fillRect(cx - 9, baseY - 6, 2, 1);
  ctx.fillRect(cx + 7, baseY - 6, 2, 1);

  // Golden Security Badge ("SATPAM" di dada kiri)
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 7, baseY - 1, 3, 3);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 6, baseY, 1, 1);

  // Name tag / badge strip di dada kanan
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx + 3, baseY - 1, 4, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx + 4, baseY, 2, 1);

  // --- 4. Duty Belt (Sabuk Kopel Putih Satpam dengan Kepala Sabuk Emas) ---
  ctx.fillStyle = '#e2e8f0'; // White duty belt
  ctx.fillRect(cx - 9, baseY + 9, 18, 3);
  ctx.fillStyle = '#fbbf24'; // Gold belt buckle
  ctx.fillRect(cx - 2, baseY + 9, 4, 3);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(cx - 1, baseY + 10, 2, 1);

  // HT Holster & Antenna on right hip
  ctx.fillStyle = '#090d16'; // Handy-Talky radio
  ctx.fillRect(cx + 7, baseY + 7, 3, 5);
  ctx.fillStyle = '#475569'; // Antenna
  ctx.fillRect(cx + 8, baseY + 3, 1, 4);

  // --- 5. Arms & Hands ---
  // Left Arm (white short sleeve + sawo matang arm)
  ctx.fillStyle = '#f8fafc'; // White sleeve
  ctx.fillRect(cx - 12, baseY - 5 + leftArmOffset, 3, 6);
  ctx.fillStyle = '#d49b6a'; // Indonesian skin tone
  ctx.fillRect(cx - 12, baseY + 1 + leftArmOffset, 3, 7);
  ctx.fillStyle = '#e8b788'; // Hand highlight
  ctx.fillRect(cx - 12, baseY + 6 + leftArmOffset, 3, 2);

  // Right Arm (white short sleeve + sawo matang arm)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx + 9, baseY - 5 + rightArmOffset, 3, 6);
  ctx.fillStyle = '#d49b6a';
  ctx.fillRect(cx + 9, baseY + 1 + rightArmOffset, 3, 7);
  ctx.fillStyle = '#e8b788';
  ctx.fillRect(cx + 9, baseY + 6 + rightArmOffset, 3, 2);

  // --- 6. Head & Face (Sawo Matang + Friendly Bapak Satpam Smile & Mustache) ---
  // Neck
  ctx.fillStyle = '#b47b4d';
  ctx.fillRect(cx - 3, baseY - 7, 6, 2);

  // Face head base
  ctx.fillStyle = '#d49b6a'; // Warm Indonesian tan
  ctx.fillRect(cx - 7, baseY - 18, 14, 12);
  // Chin shadow
  ctx.fillStyle = '#b47b4d';
  ctx.fillRect(cx - 5, baseY - 8, 10, 2);

  // Ears
  ctx.fillStyle = '#d49b6a';
  ctx.fillRect(cx - 8, baseY - 15, 2, 4);
  ctx.fillRect(cx + 6, baseY - 15, 2, 4);

  // Eyes (Focused & kind)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 4, baseY - 14, 2, 2);
  ctx.fillRect(cx + 2, baseY - 14, 2, 2);
  ctx.fillStyle = '#ffffff'; // Eye gleam
  ctx.fillRect(cx - 4, baseY - 14, 1, 1);
  ctx.fillRect(cx + 2, baseY - 14, 1, 1);

  // Eyebrows (Sturdy black)
  ctx.fillStyle = '#1e1b18';
  ctx.fillRect(cx - 5, baseY - 16, 3, 1);
  ctx.fillRect(cx + 2, baseY - 16, 3, 1);

  // Nose
  ctx.fillStyle = '#b47b4d';
  ctx.fillRect(cx - 1, baseY - 13, 2, 2);

  // Authentic Indonesian Bapak Satpam Mustache (Kumis Rapi)
  ctx.fillStyle = '#18181b';
  ctx.fillRect(cx - 4, baseY - 10, 8, 2);
  ctx.fillStyle = '#27272a';
  ctx.fillRect(cx - 5, baseY - 9, 10, 1);

  // Friendly mouth smile under mustache
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(cx - 2, baseY - 8, 4, 1);

  // --- 7. Official Indonesian Peaked Security Cap (Topi Pet Satpam) ---
  // Cap crown (Dark navy blue / black)
  ctx.fillStyle = '#090d16';
  ctx.fillRect(cx - 9, baseY - 24, 18, 7);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 8, baseY - 25, 16, 2);

  // Gold braided cord above visor
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 8, baseY - 18, 16, 2);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 7, baseY - 17, 14, 1);

  // Golden Shield Insignia / Garuda Emblem di tengah topi
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 3, baseY - 23, 6, 5);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 2, baseY - 22, 4, 4);
  ctx.fillStyle = '#ffffff'; // Emblem center sparkle
  ctx.fillRect(cx - 1, baseY - 21, 2, 2);

  // Black glossy visor brim (Pet Topi)
  ctx.fillStyle = '#020617';
  ctx.fillRect(cx - 10, baseY - 17, 20, 3);
  ctx.fillStyle = '#64748b'; // Visor specular reflection
  ctx.fillRect(cx - 6, baseY - 17, 12, 1);
}

function drawSatpamPortrait(ctx) {
  // Background circular badge backdrop
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#1e293b');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  // Outer gold rim
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 120, 120);

  // Soft inner vignette
  ctx.fillStyle = 'rgba(2, 6, 23, 0.4)';
  ctx.fillRect(8, 8, 112, 112);

  const cx = 64;
  const cy = 68;

  // --- Shoulders & Uniform Chest ---
  // White Shirt Body
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx - 46, 124);
  ctx.lineTo(cx - 38, cy + 18);
  ctx.lineTo(cx + 38, cy + 18);
  ctx.lineTo(cx + 46, 124);
  ctx.closePath();
  ctx.fill();

  // Shirt shadows & creases
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(cx - 40, cy + 35, 12, 25);
  ctx.fillRect(cx + 28, cy + 35, 12, 25);
  ctx.fillRect(cx - 2, cy + 22, 4, 38);

  // Shirt Collar (Kerah Putih Tegap)
  ctx.fillStyle = '#ffffff';
  // Left collar wing
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy + 16);
  ctx.lineTo(cx - 6, cy + 28);
  ctx.lineTo(cx - 4, cy + 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Right collar wing
  ctx.beginPath();
  ctx.moveTo(cx + 20, cy + 16);
  ctx.lineTo(cx + 6, cy + 28);
  ctx.lineTo(cx + 4, cy + 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dark Navy Necktie (Dasi Hitam/Biru Tua)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(cx - 5, cy + 22);
  ctx.lineTo(cx + 5, cy + 22);
  ctx.lineTo(cx + 7, cy + 34);
  ctx.lineTo(cx + 6, 124);
  ctx.lineTo(cx - 6, 124);
  ctx.lineTo(cx - 7, cy + 34);
  ctx.closePath();
  ctx.fill();

  // Tie Knot
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 4, cy + 20, 8, 8);

  // Shoulder Epaulets (Tanda Pangkat Hitam Emas di Pundak)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 42, cy + 16, 14, 6);
  ctx.fillRect(cx + 28, cy + 16, 14, 6);
  // Gold bars
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 39, cy + 17, 8, 2);
  ctx.fillRect(cx - 39, cy + 20, 8, 1);
  ctx.fillRect(cx + 31, cy + 17, 8, 2);
  ctx.fillRect(cx + 31, cy + 20, 8, 1);

  // Golden "SATPAM" Security Badge di dada kiri
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(cx - 28, cy + 34);
  ctx.lineTo(cx - 16, cy + 34);
  ctx.lineTo(cx - 18, cy + 48);
  ctx.lineTo(cx - 22, cy + 52);
  ctx.lineTo(cx - 26, cy + 48);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.fillRect(cx - 26, cy + 36, 8, 4);
  ctx.fillStyle = '#78350f';
  ctx.font = 'bold 5px sans-serif';
  ctx.fillText('SATPAM', cx - 27, cy + 44);

  // Monogram patch di lengan kanan
  ctx.fillStyle = '#1e3a8a';
  ctx.beginPath();
  ctx.arc(cx + 36, cy + 32, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fbbf24';
  ctx.stroke();

  // --- Neck & Head (Sawo Matang Warm Tone) ---
  ctx.fillStyle = '#b47b4d';
  ctx.fillRect(cx - 10, cy + 4, 20, 15);

  // Jaw & Face
  ctx.fillStyle = '#d49b6a';
  ctx.beginPath();
  ctx.moveTo(cx - 24, cy - 24);
  ctx.lineTo(cx + 24, cy - 24);
  ctx.lineTo(cx + 22, cy);
  ctx.lineTo(cx + 14, cy + 12);
  ctx.lineTo(cx - 14, cy + 12);
  ctx.lineTo(cx - 22, cy);
  ctx.closePath();
  ctx.fill();

  // Cheeks & Jaw shading
  ctx.fillStyle = '#b47b4d';
  ctx.fillRect(cx - 23, cy - 6, 4, 8);
  ctx.fillRect(cx + 19, cy - 6, 4, 8);
  ctx.fillRect(cx - 10, cy + 10, 20, 2);

  // Ears
  ctx.fillStyle = '#d49b6a';
  ctx.fillRect(cx - 27, cy - 14, 5, 12);
  ctx.fillRect(cx + 22, cy - 14, 5, 12);

  // Eyes (Warm, friendly, authoritative)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 16, cy - 10, 9, 6);
  ctx.fillRect(cx + 7, cy - 10, 9, 6);

  ctx.fillStyle = '#1e1b18';
  ctx.fillRect(cx - 13, cy - 10, 5, 6);
  ctx.fillRect(cx + 8, cy - 10, 5, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 12, cy - 9, 2, 2);
  ctx.fillRect(cx + 9, cy - 9, 2, 2);

  // Eyelids
  ctx.fillStyle = '#b47b4d';
  ctx.fillRect(cx - 17, cy - 12, 11, 2);
  ctx.fillRect(cx + 6, cy - 12, 11, 2);

  // Eyebrows (Thick, confident)
  ctx.fillStyle = '#18181b';
  ctx.fillRect(cx - 18, cy - 16, 12, 3);
  ctx.fillRect(cx + 6, cy - 16, 12, 3);

  // Nose (Indonesian straight nose with subtle nostril shadows)
  ctx.fillStyle = '#b47b4d';
  ctx.fillRect(cx - 2, cy - 10, 4, 8);
  ctx.fillRect(cx - 5, cy - 3, 10, 3);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - 4, cy - 1, 2, 1);
  ctx.fillRect(cx + 2, cy - 1, 2, 1);

  // Authentic Indonesian Kumis Satpam (Neat Thick Mustache)
  ctx.fillStyle = '#09090b';
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy + 5);
  ctx.quadraticCurveTo(cx, cy + 1, cx + 14, cy + 5);
  ctx.lineTo(cx + 12, cy + 9);
  ctx.quadraticCurveTo(cx, cy + 7, cx - 12, cy + 9);
  ctx.closePath();
  ctx.fill();

  // Friendly Smile below mustache
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(cx - 6, cy + 8, 12, 2);
  ctx.fillStyle = '#ffffff'; // White teeth flash
  ctx.fillRect(cx - 4, cy + 8, 8, 1);

  // --- Peaked Security Visor Cap (Topi Pet Satpam Resmi) ---
  // Cap crown (Dark navy blue / black)
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.moveTo(cx - 32, cy - 24);
  ctx.lineTo(cx - 28, cy - 48);
  ctx.quadraticCurveTo(cx, cy - 54, cx + 28, cy - 48);
  ctx.lineTo(cx + 32, cy - 24);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 26, cy - 44, 52, 16);

  // Gold braided cord across base of cap
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(cx - 28, cy - 26, 56, 4);
  ctx.fillStyle = '#d97706';
  ctx.fillRect(cx - 26, cy - 24, 52, 2);

  // Peaked Visor (Brim) with glossy specular finish
  ctx.fillStyle = '#090d16';
  ctx.beginPath();
  ctx.moveTo(cx - 34, cy - 24);
  ctx.quadraticCurveTo(cx, cy - 18, cx + 34, cy - 24);
  ctx.lineTo(cx + 30, cy - 20);
  ctx.quadraticCurveTo(cx, cy - 14, cx - 30, cy - 20);
  ctx.closePath();
  ctx.fill();

  // Visor reflection
  ctx.fillStyle = '#64748b';
  ctx.fillRect(cx - 18, cy - 21, 36, 1.5);

  // Official Gold Garuda / Shield Emblem in Center of Cap
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(cx - 8, cy - 40);
  ctx.lineTo(cx + 8, cy - 40);
  ctx.lineTo(cx + 10, cy - 30);
  ctx.lineTo(cx, cy - 24);
  ctx.lineTo(cx - 10, cy - 30);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 5, cy - 37, 10, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 2, cy - 35, 4, 4);

  // Bottom Name Plate Label
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.fillRect(8, 106, 112, 18);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 106, 112, 18);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PAK SATPAM (KEAMANAN)', cx, 118);
  ctx.textAlign = 'start';
}

function drawGlitchShadowPortrait(ctx) {
  // Dark void background with subtle scanlines
  ctx.fillStyle = '#06000a';
  ctx.fillRect(0, 0, 128, 128);

  // Purple/Red glitch scanlines
  ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
  for (let y = 0; y < 128; y += 4) {
    ctx.fillRect(0, y, 128, 1.5);
  }

  const cx = 64;
  const cy = 60;

  // 1. Red chromatic aberration shadow silhouette (offset -3, -1)
  ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
  drawHumanoidSilhouette(ctx, cx - 3, cy - 1, 1.02);

  // 2. Cyan chromatic aberration shadow silhouette (offset +3, +1)
  ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
  drawHumanoidSilhouette(ctx, cx + 3, cy + 1, 1.02);

  // 3. Main pure black glitch silhouette
  ctx.fillStyle = '#020104';
  drawHumanoidSilhouette(ctx, cx, cy, 1.0);

  // 4. Digital glitch horizontal tears cutting across silhouette
  ctx.fillStyle = 'rgba(192, 132, 252, 0.6)';
  ctx.fillRect(cx - 30, cy - 18, 25, 3);
  ctx.fillRect(cx + 8, cy - 2, 28, 2);
  ctx.fillRect(cx - 24, cy + 14, 38, 2.5);
  ctx.fillRect(cx - 35, cy + 28, 70, 3);

  ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
  ctx.fillRect(cx - 15, cy - 10, 35, 2);
  ctx.fillRect(cx + 12, cy + 8, 22, 2);

  // 5. Piercing glowing eyes in the void
  ctx.fillStyle = '#ff0055';
  ctx.beginPath();
  ctx.arc(cx - 9, cy - 16, 5, 0, Math.PI * 2);
  ctx.arc(cx + 9, cy - 16, 5, 0, Math.PI * 2);
  ctx.fill();

  // Sharp bright white/cyan eye slit centers
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 12, cy - 17, 7, 3);
  ctx.fillRect(cx + 5, cy - 17, 7, 3);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(cx - 10, cy - 18, 3, 4);
  ctx.fillRect(cx + 7, cy - 18, 3, 4);

  // 6. Floating glitch pixel cubes
  const glitchCubes = [
    { x: 18, y: 22, s: 6, c: '#a855f7' },
    { x: 28, y: 14, s: 4, c: '#ef4444' },
    { x: 102, y: 20, s: 5, c: '#06b6d4' },
    { x: 92, y: 32, s: 7, c: '#c084fc' },
    { x: 14, y: 70, s: 5, c: '#ef4444' },
    { x: 108, y: 64, s: 6, c: '#a855f7' }
  ];
  for (const cube of glitchCubes) {
    ctx.fillStyle = cube.c;
    ctx.fillRect(cube.x, cube.y, cube.s, cube.s);
  }

  // 7. Bottom Name Plate Label (??? ANOMALI)
  ctx.fillStyle = 'rgba(10, 4, 18, 0.95)';
  ctx.fillRect(8, 106, 112, 18);
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(8, 106, 112, 18);

  ctx.fillStyle = '#f5d0fe';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('??? [ANOMALI]', cx, 119);
  ctx.textAlign = 'start';
}

function drawHumanoidSilhouette(ctx, cx, cy, scale) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // Head (hooded / ragged shadow)
  ctx.beginPath();
  ctx.arc(0, -18, 22, 0, Math.PI * 2);
  ctx.fill();

  // Neck & Shoulders (broad sinister posture)
  ctx.beginPath();
  ctx.moveTo(-12, -2);
  ctx.lineTo(-38, 24);
  ctx.lineTo(-42, 48);
  ctx.lineTo(42, 48);
  ctx.lineTo(38, 24);
  ctx.lineTo(12, -2);
  ctx.closePath();
  ctx.fill();

  // Jagged shadow edges
  ctx.fillRect(-40, 20, 8, 24);
  ctx.fillRect(32, 20, 8, 24);
  ctx.fillRect(-20, 44, 40, 10);

  ctx.restore();
}

function drawGlitchShadowMonsterFrame(ctx, frame) {
  const cx = 32;
  const cy = 30;
  const bob = (frame % 2 === 0) ? -2 : 2;

  // Shadow pool
  ctx.fillStyle = 'rgba(120, 0, 160, 0.4)';
  ctx.beginPath();
  ctx.ellipse(cx, 58, 18, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glitch chromatic offset
  ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
  ctx.beginPath();
  ctx.arc(cx - 2, cy - 10 + bob, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 18, cy + 2 + bob, 32, 24);

  // Pure black body
  ctx.fillStyle = '#020104';
  ctx.beginPath();
  ctx.arc(cx, cy - 10 + bob, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 16, cy + 2 + bob, 32, 24);

  // Long claw hands reaching forward
  ctx.fillStyle = '#050208';
  const armSwing = (frame % 2 === 0) ? 4 : -4;
  ctx.fillRect(cx - 24, cy + 6 + bob + armSwing, 10, 22);
  ctx.fillRect(cx + 14, cy + 6 + bob - armSwing, 10, 22);

  // Red claws
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 24, cy + 26 + bob + armSwing, 3, 6);
  ctx.fillRect(cx - 20, cy + 27 + bob + armSwing, 3, 7);
  ctx.fillRect(cx + 14, cy + 26 + bob - armSwing, 3, 6);
  ctx.fillRect(cx + 18, cy + 27 + bob - armSwing, 3, 7);

  // Glowing evil eyes
  ctx.fillStyle = '#ff0055';
  ctx.fillRect(cx - 7, cy - 13 + bob, 4, 3);
  ctx.fillRect(cx + 3, cy - 13 + bob, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 6, cy - 12 + bob, 2, 2);
  ctx.fillRect(cx + 4, cy - 12 + bob, 2, 2);

  // Digital noise glitches
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(cx - 20 + (frame * 5) % 25, cy - 5, 8, 2);
  ctx.fillRect(cx - 10 + (frame * 7) % 20, cy + 15, 12, 2);
}
