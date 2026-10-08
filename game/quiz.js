// Beyond The Bell - Vocational Workshops Educational Quiz Engine
// 5 Buku Anomali Bengkel Kejuruan SMK dengan Soal Bervariasi Lintas Bengkel
// Jawaban diacak secara dinamis sehingga jawaban benar tidak selalu 'A'

export const QUIZ_QUESTIONS = [
  {
    question: '1. Dalam pemrograman web, teknologi apa yang bertanggung jawab mengatur styling, tata letak, dan warna tampilan antarmuka?',
    options: [
      { text: 'CSS (Cascading Style Sheets)', correct: true },
      { text: 'HTML', correct: false },
      { text: 'SQL', correct: false },
      { text: 'JSON', correct: false }
    ],
    explanation: 'CSS (Cascading Style Sheets) digunakan untuk mengatur gaya visual, estetika, warna, dan layout halaman web.'
  },
  {
    question: '2. Apakah kepanjangan resmi dari program keahlian RPL di SMK?',
    options: [
      { text: 'Rekayasa Perangkat Lunak', correct: true },
      { text: 'Rancang Pengolah Logika', correct: false },
      { text: 'Riset Perangkat Lapangan', correct: false },
      { text: 'Rekayasa Piranti Listrik', correct: false }
    ],
    explanation: 'RPL adalah Rekayasa Perangkat Lunak (Software Engineering).'
  },
  {
    question: '3. Pada diagram ERD (Entity Relationship Diagram), komponen Entitas biasanya disimbolkan dengan bentuk...',
    options: [
      { text: 'Persegi Panjang', correct: true },
      { text: 'Belah Ketupat', correct: false },
      { text: 'Lingkaran / Oval', correct: false },
      { text: 'Segitiga', correct: false }
    ],
    explanation: 'Persegi panjang melambangkan Entitas, belah ketupat melambangkan Relasi, dan oval melambangkan Atribut.'
  },
  {
    question: '4. Perintah Git apa yang digunakan untuk mengirim komit lokal ke repositori GitHub / Cloud remote?',
    options: [
      { text: 'git push', correct: true },
      { text: 'git pull', correct: false },
      { text: 'git commit', correct: false },
      { text: 'git status', correct: false }
    ],
    explanation: 'git push digunakan untuk mempublikasikan komit lokal ke branch server remote seperti GitHub.'
  },
  {
    question: '5. Di antara perulangan berikut, manakah yang menjamin blok kode dieksekusi minimal satu kali?',
    options: [
      { text: 'do...while loop', correct: true },
      { text: 'for loop', correct: false },
      { text: 'while loop', correct: false },
      { text: 'recursive function', correct: false }
    ],
    explanation: 'do...while mengeksekusi tubuh perulangan terlebih dahulu sebelum mengevaluasi kondisi terminasi.'
  }
];

