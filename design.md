# Spesifikasi Desain Visual, Interior 3D & UI/UX: NEXUS 3D Virtual Office OS

## 1. Konsep Visual Utama: *3D Isometric Cutaway Office*

Desain visual **NEXUS 3D Virtual Office OS** mengusung gaya **3D Isometric Cutaway Office** (tampak ruang kantor 3D dengan atap terbuka dan dua sisi dinding berpartisi kaca, serupa dengan tampilan interior bangunan pada *The Sims* atau diorama kantor modern).

Melalui konsep ini, kantor virtual benar-benar tampil **seperti ruangan kantoran fisik**:
- Setiap ruangan memiliki **lantai bertekstur** (karpet kerja, lantai *raised-floor* khusus ruang server NOC/FTTH, atau lantai kayu hangat di ruang pribadi).
- Setiap ruangan dibatasi oleh **dinding belakang, dinding samping, dan partisi kaca depan berpintu** yang menghubungkan ruangan tersebut ke lorong utama gedung.
- Di dalam setiap ruangan terdapat **perabot kantor 3D (*3D Office Furniture*)** yang ditata sesuai fungsi divisi ruangan tersebut dan dapat diklik langsung oleh pengguna.

## 2. Tata Ruang Lantai Gedung & Interior Detail 16 Ruangan 3D

Gedung kantor dirancang dalam tata letak **4 Sayap Utama (16 Ruangan Kantor)** yang dihubungkan oleh koridor tengah bercahaya:

### 2.1. Sayap Depan: Area Resepsionis & Galeri Tamu (Zona 1)

| Ruangan | Desain Interior & Perabot 3D di Dalamnya | Suasana Pencahayaan & Warna | Objek 3D yang Bisa Diklik (*Hotspots*) |
| :--- | :--- | :--- | :--- |
| **1. About (Lobi Resepsionis)** | Meja resepsionis melengkung berlapis marmer gelap, kursi resepsionis, sofa tunggu tamu 3 dudukan, meja kopi kaca, pot tanaman hijau tinggi, dan logo menyala di dinding. | Terang, ramah, dengan aksen cahaya **Emerald Hijau (`#10B981`)**. | • **Meja Resepsionis**: Buka profil & info kontak.<br>• **Sofa Tamu / Buku Tamu**: Kirim pesan / jadwal *meeting*. |
| **2. Portofolio (Showroom Publik)** | Ruang galeri pameran dengan 3 tiang layar *display* interaktif, lampu sorot plafon, karpet hijau zamrud, dan layar proyektor lebar di dinding utama. | Bersih, elegan, dengan sorotan lampu galeri putih-hijau. | • **Layar Proyektor Dinding**: Buka web **Portofolio** yang sudah ada.<br>• **Tiang Display 3D**: Lihat ringkasan karya unggulan. |

### 2.2. Sayap Kiri: Pusat Infrastruktur Jaringan & Sistem (Zona 2)

| Ruangan | Desain Interior & Perabot 3D di Dalamnya | Suasana Pencahayaan & Warna | Objek 3D yang Bisa Diklik (*Hotspots*) |
| :--- | :--- | :--- | :--- |
| **3. NOC (Network Operations Center)** | Lantai *raised-floor* abu-abu gelap, **Video Wall besar** di dinding belakang (menampilkan peta jaringan), meja panjang operator dengan 3 monitor lengkung, kursi kerja *mesh*, dan 2 kabinet rak *core router* dengan deretan lampu LED berkedip. | Gelap ala ruang komando dengan pendaran cahaya **Cyber Cyan (`#06B6D4`)**. | • **Video Wall Dinding**: Buka web **NOC** yang sudah ada.<br>• **Rak Core Router**: Cek status BGP & trafik.<br>• **Meja Operator**: Kirim log ke AI Agent. |
| **4. Panel FTTH (Ruang Kontrol Optik)** | Deretan **Kabinet Rak OLT**, jalur *tray* kabel serat optik kuning di bagian atas dinding, meja kerja teknisi fiber dengan 2 monitor, dan layar tabel redaman optik di dinding. | Presisi tinggi dengan aksen **Sky Blue (`#0EA5E9`)** & indikator LED hijau/merah. | • **Kabinet OLT & Monitor**: Buka web **Panel FTTH** yang sudah ada.<br>• **Panel Alarm Optik**: Cek ONT *online* / LOS & *reboot* ONT. |
| **5. Habitat Web (Ruang Radar Server)** | Meja bundar di tengah ruangan dengan proyeksi bola dunia 3D berputar di atasnya, 2 rak server web di sudut kiri, dan layar monitor daftar domain di dinding. | Futuristik dengan aksen **Teal (`#14B8A6`)**. | • **Bola Dunia / Meja Radar**: Cek status *uptime* & *ping* seluruh domain.<br>• **Layar Dinding**: Pantau masa aktif SSL. |
| **6. Operating System (Ruang Multi-Monitor)** | Meja kerja melengkung menyerupai kokpit dengan 4 layar monitor yang melayang dalam susunan dua baris, kursi *executive*, dan dock sistem di meja. | Modern dengan aksen cahaya **Indigo (`#6366F1`)**. | • **Monitor Kokpit**: Masuk ke mode **Multi-Window OS** (buka jendela NOC, FTTH, dan Terminal sekaligus). |
| **7. Task Manager (Ruang Mesin Sistem)** | Ruang utilitas teknis berisi 3 silinder/menara indikator beban server, layar grafik CPU & RAM di dinding, serta meja konsol kontrol kontainer. | Teknis dengan aksen **Electric Violet (`#8B5CF6`)**. | • **Menara Server 3D**: Pantau CPU & RAM tiap servis.<br>• **Meja Konsol**: *Restart* kontainer layanan. |

