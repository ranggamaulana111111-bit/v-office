# Spesifikasi Desain Visual: Multi-Floor Cutaway Office Diorama (`design.md`)

## 1. Konsep Visual Utama: *Stacked Multi-Floor Cutaway Diorama* (Gedung Bertingkat Potongan Melintang)

Mengacu langsung pada referensi visual pilihanmu, **NEXUS Virtual Office** menggunakan gaya **Multi-Floor Architectural Cutaway Diorama** (tampak irisan melintang gedung perkantoran bertingkat yang disusun vertikal dari atas ke bawah, di mana dinding depan dibuka sehingga seluruh aktivitas di tiap lantai terlihat jelas seperti maket hidup).

Ciri khas utama dari gaya visual ini:
1. **Susunan Lantai Bertingkat (*Vertical Stacked Floors*)**:
   - Gedung ditampilkan per lantai yang utuh dan lebar (bukan kotak-kotak kecil terpisah), dibingkai oleh **tebal pelat lantai beton** di bagian bawah, dinding samping kiri-kanan yang menyudut ke dalam (*1-point perspective cutaway*), serta **Pintu Lift Perak di Tengah Dinding Belakang** pada setiap lantai.
2. **Pencahayaan Siang/Interior Arsitektural yang Bersih (*Bright Architectural Daylight & Realistic Materials*)**:
   - Lantai menggunakan material nyata: marmer krem mengilap di Lobi (`1F`), beton abu-abu industrial dengan garis lampu LED hijau di lantai bawah tanah (`B1`), serta parket kayu hangat dan karpet merah di lantai studio & ruang pribadi (`2F` & `3F`).
3. **Kubikel Kaca Dalam Lantai (*In-Floor Glass Rooms*)**:
   - Di dalam satu lantai yang luas, ruangan-ruangan spesifik dipisahkan oleh **partisi dinding kaca transparan** di sudut kiri/kanan, sementara bagian tengah berisi deretan meja kerja putih dengan kursi kantor hitam dan **karakter staf/agen yang sedang duduk bekerja**.
4. **Layar TV Dashboard Menyala di Dinding & Label Pill di Bawah Lantai**:
   - Di dinding belakang dan dinding samping terpasang **layar monitor TV hitam** yang menampilkan angka metrik *real-time* (trafik Gbps, persentase CPU, kas PT) yang bisa diklik untuk membuka panel penuh.
   - Di tepi kiri bawah setiap pelat lantai terdapat **Floating Status Pill** putih bersih (contoh: `[1F] Lobby - Reception • Ready for Meeting` atau `[B1] NOC & FTTH Infra • 1,428 ONT Online • CPU 14%`) serta tombol panah `<` `>` dan `Turn the room`.

## 2. Pemetaan 16 Ruangan ke Dalam 4 Lantai Gedung Diorama (`1F`, `B1`, `2F`, `3F`)

Agar persis seperti gambar referensi (tidak terpecah menjadi 16 kotak sempit), ke-16 ruanganmu disatukan secara harmonis ke dalam **4 Lantai Diorama Utama**:

### Lantai 1 (`1F`): *Lobby, Reception & Public Showroom* (Zona Publik)
Menempati lantai paling atas/depan dengan lantai marmer krem terang:

| Area di Dalam Lantai `1F` | Mewakili Ruangan | Detail Perabot & Karakter Visual (Sesuai Referensi) | Aksi Saat Objek Diklik |
| :--- | :--- | :--- | :--- |
| **Jalur Masuk Kiri (*Driveway & Entrance*)** | Gerbang Masuk Tamu | Jalan aspal samping gedung dengan **mobil sedan hitam** yang berhenti di depan pintu kaca geser, pilar gedung, dan tamu yang berjalan masuk. | Mengubah mode antara tampilan *Owner* dan *Simulasi Tamu Publik*. |
| **Tengah Lantai (`Reception & Turnstiles`)** | **1. Ruangan About** | **Meja resepsionis kayu melengkung** dengan staf resepsionis, papan nama perusahaan di dinding belakang, tiang layar antrean digital, dan **gerbang *turnstile* kaca** di depan pintu lift. | Membuka profil lengkap pemilik, status kehadiran, dan formulir buku tamu/kontak. |
| **Sudut Kanan & Dinding Layar (`Showroom & Lounge`)** | **2. Ruangan Portofolio** | **Layar monitor besar di sebelah lift** (menampilkan statistik proyek), bingkai karya di dinding, serta **sofa tamu krem dengan meja kopi bundar** dan tanaman pot. | Membuka website **Portofolio** milikmu yang sudah ada. |

