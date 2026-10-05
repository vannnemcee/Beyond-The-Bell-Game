// Beyond The Bell - Procedural Pixel Art Generator for Bu Rina, Rian, and Siti
// Authentic Indonesian vocational school characters:
// 1. Bu Rina: Elegant teacher with modest navy/tosca hijab, gold-rimmed glasses, batik teacher attire, lanyard ID card.
// 2. Rian: Energetic high school student with Indonesian SMK white shirt, grey tie, school badge, neat hairstyle.
// 3. Siti: Polite female high school student with crisp white hijab, long-sleeved SMK uniform, school badge.

export function generateCharacterSprites(spriteManager) {
  // --- 1. BU RINA (GURU RPL) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawTeacherFrame(ctx, f);
    spriteManager.images.set(`teacher_${f}`, cvs);
  }
  const teacherPortCvs = document.createElement('canvas');
  teacherPortCvs.width = 128;
  teacherPortCvs.height = 128;
  const tCtx = teacherPortCvs.getContext('2d');
  tCtx.imageSmoothingEnabled = false;
  drawTeacherPortrait(tCtx);
  spriteManager.images.set('teacher_portrait', teacherPortCvs);
  // Also keep backward compatibility
  spriteManager.images.set('teacher_0', spriteManager.images.get('teacher_0') || cvsFromTeacher(0));

  // --- 2. RIAN (MURID RPL) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawRianFrame(ctx, f);
    spriteManager.images.set(`rian_${f}`, cvs);
  }
  const rianPortCvs = document.createElement('canvas');
  rianPortCvs.width = 128;
  rianPortCvs.height = 128;
  const rCtx = rianPortCvs.getContext('2d');
  rCtx.imageSmoothingEnabled = false;
  drawRianPortrait(rCtx);
  spriteManager.images.set('rian_portrait', rianPortCvs);

  // --- 3. SITI (MURID RPL) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawSitiFrame(ctx, f);
    spriteManager.images.set(`siti_${f}`, cvs);
  }
  // --- 4. SOSOK GLITCH HITAM (???) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawShadowGlitchFrame(ctx, f);
    spriteManager.images.set(`shadow_glitch_${f}`, cvs);
  }
  const shadowPortCvs = document.createElement('canvas');
  shadowPortCvs.width = 128;
  shadowPortCvs.height = 128;
  const shCtx = shadowPortCvs.getContext('2d');
  shCtx.imageSmoothingEnabled = false;
  drawShadowGlitchPortrait(shCtx);
  spriteManager.images.set('shadow_glitch_portrait', shadowPortCvs);
}

