// Beyond The Bell - RPL Educational Quiz Engine

export const QUIZ_QUESTIONS = [
  {
    question: '1. Dalam pemrograman web, teknologi apa yang bertanggung jawab mengatur styling, tata letak, dan warna tampilan?',
    options: [
      { text: 'A. HTML', correct: false },
      { text: 'B. CSS', correct: true },
      { text: 'C. SQL', correct: false },
      { text: 'D. JSON', correct: false }
    ],
    explanation: 'CSS (Cascading Style Sheets) digunakan untuk mengatur gaya visual dan layout halaman web.'
  },
  {
    question: '2. Apakah kepanjangan resmi dari program keahlian RPL di SMK?',
    options: [
      { text: 'A. Rekayasa Perangkat Lunak', correct: true },
      { text: 'B. Rancang Pengolah Logika', correct: false },
      { text: 'C. Riset Perangkat Lapangan', correct: false },
      { text: 'D. Rekayasa Piranti Listrik', correct: false }
    ],
    explanation: 'RPL adalah Rekayasa Perangkat Lunak (Software Engineering).'
  },
  {
    question: '3. Pada diagram ERD (Entity Relationship Diagram), komponen Entitas biasanya disimbolkan dengan bentuk...',
    options: [
      { text: 'A. Belah Ketupat', correct: false },
      { text: 'B. Lingkaran / Oval', correct: false },
      { text: 'C. Persegi Panjang', correct: true },
      { text: 'D. Segitiga', correct: false }
    ],
    explanation: 'Persegi panjang melambangkan Entitas, belah ketupat melambangkan Relasi, dan oval melambangkan Atribut.'
  },
  {
    question: '4. Perintah Git apa yang digunakan untuk mengirim komit lokal ke repositori GitHub / Cloud?',
    options: [
      { text: 'A. git pull', correct: false },
      { text: 'B. git commit', correct: false },
      { text: 'C. git push', correct: true },
      { text: 'D. git status', correct: false }
    ],
    explanation: 'git push digunakan untuk mempublikasikan komit lokal ke branch server remote.'
  },
  {
    question: '5. Di antara perulangan berikut, manakah yang menjamin blok kode dieksekusi minimal satu kali?',
    options: [
      { text: 'A. for loop', correct: false },
      { text: 'B. while loop', correct: false },
      { text: 'C. do...while loop', correct: true },
      { text: 'D. recursive function', correct: false }
    ],
    explanation: 'do...while mengeksekusi body perulangan terlebih dahulu sebelum mengevaluasi kondisi terminasi.'
  }
];

