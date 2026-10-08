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
  const sitiPortCvs = document.createElement('canvas');
  sitiPortCvs.width = 128;
  sitiPortCvs.height = 128;
  const sCtx = sitiPortCvs.getContext('2d');
  sCtx.imageSmoothingEnabled = false;
  drawSitiPortrait(sCtx);
  spriteManager.images.set('siti_portrait', sitiPortCvs);
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

  // --- 5. IBU KANTIN (PENGELOLA KANTIN SEHAT) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawIbuKantinFrame(ctx, f);
    spriteManager.images.set(`ibu_kantin_${f}`, cvs);
  }
  const kantinPortCvs = document.createElement('canvas');
  kantinPortCvs.width = 128;
  kantinPortCvs.height = 128;
  const kCtx = kantinPortCvs.getContext('2d');
  kCtx.imageSmoothingEnabled = false;
  drawIbuKantinPortrait(kCtx);
  spriteManager.images.set('ibu_kantin_portrait', kantinPortCvs);

  // --- 6. PEDAGANG KAKI LIMA (MANG UJANG - CILOK & BATAGOR LUAR GERBANG) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawPedagangKakiLimaFrame(ctx, f);
    spriteManager.images.set(`pedagang_kaki_lima_${f}`, cvs);
  }
  const cilokPortCvs = document.createElement('canvas');
  cilokPortCvs.width = 128;
  cilokPortCvs.height = 128;
  const cCtx = cilokPortCvs.getContext('2d');
  cCtx.imageSmoothingEnabled = false;
  drawPedagangKakiLimaPortrait(cCtx);
  spriteManager.images.set('pedagang_kaki_lima_portrait', cilokPortCvs);

  // --- 7. DRIVER OJOL (BANG DEDI - OJEK ONLINE LUAR GERBANG) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawOjolFrame(ctx, f);
    spriteManager.images.set(`ojol_${f}`, cvs);
  }
  const ojolPortCvs = document.createElement('canvas');
  ojolPortCvs.width = 128;
  ojolPortCvs.height = 128;
  const oCtx = ojolPortCvs.getContext('2d');
  oCtx.imageSmoothingEnabled = false;
  drawOjolPortrait(oCtx);
  spriteManager.images.set('ojol_portrait', ojolPortCvs);

  // --- 8. WARGA SEKITAR (PAK YANTO - TOKOH MASYARAKAT LUAR GERBANG) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawWargaFrame(ctx, f);
    spriteManager.images.set(`warga_${f}`, cvs);
  }
  const wargaPortCvs = document.createElement('canvas');
  wargaPortCvs.width = 128;
  wargaPortCvs.height = 128;
  const wCtx = wargaPortCvs.getContext('2d');
  wCtx.imageSmoothingEnabled = false;
  drawWargaPortrait(wCtx);
  spriteManager.images.set('warga_portrait', wargaPortCvs);

  // --- 9. SISWA BASKET (DONI - LAPANGAN OLAHRAGA) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawSiswaBasketFrame(ctx, f);
    spriteManager.images.set(`siswa_basket_${f}`, cvs);
  }
  const basketPortCvs = document.createElement('canvas');
  basketPortCvs.width = 128;
  basketPortCvs.height = 128;
  const bCtx = basketPortCvs.getContext('2d');
  bCtx.imageSmoothingEnabled = false;
  drawSiswaBasketPortrait(bCtx);
  spriteManager.images.set('siswa_basket_portrait', basketPortCvs);

  // --- 10. SISWI CASUAL (MAYA & PUTRI - KANTIN & GAZEBO) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawSiswiCasualFrame(ctx, f);
    spriteManager.images.set(`siswi_casual_${f}`, cvs);
  }
  const siswiPortCvs = document.createElement('canvas');
  siswiPortCvs.width = 128;
  siswiPortCvs.height = 128;
  const scCtx = siswiPortCvs.getContext('2d');
  scCtx.imageSmoothingEnabled = false;
  drawSiswiCasualPortrait(scCtx);
  spriteManager.images.set('siswi_casual_portrait', siswiPortCvs);

  // --- 11. RYZEN (KARAKTER UTAMA LAKI-LAKI - GUARANTEED FAIL-SAFE IN-MEMORY SPRITES) ---
  for (let f = 0; f < 4; f++) {
    const cvs = document.createElement('canvas');
    cvs.width = 64;
    cvs.height = 64;
    const ctx = cvs.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawRyzenFrame(ctx, f, 'down');
    spriteManager.images.set(`ryzen_idle_${f}`, cvs);
    spriteManager.images.set(`ryzen_down_${f}`, cvs);

    const cvsUp = document.createElement('canvas');
    cvsUp.width = 64;
    cvsUp.height = 64;
    const ctxUp = cvsUp.getContext('2d');
    ctxUp.imageSmoothingEnabled = false;
    drawRyzenFrame(ctxUp, f, 'up');
    spriteManager.images.set(`ryzen_up_${f}`, cvsUp);
  }
  const ryzenPortCvs = document.createElement('canvas');
  ryzenPortCvs.width = 128;
  ryzenPortCvs.height = 128;
  const ryCtx = ryzenPortCvs.getContext('2d');
  ryCtx.imageSmoothingEnabled = false;
  drawRyzenPortrait(ryCtx);
  spriteManager.images.set('ryzen_portrait', ryzenPortCvs);
  // Also register as fallback boy_portrait
  if (!spriteManager.images.has('boy_portrait')) {
    spriteManager.images.set('boy_portrait', ryzenPortCvs);
  }
}