// -------------------------------------------------------------
// DRAW BU RINA (GURU)
// -------------------------------------------------------------
function drawTeacherFrame(ctx, frame) {
  const isWalk = (frame % 2) !== 0;
  const bobY = isWalk ? -1 : 0;
  const legOffset = frame === 1 ? -2 : (frame === 3 ? 2 : 0);
  const cx = 32;

  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(cx, 59, 13, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shoes (Black teacher flat heels)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 7 - legOffset, 57 + bobY, 6, 3);
  ctx.fillRect(cx + 1 + legOffset, 57 + bobY, 6, 3);

  // Long Dark Navy / Batik Skirt
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 9, 44 + bobY, 18, 14);
  ctx.fillStyle = '#334155';
  ctx.fillRect(cx - 7, 44 + bobY, 3, 14);
  ctx.fillRect(cx + 4, 44 + bobY, 3, 14);

  // Blouse / Batik Blazer (Teal / Sage Green patterned teacher batik)
  ctx.fillStyle = '#0d9488'; // Teal batik base
  ctx.fillRect(cx - 8, 30 + bobY, 16, 15);
  // Batik geometric accents
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(cx - 6, 32 + bobY, 2, 2);
  ctx.fillRect(cx + 4, 32 + bobY, 2, 2);
  ctx.fillRect(cx - 4, 36 + bobY, 2, 2);
  ctx.fillRect(cx + 2, 36 + bobY, 2, 2);
  ctx.fillRect(cx - 6, 40 + bobY, 2, 2);
  ctx.fillRect(cx + 4, 40 + bobY, 2, 2);

  // ID Card Lanyard (Navy blue strap with white card)
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(cx - 1, 30 + bobY, 2, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 2, 36 + bobY, 4, 5);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 1, 37 + bobY, 2, 1);

  // Arms & Sleeves
  ctx.fillStyle = '#0f766e';
  ctx.fillRect(cx - 11, 31 + bobY, 3, 10);
  ctx.fillRect(cx + 8, 31 + bobY, 3, 10);
  // Hands
  ctx.fillStyle = '#f6d8b8';
  ctx.fillRect(cx - 11, 41 + bobY, 3, 3);
  ctx.fillRect(cx + 8, 41 + bobY, 3, 3);

  // Hijab Head & Chest (Drape)
  ctx.fillStyle = '#042f2e'; // Deep tosca hijab
  ctx.beginPath();
  ctx.ellipse(cx, 22 + bobY, 10, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  // Hijab chest drape
  ctx.fillStyle = '#0f766e';
  ctx.beginPath();
  ctx.moveTo(cx - 8, 26 + bobY);
  ctx.lineTo(cx, 34 + bobY);
  ctx.lineTo(cx + 8, 26 + bobY);
  ctx.fill();

  // Face oval
  ctx.fillStyle = '#f6d8b8';
  ctx.beginPath();
  ctx.ellipse(cx, 22 + bobY, 6, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyeglasses (Gold frames)
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 5, 20 + bobY, 4, 3);
  ctx.strokeRect(cx + 1, 20 + bobY, 4, 3);
  ctx.beginPath();
  ctx.moveTo(cx - 1, 21 + bobY);
  ctx.lineTo(cx + 1, 21 + bobY);
  ctx.stroke();

  // Eyes & Smile
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 4, 21 + bobY, 2, 1);
  ctx.fillRect(cx + 2, 21 + bobY, 2, 1);
  ctx.fillStyle = '#e11d48';
  ctx.fillRect(cx - 1, 25 + bobY, 2, 1);
}

