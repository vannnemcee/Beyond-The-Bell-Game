// Beyond The Bell - Dialogue Trees & Storyline

export const DIALOGUES = {
  // Cutscene Pembuka Kelas Saat Jam Istirahat (Bagian 1: Di dalam kelas)
  classroom_recess_intro: (player) => [
    {
      speaker: 'Bu Rina',
      portrait: 'teacher_portrait',
      text: 'Baik anak anak waktu nya istirahat'
    },
    {
      speaker: 'Semua Murid',
      portrait: 'rian_portrait',
      text: 'Baik makasih ibu',
      action: 'start_auto_walk_to_doorway'
    }
  ],

  // Cutscene Pembuka Kelas Saat Jam Istirahat (Bagian 2: Otomatis di depan pintu kelas)
  classroom_recess_doorway: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'hmmm kemana ya?'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'hmm kekantin aja deh',
      action: 'recess_intro_complete'
    }
  ],

  // Monolog Tiba di Kantin
  canteen_arrival: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'hmm beli apa ya',
      action: 'canteen_buy_food_quest'
    }
  ],

  // Monolog Setelah Mengambil / Membeli Makanan di Kantin
  canteen_food_bought: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Mmm, enak banget jajanan kantinnya! Sekarang waktunya kembali masuk ke kelas.',
      action: 'canteen_food_done'
    }
  ],

  // Teriakan Pak Satpam saat player mau masuk kembali ke gedung kelas
  satpam_shout: (player) => [
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: `HEY NAK ${player.name.toUpperCase()}, SINI DULU!`,
      action: 'satpam_shouted_action'
    }
  ],

  // Dialog Misi Bicara dengan Bapa (Pak Satpam) - Peringatan Makhluk Halus
  satpam_bapa_talk: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Iya bapa, ada apa ya pak?'
    },
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: `Nah nak ${player.name}, bapak cuma mau bilang... Eh nak jaga jaga ya.`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Jaga jaga apa pak?'
    },
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: 'Konon katanya ada makhluk halus di sekolah kita...'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Waduh takut aku pak? Beneran ada pak?'
    },
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: 'Iya makanya jangan melamun sendirian di ruangan sepi ya nak, tetap waspada!'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: `Yaudah makasih pa atas info nya, ${player.name} mau masuk kelas dulu.`
    },
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: 'Iya sama sama, hati-hati ya nak!',
      action: 'satpam_talk_done'
    }
  ],

  // 1. Terbangun di Kegelapan (Layar Masih Hitam Pekat)
  glitch_blackout_wakeup: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'aku dimana?'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'kenapa sepi?',
      action: 'reveal_glitch_classroom_post_blackout'
    }
  ],

  // 1b. Dialog Sosok Misterius (???) dipicu saat karakter pertama kali digerakkan di kelas glitch
  glitch_entity_voice: (player) => [
    {
      speaker: '???',
      portrait: 'shadow_glitch_portrait',
      text: 'oh kamu sudah bangun ya...'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'siapa kamu?'
    },
    {
      speaker: '???',
      portrait: 'shadow_glitch_portrait',
      text: 'ahahah kamu tidak perlu tau!'
    },
    {
      speaker: '???',
      portrait: 'shadow_glitch_portrait',
      text: 'Baiklah jika kamu ingin keluar maka kamu harus mencari kunci ruangan ini agar bisa keluar dari dalam sekolah!'
    },
    {
      speaker: '???',
      portrait: 'shadow_glitch_portrait',
      text: 'Dan saya akan beri kamu waktu 60 detik... kalau tidak kamu akan mati HAHAHAHA!',
      action: 'start_classroom_60s_timer'
    }
  ],

  // Fallback compatibility
  glitch_classroom_wakeup: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'aku dimana?'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'kenapa sepi?',
      action: 'reveal_glitch_classroom_post_blackout'
    }
  ],

  // 2. Menemukan Kunci Ruangan Kelas
  glitch_found_classroom_key: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Ini dia kunci ruangannya! Cepat lari ke pintu depan sebelum waktu 60 detik habis!',
      action: 'classroom_key_obtained'
    }
  ],

  // 3. Tiba di Luar Sekolah / Halaman Glitch Sepi
  glitch_courtyard_voice: (player) => [
    {
      speaker: '???',
      portrait: 'shadow_glitch_portrait',
      text: 'OH... KAMU KAMU HEBAT TERNYATA!'
    },
    {
      speaker: '???',
      portrait: 'shadow_glitch_portrait',
      text: 'Sekarang misimu cari 7 buku bengkel kejuruan (TKJ, Tekstil, Otomotif, Mesin, Elektronika, BP, RPL), 3 kunci, dan 1 {(@&@(&!*@(@) agar kamu bisa membuka gerbang sekolah ini HAHHAHA!',
      action: 'courtyard_glitch_quest_start'
    }
  ],

  // 4. Menemukan Pedang di Sela Semak
  sword_found: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'hmm apa itu? sebuah pedang...'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'yaudah saya bawa untuk jaga-jaga!',
      action: 'sword_obtained'
    }
  ],

  // 5. Menuju Gerbang & Muncul Satpam ?
  boss_satpam_appear: (player) => [
    {
      speaker: 'Satpam ?',
      portrait: 'satpam_portrait',
      text: 'Oh kamu mau pergi? tidak semudah itu...'
    },
    {
      speaker: 'Satpam ?',
      portrait: 'satpam_portrait',
      text: 'KAU HARUS LAWAN AKU HAHAHAH!',
      action: 'start_boss_battle'
    }
  ],

  // 6. Bos Kalah & Dimensi Mulai Runtuh
  boss_defeated_escape: (player) => [
    {
      speaker: 'Satpam ?',
      portrait: 'satpam_portrait',
      text: 'GWAARGHHH...! TIDAAKKK... KEKUATANKU HANCURRR...!'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Dimensi ini tiba-tiba nge-glitch dan mulai runtuh! Aku harus keluar dari situ secepat mungkin lewat Portal!',
      action: 'escape_portal_spawn'
    }
  ],

  // 7. Terbangun di Kelas dengan Keadaan Semula Normal
  wake_up_in_class_normal: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Hah... Dimana aku...?'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Ko... semuanya kembali normal!? Bu Rina sedang mengajar, teman-teman juga ada di sini!'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Apakah yang tadi cuma mimpi buruk... atau peringatan makhluk halus dari Pak Satpam tadi ya?'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Yang penting aku selamat! Sekarang aku bisa fokus ikuti pameran dan kuis RPL dengan tenang.',
      action: 'normal_dimension_restored'
    }
  ],

  ibu_kantin_intro: (player) => [
    {
      speaker: 'Ibu Kantin',
      portrait: 'teacher_portrait',
      text: `Halo ${player.name}! Mau jajan apa nih saat jam istirahat?`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Halo Bu! Mau jajan makanan dan minuman kantin nih bu.'
    },
    {
      speaker: 'Ibu Kantin',
      portrait: 'teacher_portrait',
      text: 'Ada Es Teh Manis dingin dan Roti Bakar hangat di meja kantin, ambil saja yang kamu suka ya!',
      action: 'canteen_buy_food_quest'
    }
  ],

  teman_siti: (player) => [
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: `Hai ${player.name}! Akhirnya bel istirahat berbunyi juga ya. Yuk kita jajan ke kantin di halaman!`
    }
  ],

  teman_rian: (player) => [
    {
      speaker: 'Rian',
      portrait: 'rian_portrait',
      text: `Asik sudah jam istirahat! Yuk ${player.name}, kita jajan bareng ke kantin di halaman luar!`
    }
  ],

  teman_kelas: (player) => [
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: 'Asik sudah jam istirahat! Yuk kita jajan ke kantin di halaman luar!'
    }
  ],

  satpam_intro: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Halo pak, apa kabar? Gerbang sekolahnya ditutup ya pak?'
    },
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: `Hai ${player.name}! Betul nak, pintu gerbang utama sengaja bapak kunci selama jam sekolah & istirahat untuk keamanan siswa.`
    },
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: 'Kalau kamu mau jajan, silakan ke area Kantin di sebelah kanan! Setelah itu kamu bisa kembali masuk ke ruang kelas lewat pintu bawah.'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Wah asik pak! Terima kasih informasinya ya pak.'
    }
  ],

  budi_intro: (player) => [
    {
      speaker: 'Budi',
      portrait: 'rian_portrait',
      text: `Hai ${player.name}! Udaranya adem banget ya istirahat di lapangan ini.`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Iya Bud! Lapangan basket dan taman sekolah kita memang nyaman banget.'
    },
    {
      speaker: 'Budi',
      portrait: 'rian_portrait',
      text: 'Jangan lupa jajan ke Kantin di sebelah kanan ya, lalu masuk ke dalam gedung untuk tonton Pameran RPL!'
    }
  ],

  satpam_repeat: (player) => [
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: `Semangat ya ${player.name}! Pintu koridor pameran ada di sebelah utara lapangan.`
    }
  ],

  rian_intro: (player) => [
    {
      speaker: 'Rian',
      portrait: 'rian_portrait',
      text: `Halo ${player.name}! Untung kamu datang! Kami sedang panik nih.`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Ada masalah apa, Rian?'
    },
    {
      speaker: 'Rian',
      portrait: 'rian_portrait',
      text: 'Flashdisk presentasi utama berisi file demo proyek pameran tertinggal di Ruang Kelas RPL!',
      action: 'quest_2_start'
    },
    {
      speaker: 'Rian',
      portrait: 'rian_portrait',
      text: 'Bisakah kamu tolong ambilkan Flashdisk itu di Ruang Kelas? Pintunya ada di sebelah barat koridor ini.'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Serahkan padaku! Aku akan segera mencarinya di kelas.'
    }
  ],

  rian_turn_in: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Rian! Ini Flashdisk 128GB yang kamu cari, kutemukan di atas meja!'
    },
    {
      speaker: 'Rian',
      portrait: 'rian_portrait',
      text: 'Wah luar biasa! Terima kasih banyak, pameran stan kami terselamatkan!',
      action: 'quest_2_complete'
    },
    {
      speaker: 'Rian',
      portrait: 'rian_portrait',
      text: 'Sebagai tanda terima kasih, kuberikan akses kunci Lab Komputer. Dan jangan lupa temui Bu Rina di kelas ya, beliau sedang mencari siswa untuk Kuis Tantangan RPL!'
    }
  ],

  rian_done: () => [
    {
      speaker: 'Rian',
      portrait: 'rian_portrait',
      text: 'Semua booth pameran sudah berjalan lancar! Terima kasih atas bantuanmu!'
    }
  ],

  siti_intro: (player) => [
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: `Hai ${player.name}! Selamat datang di Booth Database & Cloud Architecture!`
    },
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: 'Di sini kami memamerkan ERD (Entity Relationship Diagram) untuk sistem pendaftaran dan absensi siswa.',
      action: 'show_erd_option'
    }
  ],

  bu_rina_intro: (player) => [
    {
      speaker: 'Bu Rina',
      portrait: 'teacher_portrait',
      text: `Halo ${player.name}! Senang melihat antusiasmemu dalam pameran kejuruan RPL hari ini.`
    },
    {
      speaker: 'Bu Rina',
      portrait: 'teacher_portrait',
      text: 'Ibu punya tantangan khusus: Uji Pengetahuan Kejuruan RPL! Terdiri dari 5 soal seputar koding, database, dan logika.'
    },
    {
      speaker: 'Bu Rina',
      portrait: 'teacher_portrait',
      text: 'Jika berhasil menjawab dengan baik, kamu akan mendapatkan gelar Bintang RPL dan piagam penghargaan di Lab Komputer!',
      action: 'offer_quiz'
    }
  ],

  bu_rina_done: (player) => [
    {
      speaker: 'Bu Rina',
      portrait: 'teacher_portrait',
      text: `Selamat ${player.name}! Pengetahuan RPL kamu sungguh membanggakan. Teruslah berkarya dan berinovasi!`
    }
  ]
};