// -------------------------------------------------------------
// DRAW BU RINA (GURU - SEATED AT TEACHER DESK)
// -------------------------------------------------------------
function drawTeacherFrame(ctx, frame) {
  // Natural subtle breathing on frame 1, natural gentle blink on frame 2
  const breathe = (frame === 1) ? -1 : 0;
  const isBlink = (frame === 2);
  const cx = 32;

  // Chair Backrest behind teacher (Framing her seated posture)
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 12, 26 + breathe, 24, 4); // Top backrest rail
  ctx.fillRect(cx - 12, 28 + breathe, 3, 18); // Left upright
  ctx.fillRect(cx + 9, 28 + breathe, 3, 18);  // Right upright

  // Shoes (Black teacher flat heels resting politely side-by-side on floor, perfectly stable)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 7, 57, 6, 3);
  ctx.fillRect(cx + 1, 57, 6, 3);
  ctx.fillStyle = '#334155';
  ctx.fillRect(cx - 6, 57, 4, 1);
  ctx.fillRect(cx + 2, 57, 4, 1);

  // Long Dark Navy / Batik Skirt seated neatly on chair
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 10, 44 + breathe, 20, 13);
  ctx.fillStyle = '#334155';
  ctx.fillRect(cx - 8, 44 + breathe, 3, 13);
  ctx.fillRect(cx + 5, 44 + breathe, 3, 13);

  // Blouse / Batik Blazer (Teal / Sage Green patterned teacher batik)
  ctx.fillStyle = '#0d9488'; // Teal batik base
  ctx.fillRect(cx - 8, 30 + breathe, 16, 15);
  // Batik geometric accents
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(cx - 6, 32 + breathe, 2, 2);
  ctx.fillRect(cx + 4, 32 + breathe, 2, 2);
  ctx.fillRect(cx - 4, 36 + breathe, 2, 2);
  ctx.fillRect(cx + 2, 36 + breathe, 2, 2);
  ctx.fillRect(cx - 6, 40 + breathe, 2, 2);
  ctx.fillRect(cx + 4, 40 + breathe, 2, 2);

  // ID Card Lanyard (Navy blue strap with white card)
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(cx - 1, 30 + breathe, 2, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 2, 36 + breathe, 4, 5);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 1, 37 + breathe, 2, 1);

  // Arms & Sleeves
  ctx.fillStyle = '#0f766e';
  ctx.fillRect(cx - 11, 31 + breathe, 3, 10);
  ctx.fillRect(cx + 8, 31 + breathe, 3, 10);

  // Lesson Binder / Teaching Book on Lap/Desk
  ctx.fillStyle = '#0284c7'; // Blue lesson plan book
  ctx.fillRect(cx - 7, 41 + breathe, 14, 5);
  ctx.fillStyle = '#ffffff'; // White pages
  ctx.fillRect(cx - 5, 42 + breathe, 10, 3);
  if (frame === 1 || frame === 3) {
    ctx.fillStyle = '#f59e0b'; // Gold teacher stylus/pen
    ctx.fillRect(cx + 4, 39 + breathe, 4, 2);
  }

  // Hands resting gently on lesson book
  ctx.fillStyle = '#f6d8b8';
  ctx.fillRect(cx - 8, 41 + breathe, 3, 3);
  ctx.fillRect(cx + 5, 41 + breathe, 3, 3);

  // Hijab Head & Chest (Drape)
  ctx.fillStyle = '#042f2e'; // Deep tosca hijab
  ctx.beginPath();
  ctx.ellipse(cx, 22 + breathe, 10, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  // Hijab chest drape
  ctx.fillStyle = '#0f766e';
  ctx.beginPath();
  ctx.moveTo(cx - 8, 26 + breathe);
  ctx.lineTo(cx, 34 + breathe);
  ctx.lineTo(cx + 8, 26 + breathe);
  ctx.fill();

  // Face oval
  ctx.fillStyle = '#f6d8b8';
  ctx.beginPath();
  ctx.ellipse(cx, 22 + breathe, 6, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyeglasses (Gold frames)
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 5, 20 + breathe, 4, 3);
  ctx.strokeRect(cx + 1, 20 + breathe, 4, 3);
  ctx.beginPath();
  ctx.moveTo(cx - 1, 21 + breathe);
  ctx.lineTo(cx + 1, 21 + breathe);
  ctx.stroke();

  // Eyes (Gentle blink on frame 2, open attentive gaze on other frames)
  if (isBlink) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 4, 22 + breathe, 2, 1);
    ctx.fillRect(cx + 2, 22 + breathe, 2, 1);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 4, 21 + breathe, 2, 2);
    ctx.fillRect(cx + 2, 21 + breathe, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 4, 21 + breathe, 1, 1);
    ctx.fillRect(cx + 2, 21 + breathe, 1, 1);
  }

  // Friendly Smile
  ctx.fillStyle = '#e11d48';
  ctx.fillRect(cx - 1, 25 + breathe, 2, 1);
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