function drawTeacherPortrait(ctx) {
  // Gradient Studio Background
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#042f2e');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  // Border frame
  ctx.strokeStyle = '#14b8a6';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;

  // Shoulders & Batik Blazer
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.ellipse(cx, 118, 48, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // Batik Golden Patterns on Blazer
  ctx.fillStyle = '#fef08a';
  for (let x = 28; x <= 100; x += 14) {
    for (let y = 104; y <= 126; y += 10) {
      ctx.fillRect(x, y, 4, 3);
      ctx.fillRect(x + 2, y + 3, 2, 2);
    }
  }

  // ID Lanyard
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 12, 90);
  ctx.lineTo(cx, 114);
  ctx.lineTo(cx + 12, 90);
  ctx.stroke();

  // ID Badge Card
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 10, 110, 20, 18);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - 8, 112, 16, 5);
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx - 6, 119, 12, 2);
  ctx.fillRect(cx - 6, 123, 8, 2);

  // Hijab Drape over Shoulders
  ctx.fillStyle = '#115e59';
  ctx.beginPath();
  ctx.moveTo(cx - 30, 80);
  ctx.quadraticCurveTo(cx, 106, cx + 30, 80);
  ctx.quadraticCurveTo(cx, 96, cx - 30, 80);
  ctx.fill();

  // Hijab Head Outer Shell
  ctx.fillStyle = '#0f766e';
  ctx.beginPath();
  ctx.ellipse(cx, 54, 30, 36, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#134e4a';
  ctx.beginPath();
  ctx.ellipse(cx - 2, 54, 28, 34, 0, 0, Math.PI * 2);
  ctx.fill();

  // Inner Hijab Cap
  ctx.fillStyle = '#042f2e';
  ctx.beginPath();
  ctx.ellipse(cx, 44, 21, 23, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face
  ctx.fillStyle = '#f6d8b8';
  ctx.beginPath();
  ctx.ellipse(cx, 57, 18, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  // Soft Cheek Blush
  ctx.fillStyle = 'rgba(244, 63, 94, 0.22)';
  ctx.beginPath();
  ctx.ellipse(cx - 10, 62, 5, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 10, 62, 5, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx - 9, 49, 6, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 9, 49, 6, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();

  // Glasses (Gold Wireframe)
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(cx - 15, 52, 11, 9);
  ctx.strokeRect(cx + 4, 52, 11, 9);
  ctx.beginPath();
  ctx.moveTo(cx - 4, 56);
  ctx.lineTo(cx + 4, 56);
  ctx.moveTo(cx - 15, 56);
  ctx.lineTo(cx - 21, 53);
  ctx.moveTo(cx + 15, 56);
  ctx.lineTo(cx + 21, 53);
  ctx.stroke();

  // Eyes (Warm & Intelligent)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.ellipse(cx - 9, 56, 3, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 9, 56, 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 10, 55, 1.5, 1.5);
  ctx.fillRect(cx + 8, 55, 1.5, 1.5);

  // Nose
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, 58);
  ctx.lineTo(cx - 1, 64);
  ctx.lineTo(cx + 2, 64);
  ctx.stroke();

  // Friendly Smile
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, 68, 7, 0.1, Math.PI - 0.1);
  ctx.stroke();

  // Name Tag Plaque at Bottom
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BU RINA', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// DRAW RIAN (MURID)
// -------------------------------------------------------------
function drawRianFrame(ctx, frame) {
  const isWalk = (frame % 2) !== 0;
  const bobY = isWalk ? -1 : 0;
  const legOffset = frame === 1 ? -2 : (frame === 3 ? 2 : 0);
  const cx = 32;

  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(cx, 59, 13, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shoes (Black & White Sneakers)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 7 - legOffset, 56 + bobY, 6, 4);
  ctx.fillRect(cx + 1 + legOffset, 56 + bobY, 6, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 7 - legOffset, 58 + bobY, 6, 2);
  ctx.fillRect(cx + 1 + legOffset, 58 + bobY, 6, 2);

  // Grey High School Trousers (Abu-abu SMK)
  ctx.fillStyle = '#64748b';
  ctx.fillRect(cx - 6 - legOffset, 45 + bobY, 5, 12);
  ctx.fillRect(cx + 1 + legOffset, 45 + bobY, 5, 12);
  // Belt
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 7, 43 + bobY, 14, 2);

  // Crisp White Shirt (Kemeja Putih Seragam)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 7, 30 + bobY, 14, 13);

  // Grey School Tie
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx - 1, 31 + bobY, 2, 8);
  ctx.fillRect(cx - 2, 38 + bobY, 4, 3);

  // Pocket Badge (OSIS / SMK logo)
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(cx - 5, 34 + bobY, 3, 3);

  // Arms & Hands
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 10, 31 + bobY, 3, 9);
  ctx.fillRect(cx + 7, 31 + bobY, 3, 9);
  ctx.fillStyle = '#fcd34d'; // Skin tone
  ctx.fillRect(cx - 10, 40 + bobY, 3, 3);
  ctx.fillRect(cx + 7, 40 + bobY, 3, 3);

  // Head
  ctx.fillStyle = '#fcd34d';
  ctx.beginPath();
  ctx.ellipse(cx, 22 + bobY, 7, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes & Smile
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 4, 22 + bobY, 2, 2);
  ctx.fillRect(cx + 2, 22 + bobY, 2, 2);
  ctx.fillStyle = '#e11d48';
  ctx.fillRect(cx - 2, 26 + bobY, 4, 1);

  // Stylish Teen Hair (Slight fringe / parted hair)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.ellipse(cx, 18 + bobY, 8, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 7, 18 + bobY, 4, 4);
  ctx.fillRect(cx + 3, 17 + bobY, 4, 3);
}