### 2.3. Sayap Tengah & Kanan: Operasional Bisnis, AI & Perencanaan (Zona 2 & 3)

| Ruangan | Desain Interior & Perabot 3D di Dalamnya | Suasana Pencahayaan & Warna | Objek 3D yang Bisa Diklik (*Hotspots*) |
| :--- | :--- | :--- | :--- |
| **8. Billing PT (Ruang Keuangan)** | Meja staf akuntansi/keuangan berbentuk L, 2 monitor kerja, mesin printer dokumen di meja samping, **Lemari Kabinet Arsip 4 Laci**, dan grafik kas di dinding. | Profesional dengan aksen **Royal Blue (`#3B82F6`)**. | • **Komputer Meja**: Buat *invoice* PT baru & hitung pajak.<br>• **Lemari Kabinet Arsip**: Buka daftar tagihan lunas / belum lunas. |
| **9. Agents Ku (Ruang Staf AI Virtual)** | Ruang laboratorium cerdas dengan 3 pod meja asisten AI yang masing-masing memiliki kristal/hologram cahaya melayang di atas meja, serta layar log di dinding. | Cerdas & modern dengan pendaran **Neural Purple (`#A855F7`)**. | • **Pod Agen NOC / Billing / Planner**: Perintahkan asisten AI menjalankan analisis & otomasi.<br>• **Layar Utama**: Chat langsung dengan AI. |
| **10. Tugas (Ruang Rapat & Kanban)** | Meja kerja tim, kursi rapat, dan **Papan Tulis Kaca Lebar (*Whiteboard Kanban*)** di dinding belakang yang dipenuhi kartu tempel warna-warni (*sticky notes* 3D). | Produktif dan dinamis dengan aksen **Fuchsia (`#D946EF`)**. | • **Papan Tulis Kanban 3D**: Geser status tugas harian (*To Do*, *Proses*, *Selesai*).<br>• **Meja Kerja**: Tambah tiket tugas baru. |
| **11. Gudang Perencanaan (*Next Project*)** | Meja arsitek datar berukuran besar di tengah ruangan dengan gulungan kertas *blueprint* di atasnya, papan matriks prioritas di dinding, dan rak maket proyek. | Kreatif & strategis dengan aksen **Warm Amber (`#F59E0B`)**. | • **Meja Blueprint Tengah**: Tambah & kelola rencana proyek masa depan beserta estimasi anggaran (RAB). |
| **12. Drive (Ruang Arsip & Cloud Storage)** | Deretan rak lemari arsip dokumen perusahaan dari lantai ke plafon, menara penyimpanan NAS/S3 dengan lampu kuning, dan meja indeks berkas. | Rapi & terstruktur dengan aksen **Gold Yellow (`#EAB308`)**. | • **Rak Arsip & Menara NAS**: Buka manajer file dokumen PT & file *backup* router.<br>• **Meja Indeks**: Unggah berkas kerja baru. |
| **13. Setting (Ruang Panel Kontrol)** | Dinding penuh panel sakelar, layar konfigurasi URL konektor eksternal, dan meja teknisi sistem. | Netral & bersih dengan aksen **Cool Slate (`#94A3B8`)**. | • **Panel Konektor Dinding**: Ubah alamat URL web NOC, FTTH, dan Portofolio serta ganti PIN brankas. |

### 2.4. Sayap Belakang: Area Pribadi, Studio Foto & Brankas Rahasia (Zona 4)