// -------------------------------------------------------------
// DRAW IBU KANTIN (PENGELOLA KANTIN SEHAT SMKN 1 KATAPANG)
// Warm motherly Indonesian canteen vendor with colorful apron,
// terracotta/maroon hijab, rosy cheeks, and serving snacks/tea
// -------------------------------------------------------------
function drawIbuKantinFrame(ctx, frame) {
  const breathe = (frame === 1) ? -1 : 0;
  const isBlink = (frame === 2);
  const cx = 32;

  // Canteen kitchen shoes / clogs (Dark maroon-brown, resting on ground)
  ctx.fillStyle = '#451a03';
  ctx.fillRect(cx - 7, 57, 6, 3);
  ctx.fillRect(cx + 1, 57, 6, 3);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(cx - 6, 57, 4, 1);
  ctx.fillRect(cx + 2, 57, 4, 1);

  // Long comfortable dark brown skirt under apron
  ctx.fillStyle = '#451a03';
  ctx.fillRect(cx - 9, 46 + breathe, 18, 12);

  // Warm cream floral blouse base
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(cx - 9, 31 + breathe, 18, 15);

  // Chef / Canteen Apron (Bright Terracotta / Red-Orange)
  ctx.fillStyle = '#ea580c';
  // Apron bib (chest)
  ctx.fillRect(cx - 6, 33 + breathe, 12, 12);
  // Apron skirt (waist down)
  ctx.fillRect(cx - 8, 43 + breathe, 16, 12);
  // Apron waist ties / waistband
  ctx.fillStyle = '#c2410c';
  ctx.fillRect(cx - 9, 42 + breathe, 18, 2);

  // Front Apron Pocket (White cloth pocket for order notes/money)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 4, 46 + breathe, 8, 6);
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeRect(cx - 4, 46 + breathe, 8, 6);
  // Red order pen in apron pocket
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx + 1, 44 + breathe, 1, 3);

  // Hanging hand towel on left hip (Authentic kantin vendor serbet)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 10, 44 + breathe, 2, 8);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - 10, 50 + breathe, 2, 1);

  // Arms & Sleeves (Cream blouse rolled up at wrists)
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(cx - 11, 32 + breathe, 3, 9);
  ctx.fillRect(cx + 8, 32 + breathe, 3, 9);
  // Skin forearms & hands
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 11, 41 + breathe, 3, 3);
  ctx.fillRect(cx + 8, 41 + breathe, 3, 3);

  // Canteen Prop in Hands: Stainless tray with Iced Tea (Es Teh Manis)
  // Serving tray
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(cx - 6, 40 + breathe, 12, 3);
  // Glass of Es Teh Manis
  ctx.fillStyle = '#b45309'; // Iced amber tea
  ctx.fillRect(cx - 2, 35 + breathe, 4, 5);
  // Ice cube highlight
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 1, 36 + breathe, 1, 1);
  // Green straw
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(cx + 1, 33 + breathe, 1, 3);

  // Hijab: Warm Terracotta / Maroon (Authentic motherly hijab)
  ctx.fillStyle = '#9f1239'; // Deep maroon-coral hijab
  ctx.beginPath();
  ctx.ellipse(cx, 22 + breathe, 10, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hijab Drape over chest (Tucked neatly into apron bib)
  ctx.fillStyle = '#be123c';
  ctx.beginPath();
  ctx.moveTo(cx - 8, 25 + breathe);
  ctx.lineTo(cx, 33 + breathe);
  ctx.lineTo(cx + 8, 25 + breathe);
  ctx.fill();

  // Face oval (Warm, motherly, kindly Indonesian skin tone)
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 22 + breathe, 6, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Rosy cheeks (Friendly motherly blush)
  ctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
  ctx.fillRect(cx - 5, 23 + breathe, 2, 2);
  ctx.fillRect(cx + 3, 23 + breathe, 2, 2);

  // Eyes (Kindly warm gaze, blinking on frame 2)
  if (isBlink) {
    ctx.fillStyle = '#451a03';
    ctx.fillRect(cx - 4, 22 + breathe, 2, 1);
    ctx.fillRect(cx + 2, 22 + breathe, 2, 1);
  } else {
    ctx.fillStyle = '#451a03';
    ctx.fillRect(cx - 4, 21 + breathe, 2, 2);
    ctx.fillRect(cx + 2, 21 + breathe, 2, 2);
    // Eye shine
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 4, 21 + breathe, 1, 1);
    ctx.fillRect(cx + 2, 21 + breathe, 1, 1);
  }

  // Cheerful Welcoming Smile
  ctx.fillStyle = '#e11d48';
  ctx.fillRect(cx - 2, 25 + breathe, 4, 1);
}