function drawRianPortrait(ctx) {
  // Gradient Blue-Indigo Background
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#1e1b4b');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;

  // Shoulders - White High School Shirt
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx, 120, 46, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // Collar
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(cx - 20, 92);
  ctx.lineTo(cx, 108);
  ctx.lineTo(cx + 20, 92);
  ctx.lineTo(cx + 12, 106);
  ctx.lineTo(cx - 12, 106);
  ctx.fill();

  // Tie (Grey SMK Tie)
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(cx - 5, 106);
  ctx.lineTo(cx + 5, 106);
  ctx.lineTo(cx + 7, 128);
  ctx.lineTo(cx - 7, 128);
  ctx.fill();

  // School Emblem / Badge on Pocket
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(36, 114, 12, 12);
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(38, 116, 8, 8);

  // Neck
  ctx.fillStyle = '#fcd34d';
  ctx.fillRect(cx - 8, 82, 16, 16);

  // Face
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.ellipse(cx, 62, 22, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  // Cheeks
  ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
  ctx.beginPath();
  ctx.ellipse(cx - 12, 68, 6, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 12, 68, 6, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - 16, 52);
  ctx.lineTo(cx - 5, 52);
  ctx.moveTo(cx + 5, 52);
  ctx.lineTo(cx + 16, 52);
  ctx.stroke();

  // Eyes (Big, lively boy eyes)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx - 10, 60, 4, 5, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 10, 60, 4, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 11, 58, 2, 2);
  ctx.fillRect(cx + 9, 58, 2, 2);

  // Nose
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, 61);
  ctx.lineTo(cx - 1, 67);
  ctx.lineTo(cx + 2, 67);
  ctx.stroke();

  // Bright Friendly Smile
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, 72, 9, 0.15, Math.PI - 0.15);
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 4, 73, 8, 3);

  // Modern Boy Hair
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.ellipse(cx, 44, 26, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  // Bangs / Fringe
  ctx.fillRect(cx - 24, 42, 12, 14);
  ctx.fillRect(cx - 14, 40, 14, 16);
  ctx.fillRect(cx - 2, 38, 16, 17);
  ctx.fillRect(cx + 12, 40, 13, 14);

  // Name Tag
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RIAN', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// DRAW SITI (MURID)
// -------------------------------------------------------------
function drawSitiFrame(ctx, frame) {
  const isWalk = (frame % 2) !== 0;
  const bobY = isWalk ? -1 : 0;
  const legOffset = frame === 1 ? -2 : (frame === 3 ? 2 : 0);
  const cx = 32;

  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(cx, 59, 13, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shoes (Black school shoes)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 7 - legOffset, 57 + bobY, 6, 3);
  ctx.fillRect(cx + 1 + legOffset, 57 + bobY, 6, 3);

  // Long Grey High School Skirt (Rok Abu-abu Rempel)
  ctx.fillStyle = '#64748b';
  ctx.fillRect(cx - 8, 44 + bobY, 16, 14);
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx - 5, 44 + bobY, 3, 14);
  ctx.fillRect(cx + 2, 44 + bobY, 3, 14);

  // White Long-Sleeved Shirt
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 7, 30 + bobY, 14, 15);
  // Grey tie
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx - 1, 31 + bobY, 2, 8);

  // Arms & Sleeves
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 10, 31 + bobY, 3, 10);
  ctx.fillRect(cx + 7, 31 + bobY, 3, 10);
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(cx - 10, 41 + bobY, 3, 3);
  ctx.fillRect(cx + 7, 41 + bobY, 3, 3);

  // White School Hijab (Jilbab Putih Rapi)
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(cx, 22 + bobY, 10, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx - 8, 27 + bobY);
  ctx.lineTo(cx, 35 + bobY);
  ctx.lineTo(cx + 8, 27 + bobY);
  ctx.fill();

  // Face
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.ellipse(cx, 22 + bobY, 6, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes & Smile
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 4, 21 + bobY, 2, 2);
  ctx.fillRect(cx + 2, 21 + bobY, 2, 2);
  ctx.fillStyle = '#fb7185';
  ctx.fillRect(cx - 1, 25 + bobY, 2, 1);
}