export const BOOK_QUIZZES = {
  glitch_buku_1: {
    title: 'Buku Anomali Bengkel #1 (Variasi Lintas Bengkel SMK)',
    desc: 'Ujian komprehensif kejuruan: Jaringan, Otomotif, Pemesinan, Elektronika, dan RPL.',
    questions: [
      {
        workshop: 'Bengkel TKJ - Jaringan Kabel',
        question: '1. [Bengkel TKJ] Alat perkakas yang digunakan untuk mengupas kabel dan memasang pin konektor RJ-45 pada kabel UTP / LAN adalah...',
        options: [
          { text: 'Tang Crimping (Crimping Tool)', correct: true },
          { text: 'Solder Uap Listrik', correct: false },
          { text: 'Kunci Inggris Mekanik', correct: false },
          { text: 'Fusion Splicer Optik', correct: false }
        ],
        explanation: 'Tang crimping berfungsi untuk mengupas jaket kabel UTP serta menjepit dan mengunci pin tembaga konektor RJ-45.'
      },
      {
        workshop: 'Bengkel Otomotif - Sistem Mesin',
        question: '2. [Bengkel Otomotif] Alat khusus mekanik untuk mengencangkan baut kepala silinder mesin dengan batas torsi terukur presisi adalah...',
        options: [
          { text: 'Kunci Momen (Torque Wrench)', correct: true },
          { text: 'Tang Buaya Pengunci', correct: false },
          { text: 'Obeng Ketok Manual', correct: false },
          { text: 'Kunci Pipa Baja', correct: false }
        ],
        explanation: 'Kunci momen (torque wrench) memastikan setiap baut kepala silinder mesin dikencangkan sesuai batas spesifikasi torsi pabrikan.'
      },
      {
        workshop: 'Bengkel Pemesinan - Alat Ukur Presisi',
        question: '3. [Bengkel Pemesinan] Alat ukur presisi untuk mengukur diameter luar, celah dalam, dan kedalaman benda kerja dengan ketelitian 0,05 mm adalah...',
        options: [
          { text: 'Jangka Sorong (Vernier Caliper)', correct: true },
          { text: 'Busur Derajat', correct: false },
          { text: 'Waterpass Kayu', correct: false },
          { text: 'Penggaris Segitiga Plastik', correct: false }
        ],
        explanation: 'Jangka sorong memiliki rahang luar untuk diameter luar, rahang dalam untuk celah lubang, dan ekor pengukur kedalaman.'
      },
      {
        workshop: 'Bengkel Elektronika - Rangkaian & PCB',
        question: '4. [Bengkel Elektronika] Alat pemanas yang digunakan untuk mencairkan timah guna merekatkan kaki komponen elektronika ke jalur PCB adalah...',
        options: [
          { text: 'Solder Listrik (Soldering Iron)', correct: true },
          { text: 'Hot Gun Industri', correct: false },
          { text: 'Kompor Induksi Mini', correct: false },
          { text: 'Las Karbit Tabung', correct: false }
        ],
        explanation: 'Solder listrik memanaskan mata bit tembaga untuk mencairkan timah solder pada sambungan kaki komponen PCB.'
      },
      {
        workshop: 'Bengkel RPL - Desain Antarmuka Web',
        question: '5. [Bengkel RPL] Di lab RPL, teknologi web yang bertanggung jawab mengatur tata letak, warna, tipografi, dan estetika visual antarmuka adalah...',
        options: [
          { text: 'CSS (Cascading Style Sheets)', correct: true },
          { text: 'SQL Query Database', correct: false },
          { text: 'JSON Data Format', correct: false },
          { text: 'PHP Interpreter', correct: false }
        ],
        explanation: 'CSS mengatur tata letak, warna, tipografi, animasi, dan tata visual seluruh elemen dokumen HTML.'
      }
    ]
  },

  glitch_buku_2: {
    title: 'Buku Anomali Bengkel #2 (Variasi Lintas Bengkel SMK)',
    desc: 'Ujian komprehensif kejuruan: Pemesinan, Otomotif, Serat Optik, Basis Data, dan Tekstil.',
    questions: [
      {
        workshop: 'Bengkel Pemesinan - Mesin Perkakas',
        question: '1. [Bengkel Pemesinan] Mesin perkakas pokok yang bekerja memutar benda kerja lalu disayat oleh pahat untuk membuat poros silinder adalah...',
        options: [
          { text: 'Mesin Bubut (Lathe Machine)', correct: true },
          { text: 'Mesin Gerinda Duduk', correct: false },
          { text: 'Mesin Bor Tangan', correct: false },
          { text: 'Mesin Gergaji Pita', correct: false }
        ],
        explanation: 'Mesin bubut menyayat benda kerja yang berputar pada chuck spindel untuk membuat poros silindris, tirus, atau ulir.'
      },
      {
        workshop: 'Bengkel Otomotif - Celah Katup Mesin',
        question: '2. [Bengkel Otomotif] Bilah-bilah pelat baja tipis bertingkat untuk mengukur celah renggang katup mesin dan celah elektroda busi adalah...',
        options: [
          { text: 'Feeler Gauge (Thickness Gauge)', correct: true },
          { text: 'Mistar Baja Rata', correct: false },
          { text: 'Dial Indicator Gauge', correct: false },
          { text: 'Mikrometer Ulir', correct: false }
        ],
        explanation: 'Feeler gauge tersusun dari bilah baja berketebalan presisi untuk mengukur celah renggang katup dan elektroda busi.'
      },
      {
        workshop: 'Bengkel TKJ - Serat Kaca Fiber Optik',
        question: '3. [Bengkel TKJ] Mesin di bengkel jaringan fiber optik yang melebur dan menyambung dua inti serat kaca dengan busur listrik mikro adalah...',
        options: [
          { text: 'Fusion Splicer', correct: true },
          { text: 'Crimper Tool LAN', correct: false },
          { text: 'Solder Uap Elektronika', correct: false },
          { text: 'Patch Cord Manual', correct: false }
        ],
        explanation: 'Fusion Splicer menyatukan dua ujung core kaca serat optik dengan presisi mikron menggunakan leburan busur listrik.'
      },
      {
        workshop: 'Bengkel RPL - Basis Data Relasional',
        question: '4. [Bengkel RPL] Diagram visual yang memodelkan entitas, atribut, dan hubungan relasi tabel pada basis data relasional disebut...',
        options: [
          { text: 'Entity Relationship Diagram (ERD)', correct: true },
          { text: 'Flowchart Algoritma', correct: false },
          { text: 'Wireframe Antarmuka UI', correct: false },
          { text: 'Use Case Diagram', correct: false }
        ],
        explanation: 'ERD memodelkan struktur tabel, atribut kunci, serta kardinalitas hubungan antar entitas basis data.'
      },
      {
        workshop: 'Bengkel Tekstil - Garmen & Anyaman',
        question: '5. [Bengkel Tekstil] Mesin industri tekstil yang menganyam persilangan benang lusi (memanjang) dan benang pakan (melintang) menjadi kain adalah...',
        options: [
          { text: 'Mesin Tenun (Weaving Loom)', correct: true },
          { text: 'Mesin Obras', correct: false },
          { text: 'Mesin Pemotong Pola', correct: false },
          { text: 'Mesin Kancing Otomatis', correct: false }
        ],
        explanation: 'Mesin tenun (weaving loom) menganyam benang lusi dan pakan bersilangan untuk menghasilkan lembaran kain.'
      }
    ]
  },

  glitch_buku_3: {
    title: 'Buku Anomali Bengkel #3 (Variasi Lintas Bengkel SMK)',
    desc: 'Ujian komprehensif kejuruan: Kompresi Silinder, Osiloskop, Pengujian LAN, Studio TV, dan Git.',
    questions: [
      {
        workshop: 'Bengkel Otomotif - Tekanan Kompresi',
        question: '1. [Bengkel Otomotif] Alat mekanik yang dipasang pada lubang busi silinder untuk mengukur besaran tekanan kompresi ruang bakar mesin adalah...',
        options: [
          { text: 'Compression Tester', correct: true },
          { text: 'Radiator Cap Tester', correct: false },
          { text: 'Manometer Angin Ban', correct: false },
          { text: 'Barometer Ruang', correct: false }
        ],
        explanation: 'Compression tester mengukur tekanan kompresi ruang bakar silinder untuk mendeteksi kebocoran ring piston atau katup.'
      },
      {
        workshop: 'Bengkel Elektronika - Bentuk Gelombang',
        question: '2. [Bengkel Elektronika] Instrumen laboratorium yang menampilkan grafik bentuk gelombang sinyal listrik (frekuensi & amplitudo) terhadap waktu adalah...',
        options: [
          { text: 'Osiloskop (Oscilloscope)', correct: true },
          { text: 'Lux Meter Cahaya', correct: false },
          { text: 'Tachometer Putaran', correct: false },
          { text: 'Barometer Presisi', correct: false }
        ],
        explanation: 'Osiloskop memvisualisasikan grafik bentuk gelombang sinyal listrik, amplitudo tegangan, dan frekuensi gelombang secara presisi.'
      },
      {
        workshop: 'Bengkel TKJ - Verifikasi Jalur LAN',
        question: '3. [Bengkel TKJ] Alat penguji yang memiliki 8 lampu LED indikator berurutan untuk memverifikasi keutuhan sambungan kabel LAN adalah...',
        options: [
          { text: 'LAN Cable Tester', correct: true },
          { text: 'Termometer Inframerah', correct: false },
          { text: 'Spektrometer Prisma', correct: false },
          { text: 'Multitester Ohm Meter', correct: false }
        ],
        explanation: 'LAN Cable Tester menguji kontinuitas ke-8 pin konduktor kabel UTP/STP untuk memastikan tidak ada jalur terputus atau tertukar.'
      },
      {
        workshop: 'Bengkel Penyiaran - Studio Broadcast',
        question: '4. [Bengkel Penyiaran] Perangkat pengendali di studio penyiaran televisi untuk memilih dan mengalihkan transisi feed berbagai kamera live adalah...',
        options: [
          { text: 'Video Switcher / Video Mixer', correct: true },
          { text: 'Teleprompter Layar Kaca', correct: false },
          { text: 'Audio Equalizer Rak', correct: false },
          { text: 'Clapperboard Sutradara', correct: false }
        ],
        explanation: 'Video Switcher (vision mixer) mengatur pergantian feed kamera siaran langsung dan efek transisi video secara real-time.'
      },
      {
        workshop: 'Bengkel RPL - Kontrol Versi Git',
        question: '5. [Bengkel RPL] Perintah Git yang digunakan pengembang perangkat lunak untuk mengirimkan komit lokal ke repositori remote di GitHub adalah...',
        options: [
          { text: 'git push', correct: true },
          { text: 'git pull', correct: false },
          { text: 'git clone', correct: false },
          { text: 'git branch', correct: false }
        ],
        explanation: 'Perintah git push mengunggah komit lokal ke server repositori remote seperti GitHub atau GitLab.'
      }
    ]
  },

  glitch_buku_4: {
    title: 'Buku Anomali Bengkel #4 (Variasi Lintas Bengkel SMK)',
    desc: 'Ujian komprehensif kejuruan: Mesin Frais, Sablon Digital, Timing Pengapian, Multimeter, dan Daya Optik.',
    questions: [
      {
        workshop: 'Bengkel Pemesinan - Mesin Frais',
        question: '1. [Bengkel Pemesinan] Mesin perkakas yang menggunakan pisau berputar bermata potong majemuk untuk menyayat bidang rata, alur, atau roda gigi adalah...',
        options: [
          { text: 'Mesin Frais (Milling Machine)', correct: true },
          { text: 'Mesin Las Busur Listrik', correct: false },
          { text: 'Mesin Gerinda Silindris', correct: false },
          { text: 'Mesin Skrap Tangan', correct: false }
        ],
        explanation: 'Mesin frais menyayat benda kerja diam menggunakan pisau frais bermata potong majemuk yang berputar pada arbor spindel.'
      },
      {
        workshop: 'Bengkel Tekstil - Sablon Kain Digital',
        question: '2. [Bengkel Tekstil] Mesin di industri pakaian modern yang digunakan untuk mentransfer desain grafis berwarna langsung ke atas permukaan kain adalah...',
        options: [
          { text: 'Mesin Printing / Sablon Tekstil Digital', correct: true },
          { text: 'Mesin Boiler Uap', correct: false },
          { text: 'Mesin Pemintal Benang', correct: false },
          { text: 'Mesin Jahit Rantai', correct: false }
        ],
        explanation: 'Mesin printing tekstil mencetak pasta tinta warna reaktif atau sublimasi langsung sesuai pola grafis komputer.'
      },
      {
        workshop: 'Bengkel Otomotif - Waktu Percikan Busi',
        question: '3. [Bengkel Otomotif] Lampu strobo mekanik yang dinyalakan sinkron dengan busi untuk memeriksa dan menyetel sudut waktu pengapian adalah...',
        options: [
          { text: 'Timing Light', correct: true },
          { text: 'Senter LED Mekanik', correct: false },
          { text: 'Lampu Halogen Sorot', correct: false },
          { text: 'Stroboscope Audio', correct: false }
        ],
        explanation: 'Timing light menembakkan kilatan cahaya sinkron dengan percikan busi untuk membaca derajat tanda timing pada pulley poros engkol.'
      },
      {
        workshop: 'Bengkel Elektronika - Pengukuran Listrik',
        question: '4. [Bengkel Elektronika] Alat ukur serbaguna di laboratorium elektronika yang dapat mengukur Arus (A), Tegangan (V), dan Hambatan (Ohm) adalah...',
        options: [
          { text: 'Multimeter (AVO Meter)', correct: true },
          { text: 'Barometer Presisi', correct: false },
          { text: 'Higrometer Udara', correct: false },
          { text: 'Luxmeter Ruangan', correct: false }
        ],
        explanation: 'Multimeter (AVO meter) mengukur tiga besaran pokok rangkaian elektronika: Arus (A), Tegangan (V), dan Hambatan (Ohm).'
      },
      {
        workshop: 'Bengkel TKJ - Daya Sinyal Cahaya',
        question: '5. [Bengkel TKJ] Alat di bengkel serat optik yang berfungsi mengukur intensitas daya sinyal cahaya dan redaman (loss) dalam satuan dBm adalah...',
        options: [
          { text: 'Optical Power Meter (OPM)', correct: true },
          { text: 'Mikrometer Sekrup', correct: false },
          { text: 'Barcode Scanner', correct: false },
          { text: 'Luxmeter Sinar', correct: false }
        ],
        explanation: 'OPM mengukur besaran intensitas daya optik dan redaman sinyal cahaya pada kabel serat optik dalam satuan dBm atau Watt.'
      }
    ]
  },

  glitch_buku_5: {
    title: 'Buku Anomali Bengkel #5 (Variasi Lintas Bengkel SMK)',
    desc: 'Ujian komprehensif kejuruan: Algoritma Pemrograman, Studio Teleprompter, Kupas Kabel, OBD-II Scanner, dan Power Supply.',
    questions: [
      {
        workshop: 'Bengkel RPL - Logika Algoritma',
        question: '1. [Bengkel RPL] Struktur perulangan pemrograman manakah yang menjamin blok kode di dalamnya dieksekusi minimal satu kali sebelum memeriksa kondisi?',
        options: [
          { text: 'do...while loop', correct: true },
          { text: 'for loop', correct: false },
          { text: 'while loop', correct: false },
          { text: 'switch case', correct: false }
        ],
        explanation: 'do...while mengeksekusi tubuh pernyataan terlebih dahulu, baru memeriksa kondisi terminasi di akhir blok.'
      },
      {
        workshop: 'Bengkel Penyiaran - Teks Naskah Berjalan',
        question: '2. [Bengkel Penyiaran] Kaca monitor pantul di depan lensa kamera studio yang memantulkan naskah berjalan agar presenter membaca lancar sambil menatap kamera adalah...',
        options: [
          { text: 'Teleprompter', correct: true },
          { text: 'Video Switcher', correct: false },
          { text: 'Boom Pole Mic', correct: false },
          { text: 'Green Screen Backdrop', correct: false }
        ],
        explanation: 'Teleprompter memantulkan teks naskah ke kaca optik transparan tepat di depan lensa kamera video.'
      },
      {
        workshop: 'Bengkel TKJ - Kupas Jaket Kabel',
        question: '3. [Bengkel TKJ] Di bengkel jaringan, alat "Wire Stripper" dirancang khusus dengan berbagai ukuran celah pisau presisi untuk...',
        options: [
          { text: 'Mengupas kulit isolasi jaket kabel tanpa memotong serat kawat tembaga', correct: true },
          { text: 'Menyambungkan kabel tanpa solder', correct: false },
          { text: 'Mendinginkan prosesor switch', correct: false },
          { text: 'Memperkuat frekuensi wifi', correct: false }
        ],
        explanation: 'Wire stripper mengupas jaket pelindung kabel tanpa memotong atau menggores serat kawat konduktor tembaga di dalamnya.'
      },
      {
        workshop: 'Bengkel Otomotif - Scanner Injeksi EFI',
        question: '4. [Bengkel Otomotif] Alat diagnosa elektronik yang dicolokkan ke port OBD-II untuk membaca kode kerusakan (DTC) dan sensor mesin injeksi EFI adalah...',
        options: [
          { text: 'Engine Diagnostic Scanner (OBD-II Scanner)', correct: true },
          { text: 'Kunci Pas Ring', correct: false },
          { text: 'Obeng Magnet Mekanik', correct: false },
          { text: 'Pengukur Tekanan Ban', correct: false }
        ],
        explanation: 'Engine Scanner membaca data sensor live dan kode kerusakan DTC dari unit komputer ECU mesin kendaraan secara digital.'
      },
      {
        workshop: 'Bengkel Elektronika - Catu Daya Teregulasi',
        question: '5. [Bengkel Elektronika] Alat di meja kerja elektronika yang mengubah listrik AC 220V menjadi tegangan DC stabil yang voltasenya dapat disetel presisi adalah...',
        options: [
          { text: 'Regulated DC Power Supply', correct: true },
          { text: 'Inverter DC ke AC', correct: false },
          { text: 'Trafo Las Listrik', correct: false },
          { text: 'Genset Motor Bensin', correct: false }
        ],
        explanation: 'Regulated DC Power Supply menyediakan suplai daya listrik arus searah (DC) teregulasi dengan proteksi arus untuk menguji rangkaian.'
      }
    ]
  }
};

// Helper: Acak urutan array menggunakan Fisher-Yates shuffle
export function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Helper: Menyiapkan soal buku dengan jawaban yang diacak secara dinamis
// Memastikan opsi jawaban (A, B, C, D) selalu teracak posisinya dan TIDAK SELALU 'A'
export function prepareRandomizedBookQuestions(rawQuestions) {
  if (!rawQuestions || !Array.isArray(rawQuestions)) return [];

  return rawQuestions.map((q) => {
    // Bersihkan prefix huruf lama jika ada, lalu acak opsi pilihan jawaban
    const cleanedOptions = q.options.map(opt => ({
      text: opt.text.replace(/^[A-D]\.\s*/i, '').trim(),
      correct: !!opt.correct
    }));

    // Acak posisi pilihan jawaban secara dinamis
    const randomizedOptions = shuffleArray(cleanedOptions);

    return {
      workshop: q.workshop || 'Bengkel Kejuruan SMK',
      question: q.question,
      options: randomizedOptions,
      explanation: q.explanation
    };
  });
}