| Ruangan | Desain Interior & Perabot 3D di Dalamnya | Suasana Pencahayaan & Warna | Objek 3D yang Bisa Diklik (*Hotspots*) |
| :--- | :--- | :--- | :--- |
| **14. Ruangan Saya Pribadi (Sanctuary Owner)** | Lantai parket kayu hangat, meja kerja kayu besar, lampu meja belajar bercahaya kuning teduh, cangkir kopi, sofa santai pribadi, tanaman hias daun lebar, dan speaker audio di sudut. | Hangat, tenang (*Cozy Nocturnal*) dengan aksen **Warm Emerald & Amber**. | • **Lampu / Jam Meja**: Nyalakan *Pomodoro Timer*.<br>• **Speaker Sudut**: Putar suara hujan / *ambient synth*.<br>• **Buku Catatan Meja**: Tulis jurnal pribadi. |
| **15. Ruang Penyimpanan & Pengelolaan Foto** | Ruang studio visual terpisah dari Drive: dinding galeri dengan deretan bingkai foto menyala, lampu sorot studio, dan meja kurasi dengan monitor lebar kalibrasi warna. | Artistik ala *darkroom studio* dengan aksen **Studio Pink (`#EC4899`)**. | • **Dinding Bingkai Foto**: Buka galeri album foto resolusi tinggi.<br>• **Monitor Meja Kurasi**: Edit pencahayaan & warna foto (*brightness/contrast/saturation*). |
| **16. Ruangan Rahasia (Brankas Baja)** | Dinding beton berlapis baja gelap, **Pintu Brankas Bundar (*Heavy Steel Vault Door*)** di bagian dalam, bingkai laser merah, dan panel tombol PIN digital menyala. | Misterius & berpengamanan tinggi dengan aksen **Crimson Red (`#F43F5E`)**. | • **Panel PIN Pintu Brankas**: Masukkan PIN rahasia untuk membuka brankas kredensial *root* & kunci rahasia. |

## 3. Desain Pergerakan Kamera 3D (*Camera Choreography*)

Agar navigasi di dalam gedung kantor 3D terasa alami dan tidak membuat pusing, kamera memiliki 3 mode pandang utama:

1. **Mode 1: *Isometric Building Overview* (Tampilan Seluruh Lantai Kantor)**:
   - Kamera berada di sudut miring atas (40 derajat) menampilkan keseluruhan 16 ruangan kantor sekaligus.
   - Pengguna dapat memutar gedung dengan menggeser layar untuk melihat aktivitas di semua sayap kantor (melihat lampu rak NOC yang berkedip, melihat posisi ruang pribadi, atau mengecek lobi depan).
2. **Mode 2: *Room Interior Zoom-In* (Kamera Masuk ke Dalam Ruangan)**:
   - Saat pengguna mengklik salah satu ruangan (baik dari denah 3D maupun dari daftar ruangan di samping), kamera otomatis meluncur turun dan mendekat ke dalam ruangan tersebut sehingga meja kerja, layar monitor, kursi, dan rak server di ruangan itu terlihat jelas dari dekat.
3. **Mode 3: *Focused Workspace Overlay* (Layar Kerja Aktif di Atas Ruangan 3D)**:
   - Ketika pengguna mengklik monitor atau perabot di dalam ruangan 3D, jendela antarmuka kerja (seperti tampilan web NOC/FTTH asli, tabel *invoice* Billing PT, atau studio edit foto) muncul dengan bingkai kaca gelap (*glassmorphism panel*) yang tajam dan mudah dibaca, sementara interior ruangan 3D tetap terlihat di sekelilingnya sebagai latar suasana kantor.

## 4. Sistem Tipografi & Tata Letak Panel Kerja

Ketika pengguna sedang membuka layar kerja di dalam ruangan 3D, keterbacaan data tetap menjadi prioritas utama:
- **Tipografi Antarmuka (`Inter`)**: Digunakan untuk nama ruangan, label tombol perabot, kartu tugas Kanban, dan dokumen rencana proyek.
- **Tipografi Data Teknis & Keuangan (`JetBrains Mono`)**: Digunakan secara khusus untuk menampilkan angka trafik Gbps di ruang **NOC**, angka redaman optik `-dBm` di ruang **Panel FTTH**, nominal Rupiah di ruang **Billing PT**, serta metrik CPU/RAM di ruang **Task Manager**.
- **Tombol Navigasi Cepat Antar-Ruangan**: Di bagian kiri layar tetap tersedia daftar direktori 16 ruangan dan tombol *Ruangan Sebelumnya / Berikutnya* sehingga pemilik dapat berpindah dari meja **NOC** ke meja **Billing PT** dalam satu detik kapan pun dibutuhkan.
