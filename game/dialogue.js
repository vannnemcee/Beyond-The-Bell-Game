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
      text: 'Sekarang misimu cari 5 buku anomali bengkel kejuruan (dengan soal bervariasi dari tiap bengkel), 3 kunci, dan 1 {(@&@(&!*@(@) agar kamu bisa membuka gerbang sekolah ini HAHHAHA!',
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

  // 7a. Layar Hitam: Siti Membangunkan Pemain di Kegelapan
  wake_up_in_darkness: (player) => [
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: `Woi ${player.name}, bangun... bangun! Kamu gamau pulang kah?`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Hmm...?',
      action: 'reveal_afternoon_classroom'
    }
  ],

  // 7b. Layar Hitam Hilang: Sekolah Sudah Sepi Jam 4 Sore Hanya MC & Siti
  afternoon_classroom_dialogue: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Hah... aku dimana??'
    },
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: 'Hei kamu kenapa? Ayo pulang udah jam pulang ini!'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'T-tapi... tadi pameran sekolah, dimensi glitch yang runtuh, 5 buku anomali bengkel... bayangan anomali... dan pedang cahaya itu... apa semuanya cuma mimpi?!'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: '(Aku memeriksa saku dan tasku... Pedang dari dimensi lain itu benar-benar lenyap tanpa jejak! Tidak ada satupun senjata mistis yang terbawa ke dunia nyata...)'
    },
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: `Hahaha mimpi aneh apaan sih ${player.name}? Kebanyakan belajar teori bengkel kejuruan ya kamu! Tuh lihat jam dinding kelas, udah jam 4 sore lewat!`
    },
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: 'Sekolah udah sepi melompong. Bu Rina sama anak-anak lain udah pada pulang dari tadi. Ayo cepat bereskan tasmu, kita pulang ke gerbang sekolah bareng! Aku tungguin di depan gerbang ya!'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Hoo gitu ya... Syukurlah semuanya baik-baik saja! Oke Siti, aku bereskan buku dulu lalu langsung susul ke gerbang depan.',
      action: 'start_afternoon_home_mission'
    }
  ],

  afternoon_siti_classroom_reminder: (player) => [
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: `Ayo ${player.name}, jangan bengong lagi! Tas sudah siap kan? Yuk kita jalan ke gerbang depan untuk pulang!`
    }
  ],

  // 7c. Gerbang Depan Jam 4 Sore: Pamitan Pulang & Tamat
  ending_gate_farewell: (player) => [
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: `Nah, akhirnya sampai juga di gerbang! Jam 4 sore suasana sekolah tenang banget ya.`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Iya Siti, makasih banyak ya udah nungguin dan bangunin aku di kelas tadi.'
    },
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: `Sama-sama ${player.name}! Istirahat yang cukup di rumah ya, jangan sampai ketiduran di kelas lagi besok! Sampai ketemu besok pagi di SMKN 1 Katapang!`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Sampai ketemu besok, Siti!',
      action: 'trigger_ending_credits'
    }
  ],

  satpam_afternoon_farewell: (player) => [
    {
      speaker: 'Pak Satpam',
      portrait: 'satpam_portrait',
      text: `Sudah jam 4 sore lewat nak ${player.name}, Siti. Hati-hati di jalan ya, langsung pulang ke rumah dan istirahat yang cukup!`
    }
  ],

  // 7d. Fallback Legacy
  wake_up_in_class_normal: (player) => [
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Hah... Dimana aku...?'
    },
    {
      speaker: 'Siti',
      portrait: 'siti_portrait',
      text: `Hei ${player.name}, ayo bangun! Sudah jam 4 sore, gerbang sekolah sudah dibuka untuk pulang!`,
      action: 'start_afternoon_home_mission'
    }
  ],

  ibu_kantin_intro: (player) => [
    {
      speaker: 'Ibu Kantin',
      portrait: 'ibu_kantin_portrait',
      text: `Halo ${player.name}! Mau jajan apa nih saat jam istirahat?`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_down_0' : 'girl_portrait',
      text: 'Halo Bu! Mau jajan makanan dan minuman kantin nih bu.'
    },
    {
      speaker: 'Ibu Kantin',
      portrait: 'ibu_kantin_portrait',
      text: 'Di etalase dan meja kantin ada 4 pilihan jajanan favorit: Es Teh Manis dingin, Roti Bakar coklat keju, Gorengan bakwan & gehu anget, dan Cilok bumbu kacang gurih. Silakan ambil jajan yang kamu suka ya!',
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
  ],

  // --- DIALOGUE NPC LUAR SEKOLAH ---
  mang_ujang_intro: (player) => [
    {
      speaker: 'Mang Ujang',
      portrait: 'pedagang_kaki_lima_portrait',
      text: `Halo adek ${player.name}! Jam istirahat ya? Nih cilok anget bumbu kacang sama batagor gurih khas Katapang!`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Wah, aromanya wangi banget Mang! Tiap jam istirahat mangkal di luar gerbang ya?'
    },
    {
      speaker: 'Mang Ujang',
      portrait: 'pedagang_kaki_lima_portrait',
      text: 'Iya dek, siswa SMKN 1 Katapang langganan setia mamang. Semangat ya pameran RPL-nya, harum namanya sekolah ini!'
    }
  ],

  bang_dedi_intro: (player) => [
    {
      speaker: 'Bang Dedi',
      portrait: 'ojol_portrait',
      text: `Siang dek ${player.name}! Abang lagi nunggu orderan penumpang sama pesanan paket di seberang gerbang nih.`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Rame orderan hari ini Bang Dedi?'
    },
    {
      speaker: 'Bang Dedi',
      portrait: 'ojol_portrait',
      text: 'Alhamdulillah dek, pas jam istirahat sekolah jalanan luar selalu ramai. Keren ya anak-anak SMK sekarang pada jago bikin aplikasi!'
    }
  ],

  pak_yanto_intro: (player) => [
    {
      speaker: 'Pak Yanto',
      portrait: 'warga_portrait',
      text: `Assalamu'alaikum nak ${player.name}. Bapak lagi jalan santai di depan sekolah.`
    },
    {
      speaker: 'Pak Yanto',
      portrait: 'warga_portrait',
      text: 'Warga sekitar bangga banget sama SMKN 1 Katapang. Murid-muridnya sopan dan pintar merakit teknologi komputer.'
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Wa\'alaikumsalam Pak Yanto! Terima kasih banyak atas doa dan dukungannya untuk kami!'
    }
  ],

  // --- DIALOGUE NPC RAMAI DALAM SEKOLAH ---
  doni_basket: (player) => [
    {
      speaker: 'Doni',
      portrait: 'siswa_basket_portrait',
      text: `Yo ${player.name}! Istirahat gini paling seger buat shooting basket bentar biar gak pegel habis ngoding di lab!`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Keren Don! Nanti sore tanding antar kelas kan?'
    },
    {
      speaker: 'Doni',
      portrait: 'siswa_basket_portrait',
      text: 'Pasti dong! Tim RPL harus juara! Habis ini giliran Fajar yang coba 3-point.'
    }
  ],

  fajar_basket: (player) => [
    {
      speaker: 'Fajar',
      portrait: 'rian_portrait',
      text: `Haha Doni passing ke sini bolanya! Eh ${player.name}, jangan lupa cobain jajanan kantin mumpung belum bel masuk ya!`
    }
  ],

  nisa_kantin: (player) => [
    {
      speaker: 'Nisa',
      portrait: 'siti_portrait',
      text: `Hai ${player.name}! Es teh manis buatan Bu Kantin beneran penyelamat dahaga, seger banget!`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Iya Nisa, manis dinginnya pas banget!'
    }
  ],

  maya_kantin: (player) => [
    {
      speaker: 'Maya',
      portrait: 'siswi_casual_portrait',
      text: `Roti bakar kejunya lumer banget di lidah! Habis makan yuk kita keliling liat pameran di koridor.`
    }
  ],

  andi_mading: (player) => [
    {
      speaker: 'Andi',
      portrait: 'rian_portrait',
      text: `Hai ${player.name}! Di mading banyak info keren tentang lomba software nasional sama info sertifikasi kompetensi kejuruan!`
    }
  ],

  putri_gazebo: (player) => [
    {
      speaker: 'Putri',
      portrait: 'siswi_casual_portrait',
      text: `Suasana gazebo adem banget ya ${player.name}. Belajar logika algoritma sambil kena angin sepoi-sepoi jadi makin paham!`
    }
  ],

  farhan_pohon: (player) => [
    {
      speaker: 'Farhan',
      portrait: 'rian_portrait',
      text: `Ngadem di bawah pohon rindang ini bikin rileks pikiran. Siap fokus lagi pas pelajaran kejuruan nanti!`
    }
  ],

  bayu_kantin: (player) => [
    {
      speaker: 'Bayu',
      portrait: 'rian_portrait',
      text: `Lagi antre beli gorengan anget nih. Jam istirahat kantin selalu rame, suasananya seru!`
    }
  ],

  dewi_kantin: (player) => [
    {
      speaker: 'Dewi',
      portrait: 'siti_portrait',
      text: `Bu Kantin selalu ramah melayani semua siswa. Makanannya juga higienis dan terjangkau!`
    }
  ],

  gilang_hallway: (player) => [
    {
      speaker: 'Gilang',
      portrait: 'rian_portrait',
      text: `Halo ${player.name}! Selamat datang di Booth Web Development! Ini karya website sistem informasi sekolah buatan kelompok kami.`
    }
  ],

  sari_hallway: (player) => [
    {
      speaker: 'Sari',
      portrait: 'siswi_casual_portrait',
      text: `Hai ${player.name}! Silakan coba prototype UI/UX aplikasi mobile kami. Tampilannya kami rancang agar mudah digunakan semua siswa!`
    }
  ],

  // --- DIALOGUE 5 NPC BARU DI RUANG KELAS ---
  dimas_kelas: (player) => [
    {
      speaker: 'Dimas',
      portrait: 'rian_portrait',
      text: `Hei ${player.name}! Lagi jam istirahat ya? Aku lagi lanjutin kodingan logic algorithm buat tugas Bu Rina nih.`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Keren Dimas, jangan lupa istirahat atau jajan ke kantin juga ya!'
    },
    {
      speaker: 'Dimas',
      portrait: 'rian_portrait',
      text: 'Siap! Nanti habis fungsi recursive ini beres aku langsung ke kantin.'
    }
  ],

  dinda_kelas: (player) => [
    {
      speaker: 'Dinda',
      portrait: 'siswi_casual_portrait',
      text: `Hai ${player.name}! Aku lagi merapikan desain UI/UX poster pameran RPL di laptop. Palet warnanya disesuaikan sama tema sekolah kita!`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Desainmu selalu estetik dan rapi Dinda, mantap banget!'
    }
  ],

  rizky_kelas: (player) => [
    {
      speaker: 'Rizky',
      portrait: 'rian_portrait',
      text: `Halo ${player.name}! Di ruangan kelas sebelah lagi rame ya? Kami di sini lagi ngetes sensor mikrokontroler buat showcase IoT RPL.`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Wah keren banget proyek IoT-nya Rizky, semangat perakitannya!'
    }
  ],

  tio_kelas: (player) => [
    {
      speaker: 'Tio',
      portrait: 'rian_portrait',
      text: `Yo ${player.name}! Mau jalan ke kantin ya? Nanti kalau beli roti bakar kabar-kabari ya, lagi asyik bedah relasi tabel SQL bareng Alya nih.`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Haha siap Tio, nanti aku mampir ke kantin dulu ya!'
    }
  ],

  alya_kelas: (player) => [
    {
      speaker: 'Alya',
      portrait: 'siti_portrait',
      text: `Hai ${player.name}! Query database pendaftaran siswa kami sudah berhasil terhubung dan dites di endpoint API lokal!`
    },
    {
      speaker: player.name,
      portrait: player.gender === 'boy' ? 'boy_portrait' : 'girl_portrait',
      text: 'Keren banget Alya! Kerja tim kalian solid banget!'
    }
  ]
};