function drawIbuKantinPortrait(ctx) {
  // Warm Canteen Kitchen Gradient Background
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#7c2d12');
  grad.addColorStop(0.6, '#431407');
  grad.addColorStop(1, '#1c1917');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  // Border frame (Warm Golden Amber)
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;

  // Shoulders & Cream Blouse
  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.ellipse(cx, 118, 50, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // Orange / Terracotta Apron Front
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.moveTo(cx - 24, 98);
  ctx.lineTo(cx + 24, 98);
  ctx.lineTo(cx + 30, 128);
  ctx.lineTo(cx - 30, 128);
  ctx.closePath();
  ctx.fill();

  // Apron Pocket with Order Pad & Pen
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 14, 106, 28, 18);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 14, 106, 28, 18);
  // Pocket notes lines
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(cx - 10, 112, 16, 2);
  ctx.fillRect(cx - 10, 116, 20, 2);
  // Red pen in pocket
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx + 6, 102, 3, 7);

  // Hijab Drape over Shoulders (Warm Maroon/Coral)
  ctx.fillStyle = '#9f1239';
  ctx.beginPath();
  ctx.moveTo(cx - 32, 80);
  ctx.quadraticCurveTo(cx, 104, cx + 32, 80);
  ctx.quadraticCurveTo(cx, 95, cx - 32, 80);
  ctx.fill();

  // Hijab Head Outer Shell
  ctx.fillStyle = '#be123c';
  ctx.beginPath();
  ctx.ellipse(cx, 54, 31, 37, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#9f1239';
  ctx.beginPath();
  ctx.ellipse(cx - 2, 54, 29, 35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Inner Hijab Cap
  ctx.fillStyle = '#881337';
  ctx.beginPath();
  ctx.ellipse(cx, 44, 21, 23, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face (Warm Indonesian Skin Tone)
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 57, 19, 21, 0, 0, Math.PI * 2);
  ctx.fill();

  // Rosy Cheeks Blush
  ctx.fillStyle = 'rgba(244, 63, 94, 0.32)';
  ctx.beginPath();
  ctx.ellipse(cx - 11, 62, 6, 4, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 11, 62, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Warm Friendly Eyes (Kind, crinkled smile)
  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.ellipse(cx - 8, 54, 3, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 8, 54, 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  // Eye gleams
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 9, 52, 2, 2);
  ctx.fillRect(cx + 7, 52, 2, 2);

  // Soft Eyebrows
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 13, 48);
  ctx.quadraticCurveTo(cx - 8, 45, cx - 3, 48);
  ctx.moveTo(cx + 3, 48);
  ctx.quadraticCurveTo(cx + 8, 45, cx + 13, 48);
  ctx.stroke();

  // Gentle Nose
  ctx.fillStyle = '#fba666';
  ctx.fillRect(cx - 1, 57, 3, 3);

  // Motherly Warm Smile
  ctx.fillStyle = '#e11d48';
  ctx.beginPath();
  ctx.arc(cx, 65, 7, 0.15 * Math.PI, 0.85 * Math.PI, false);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#e11d48';
  ctx.stroke();

  // Dimples
  ctx.fillStyle = 'rgba(225, 29, 72, 0.5)';
  ctx.fillRect(cx - 9, 64, 2, 2);
  ctx.fillRect(cx + 8, 64, 2, 2);

  // Name Tag Plaque at Bottom
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('IBU KANTIN', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// 6. DRAW PEDAGANG KAKI LIMA (MANG UJANG - CILOK & BATAGOR)
// -------------------------------------------------------------
function drawPedagangKakiLimaFrame(ctx, frame) {
  const breathe = (frame === 1) ? -1 : 0;
  const cx = 32;

  // Sepatu sandal / selop santai
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 7, 57, 6, 3);
  ctx.fillRect(cx + 1, 57, 6, 3);

  // Celana panjang bahan gelap
  ctx.fillStyle = '#334155';
  ctx.fillRect(cx - 7, 45 + breathe, 6, 12);
  ctx.fillRect(cx + 1, 45 + breathe, 6, 12);

  // Kaos polo / kemeja bergaris abang cilok (Kuning-Krem garis oranye)
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(cx - 8, 30 + breathe, 16, 16);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(cx - 8, 34 + breathe, 16, 2);
  ctx.fillRect(cx - 8, 38 + breathe, 16, 2);
  ctx.fillRect(cx - 8, 42 + breathe, 16, 2);

  // Apron pedagang putih/krem
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 6, 36 + breathe, 12, 16);
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeRect(cx - 6, 36 + breathe, 12, 16);

  // Handuk kecil melingkar di leher (Khas abang jualan keliling)
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(cx - 8, 28 + breathe, 3, 10);
  ctx.fillRect(cx + 5, 28 + breathe, 3, 10);
  ctx.fillRect(cx - 6, 27 + breathe, 12, 3);

  // Lengan & Tangan
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(cx - 10, 31 + breathe, 3, 8);
  ctx.fillRect(cx + 7, 31 + breathe, 3, 8);
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 10, 39 + breathe, 3, 4);
  ctx.fillRect(cx + 7, 39 + breathe, 3, 4);

  // Mangkok cilok / centong saus di tangan
  ctx.fillStyle = '#ef4444'; // Mangkok plastik merah
  ctx.fillRect(cx + 6, 38 + breathe, 7, 5);
  ctx.fillStyle = '#b45309'; // Bumbu kacang
  ctx.fillRect(cx + 7, 37 + breathe, 5, 2);
  ctx.fillStyle = '#fef08a'; // Tusuk cilok bambu
  ctx.fillRect(cx - 9, 36 + breathe, 2, 7);

  // Leher & Kepala
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 3, 24 + breathe, 6, 5);
  ctx.beginPath();
  ctx.ellipse(cx, 19 + breathe, 7, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Kumis tipis ramah pedagang
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 4, 21 + breathe, 8, 1.5);
  // Senyum
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 2, 23 + breathe, 4, 1);

  // Mata ramah
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 4, 18 + breathe, 2, 2);
  ctx.fillRect(cx + 2, 18 + breathe, 2, 2);

  // Peci hitam / topi pedagang
  ctx.fillStyle = '#090d16';
  ctx.fillRect(cx - 8, 11 + breathe, 16, 6);
  ctx.fillStyle = '#d97706'; // Aksen garis emas di peci
  ctx.fillRect(cx - 8, 16 + breathe, 16, 1);
}

