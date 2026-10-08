// Beyond The Bell - World & Map Data

export const MAPS = {
  courtyard: {
    id: 'courtyard',
    name: 'Halaman & Kantin SMKN 1 Katapang',
    width: 2600,
    height: 1700,
    spawnX: 1300,
    spawnY: 1540,
    bgType: 'tile_courtyard',
    bgImage: null,
    doors: [
      {
        x: 1220,
        y: 1610,
        w: 160,
        h: 60,
        targetMap: 'classroom',
        targetX: 640,
        targetY: 135,
        label: 'Masuk ke Ruang Kelas RPL'
      },
      {
        x: 2290,
        y: 350,
        w: 80,
        h: 45,
        targetMap: 'canteen',
        targetX: 550,
        targetY: 440,
        label: 'Masuk ke Kantin Indoor'
      }
    ],
    npcs: [
      {
        id: 'satpam',
        name: 'Pak Satpam',
        role: 'Keamanan Sekolah',
        x: 1400,
        y: 180,
        w: 100,
        h: 100,
        spriteName: 'satpam',
        facing: 'down',
        interactionRadius: 90,
        dialogueId: 'satpam_intro'
      },
      {
        id: 'ibu_kantin',
        name: 'Ibu Kantin',
        role: 'Pengelola Kantin Sehat',
        x: 2040,
        y: 410,
        w: 100,
        h: 100,
        spriteName: 'ibu_kantin',
        facing: 'down',
        interactionRadius: 90,
        dialogueId: 'ibu_kantin_intro'
      },
      {
        id: 'budi',
        name: 'Budi',
        role: 'Murid RPL Kelas XII',
        x: 500,
        y: 780,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'budi_intro'
      },
      // --- NPC LUAR GERBANG SEKOLAH ---
      {
        id: 'mang_ujang',
        name: 'Mang Ujang',
        role: 'Pedagang Cilok Luar Gerbang',
        x: 1140,
        y: 45,
        w: 100,
        h: 100,
        spriteName: 'pedagang_kaki_lima',
        facing: 'down',
        interactionRadius: 100,
        dialogueId: 'mang_ujang_intro'
      },
      {
        id: 'bang_dedi',
        name: 'Bang Dedi',
        role: 'Driver Ojol Luar Gerbang',
        x: 1390,
        y: 45,
        w: 100,
        h: 100,
        spriteName: 'ojol',
        facing: 'down',
        interactionRadius: 100,
        dialogueId: 'bang_dedi_intro'
      },
      {
        id: 'pak_yanto',
        name: 'Pak Yanto',
        role: 'Warga Sekitar Katapang',
        x: 1030,
        y: 45,
        w: 100,
        h: 100,
        spriteName: 'warga',
        facing: 'down',
        interactionRadius: 100,
        dialogueId: 'pak_yanto_intro'
      },
      // --- NPC RAMAI DALAM AREA SEKOLAH ---
      {
        id: 'doni',
        name: 'Doni',
        role: 'Atlet Basket RPL',
        x: 460,
        y: 1020,
        w: 100,
        h: 100,
        spriteName: 'siswa_basket',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'doni_basket'
      },
      {
        id: 'fajar',
        name: 'Fajar',
        role: 'Murid RPL (Tim Basket)',
        x: 550,
        y: 1020,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'left',
        interactionRadius: 85,
        dialogueId: 'fajar_basket'
      },
      {
        id: 'nisa',
        name: 'Nisa',
        role: 'Siswi RPL (Meja Kantin 1)',
        x: 1880,
        y: 480,
        w: 100,
        h: 100,
        spriteName: 'siti',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'nisa_kantin'
      },
      {
        id: 'maya',
        name: 'Maya',
        role: 'Siswi RPL (Meja Kantin 2)',
        x: 2110,
        y: 480,
        w: 100,
        h: 100,
        spriteName: 'siswi_casual',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'maya_kantin'
      },
      {
        id: 'andi',
        name: 'Andi',
        role: 'Murid RPL (Baca Mading)',
        x: 1420,
        y: 870,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'up',
        interactionRadius: 85,
        dialogueId: 'andi_mading'
      },
      {
        id: 'putri',
        name: 'Putri',
        role: 'Siswi UI/UX (Gazebo Santai)',
        x: 2320,
        y: 130,
        w: 100,
        h: 100,
        spriteName: 'siswi_casual',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'putri_gazebo'
      },
      {
        id: 'farhan',
        name: 'Farhan',
        role: 'Murid RPL (Ngadem Pohon)',
        x: 340,
        y: 680,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'farhan_pohon'
      }
    ],
    items: [
      {
        id: 'es_teh',
        name: 'Es Teh Manis Segar',
        x: 1880,
        y: 530,
        w: 24,
        h: 24,
        icon: '🧋',
        desc: 'Es teh manis dingin segar pelepas dahaga saat jam istirahat!',
        collected: false
      },
      {
        id: 'roti_bakar',
        name: 'Roti Bakar Coklat Keju',
        x: 2100,
        y: 530,
        w: 24,
        h: 24,
        icon: '🍞',
        desc: 'Roti bakar hangat renyah favorit siswa SMKN 1 Katapang.',
        collected: false
      }
    ],
    props: [
      // Pos Satpam di samping gerbang atas
      { type: 'building', x: 1440, y: 80, w: 160, h: 100, label: 'Pos Satpam', color: '#334155' },
      // Tiang Bendera Merah Putih
      { type: 'flagpole', x: 1300, y: 880, w: 20, h: 50, label: 'Tiang Bendera' },
      // Kantin Kios & Bangunan
      { type: 'canteen_building', x: 1800, y: 320, w: 580, h: 120, label: 'Kantin SMKN 1 Katapang' },
      { type: 'dining_table', x: 1820, y: 520, w: 140, h: 55, label: 'Meja Kantin 1' },
      { type: 'dining_table', x: 2060, y: 520, w: 140, h: 55, label: 'Meja Kantin 2' },
      { type: 'dining_table', x: 2280, y: 520, w: 140, h: 55, label: 'Meja Kantin 3' },
      // Fasilitas Lapangan & Gazebo
      { type: 'hoop', x: 200, y: 1030, w: 30, h: 40, label: 'Ring Basket Barat' },
      { type: 'hoop', x: 800, y: 1030, w: 30, h: 40, label: 'Ring Basket Timur' },
      { type: 'gazebo', x: 2280, y: 120, w: 140, h: 100, label: 'Gazebo Santai' },
      { type: 'warehouse', x: 1920, y: 1160, w: 380, h: 140, label: 'Gudang Arsip Sekolah' },
      { type: 'infoboard', x: 1400, y: 870, w: 80, h: 50, label: 'Mading Sekolah' },
      // Pepohonan Rindang Luas & Semak Labirin Barat Laut
      { type: 'tree', x: 120, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 280, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 440, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 600, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 760, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 920, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 100, y: 640, w: 80, h: 90 },
      { type: 'tree', x: 920, y: 640, w: 80, h: 90 },
      { type: 'tree', x: 100, y: 1450, w: 90, h: 100 },
      { type: 'tree', x: 950, y: 1450, w: 90, h: 100 },
      { type: 'tree', x: 1720, y: 180, w: 90, h: 100 },
      { type: 'tree', x: 2460, y: 180, w: 90, h: 100 },
      { type: 'tree', x: 2460, y: 850, w: 90, h: 100 },
      { type: 'tree', x: 1750, y: 1450, w: 90, h: 100 },
      { type: 'tree', x: 2450, y: 1450, w: 90, h: 100 }
    ],
    colliders: [
      // Batas Atas (Dinding Luar Kiri & Kanan Gerbang, dengan bukaan gerbang di x: 1210..1380)
      { x: 0, y: 0, w: 1210, h: 90 },
      { x: 1390, y: 0, w: 1210, h: 90 },
      { x: 1210, y: 0, w: 180, h: 45 }, // Palang pagar gerbang luar sekolah
      // Batas Tepi Kiri & Kanan
      { x: 0, y: 0, w: 50, h: 1700 },
      { x: 2550, y: 0, w: 50, h: 1700 },
      // Batas Bawah (Dinding Depan Gedung Sekolah)
      { x: 0, y: 1640, w: 1220, h: 60 },
      { x: 1380, y: 1640, w: 1220, h: 60 },
      // Pos Satpam
      { x: 1440, y: 80, w: 160, h: 95 },
      // Bangunan Kios Kantin
      { x: 1800, y: 320, w: 580, h: 115 },
      // Meja Kantin
      { x: 1820, y: 520, w: 140, h: 50 },
      { x: 2060, y: 520, w: 140, h: 50 },
      { x: 2280, y: 520, w: 140, h: 50 },
      // Gudang Arsip & Gazebo
      { x: 1920, y: 1160, w: 380, h: 135 },
      { x: 2280, y: 120, w: 140, h: 95 },
      // Labirin Semak Barat Laut
      { x: 80, y: 80, w: 950, h: 35 },
      { x: 80, y: 610, w: 750, h: 35 },
      { x: 220, y: 80, w: 35, h: 420 },
      { x: 380, y: 200, w: 35, h: 420 },
      { x: 540, y: 80, w: 35, h: 420 },
      { x: 700, y: 200, w: 35, h: 420 }
    ]
  },

  hallway: {
    id: 'hallway',
    name: 'Koridor Pameran Produk RPL',
    width: 1100,
    height: 520,
    spawnX: 550,
    spawnY: 420,
    bgType: 'hallway_scenery',
    bgImage: 'bg_hallway',
    doors: [
      {
        x: 510,
        y: 470,
        w: 80,
        h: 40,
        targetMap: 'courtyard',
        targetX: 600,
        targetY: 670,
        label: 'Keluar Ruang Sekolah'
      },
      {
        x: 180,
        y: 110,
        w: 70,
        h: 40,
        targetMap: 'classroom',
        targetX: 695,
        targetY: 960,
        label: 'Masuk Ruang Sekolah'
      },
      {
        x: 850,
        y: 110,
        w: 70,
        h: 40,
        targetMap: 'lab',
        targetX: 500,
        targetY: 400,
        label: 'Masuk Laboratorium Komputer'
      },
      {
        x: 520,
        y: 110,
        w: 70,
        h: 40,
        targetMap: 'canteen',
        targetX: 450,
        targetY: 420,
        label: 'Masuk ke Kantin Sekolah'
      }
    ],
    npcs: [
      {
        id: 'rian',
        name: 'Rian',
        role: 'Ketua Panitia Pameran',
        x: 390,
        y: 240,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'rian_intro'
      },
      {
        id: 'siti',
        name: 'Siti',
        role: 'Divisi Database & ERD',
        x: 690,
        y: 240,
        w: 100,
        h: 100,
        spriteName: 'siti',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'siti_intro'
      },
      {
        id: 'gilang_hallway',
        name: 'Gilang',
        role: 'Penjaga Booth Web App',
        x: 160,
        y: 240,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'gilang_hallway'
      },
      {
        id: 'sari_hallway',
        name: 'Sari',
        role: 'Penjaga Booth Mobile UI/UX',
        x: 910,
        y: 240,
        w: 100,
        h: 100,
        spriteName: 'siswi_casual',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'sari_hallway'
      }
    ],
    items: [],
    props: [
      // Stand 1: Web & Mobile App
      {
        type: 'booth',
        x: 120,
        y: 170,
        w: 120,
        h: 60,
        label: 'Booth 1: Aplikasi Web & Mobile',
        desc: 'Proyek e-commerce dan sistem akademik karya siswa tingkat 12.'
      },
      // Stand 2: Game Development Studio
      {
        type: 'booth',
        x: 320,
        y: 170,
        w: 120,
        h: 60,
        label: 'Booth 2: Game Dev Studio',
        desc: 'Game 2D Pixel Adventure "Beyond The Bell" buatan siswa!'
      },
      // Stand 3: Database & Cloud Architecture
      {
        type: 'booth',
        x: 640,
        y: 170,
        w: 120,
        h: 60,
        label: 'Booth 3: Arsitektur Database (ERD)',
        desc: 'Klik untuk memeriksa diagram relasi ERD Bususan!',
        action: 'view_erd'
      },
      // Stand 4: Robotika & IoT
      {
        type: 'booth',
        x: 860,
        y: 170,
        w: 120,
        h: 60,
        label: 'Booth 4: Robotika & IoT Smart School',
        desc: 'Sensor otomatis suhu ruang dan absensi kartu pintar.'
      }
    ],
    colliders: [
      { x: 0, y: 0, w: 1100, h: 140 }, // North wall (openings at doors)
      { x: 0, y: 480, w: 1100, h: 40 }, // South wall
      { x: 0, y: 0, w: 50, h: 520 }, // West wall
      { x: 1050, y: 0, w: 50, h: 520 }, // East wall
      // Booths collisions
      { x: 120, y: 170, w: 120, h: 50 },
      { x: 320, y: 170, w: 120, h: 50 },
      { x: 640, y: 170, w: 120, h: 50 },
      { x: 860, y: 170, w: 120, h: 50 }
    ]
  },

  classroom: {
    id: 'classroom',
    name: 'Ruang Kelas RPL (Classroom)',
    width: 1390,
    height: 1132,
    spawnX: 208,
    spawnY: 138,
    bgType: 'classroom_full',
    bgImage: 'bg_classroom',
    doors: [
      {
        x: 605,
        y: 20,
        w: 170,
        h: 75,
        targetMap: 'courtyard',
        targetX: 1300,
        targetY: 1540,
        label: 'Keluar ke Halaman & Kantin'
      }
    ],
    npcs: [
      {
        id: 'bu_rina',
        name: 'Bu Rina (Guru)',
        role: 'Guru Kejuruan RPL',
        x: 452,
        y: 96,
        w: 100,
        h: 100,
        spriteName: 'teacher',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'bu_rina_intro'
      },
      {
        id: 'teman_rian',
        name: 'Rian',
        role: 'Teman Sekelas',
        x: 127,
        y: 138,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'up',
        interactionRadius: 75,
        dialogueId: 'teman_kelas'
      },
      {
        id: 'teman_siti',
        name: 'Siti',
        role: 'Teman Sekelas',
        x: 288,
        y: 138,
        w: 100,
        h: 100,
        spriteName: 'siti',
        facing: 'up',
        interactionRadius: 75,
        dialogueId: 'teman_kelas'
      },
      // --- 5 NPC BARU DI RUANG KELAS (KANAN ATAS, KIRI BAWAH, KANAN BAWAH) ---
      {
        id: 'dimas_kelas',
        name: 'Dimas',
        role: 'Murid RPL (Kelas Kanan Atas)',
        x: 965,
        y: 210,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'up',
        interactionRadius: 80,
        dialogueId: 'dimas_kelas'
      },
      {
        id: 'dinda_kelas',
        name: 'Dinda',
        role: 'Siswi UI/UX (Kelas Kanan Atas)',
        x: 1040,
        y: 138,
        w: 100,
        h: 100,
        spriteName: 'siswi_casual',
        facing: 'up',
        interactionRadius: 80,
        dialogueId: 'dinda_kelas'
      },
      {
        id: 'rizky_kelas',
        name: 'Rizky',
        role: 'Murid IoT (Kelas Kiri Bawah)',
        x: 208,
        y: 825,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'up',
        interactionRadius: 80,
        dialogueId: 'rizky_kelas'
      },
      {
        id: 'tio_kelas',
        name: 'Tio',
        role: 'Murid Database (Kelas Kanan Bawah)',
        x: 893,
        y: 825,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'up',
        interactionRadius: 80,
        dialogueId: 'tio_kelas'
      },
      {
        id: 'alya_kelas',
        name: 'Alya',
        role: 'Siswi Backend (Kelas Kanan Bawah)',
        x: 1047,
        y: 825,
        w: 100,
        h: 100,
        spriteName: 'siti',
        facing: 'up',
        interactionRadius: 80,
        dialogueId: 'alya_kelas'
      }
    ],
    items: [],
    props: [],
    colliders: [
      // 1. Dinding Luar Keliling (Presisi 100% Sesuai Piksel classs.jpg)
      { x: 0, y: 0, w: 70, h: 1132 }, // Dinding luar paling kiri
      { x: 1320, y: 0, w: 70, h: 1132 }, // Dinding luar paling kanan
      { x: 0, y: 0, w: 605, h: 95 }, // Dinding luar atas (kiri tangga)
      { x: 775, y: 0, w: 615, h: 95 }, // Dinding luar atas (kanan tangga)
      { x: 0, y: 1040, w: 605, h: 92 }, // Dinding luar bawah (kiri tangga)
      { x: 775, y: 1040, w: 615, h: 92 }, // Dinding luar bawah (kanan tangga)

      // 2. Dinding Pembatas 4 Ruangan (Dengan Bukaan Pintu Bersih Tanpa Halangan)
      // Top-Left Room Walls
      { x: 70, y: 400, w: 335, h: 35 }, // Dinding bawah kelas kiri atas (pintu: x 405-550 terbuka luas!)
      { x: 550, y: 95, w: 35, h: 340 }, // Dinding kanan kelas kiri atas
      // Top-Right Room Walls
      { x: 985, y: 400, w: 335, h: 35 }, // Dinding bawah kelas kanan atas (pintu: x 840-985 terbuka luas!)
      { x: 805, y: 95, w: 35, h: 340 }, // Dinding kiri kelas kanan atas
      // Bottom-Left Room Walls
      { x: 70, y: 695, w: 335, h: 35 }, // Dinding atas kelas kiri bawah (pintu: x 405-550 terbuka luas!)
      { x: 550, y: 695, w: 35, h: 345 }, // Dinding kanan kelas kiri bawah
      // Bottom-Right Room Walls
      { x: 985, y: 695, w: 335, h: 35 }, // Dinding atas kelas kanan bawah (pintu: x 840-985 terbuka luas!)
      { x: 805, y: 695, w: 35, h: 345 }, // Dinding kiri kelas kanan bawah

      // 3. Meja Siswa & Guru (Ukuran & Posisi Presisi 1:1 Hasil Deteksi Piksel classs.jpg)
      // Top-Left Room Desks (3 Baris, Tanpa Baris Hantu)
      { x: 190, y: 124, w: 30, h: 32 }, { x: 267, y: 124, w: 30, h: 32 }, { x: 344, y: 124, w: 30, h: 32 }, { x: 419, y: 124, w: 30, h: 32 }, { x: 487, y: 124, w: 30, h: 32 },
      { x: 190, y: 197, w: 30, h: 32 }, { x: 268, y: 197, w: 30, h: 32 }, { x: 344, y: 197, w: 30, h: 32 }, { x: 420, y: 197, w: 30, h: 32 },
      { x: 190, y: 274, w: 30, h: 32 }, { x: 268, y: 274, w: 30, h: 32 }, { x: 344, y: 274, w: 30, h: 32 }, { x: 421, y: 274, w: 30, h: 32 },

      // Top-Right Room Desks (3 Baris, Tanpa Baris Hantu)
      { x: 876, y: 124, w: 30, h: 32 }, { x: 944, y: 124, w: 30, h: 32 }, { x: 1019, y: 124, w: 30, h: 32 }, { x: 1096, y: 124, w: 30, h: 32 }, { x: 1174, y: 124, w: 30, h: 32 },
      { x: 942, y: 197, w: 30, h: 32 }, { x: 1019, y: 197, w: 30, h: 32 }, { x: 1094, y: 197, w: 30, h: 32 }, { x: 1174, y: 197, w: 30, h: 32 },
      { x: 940, y: 274, w: 30, h: 32 }, { x: 1019, y: 274, w: 30, h: 32 }, { x: 1094, y: 274, w: 30, h: 32 }, { x: 1174, y: 274, w: 30, h: 32 },

      // Bottom-Left Room Desks (3 Baris, Area Masuk Pintu y:695-800 Bebas Total)
      { x: 185, y: 810, w: 30, h: 32 }, { x: 262, y: 810, w: 30, h: 32 }, { x: 339, y: 810, w: 30, h: 32 }, { x: 414, y: 810, w: 30, h: 32 },
      { x: 185, y: 883, w: 30, h: 32 }, { x: 264, y: 883, w: 30, h: 32 }, { x: 339, y: 883, w: 30, h: 32 }, { x: 416, y: 883, w: 30, h: 32 },
      { x: 185, y: 960, w: 30, h: 32 }, { x: 264, y: 960, w: 30, h: 32 }, { x: 339, y: 960, w: 30, h: 32 }, { x: 418, y: 960, w: 30, h: 32 }, { x: 483, y: 960, w: 30, h: 32 },

      // Bottom-Right Room Desks (3 Baris, Area Masuk Pintu y:695-800 Bebas Total)
      { x: 947, y: 810, w: 30, h: 32 }, { x: 1024, y: 810, w: 30, h: 32 }, { x: 1101, y: 810, w: 30, h: 32 }, { x: 1179, y: 810, w: 30, h: 32 },
      { x: 947, y: 883, w: 30, h: 32 }, { x: 1024, y: 883, w: 30, h: 32 }, { x: 1099, y: 883, w: 30, h: 32 }, { x: 1179, y: 883, w: 30, h: 32 },
      { x: 879, y: 960, w: 30, h: 32 }, { x: 945, y: 960, w: 30, h: 32 }, { x: 1024, y: 960, w: 30, h: 32 }, { x: 1099, y: 960, w: 30, h: 32 }, { x: 1179, y: 960, w: 30, h: 32 }
    ]
  },

  glitch_classroom: {
    id: 'glitch_classroom',
    name: 'Ruang Kelas RPL [DIMENSI ???]',
    width: 1390,
    height: 1132,
    spawnX: 208,
    spawnY: 138,
    bgType: 'classroom_full',
    bgImage: 'bg_classroom',
    isGlitch: true,
    doors: [
      {
        x: 605,
        y: 20,
        w: 170,
        h: 75,
        targetMap: 'glitch_courtyard',
        targetX: 1300,
        targetY: 1540,
        label: 'Pintu Keluar Kelas'
      }
    ],
    npcs: [],
    items: [
      {
        id: 'kunci_ruangan_kelas',
        name: 'Kunci Ruangan Kelas',
        x: 125,
        y: 990,
        w: 24,
        h: 24,
        icon: '🗝️',
        desc: 'Kunci perak berkilau untuk membuka pintu ruang kelas.',
        collected: false
      }
    ],
    props: [],
    colliders: []
  },

  glitch_courtyard: {
    id: 'glitch_courtyard',
    name: 'Halaman SMKN 1 Katapang [DIMENSI ???]',
    width: 2600,
    height: 1700,
    spawnX: 1300,
    spawnY: 1540,
    bgType: 'tile_courtyard',
    bgImage: null,
    isGlitch: true,
    doors: [
      {
        x: 1220,
        y: 50,
        w: 160,
        h: 60,
        targetMap: 'classroom',
        targetX: 208,
        targetY: 138,
        label: 'Gerbang Utama SMKN 1 Katapang'
      }
    ],
    npcs: [],
    items: [
      // 1. Pedang Pusaka - Dipisahkan dan dibuat tersembunyi jauh di ujung labirin semak barat laut!
      {
        id: 'pedang_semak',
        name: 'Pedang Pusaka',
        x: 140,
        y: 160,
        w: 28,
        h: 28,
        icon: '⚔️',
        desc: 'Pedang pusaka berkilau legendaris yang tersembunyi di sudut terdalam labirin semak rimbun.',
        collected: false
      },
      // 2. 7 Buku Bengkel SMK (TKJ, Tekstil, Otomotif, Mesin, Elektronika, BP, RPL)
      {
        id: 'glitch_buku_1',
        name: 'Buku Bengkel TKJ',
        x: 2340,
        y: 180,
        w: 24,
        h: 24,
        icon: '📖',
        desc: 'Buku anomali bengkel TKJ (crimping, tester, optik) di Gazebo Timur.',
        collected: false
      },
      {
        id: 'glitch_buku_2',
        name: 'Buku Bengkel Tekstil',
        x: 500,
        y: 1060,
        w: 24,
        h: 24,
        icon: '📖',
        desc: 'Buku anomali bengkel Tekstil (mesin tenun, obras, printing) di area barat.',
        collected: false
      },
      {
        id: 'glitch_buku_3',
        name: 'Buku Bengkel Otomotif (OTO)',
        x: 2360,
        y: 640,
        w: 24,
        h: 24,
        icon: '📖',
        desc: 'Buku anomali bengkel Otomotif (kunci momen, feeler, timing light) di teras belakang kantin.',
        collected: false
      },
      {
        id: 'glitch_buku_4',
        name: 'Buku Bengkel Mesin',
        x: 2420,
        y: 1440,
        w: 24,
        h: 24,
        icon: '📖',
        desc: 'Buku anomali bengkel Pemesinan (mesin bubut, frais, mikrometer) di gudang perkakas tua.',
        collected: false
      },
      {
        id: 'glitch_buku_5',
        name: 'Buku Bengkel Elektronika',
        x: 1300,
        y: 920,
        w: 24,
        h: 24,
        icon: '📖',
        desc: 'Buku anomali bengkel Elektronika (solder, osiloskop, multimeter) di tiang bendera tengah.',
        collected: false
      },
      {
        id: 'glitch_buku_6',
        name: 'Buku Bengkel BP (Broadcasting)',
        x: 820,
        y: 380,
        w: 24,
        h: 24,
        icon: '📖',
        desc: 'Buku anomali bengkel BP (video switcher, teleprompter, lavalier mic) di panggung studio luar.',
        collected: false
      },
      {
        id: 'glitch_buku_7',
        name: 'Buku Bengkel RPL',
        x: 1680,
        y: 720,
        w: 24,
        h: 24,
        icon: '📖',
        desc: 'Buku anomali lab & bengkel RPL (IDE, Git, debugger, database) di teras depan gedung lab.',
        collected: false
      },
      // 3. 3 Kunci Gerbang Kuno
      {
        id: 'glitch_kunci_1',
        name: 'Kunci Gerbang #1',
        x: 1040,
        y: 1480,
        w: 24,
        h: 24,
        icon: '🔑',
        desc: 'Kunci segel kuningan kuno di bangku taman selatan.',
        collected: false
      },
      {
        id: 'glitch_kunci_2',
        name: 'Kunci Gerbang #2',
        x: 150,
        y: 1380,
        w: 24,
        h: 24,
        icon: '🔑',
        desc: 'Kunci segel kuningan kuno di tribun penonton barat.',
        collected: false
      },
      {
        id: 'glitch_kunci_3',
        name: 'Kunci Gerbang #3',
        x: 1720,
        y: 200,
        w: 24,
        h: 24,
        icon: '🔑',
        desc: 'Kunci segel kuningan kuno di bawah pohon willow utara.',
        collected: false
      },
      // 4. 1 Cryptic Glitch Artifact
      {
        id: 'glitch_artefak',
        name: '{(@&@(&!*@(@)',
        x: 1680,
        y: 1280,
        w: 26,
        h: 26,
        icon: '💠',
        desc: 'Artefak glitch anomali bergetar memancarkan cahaya ungu dimensi di altar selatan.',
        collected: false
      }
    ],
    props: [
      // Pos Satpam di samping gerbang atas
      { type: 'building', x: 1440, y: 80, w: 160, h: 100, label: 'Pos Satpam [ANOMALI]', color: '#2e1065' },
      // Tiang Bendera Dimensi
      { type: 'flagpole', x: 1300, y: 880, w: 20, h: 50, label: 'Tiang Bendera Dimensi' },
      // Kantin Kios & Bangunan
      { type: 'canteen_building', x: 1800, y: 320, w: 580, h: 120, label: 'Kantin [TERTINGGAL]' },
      { type: 'dining_table', x: 1820, y: 520, w: 140, h: 55, label: 'Meja Kantin 1' },
      { type: 'dining_table', x: 2060, y: 520, w: 140, h: 55, label: 'Meja Kantin 2' },
      { type: 'dining_table', x: 2280, y: 520, w: 140, h: 55, label: 'Meja Kantin 3' },
      // Fasilitas Lapangan & Gazebo
      { type: 'hoop', x: 200, y: 1030, w: 30, h: 40, label: 'Ring Basket Barat' },
      { type: 'hoop', x: 800, y: 1030, w: 30, h: 40, label: 'Ring Basket Timur' },
      { type: 'gazebo', x: 2280, y: 120, w: 140, h: 100, label: 'Gazebo Terkutuk' },
      { type: 'warehouse', x: 1920, y: 1160, w: 380, h: 140, label: 'Gudang Terbengkalai' },
      // Pepohonan Rindang Luas & Semak Labirin
      { type: 'tree', x: 120, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 280, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 440, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 600, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 760, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 920, y: 100, w: 90, h: 100 },
      { type: 'tree', x: 100, y: 640, w: 80, h: 90 },
      { type: 'tree', x: 920, y: 640, w: 80, h: 90 },
      { type: 'tree', x: 100, y: 1450, w: 90, h: 100 },
      { type: 'tree', x: 950, y: 1450, w: 90, h: 100 },
      { type: 'tree', x: 1720, y: 180, w: 90, h: 100 },
      { type: 'tree', x: 2460, y: 180, w: 90, h: 100 },
      { type: 'tree', x: 2460, y: 850, w: 90, h: 100 },
      { type: 'tree', x: 1750, y: 1450, w: 90, h: 100 },
      { type: 'tree', x: 2450, y: 1450, w: 90, h: 100 }
    ],
    colliders: [
      // Batas Atas (Gerbang Utama & Dinding Luar)
      { x: 0, y: 0, w: 2600, h: 90 },
      // Batas Tepi Kiri & Kanan
      { x: 0, y: 0, w: 50, h: 1700 },
      { x: 2550, y: 0, w: 50, h: 1700 },
      // Batas Bawah
      { x: 0, y: 1640, w: 1220, h: 60 },
      { x: 1380, y: 1640, w: 1220, h: 60 },
      // Pos Satpam
      { x: 1440, y: 80, w: 160, h: 95 },
      // Bangunan Kios Kantin
      { x: 1800, y: 320, w: 580, h: 115 },
      // Meja Kantin
      { x: 1820, y: 520, w: 140, h: 50 },
      { x: 2060, y: 520, w: 140, h: 50 },
      { x: 2280, y: 520, w: 140, h: 50 },
      // Gudang Arsip & Gazebo
      { x: 1920, y: 1160, w: 380, h: 135 },
      { x: 2280, y: 120, w: 140, h: 95 },
      // Labirin Semak Barat Laut (Hedge Maze) yang menyembunyikan Pedang
      { x: 80, y: 80, w: 950, h: 35 },
      { x: 80, y: 610, w: 750, h: 35 },
      { x: 220, y: 80, w: 35, h: 420 },
      { x: 380, y: 200, w: 35, h: 420 },
      { x: 540, y: 80, w: 35, h: 420 },
      { x: 700, y: 200, w: 35, h: 420 }
    ]
  },

  lab: {
    id: 'lab',
    name: 'Laboratorium Komputer & Server',
    width: 900,
    height: 520,
    spawnX: 500,
    spawnY: 420,
    bgType: 'tile_lab',
    bgImage: null,
    doors: [
      {
        x: 460,
        y: 470,
        w: 80,
        h: 40,
        targetMap: 'hallway',
        targetX: 880,
        targetY: 180,
        label: 'Kembali ke Koridor Pameran'
      }
    ],
    npcs: [],
    items: [
      {
        id: 'piagam_rpl',
        name: 'Piagam Juara Pameran RPL',
        x: 500,
        y: 190,
        w: 24,
        h: 24,
        icon: '🏆',
        desc: 'Penghargaan bergengsi Best Student Software Project 2026!',
        collected: false
      }
    ],
    props: [
      // Server Racks
      { type: 'server', x: 160, y: 130, w: 100, h: 70, label: 'Server Cloud Utama RPL' },
      { type: 'server', x: 280, y: 130, w: 100, h: 70, label: 'Database Backup Server' },
      // Computer terminals
      { type: 'terminal', x: 650, y: 130, w: 140, h: 60, label: 'Terminal Administrator' },
      { type: 'workstation', x: 200, y: 280, w: 180, h: 50, label: 'Komputer Klien 1-4' },
      { type: 'workstation', x: 520, y: 280, w: 180, h: 50, label: 'Komputer Klien 5-8' }
    ],
    colliders: [
      { x: 0, y: 0, w: 900, h: 120 },
      { x: 0, y: 480, w: 900, h: 40 },
      { x: 0, y: 0, w: 60, h: 520 },
      { x: 840, y: 0, w: 60, h: 520 },
      // Servers & workstations
      { x: 160, y: 130, w: 220, h: 65 },
      { x: 650, y: 130, w: 140, h: 55 },
      { x: 200, y: 280, w: 180, h: 45 },
      { x: 520, y: 280, w: 180, h: 45 }
    ]
  },

  canteen: {
    id: 'canteen',
    name: 'Kantin Sekolah SMKN 1 Katapang',
    width: 900,
    height: 550,
    spawnX: 450,
    spawnY: 420,
    bgType: 'tile_canteen',
    bgImage: null,
    doors: [
      {
        x: 410,
        y: 490,
        w: 90,
        h: 40,
        targetMap: 'hallway',
        targetX: 520,
        targetY: 180,
        label: 'Kembali ke Koridor Pameran'
      }
    ],
    npcs: [
      {
        id: 'ibu_kantin',
        name: 'Ibu Kantin',
        role: 'Penjual Makanan & Minuman',
        x: 400,
        y: 130,
        w: 100,
        h: 100,
        spriteName: 'ibu_kantin',
        facing: 'down',
        interactionRadius: 85,
        dialogueId: 'ibu_kantin_intro'
      },
      {
        id: 'bayu_kantin',
        name: 'Bayu',
        role: 'Murid RPL (Antre Makanan)',
        x: 270,
        y: 200,
        w: 100,
        h: 100,
        spriteName: 'rian',
        facing: 'up',
        interactionRadius: 85,
        dialogueId: 'bayu_kantin'
      },
      {
        id: 'dewi_kantin',
        name: 'Dewi',
        role: 'Siswi RPL (Beli Camilan)',
        x: 550,
        y: 200,
        w: 100,
        h: 100,
        spriteName: 'siti',
        facing: 'up',
        interactionRadius: 85,
        dialogueId: 'dewi_kantin'
      }
    ],
    items: [
      {
        id: 'es_teh',
        name: 'Es Teh Manis Segar',
        x: 280,
        y: 240,
        w: 24,
        h: 24,
        icon: '🧃',
        desc: 'Minuman dingin segar saat jam istirahat sekolah!',
        collected: false
      },
      {
        id: 'roti_bakar',
        name: 'Roti Bakar Keju',
        x: 580,
        y: 240,
        w: 24,
        h: 24,
        icon: '🥪',
        desc: 'Camilan lezat favorit siswa SMKN 1 Katapang.',
        collected: false
      }
    ],
    props: [
      { type: 'counter', x: 280, y: 190, w: 340, h: 45, label: 'Meja Etalase Kantin' },
      { type: 'dining_table', x: 160, y: 320, w: 140, h: 60, label: 'Meja Makan Siswa 1' },
      { type: 'dining_table', x: 600, y: 320, w: 140, h: 60, label: 'Meja Makan Siswa 2' }
    ],
    colliders: [
      { x: 0, y: 0, w: 900, h: 100 },
      { x: 0, y: 500, w: 900, h: 40 },
      { x: 0, y: 0, w: 50, h: 550 },
      { x: 850, y: 0, w: 50, h: 550 },
      { x: 280, y: 190, w: 340, h: 45 },
      { x: 160, y: 320, w: 140, h: 55 },
      { x: 600, y: 320, w: 140, h: 55 }
    ]
  }
};

// Hubungkan colliders & props untuk peta dimensi glitch
if (MAPS.glitch_classroom && MAPS.classroom) {
  MAPS.glitch_classroom.colliders = MAPS.classroom.colliders;
  MAPS.glitch_classroom.props = MAPS.classroom.props;
}
if (MAPS.glitch_courtyard && MAPS.courtyard) {
  MAPS.glitch_courtyard.colliders = MAPS.courtyard.colliders;
  MAPS.glitch_courtyard.props = MAPS.courtyard.props;
}