### Lantai Bawah Tanah (`B1`): *NOC, Panel FTTH, Infra & Secret Vault* (Zona Infrastruktur & Rahasia)
Menempati lantai bawah berlantai beton abu-abu industrial dengan garis lampu lantai hijau menyala:

| Area di Dalam Lantai `B1` | Mewakili Ruangan | Detail Perabot & Karakter Visual (Sesuai Referensi) | Aksi Saat Objek Diklik |
| :--- | :--- | :--- | :--- |
| **Sudut Kanan Belakang (*Server Farm*)** | **3. Ruangan NOC**<br>**4. Panel FTTH** | Deretan **6 Lemari Rak Server & OLT Hitam Tinggi** dengan ratusan titik lampu LED hijau-kuning yang berkedip, jalur pipa kabel di plafon, tabung APAR merah, serta **Layar Video Wall Besar** di dinding kanan & belakang. | • **Klik Video Wall / Rak Kiri**: Membuka web **NOC** yang sudah ada.<br>• **Klik Rak OLT Kanan**: Membuka web **Panel FTTH** yang sudah ada. |
| **Barisan Meja Tengah (*Ops Center*)** | **5. Habitat Web**<br>**6. Task Manager** | Tiga baris meja panjang putih dengan kursi hitam dan monitor (tempat operator memantau uptime domain & beban CPU/RAM server), ditambah layar metrik `25% | 76%` di sebelah lift. | • **Klik Layar Metrik Dinding**: Buka **Task Manager**.<br>• **Klik Meja Tengah**: Buka pantauan domain **Habitat Web**. |
| **Kubikel Kaca Sudut Kiri Atas** | **7. Operating System**<br>**8. Ruangan Drive** | Ruangan berpartisi kaca di sudut kiri belakang dengan meja multi-monitor dan rak penyimpanan berkas NAS/Cloud. | • **Klik Meja Multi-Monitor**: Buka mode **Multi-Window OS**.<br>• **Klik Rak Penyimpanan**: Buka **Ruangan Drive** dokumen. |
| **Kubikel Berpelindung Sudut Kiri Bawah** | **9. Ruangan Rahasia** | Ruangan berpartisi khusus di sudut kiri depan dengan pintu akses ber-PIN dan meja brankas terenkripsi. | Memunculkan panel input **PIN Keamanan** untuk membuka brankas kredensial. |

### Lantai 2 (`2F`): *Business Operations, Billing PT & AI Agents Studio* (Zona Bisnis & AI)
Menempati lantai berlantai kayu terang dengan jendela pemandangan kota di dinding belakang:

| Area di Dalam Lantai `2F` | Mewakili Ruangan | Detail Perabot & Karakter Visual (Sesuai Referensi) | Aksi Saat Objek Diklik |
| :--- | :--- | :--- | :--- |
| **Kubikel Kaca Kiri Atas & Bawah** | **10. Billing PT**<br>**11. Setting** | Dua ruangan eksekutif berpartisi kaca di sisi kiri dengan meja putih, layar grafik keuangan di dinding, rak buku/map arsip *invoice*, dan panel pengaturan sistem. | • **Klik Kubikel Kiri Atas**: Buka **Billing PT** (tabel & buat *invoice* PDF).<br>• **Klik Kubikel Kiri Bawah**: Buka **Setting** (konfigurasi URL NOC/FTTH/Portofolio). |
| **Barisan Meja Tengah (*AI & Work Floor*)** | **12. Agents Ku** | Empat baris meja kerja komunal di tengah lantai tempat **karakter staf AI berbaju oranye/hitam duduk bekerja** menghadap deretan monitor komputer. | Membuka pusat komando **Agents Ku** (pemicu audit AI NOC, rekap tagihan Billing, dan chat AI). |
| **Area Kanan (*Whiteboard & Kanban Corner*)** | **13. Ruangan Tugas** | **Papan tulis *whiteboard* beroda** yang penuh tempelan kartu *sticky notes* warna-warni (kuning/oranye/biru) di dekat kubikel kanan. | Membuka papan **Kanban Tugas Harian** (*To Do*, *In Progress*, *Done*). |