function drawPedagangKakiLimaPortrait(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#854d0e');
  grad.addColorStop(1, '#1c1917');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;
  // Baju & Apron
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.ellipse(cx, 118, 52, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 22, 95, 44, 33);
  // Handuk leher biru
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(cx - 30, 80, 10, 36);
  ctx.fillRect(cx + 20, 80, 10, 36);
  // Wajah
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 60, 22, 23, 0, 0, Math.PI * 2);
  ctx.fill();
  // Kumis
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 10, 68, 20, 4);
  // Senyum
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(cx, 74, 6, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.fill();
  // Mata
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx - 8, 55, 3, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 8, 55, 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  // Peci
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 24, 34, 48, 16);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 24, 48, 48, 3);

  // Plaque
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('MANG UJANG (CILOK)', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// 7. DRAW DRIVER OJOL (BANG DEDI - OJEK ONLINE)
// -------------------------------------------------------------
function drawOjolFrame(ctx, frame) {
  const breathe = (frame === 1) ? -1 : 0;
  const cx = 32;

  // Sepatu boots motor hitam
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 7, 57, 6, 3);
  ctx.fillRect(cx + 1, 57, 6, 3);

  // Celana jeans hitam/gelap
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 7, 45 + breathe, 6, 12);
  ctx.fillRect(cx + 1, 45 + breathe, 6, 12);

  // Jaket Hijau Ojol Ikonik
  ctx.fillStyle = '#16a34a'; // Hijau ojol terang
  ctx.fillRect(cx - 9, 29 + breathe, 18, 17);
  // Strip hitam & reflektor silver di dada/lengan jaket
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 9, 35 + breathe, 18, 4);
  ctx.fillStyle = '#f8fafc'; // Reflektor silver
  ctx.fillRect(cx - 9, 39 + breathe, 18, 1.5);

  // Lengan & Tangan
  ctx.fillStyle = '#15803d';
  ctx.fillRect(cx - 11, 30 + breathe, 3, 9);
  ctx.fillRect(cx + 8, 30 + breathe, 3, 9);
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 11, 39 + breathe, 3, 3);
  ctx.fillRect(cx + 8, 39 + breathe, 3, 3);

  // Smartphone ojol di tangan kanan
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx + 8, 36 + breathe, 4, 7);
  ctx.fillStyle = '#38bdf8'; // Layar HP menyala ada peta/orderan
  ctx.fillRect(cx + 9, 37 + breathe, 2, 5);

  // Leher & Wajah
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 3, 24 + breathe, 6, 5);
  ctx.beginPath();
  ctx.ellipse(cx, 19 + breathe, 7, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mata & Senyum ramah
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 4, 18 + breathe, 2, 2);
  ctx.fillRect(cx + 2, 18 + breathe, 2, 2);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 2, 22 + breathe, 4, 1.5);

  // Helm Hijau Ojol
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.arc(cx, 16 + breathe, 8, Math.PI, 0, false);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 8, 15 + breathe, 16, 2.5);
  ctx.fillStyle = '#f8fafc'; // Kaca helm visor berkilau
  ctx.fillRect(cx - 5, 13 + breathe, 10, 2);
}