export const BOOK_QUIZZES = {
  glitch_buku_1: {
    title: 'Buku Bengkel TKJ (Teknik Komputer & Jaringan)',
    questions: [
      {
        question: '1. Di bengkel TKJ, apakah fungsi utama dari tang crimping (crimping tool)?',
        options: [
          { text: 'A. Mengukur tegangan listrik pada motherboard', correct: false },
          { text: 'B. Menjepit dan memasang konektor RJ-45 pada ujung kabel UTP / LAN', correct: true },
          { text: 'C. Menyambungkan kabel fiber optik dengan pembakar', correct: false },
          { text: 'D. Mengikis isolasi tembaga agar tidak panas', correct: false }
        ],
        explanation: 'Tang crimping berfungsi untuk mengupas jaket kabel dan menekan pin tembaga konektor RJ-45 ke urutan kabel UTP.'
      },
      {
        question: '2. Alat ukur di bengkel TKJ yang digunakan untuk memastikan ke-8 pin koneksi kabel LAN terpasang dengan benar (straight/cross) adalah...',
        options: [
          { text: 'A. LAN Cable Tester', correct: true },
          { text: 'B. Multimeter Analog', correct: false },
          { text: 'C. Spectrum Analyzer', correct: false },
          { text: 'D. Mikrometer Jaringan', correct: false }
        ],
        explanation: 'LAN Cable Tester memiliki 8 lampu LED indikator untuk menguji integritas koneksi kabel jaringan pin-demi-pin.'
      },
      {
        question: '3. Mesin canggih di bengkel TKJ yang digunakan untuk menyambungkan dua inti serat kaca kabel Fiber Optic menggunakan busur listrik presisi adalah...',
        options: [
          { text: 'A. Solder Uap', correct: false },
          { text: 'B. Fusion Splicer', correct: true },
          { text: 'C. Mesin Press Hidrolik', correct: false },
          { text: 'D. Crimper Optik', correct: false }
        ],
        explanation: 'Fusion Splicer meleburkan dua ujung core kaca serat optik dengan pemanas elektroda busur listrik presisi mikron.'
      },
      {
        question: '4. Alat di bengkel TKJ yang berfungsi untuk mengukur besaran redaman (loss) dan daya sinyal cahaya pada kabel fiber optic adalah...',
        options: [
          { text: 'A. Optical Power Meter (OPM)', correct: true },
          { text: 'B. Barcode Scanner', correct: false },
          { text: 'C. Tachometer Laser', correct: false },
          { text: 'D. Manometer Digital', correct: false }
        ],
        explanation: 'OPM (Optical Power Meter) mengukur kekuatan daya cahaya (dBm/Watt) yang keluar dari kabel fiber optik.'
      },
      {
        question: '5. Di bengkel TKJ, alat "Wire Stripper" berfungsi khusus untuk...',
        options: [
          { text: 'A. Mengupas lapisan kulit jaket pelindung kabel UTP tanpa memotong kawat tembaga', correct: true },
          { text: 'B. Mendinginkan prosesor server yang overheat', correct: false },
          { text: 'C. Mengonversi sinyal analog ke digital', correct: false },
          { text: 'D. Menyimpan konfigurasi IP router secara offline', correct: false }
        ],
        explanation: 'Wire stripper memiliki celah pisau terkalibrasi khusus untuk memotong jaket PVC pelindung tanpa melukai konduktor kabel.'
      }
    ]
  },
  glitch_buku_2: {
    title: 'Buku Bengkel Tekstil (Tenun, Pemintalan & Garmen)',
    questions: [
      {
        question: '1. Di bengkel tekstil, mesin utama yang berfungsi menganyam persilangan benang lusi (warp) dan benang pakan (weft) menjadi lembaran kain adalah...',
        options: [
          { text: 'A. Mesin Tenun (Weaving Loom)', correct: true },
          { text: 'B. Mesin Obras', correct: false },
          { text: 'C. Mesin Bordir Komputer', correct: false },
          { text: 'D. Mesin Pemotong Kain', correct: false }
        ],
        explanation: 'Mesin tenun (weaving loom) menganyam benang lusi memanjang dan benang pakan melintang untuk menghasilkan kain tenun.'
      },
      {
        question: '2. Mesin jahit di bengkel garmen tekstil yang bertugas merapikan, memotong, sekaligus mengunci tepi potongan kain agar serat benang tidak terurai adalah...',
        options: [
          { text: 'A. Mesin Obras (Overlock Sewing Machine)', correct: true },
          { text: 'B. Mesin Jahit Lurus Jarum 1', correct: false },
          { text: 'C. Mesin Pasang Kancing', correct: false },
          { text: 'D. Mesin Lubang Kancing', correct: false }
        ],
        explanation: 'Mesin obras (overlock) memiliki pisau pemotong tepian dan rajutan 3 hingga 5 benang untuk mengunci tepi kain.'
      },
      {
        question: '3. Mesin di bengkel tekstil modern yang digunakan untuk mentransfer motif gambar grafis berwarna ke atas permukaan kain menggunakan rol silinder atau tinta digital adalah...',
        options: [
          { text: 'A. Mesin Printing / Sablon Tekstil Digital', correct: true },
          { text: 'B. Mesin Boiler Uap', correct: false },
          { text: 'C. Mesin Pres Panas Hidrolik', correct: false },
          { text: 'D. Mesin Carding Serat', correct: false }
        ],
        explanation: 'Mesin textile printing mencetak pasta warna atau tinta reaktif/sublimasi langsung membentuk motif grafis di atas kain.'
      },
      {
        question: '4. Di bengkel tekstil, mesin "Spinning Machine" (Mesin Pemintal) berfungsi untuk...',
        options: [
          { text: 'A. Menarik dan memilin serat kapas atau serat sintetis menjadi gulungan benang siap pakai', correct: true },
          { text: 'B. Mengeringkan pakaian dalam hitungan detik', correct: false },
          { text: 'C. Mencuci pakaian dengan deterjen kimia keras', correct: false },
          { text: 'D. Melubangi pola kancing secara otomatis', correct: false }
        ],
        explanation: 'Mesin spinning (pemintal) memproses serat kapas/sintetis dengan memberi tarikan dan puntiran (twist) sehingga menjadi benang.'
      },
      {
        question: '5. Mesin jahit bengkel garmen tekstil tipe "Overdeck / Interlock" umumnya digunakan untuk...',
        options: [
          { text: 'A. Menjahit keliman lipatan ujung bawah kaos dan lingkar leher dengan jahitan lentur berantai', correct: true },
          { text: 'B. Menenun kain sutra alam', correct: false },
          { text: 'C. Memintal benang jahit dari kapas', correct: false },
          { text: 'D. Mengukur ketebalan serat kain wol', correct: false }
        ],
        explanation: 'Mesin overdeck (kamkut) menghasilkan jahitan elastis berantai rangkap yang cocok untuk bahan stretch/kaos.'
      }
    ]
  },
  glitch_buku_3: {
    title: 'Buku Bengkel Otomotif (OTO / TKR & TBSM)',
    questions: [
      {
        question: '1. Di bengkel otomotif, alat khusus yang digunakan untuk mengencangkan baut kepala silinder mesin dengan ukuran kekencangan terukur adalah...',
        options: [
          { text: 'A. Kunci Inggris', correct: false },
          { text: 'B. Kunci Momen (Torque Wrench)', correct: true },
          { text: 'C. Tang Buaya', correct: false },
          { text: 'D. Obeng Ketok', correct: false }
        ],
        explanation: 'Kunci momen (torque wrench) memastikan setiap baut kepala silinder mesin dikencangkan sesuai spesifikasi torsi pabrik (Nm/kgf.m).'
      },
      {
        question: '2. Alat ukur pelat tipis presisi yang digunakan mekanik bengkel otomotif untuk mengukur celah elektroda busi dan celah katup adalah...',
        options: [
          { text: 'A. Feeler Gauge (Thickness Gauge)', correct: true },
          { text: 'B. Mistar Baja', correct: false },
          { text: 'C. Dial Indicator', correct: false },
          { text: 'D. Busur Derajat', correct: false }
        ],
        explanation: 'Feeler gauge tersusun dari bilah baja berketebalan presisi untuk mengukur celah renggang katup mesin dan elektroda busi.'
      },
      {
        question: '3. Alat bengkel otomotif yang dipasang pada lubang busi untuk mengukur tekanan kompresi ruang bakar silinder mesin adalah...',
        options: [
          { text: 'A. Compression Tester', correct: true },
          { text: 'B. Vacuum Gauge', correct: false },
          { text: 'C. Tyre Gauge', correct: false },
          { text: 'D. Barometer Mesin', correct: false }
        ],
        explanation: 'Compression tester mendeteksi kebocoran ring piston atau katup dengan mengukur tekanan kompresi silinder saat cranking.'
      },
      {
        question: '4. Lampu strobo di bengkel otomotif yang berkedip saat busi memercikkan api untuk memeriksa sudut saat pengapian mesin adalah...',
        options: [
          { text: 'A. Timing Light', correct: true },
          { text: 'B. Senter LED Inspeksi', correct: false },
          { text: 'C. Tachometer Analog', correct: false },
          { text: 'D. Lampu Halogen', correct: false }
        ],
        explanation: 'Timing light menembakkan cahaya kilat ke tanda puli kruk as untuk mengecek ketepatan sudut saat pengapian busi.'
      },
      {
        question: '5. Di bengkel otomotif, alat "Car Lift" atau dongkrak buaya hidrolik berfungsi untuk...',
        options: [
          { text: 'A. Mengangkat kendaraan secara stabil dan aman agar teknisi dapat melakukan servis kolong sasis / transmisi', correct: true },
          { text: 'B. Menyetel sistem injeksi bensin elektronik', correct: false },
          { text: 'C. Mengukur emisi gas buang knalpot', correct: false },
          { text: 'D. Menguras minyak rem secara otomatis', correct: false }
        ],
        explanation: 'Car lift (hydraulic lift) mengangkat unit mobil ke ketinggian kerja ergonomis untuk inspeksi suspensi, knalpot, dan transmisi.'
      }
    ]
  },
  glitch_buku_4: {
    title: 'Buku Bengkel Teknik Pemesinan (Bubut & Frais)',
    questions: [
      {
        question: '1. Mesin perkakas utama di bengkel mesin yang berfungsi memotong benda kerja silindris yang berputar menggunakan pahat bubut adalah...',
        options: [
          { text: 'A. Mesin Sekrap', correct: false },
          { text: 'B. Mesin Bubut (Lathe Machine)', correct: true },
          { text: 'C. Mesin Gerinda Silinder', correct: false },
          { text: 'D. Mesin Bending Pipa', correct: false }
        ],
        explanation: 'Mesin bubut (lathe) memutar benda kerja pada cekam (chuck) sementara pahat menyayat material untuk membentuk silinder atau ulir.'
      },
      {
        question: '2. Mesin perkakas di bengkel mesin yang menggunakan pisau berputar (cutter) untuk meratakan permukaan dan membuat alur roda gigi adalah...',
        options: [
          { text: 'A. Mesin Frais (Milling Machine)', correct: true },
          { text: 'B. Mesin Gergaji Pita', correct: false },
          { text: 'C. Mesin Press Logam', correct: false },
          { text: 'D. Mesin Bor Meja', correct: false }
        ],
        explanation: 'Mesin frais (milling) menyayat benda kerja diam dengan pisau frais berputar untuk menghasilkan bidang datar atau alur profil.'
      },
      {
        question: '3. Bagian pada jangka sorong (vernier caliper) di bengkel mesin yang digunakan khusus untuk mengukur kedalaman lubang benda kerja adalah...',
        options: [
          { text: 'A. Ekor pengukur kedalaman (Depth Bar / Rod)', correct: true },
          { text: 'B. Rahang ukur luar', correct: false },
          { text: 'C. Rahang ukur dalam', correct: false },
          { text: 'D. Baut pengunci skala', correct: false }
        ],
        explanation: 'Bilah ekor pengukur kedalaman menjulur di ujung jangka sorong untuk mengukur ceruk dan kedalaman lubang tembus.'
      },
      {
        question: '4. Alat ukur presisi di bengkel mesin yang memiliki ketelitian sangat tinggi hingga 0,01 mm untuk mengukur diameter poros adalah...',
        options: [
          { text: 'A. Mikrometer Sekrup (Micrometer)', correct: true },
          { text: 'B. Penggaris Siku Baja', correct: false },
          { text: 'C. Meteran Gulung', correct: false },
          { text: 'D. Kaliper Kayu', correct: false }
        ],
        explanation: 'Mikrometer sekrup memiliki skala bidal (thimble) yang mampu mengukur dimensi ketebalan dan poros hingga 0,01 milimeter.'
      },
      {
        question: '5. Sesuai standar K3 bengkel mesin, alat pelindung diri (APD) yang wajib dipakai saat membubut atau menggerinda untuk melindungi mata adalah...',
        options: [
          { text: 'A. Kacamata Pengaman (Safety Goggles / Kedok Pelindung)', correct: true },
          { text: 'B. Masker kain tipis', correct: false },
          { text: 'C. Penutup telinga busa saja', correct: false },
          { text: 'D. Sarung tangan rajut kain longgar', correct: false }
        ],
        explanation: 'Kacamata safety mencegah beram atau tatal logam panas yang terlempar berkecepatan tinggi mengenai mata operator.'
      }
    ]
  },
  glitch_buku_5: {
    title: 'Buku Bengkel Elektronika Industri',
    questions: [
      {
        question: '1. Di bengkel elektronika, alat utama yang digunakan untuk melelehkan timah guna merekatkan kaki komponen pada PCB adalah...',
        options: [
          { text: 'A. Solder Listrik (Soldering Iron)', correct: true },
          { text: 'B. Hot Air Gun Blower', correct: false },
          { text: 'C. Catok Meja', correct: false },
          { text: 'D. Tang Pengupas', correct: false }
        ],
        explanation: 'Solder listrik memanaskan ujung tip logam untuk mencairkan timah paduan pada titik kontak pad PCB.'
      },
      {
        question: '2. Alat ukur serbaguna di bengkel elektronika yang dapat mengukur Tegangan (Volt), Kuat Arus (Ampere), dan Hambatan (Ohm) adalah...',
        options: [
          { text: 'A. Multimeter (AVO Meter)', correct: true },
          { text: 'B. Luxmeter Cahaya', correct: false },
          { text: 'C. Barometer Tekanan', correct: false },
          { text: 'D. Higrometer Kelembapan', correct: false }
        ],
        explanation: 'Multimeter (Ampere-Volt-Ohm meter) adalah instrumen pokok teknisi elektronika untuk mengukur dan mendiagnosis rangkaian.'
      },
      {
        question: '3. Alat ukur laboratorium elektronika yang menampilkan grafik visual bentuk gelombang sinyal listrik (frekuensi dan amplitudo) pada layar adalah...',
        options: [
          { text: 'A. Osiloskop (Oscilloscope)', correct: true },
          { text: 'B. Frekuensi Generator Pasif', correct: false },
          { text: 'C. Spektrometer Prisma', correct: false },
          { text: 'D. Termograf Termal', correct: false }
        ],
        explanation: 'Osiloskop memplot sinyal listrik sebagai grafik tegangan terhadap waktu pada sumbu horizontal dan vertikal layar.'
      },
      {
        question: '4. Di bengkel elektronika, alat "Desoldering Pump" (Atraktor sedotan timah) digunakan untuk...',
        options: [
          { text: 'A. Menyedot timah cair saat mencopot komponen elektronika dari lubang PCB', correct: true },
          { text: 'B. Membersihkan debu dari dalam casing komputer', correct: false },
          { text: 'C. Menghirup asap pembakaran solder', correct: false },
          { text: 'D. Menyemprotkan cairan pembersih sirkuit', correct: false }
        ],
        explanation: 'Desoldering pump memiliki piston pegas vakum untuk menyedot lelehan timah dari titik solderan secara cepat.'
      },
      {
        question: '5. Perangkat bengkel elektronika yang berfungsi menghasilkan sumber tegangan listrik DC yang stabil dan dapat diatur voltasenya adalah...',
        options: [
          { text: 'A. Regulated DC Power Supply (Catu Daya)', correct: true },
          { text: 'B. Induktor Ferit', correct: false },
          { text: 'C. Kapasitor Elektrolit', correct: false },
          { text: 'D. Transformator Step Up Tanpa Dioda', correct: false }
        ],
        explanation: 'DC Power Supply teregulasi menyediakan suplai voltase dan batas arus DC yang presisi untuk menyalakan rangkaian prototipe.'
      }
    ]
  },
  glitch_buku_6: {
    title: 'Buku Bengkel BP (Broadcasting & Studio Siaran)',
    questions: [
      {
        question: '1. Di bengkel studio Broadcasting (BP), alat utama yang digunakan sutradara siaran untuk mengatur perpindahan feed kamera secara live adalah...',
        options: [
          { text: 'A. Video Switcher (Vision Mixer)', correct: true },
          { text: 'B. Teleprompter Layar Kaca', correct: false },
          { text: 'C. Clapperboard Kayu', correct: false },
          { text: 'D. Tripod Fluid Head', correct: false }
        ],
        explanation: 'Video switcher (vision mixer) memilih, memotong (cut), atau melakukan transisi (dissolve/wipe) antar kamera live siaran.'
      },
      {
        question: '2. Perangkat di studio penyiaran yang menampilkan naskah teks berjalan tepat di depan lensa kamera agar presenter membaca tanpa menunduk adalah...',
        options: [
          { text: 'A. Teleprompter', correct: true },
          { text: 'B. Monitor Program Master', correct: false },
          { text: 'C. Multi-Viewer Screen', correct: false },
          { text: 'D. Waveform Monitor', correct: false }
        ],
        explanation: 'Teleprompter menggunakan cermin transparan one-way di depan lensa kamera untuk memantulkan teks naskah berita.'
      },
      {
        question: '3. Jenis mikrofon kecil yang dijepitkan di kerah baju presenter agar suara terdengar jernih tanpa mengganggu visual kamera siaran disebut...',
        options: [
          { text: 'A. Lavalier / Clip-on Microphone', correct: true },
          { text: 'B. Microphone Shotgun Boom', correct: false },
          { text: 'C. Microphone Ribbon Vintage', correct: false },
          { text: 'D. Dynamic Mic Handheld', correct: false }
        ],
        explanation: 'Lavalier mic (clip-on) berukuran mini dan dijepitkan di kerah pakaian host untuk merekam vokal secara konstan dan rapi.'
      },
      {
        question: '4. Teknik tata cahaya standar studio produksi penyiaran yang terdiri dari Key Light, Fill Light, dan Back Light disebut teknik...',
        options: [
          { text: 'A. Three-Point Lighting', correct: true },
          { text: 'B. Silhouette Lighting', correct: false },
          { text: 'C. Strobe Flash Lighting', correct: false },
          { text: 'D. Diffused Daylight Only', correct: false }
        ],
        explanation: 'Three-point lighting menciptakan dimensi subjek: Key Light (cahaya utama), Fill Light (pengisi bayangan), dan Back Light (pemisah latar).'
      },
      {
        question: '5. Di master control room (MCR) studio penyiaran, meja konsol yang mengatur volume fader, gain, dan equalizer dari seluruh audio presenter adalah...',
        options: [
          { text: 'A. Audio Mixer Console', correct: true },
          { text: 'B. Video Routing Switcher', correct: false },
          { text: 'C. Character Generator (CG)', correct: false },
          { text: 'D. Intercom Headset Beltpack', correct: false }
        ],
        explanation: 'Audio mixer console mengontrol level balance audio suara presenter, background music (BGM), dan sound effect siaran.'
      }
    ]
  },
  glitch_buku_7: {
    title: 'Buku Bengkel RPL (Rekayasa Perangkat Lunak)',
    questions: [
      {
        question: '1. Di bengkel / lab RPL, aplikasi "Integrated Development Environment" (IDE) seperti VS Code berfungsi sebagai...',
        options: [
          { text: 'A. Lingkungan terpadu untuk menulis sintaks kode, debugging, dan integrasi build tools', correct: true },
          { text: 'B. Pengatur kecepatan kipas prosesor server', correct: false },
          { text: 'C. Pemotong kabel jaringan otomatis', correct: false },
          { text: 'D. Alat pembuat animasi tanpa baris kode', correct: false }
        ],
        explanation: 'IDE menyediakan editor teks pintar, terminal, syntax highlighting, dan debugger terpadu bagi programmer.'
      },
      {
        question: '2. Sistem kontrol versi di lab RPL seperti "Git" memiliki fungsi utama untuk...',
        options: [
          { text: 'A. Mencatat setiap riwayat commit perubahan kode dan mengelola kolaborasi branch tim', correct: true },
          { text: 'B. Menghapus harddisk server secara acak', correct: false },
          { text: 'C. Mendinginkan casing komputer', correct: false },
          { text: 'D. Menyetel alamat MAC address kartu jaringan', correct: false }
        ],
        explanation: 'Git mencatat commit riwayat pengembangan kode, memungkinkan revert rollback bug, dan memfasilitasi kerja tim secara aman.'
      },
      {
        question: '3. Fitur perkakas pemrograman "Debugger" di bengkel RPL berfungsi untuk...',
        options: [
          { text: 'A. Melacak dan mengeksekusi alur kode baris-demi-baris (step-by-step) guna menemukan bug', correct: true },
          { text: 'B. Membersihkan debu motherboard menggunakan kuas', correct: false },
          { text: 'C. Menyalakan komputer dari jarak jauh', correct: false },
          { text: 'D. Mengompresi file video menjadi ukuran kecil', correct: false }
        ],
        explanation: 'Debugger memungkinkan developer memasang breakpoint dan menginspeksi nilai variabel secara realtime untuk menemukan bug.'
      },
      {
        question: '4. Perangkat lunak mesin basis data (DBMS Server) seperti PostgreSQL atau MySQL berfungsi untuk...',
        options: [
          { text: 'A. Menyimpan, mengorganisir, dan mengelola jutaan record data terstruktur secara aman dan cepat', correct: true },
          { text: 'B. Mengedit foto grafis beresolusi tinggi', correct: false },
          { text: 'C. Memformat flashdisk yang terinfeksi virus', correct: false },
          { text: 'D. Menampilkan sinyal listrik pada osiloskop', correct: false }
        ],
        explanation: 'DBMS mengelola penyimpanan data relasional, integritas referensial (foreign keys), dan query SQL berkecepatan tinggi.'
      },
      {
        question: '5. Di bengkel RPL, program "Compiler" atau "Interpreter" memiliki tugas mendasar untuk...',
        options: [
          { text: 'A. Menerjemahkan kode sumber bahasa tingkat tinggi ke bahasa mesin yang dimengerti prosesor', correct: true },
          { text: 'B. Memasang kabel LAN ke stopkontak', correct: false },
          { text: 'C. Menghitung jumlah tombol keyboard yang ditekan', correct: false },
          { text: 'D. Menyetel resolusi monitor secara fisik', correct: false }
        ],
        explanation: 'Compiler/Interpreter mengonversi kode bahasa tingkat tinggi (seperti C++, Java, JS) menjadi instruksi biner mesin untuk dieksekusi prosesor.'
      }
    ]
  }
};