function drawSitiPortrait(ctx) {
  // Gradient Pink-Purple Background
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#581c87');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;

  // Shoulders - White Uniform
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx, 120, 46, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // Collar & Tie
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(cx - 5, 104);
  ctx.lineTo(cx + 5, 104);
  ctx.lineTo(cx + 6, 128);
  ctx.lineTo(cx - 6, 128);
  ctx.fill();

  // School Badge
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(36, 114, 12, 12);
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(38, 116, 8, 8);

  // White Hijab Chest Drape
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.moveTo(cx - 28, 80);
  ctx.quadraticCurveTo(cx, 104, cx + 28, 80);
  ctx.quadraticCurveTo(cx, 95, cx - 28, 80);
  ctx.fill();

  // White Hijab Head Outer
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx, 53, 30, 36, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(cx - 2, 53, 28, 34, 0, 0, Math.PI * 2);
  ctx.fill();

  // Inner Hijab Band
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.ellipse(cx, 44, 21, 23, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.ellipse(cx, 56, 18, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  // Cheeks Blush
  ctx.fillStyle = 'rgba(244, 114, 182, 0.28)';
  ctx.beginPath();
  ctx.ellipse(cx - 10, 62, 5, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 10, 62, 5, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx - 9, 48, 6, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 9, 48, 6, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();

  // Eyes (Gentle, sparkling anime-style eyes)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx - 9, 56, 3.5, 4.5, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 9, 56, 3.5, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 10, 54, 2, 2);
  ctx.fillRect(cx + 8, 54, 2, 2);

  // Soft Nose
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx, 58);
  ctx.lineTo(cx - 1, 63);
  ctx.lineTo(cx + 1, 63);
  ctx.stroke();

  // Sweet Smile
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, 67, 6, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Name Tag
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SITI', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// DRAW SOSOK GLITCH HITAM (???)
// Full black shadow humanoid with chromatic glitch tears & glowing eyes
// -------------------------------------------------------------
function drawShadowGlitchFrame(ctx, frame) {
  const cx = 32;
  const isJitter = (frame % 2) !== 0;
  const jitterX = isJitter ? (Math.random() > 0.5 ? 1 : -1) : 0;
  const jitterY = (frame === 1 || frame === 3) ? -1 : 0;

  // Shadow pool underneath with dark purple aura
  ctx.fillStyle = 'rgba(147, 51, 234, 0.45)';
  ctx.beginPath();
  ctx.ellipse(cx, 59, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Chromatic glitch aberration shadow (offset red / cyan)
  ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
  ctx.fillRect(cx - 10 + jitterX + 2, 24 + jitterY, 20, 26);
  ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
  ctx.fillRect(cx - 10 + jitterX - 2, 24 + jitterY, 20, 26);

  // Full black body silhouette
  ctx.fillStyle = '#050508';
  // Torso
  ctx.fillRect(cx - 9 + jitterX, 24 + jitterY, 18, 25);
  // Legs
  ctx.fillRect(cx - 7 + jitterX, 48 + jitterY, 5, 12);
  ctx.fillRect(cx + 2 + jitterX, 48 + jitterY, 5, 12);
  // Arms (dangling, menacing)
  ctx.fillRect(cx - 13 + jitterX, 26 + jitterY, 4, 22);
  ctx.fillRect(cx + 9 + jitterX, 26 + jitterY, 4, 22);
  // Head
  ctx.beginPath();
  ctx.arc(cx + jitterX, 16 + jitterY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Glitch tear lines cutting through body
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(cx - 11, 28 + jitterY, 22, 2);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 8, 38 + jitterY, 16, 1.5);
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(cx - 12, 20 + jitterY, 6, 2);

  // Glowing pure white piercing eyes with red outline
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 5 + jitterX, 14 + jitterY, 4, 3);
  ctx.fillRect(cx + 2 + jitterX, 14 + jitterY, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 4 + jitterX, 14 + jitterY, 2, 2);
  ctx.fillRect(cx + 3 + jitterX, 14 + jitterY, 2, 2);
}

function drawShadowGlitchPortrait(ctx) {
  const cx = 64;

  // Background: Deep dark digital void with static grain
  ctx.fillStyle = '#020205';
  ctx.fillRect(0, 0, 128, 128);

  // Scanline CRT raster bands
  ctx.fillStyle = 'rgba(168, 85, 247, 0.12)';
  for (let y = 0; y < 128; y += 4) {
    ctx.fillRect(0, y, 128, 2);
  }

  // Chromatic glitch silhouette shifts (Red & Cyan fringe)
  ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
  ctx.beginPath();
  ctx.ellipse(cx + 3, 50, 27, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 32 + 3, 76, 64, 52);

  ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
  ctx.beginPath();
  ctx.ellipse(cx - 3, 50, 27, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 32 - 3, 76, 64, 52);

  // Pure pitch black silhouette (Head, Neck, Torso, Shoulders)
  ctx.fillStyle = '#050508';
  // Head
  ctx.beginPath();
  ctx.ellipse(cx, 48, 26, 32, 0, 0, Math.PI * 2);
  ctx.fill();
  // Neck
  ctx.fillRect(cx - 12, 68, 24, 16);
  // Broad shoulders & Torso
  ctx.beginPath();
  ctx.moveTo(cx - 46, 128);
  ctx.lineTo(cx - 40, 84);
  ctx.lineTo(cx - 20, 78);
  ctx.lineTo(cx + 20, 78);
  ctx.lineTo(cx + 40, 84);
  ctx.lineTo(cx + 46, 128);
  ctx.closePath();
  ctx.fill();

  // Jagged digital glitch artifacts cutting across
  const tears = [
    { y: 22, h: 3, col: '#a855f7', x: 20, w: 90 },
    { y: 44, h: 2, col: '#ef4444', x: 15, w: 80 },
    { y: 62, h: 4, col: '#06b6d4', x: 30, w: 70 },
    { y: 88, h: 3, col: '#c084fc', x: 10, w: 108 },
    { y: 106, h: 2, col: '#f43f5e', x: 25, w: 75 }
  ];
  tears.forEach(t => {
    ctx.fillStyle = t.col;
    ctx.fillRect(t.x, t.y, t.w, t.h);
  });

  // Floating static noise pixels around the outline
  const noisePixels = [
    [cx - 32, 38], [cx + 30, 42], [cx - 24, 20], [cx + 26, 24],
    [cx - 42, 92], [cx + 44, 98], [cx - 36, 112], [cx + 38, 116],
    [cx - 14, 14], [cx + 12, 12]
  ];
  ctx.fillStyle = '#ffffff';
  noisePixels.forEach(([px, py]) => {
    ctx.fillRect(px, py, 2, 2);
  });

  // Glowing piercing sinister white/red eyes
  // Outer red aura
  ctx.fillStyle = 'rgba(239, 68, 68, 0.75)';
  ctx.beginPath();
  ctx.ellipse(cx - 10, 46, 7, 4.5, -0.15, 0, Math.PI * 2);
  ctx.ellipse(cx + 10, 46, 7, 4.5, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // Core white piercing light
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(cx - 10, 46, 4.5, 2.5, -0.15, 0, Math.PI * 2);
  ctx.ellipse(cx + 10, 46, 4.5, 2.5, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // Menacing faint glitch grin / teeth line
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 12, 62);
  ctx.lineTo(cx + 12, 62);
  ctx.stroke();

  // Badge Name Tag: "???"
  ctx.fillStyle = 'rgba(30, 10, 60, 0.9)';
  ctx.fillRect(16, 104, 96, 18);
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(16, 104, 96, 18);
  ctx.fillStyle = '#f3e8ff';
  ctx.font = 'bold 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('???', cx, 117);
  ctx.textAlign = 'start';
}