function drawOjolPortrait(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#14532d');
  grad.addColorStop(1, '#052e16');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;
  // Jaket Hijau Ojol
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.ellipse(cx, 118, 52, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 30, 96, 60, 12);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 30, 108, 60, 3);

  // Wajah
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 60, 22, 23, 0, 0, Math.PI * 2);
  ctx.fill();
  // Mata
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx - 8, 56, 3, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 8, 56, 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  // Senyum
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(cx, 68, 6, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.fill();
  // Helm Hijau Ojol
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.arc(cx, 44, 25, Math.PI, 0, false);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 25, 42, 50, 7);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(cx - 18, 36, 36, 5);

  // Plaque
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#4ade80';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BANG DEDI (OJOL)', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// 8. DRAW WARGA SEKITAR (PAK YANTO)
// -------------------------------------------------------------
function drawWargaFrame(ctx, frame) {
  const breathe = (frame === 1) ? -1 : 0;
  const cx = 32;

  // Sandal kulit / pantofel santai
  ctx.fillStyle = '#451a03';
  ctx.fillRect(cx - 7, 57, 6, 3);
  ctx.fillRect(cx + 1, 57, 6, 3);

  // Celana bahan krem/khaki
  ctx.fillStyle = '#d6d3d1';
  ctx.fillRect(cx - 7, 45 + breathe, 6, 12);
  ctx.fillRect(cx + 1, 45 + breathe, 6, 12);

  // Baju Batik Katapang / Kemeja Etnik Santai (Coklat Marun bermotif)
  ctx.fillStyle = '#7c2d12';
  ctx.fillRect(cx - 8, 30 + breathe, 16, 16);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(cx - 6, 34 + breathe, 3, 3);
  ctx.fillRect(cx + 3, 34 + breathe, 3, 3);
  ctx.fillRect(cx - 2, 39 + breathe, 4, 3);

  // Lengan & Tangan
  ctx.fillStyle = '#7c2d12';
  ctx.fillRect(cx - 10, 31 + breathe, 3, 8);
  ctx.fillRect(cx + 7, 31 + breathe, 3, 8);
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 10, 39 + breathe, 3, 4);
  ctx.fillRect(cx + 7, 39 + breathe, 3, 4);

  // Wajah & Kacamata
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 3, 24 + breathe, 6, 5);
  ctx.beginPath();
  ctx.ellipse(cx, 19 + breathe, 7, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Kacamata bingkai emas
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 5, 17 + breathe, 4, 3);
  ctx.strokeRect(cx + 1, 17 + breathe, 4, 3);

  // Senyum bijak
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(cx - 2, 22 + breathe, 4, 1.5);

  // Peci Hitam Warga
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 7, 11 + breathe, 14, 6);
}

function drawWargaPortrait(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#431407');
  grad.addColorStop(1, '#1c1917');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;
  // Baju Batik
  ctx.fillStyle = '#7c2d12';
  ctx.beginPath();
  ctx.ellipse(cx, 118, 52, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fde047';
  ctx.fillRect(cx - 12, 100, 6, 6);
  ctx.fillRect(cx + 6, 100, 6, 6);

  // Wajah
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 60, 22, 23, 0, 0, Math.PI * 2);
  ctx.fill();
  // Kacamata
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - 15, 52, 12, 9);
  ctx.strokeRect(cx + 3, 52, 12, 9);
  ctx.beginPath();
  ctx.moveTo(cx - 3, 56);
  ctx.lineTo(cx + 3, 56);
  ctx.stroke();

  // Senyum
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(cx, 71, 6, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.fill();

  // Peci
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 22, 34, 44, 16);

  // Plaque
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PAK YANTO (WARGA)', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// 9. DRAW SISWA BASKET (DONI)
// -------------------------------------------------------------
function drawSiswaBasketFrame(ctx, frame) {
  const breathe = (frame === 1) ? -1 : 0;
  const bounce = (frame % 2 === 1) ? 2 : 0;
  const cx = 32;

  // Sepatu basket sporty tinggi (Merah-Putih)
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx - 8, 56, 7, 4);
  ctx.fillRect(cx + 1, 56, 7, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 7, 58, 5, 1.5);
  ctx.fillRect(cx + 2, 58, 5, 1.5);

  // Celana basket pendek SMKN 1 Katapang (Navy dengan garis merah)
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(cx - 8, 44 + breathe, 7, 12);
  ctx.fillRect(cx + 1, 44 + breathe, 7, 12);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 9, 44 + breathe, 1, 12);
  ctx.fillRect(cx + 8, 44 + breathe, 1, 12);

  // Jersey basket (Merah Marun dengan Nomor 7)
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(cx - 8, 29 + breathe, 16, 16);
  // Nomor 7 di dada
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px sans-serif';
  ctx.fillText('7', cx - 2, 40 + breathe);

  // Lengan & Tangan
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 10, 30 + breathe, 3, 10);
  ctx.fillRect(cx + 7, 30 + breathe, 3, 10);

  // Bola Basket di tangan / dipantulkan
  ctx.fillStyle = '#ea580c'; // Warna bola basket oranye
  ctx.beginPath();
  ctx.arc(cx + 12, 44 + breathe + bounce, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Wajah & Rambut sporty
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 3, 24 + breathe, 6, 5);
  ctx.beginPath();
  ctx.ellipse(cx, 18 + breathe, 7, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mata & Senyum berenergi
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 4, 17 + breathe, 2, 2);
  ctx.fillRect(cx + 2, 17 + breathe, 2, 2);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 2, 21 + breathe, 4, 1.5);

  // Headband basket merah & rambut hitam jabrik
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 7, 10 + breathe, 14, 5);
  ctx.fillStyle = '#ef4444'; // Headband
  ctx.fillRect(cx - 7, 14 + breathe, 14, 2.5);
}