### Lantai 3 (`3F`): *Next Project Lab, Personal Sanctuary & Photo Studio* (Zona Perencanaan & Pribadi)
Menempati lantai kreatif dengan jalan tengah **Karpet Merah (*Red Carpet*)** dari pintu lift dan dinding biru tua *Hall of Fame*:

| Area di Dalam Lantai `3F` | Mewakili Ruangan | Detail Perabot & Karakter Visual (Sesuai Referensi) | Aksi Saat Objek Diklik |
| :--- | :--- | :--- | :--- |
| **Sayap Kiri (*Amphitheater & Planning Lab*)** | **14. Gudang Perencanaan (*Next Project*)** | **Tribun tangga kayu dengan bantal duduk warna-warni**, layar monitor *leaderboard/roadmap* besar di depan tribun, dan meja diskusi rencana proyek baru. | Membuka **Gudang Perencanaan** (daftar ide ekspansi proyek berikutnya, RAB, & kesiapan). |
| **Sayap Kanan Atas (*Personal Sanctuary*)** | **15. Ruangan Saya Pribadi** | Area meja kerja pribadi dengan dinding pajangan *Hall of Fame*, tanaman hias gantung, dan dua kursi santai hijau dengan meja bundar kecil. | Membuka **Ruangan Saya Pribadi** (*Pomodoro Timer*, suara *ambient*, dan jurnal pribadi). |
| **Sudut Kanan Bawah (*Photo & Media Studio*)** | **16. Ruang Penyimpanan & Pengelolaan Foto** | **Set Studio Fotografi Lengkap**: kain latar belakang (*backdrop*) putih melengkung, **2 lampu *softbox / ring light* berdiri**, **kamera di atas tripod**, dan kursi sutradara. | Membuka **Studio & Galeri Penyimpanan Foto Terpisah** (album foto, EXIF, dan *color grading*). |

## 3. Elemen Antarmuka Pelengkap di Setiap Lantai (Sesuai Gambar Referensi)

1. **Bottom Floor Status Pill (Di Kiri Bawah Setiap Pelat Lantai)**:
   - Setiap lantai memiliki lencana kapsul putih melayang di atas bibir beton lantai:
     - `1F`: **`[1F] Lobby - Reception`** • `Online • Ready for Client Visit`
     - `B1`: **`[B1] NOC & FTTH Infra`** • `Floor | Vault` • `🟢 1,428 ONT Online • CPU 14.2%`
     - `2F`: **`[2F] Billing PT & AI Studio`** • `Billing | Agents | Tasks` • `🟢 3 AI Agents Active`
     - `3F`: **`[3F] Next Project & Photo Studio`** • `Planning | Personal | Photo Lab`
2. **Tombol Navigasi Sudut (`<`, `>`, dan `↻ Turn the room`)**:
   - Di sisi kiri dan kanan tengah setiap lantai terdapat tombol bundar putih `<` dan `>` untuk menggeser fokus antar-ruangan di dalam lantai tersebut, serta tombol **`↻ Turn the room`** di kanan bawah lantai untuk memutar sudut pandang ruangan.
3. **Hover Tooltip & Klik Langsung pada Perabot**:
   - Saat kursor diarahkan ke rak server di `B1`, papan tulis di `2F`, atau kain studio foto di `3F`, muncul label nama ruangan dan ketika diklik langsung membuka panel layar kerja ruangan tersebut.