function drawSiswaBasketPortrait(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#1e3a8a');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;
  // Jersey Marun
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath();
  ctx.ellipse(cx, 118, 52, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('7', cx, 118);

  // Wajah
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 60, 22, 23, 0, 0, Math.PI * 2);
  ctx.fill();
  // Mata
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx - 8, 56, 3, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 8, 56, 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  // Senyum
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(cx, 68, 7, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.fill();
  // Rambut & Headband
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 24, 32, 48, 16);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 24, 46, 48, 6);

  // Plaque
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#fca5a5';
  ctx.font = 'bold 9px monospace';
  ctx.fillText('DONI (BASKET RPL)', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// 10. DRAW SISWI CASUAL (MAYA & PUTRI - KANTIN & GAZEBO)
// -------------------------------------------------------------
function drawSiswiCasualFrame(ctx, frame) {
  const breathe = (frame === 1) ? -1 : 0;
  const isBlink = (frame === 2);
  const cx = 32;

  // Sepatu kets putih siswi
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 6, 57, 5, 3);
  ctx.fillRect(cx + 1, 57, 5, 3);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(cx - 6, 59, 5, 1);
  ctx.fillRect(cx + 1, 59, 5, 1);

  // Rok panjang abu-abu SMK
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx - 8, 44 + breathe, 16, 14);

  // Rompi Rajut Tosca Pastel & Kemeja Putih
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 7, 30 + breathe, 14, 15);
  ctx.fillStyle = '#0d9488'; // Rompi tosca
  ctx.fillRect(cx - 7, 33 + breathe, 14, 12);
  ctx.fillStyle = '#f8fafc'; // Kerah kemeja V-neck
  ctx.beginPath();
  ctx.moveTo(cx - 4, 33 + breathe);
  ctx.lineTo(cx, 39 + breathe);
  ctx.lineTo(cx + 4, 33 + breathe);
  ctx.fill();

  // Dasi sekolah biru muda
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - 1, 35 + breathe, 2, 6);

  // Lengan & Tangan
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 9, 31 + breathe, 2, 9);
  ctx.fillRect(cx + 7, 31 + breathe, 2, 9);
  ctx.fillStyle = '#fed7aa';
  ctx.fillRect(cx - 9, 40 + breathe, 2, 3);
  ctx.fillRect(cx + 7, 40 + breathe, 2, 3);

  // Catatan binder / buku kecil di tangan
  ctx.fillStyle = '#f472b6'; // Buku pink pastel
  ctx.fillRect(cx + 6, 38 + breathe, 5, 6);

  // Wajah & Hijab Tosca Lembut
  ctx.fillStyle = '#0f766e'; // Hijab tosca
  ctx.beginPath();
  ctx.ellipse(cx, 20 + breathe, 8, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 20 + breathe, 5, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pipi merona
  ctx.fillStyle = 'rgba(244, 63, 94, 0.3)';
  ctx.fillRect(cx - 4, 21 + breathe, 2, 1.5);
  ctx.fillRect(cx + 2, 21 + breathe, 2, 1.5);

  // Mata manis
  if (isBlink) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 3, 20 + breathe, 2, 1);
    ctx.fillRect(cx + 1, 20 + breathe, 2, 1);
  } else {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 3, 19 + breathe, 2, 2);
    ctx.fillRect(cx + 1, 19 + breathe, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 3, 19 + breathe, 1, 1);
    ctx.fillRect(cx + 1, 19 + breathe, 1, 1);
  }

  // Senyum ramah
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(cx - 1.5, 23 + breathe, 3, 1);
}

function drawSiswiCasualPortrait(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#0f766e');
  grad.addColorStop(1, '#115e59');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;
  // Rompi & Seragam
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.ellipse(cx, 118, 52, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(cx - 16, 92);
  ctx.lineTo(cx, 110);
  ctx.lineTo(cx + 16, 92);
  ctx.fill();
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - 3, 96, 6, 18);

  // Hijab & Wajah
  ctx.fillStyle = '#0f766e';
  ctx.beginPath();
  ctx.ellipse(cx, 58, 25, 27, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 59, 17, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pipi
  ctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
  ctx.beginPath();
  ctx.ellipse(cx - 9, 64, 4, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 9, 64, 4, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mata
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx - 7, 56, 3, 3.5, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 7, 56, 3, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 8, 54, 2, 2);
  ctx.fillRect(cx + 6, 54, 2, 2);

  // Senyum
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.arc(cx, 68, 5, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.fill();

  // Plaque
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#5eead4';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SISWI SMKN 1 KATAPANG', cx, 117);
  ctx.textAlign = 'start';
}

// -------------------------------------------------------------
// 11. DRAW RYZEN (KARAKTER UTAMA LAKI-LAKI - ROCK SOLID FALLBACK)
// -------------------------------------------------------------
function drawRyzenFrame(ctx, frame, facing = 'down') {
  const breathe = (frame === 1) ? -1 : 0;
  const legOffset = (frame === 1) ? 2 : (frame === 3 ? -2 : 0);
  const cx = 32;

  // Sepatu Kets Sporty SMK
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(cx - 7, 57 + (facing === 'up' ? -legOffset : legOffset), 6, 3);
  ctx.fillRect(cx + 1, 57 - (facing === 'up' ? -legOffset : legOffset), 6, 3);
  ctx.fillStyle = '#38bdf8'; // Aksen biru sporty
  ctx.fillRect(cx - 6, 57 + (facing === 'up' ? -legOffset : legOffset), 4, 1);
  ctx.fillRect(cx + 2, 57 - (facing === 'up' ? -legOffset : legOffset), 4, 1);

  // Celana Panjang Abu-Abu SMK
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx - 7, 44 + breathe, 6, 13);
  ctx.fillRect(cx + 1, 44 + breathe, 6, 13);

  // Kemeja Putih Seragam SMK
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cx - 8, 30 + breathe, 16, 15);

  if (facing === 'down') {
    // Dasi Abu-Abu Bergaris Rapi
    ctx.fillStyle = '#64748b';
    ctx.fillRect(cx - 2, 32 + breathe, 4, 11);
    ctx.fillStyle = '#0284c7'; // Strip biru muda di dasi
    ctx.fillRect(cx - 1, 35 + breathe, 2, 2);
    // Saku & Badge OSIS SMKN 1 Katapang
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(cx - 6, 36 + breathe, 3, 4);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(cx - 5, 37 + breathe, 1, 2);

    // Lengan & Tangan
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cx - 10, 31 + breathe, 3, 8);
    ctx.fillRect(cx + 7, 31 + breathe, 3, 8);
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(cx - 10, 39 + breathe, 3, 3);
    ctx.fillRect(cx + 7, 39 + breathe, 3, 3);

    // Leher & Wajah
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(cx - 3, 24 + breathe, 6, 6);
    ctx.beginPath();
    ctx.ellipse(cx, 19 + breathe, 7, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mata Keren & Fokus
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(cx - 4, 18 + breathe, 2, 2);
    ctx.fillRect(cx + 2, 18 + breathe, 2, 2);
    ctx.fillStyle = '#38bdf8'; // Iris biru keren
    ctx.fillRect(cx - 3, 18 + breathe, 1, 1);
    ctx.fillRect(cx + 3, 18 + breathe, 1, 1);

    // Senyum percaya diri
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 2, 22 + breathe, 4, 1.5);

    // Rambut Coklat Tua / Hitam Bergaya Anime RPL
    ctx.fillStyle = '#1e1b2e';
    ctx.fillRect(cx - 8, 11 + breathe, 16, 7);
    ctx.fillRect(cx - 9, 14 + breathe, 2, 6);
    ctx.fillRect(cx + 7, 14 + breathe, 2, 6);
    // Poni keren
    ctx.beginPath();
    ctx.moveTo(cx - 6, 17 + breathe);
    ctx.lineTo(cx - 3, 20 + breathe);
    ctx.lineTo(cx, 16 + breathe);
    ctx.lineTo(cx + 3, 20 + breathe);
    ctx.lineTo(cx + 6, 17 + breathe);
    ctx.fill();
  } else {
    // Tampak Belakang (Facing UP)
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(cx - 8, 30 + breathe, 16, 2); // Garis kerah belakang
    // Lengan
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cx - 10, 31 + breathe, 3, 8);
    ctx.fillRect(cx + 7, 31 + breathe, 3, 8);
    // Kepala belakang (Rambut lebat)
    ctx.fillStyle = '#1e1b2e';
    ctx.beginPath();
    ctx.ellipse(cx, 18 + breathe, 8, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(cx - 7, 21 + breathe, 14, 5); // Tengkuk rambut
  }
}

function drawRyzenPortrait(ctx) {
  const grad = ctx.createLinearGradient(0, 0, 128, 128);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.6, '#1e293b');
  grad.addColorStop(1, '#0284c7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 124, 124);

  const cx = 64;
  // Bahu & Kemeja Putih
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(cx, 118, 52, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  // Dasi Abu-Abu
  ctx.fillStyle = '#64748b';
  ctx.fillRect(cx - 6, 92, 12, 34);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - 4, 102, 8, 4);

  // Wajah
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(cx, 60, 22, 23, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mata Keren
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(cx - 8, 56, 3.5, 3.5, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 8, 56, 3.5, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(cx - 7, 55, 2, 2);
  ctx.fillRect(cx + 7, 55, 2, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 9, 54, 1.5, 1.5);
  ctx.fillRect(cx + 7, 54, 1.5, 1.5);

  // Alis tegas
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 13, 49);
  ctx.lineTo(cx - 3, 50);
  ctx.moveTo(cx + 3, 50);
  ctx.lineTo(cx + 13, 49);
  ctx.stroke();

  // Senyum percaya diri
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(cx, 68, 6, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.fill();

  // Rambut Keren
  ctx.fillStyle = '#1e1b2e';
  ctx.beginPath();
  ctx.arc(cx, 44, 25, Math.PI, 0, false);
  ctx.fill();
  ctx.fillRect(cx - 25, 42, 50, 8);
  // Poni anime
  ctx.beginPath();
  ctx.moveTo(cx - 20, 50);
  ctx.lineTo(cx - 10, 62);
  ctx.lineTo(cx - 2, 50);
  ctx.lineTo(cx + 8, 62);
  ctx.lineTo(cx + 18, 50);
  ctx.fill();

  // Plaque
  ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
  ctx.fillRect(8, 104, 112, 18);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 104, 112, 18);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RYZEN (PROGRAMMER)', cx, 117);
  ctx.textAlign = 'start';
}
