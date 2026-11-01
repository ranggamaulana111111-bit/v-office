# Product Requirements Document (PRD): NEXUS 3D Virtual Office OS

## 1. Visi Produk & Konsep Ruang Kantor 3D

**NEXUS 3D Virtual Office OS** adalah aplikasi kantor virtual pribadi berbentuk **Gedung & Interior Ruangan Kantor 3D Isometrik Interaktif** yang menggabungkan pengalaman berada di dalam kantor fisik sungguhan dengan pusat kendali infrastruktur jaringan (NOC & FTTH), operasional perusahaan (Billing PT), asisten kecerdasan buatan (AI Agents), ruang kerja pribadi, serta lobi publik untuk tamu/klien.

Berbeda dari *dashboard* admin biasa yang hanya menampilkan tabel dan menu datar, sistem ini menerapkan konsep **3D Spatial Office + Interactive Furniture (Masuk Ruangan 3D → Klik Perabot Kantor → Buka Layar Kerja)**:
- **Pengalaman Masuk Kantor Fisik**: Saat aplikasi dibuka, pengguna melihat lantai kantor 3D lengkap dengan koridor, pintu kaca, meja kerja, kursi, rak server yang berkedip, papan tulis, lemari arsip, hingga ruang brankas rahasia.
- **Perabot 3D Sebagai Pemicu Fitur (*Interactive Hotspots*)**: Setiap benda 3D di dalam ruangan memiliki fungsi nyata—mengklik layar *Video Wall* di dinding ruangan NOC akan membuka tampilan web NOC yang sudah ada, mengklik rak OLT membuka Panel FTTH, dan mengklik lemari kabinet di ruang Billing PT membuka daftar *invoice* perusahaan.
- **Konektor Langsung untuk Web yang Sudah Ada (*Zero Rebuild*)**: Website **NOC**, **Panel FTTH**, dan **Portofolio** yang sudah dimiliki tidak perlu dibuat ulang, melainkan langsung terhubung ke objek monitor/layar di dalam ruangan 3D masing-masing.

## 2. Peran Pengguna & Pembagian Akses Gedung 3D

| Peran Pengguna | Hak Akses Ruangan 3D | Pengalaman Saat Memasuki Gedung Virtual |
| :--- | :--- | :--- |
| **Owner / Direktur Utama (Pemilik)** | Seluruh 16 Ruangan Kantor (Zona 1 s.d. Zona 4) | Bebas memutar kamera 3D ke seluruh sudut gedung, melakukan *zoom-in* ke dalam ruangan kerja mana pun, mengakses meja operasional, serta membuka pintu brankas **Ruangan Rahasia** dengan PIN. |
| **Staf / Rekan Teknis (Opsional)** | Hanya Ruangan Operasional Tertentu (misal: NOC, Panel FTTH, Tugas) | Hanya dapat memasuki pintu ruangan yang diizinkan; ruangan pribadi, galeri foto, dan ruangan rahasia tampak terkunci dari luar. |
| **Tamu Publik / Klien (Tanpa Login)** | Hanya Zona 1 (**Lobi About** & **Galeri Portofolio**) | Kamera 3D hanya menampilkan area Lobi Resepsionis depan dan Galeri Portofolio; 14 ruangan kantor bagian dalam tertutup partisi buram (*frosted glass*) dan tidak dapat dimasuki. |

## 3. Spesifikasi Fungsional & Interior 16 Ruangan Kantor 3D

Seluruh 16 ruangan dirancang memiliki bentuk tata ruang kantoran yang berbeda sesuai fungsi kerjanya.

### 3.1. Zona 1: Lobi Depan & Galeri Publik (Terbuka untuk Tamu)

#### 1. Ruangan About (Lobi Resepsionis Utama)
- **Wujud Ruangan Kantor 3D**: Area lobi depan gedung dengan meja resepsionis melengkung, papan logo menyala di dinding belakang, sofa tunggu tamu, tanaman hias sudut, dan papan indikator status kehadiran pemilik.
- **Interaksi Objek 3D & Fitur**:
  - **Meja Resepsionis**: Diklik untuk menampilkan kartu profil lengkap pemilik, bidang keahlian, dan informasi perusahaan.
  - **Lampu Status Kehadiran**: Menampilkan warna hijau (*Ada di Kantor / Siap Diskusi*), biru (*Sedang Fokus / Deep Work*), atau kuning (*Sedang di Lapangan / Maintenance*).
  - **Telepon / Buku Tamu Meja**: Diklik oleh pengunjung untuk mengirim pesan langsung, menghubungi via email/WhatsApp bisnis, atau menjadwalkan waktu *meeting*.

#### 2. Ruangan Portofolio (Ruang Pameran & Showroom Proyek)
- **Wujud Ruangan Kantor 3D**: Ruang *showroom* modern bersebelahan dengan lobi, berisi deretan layar pedestal pameran (*display stands*), bingkai studi kasus di dinding, dan layar proyektor utama.
- **Interaksi Objek 3D & Fitur**:
  - **Layar Proyektor Utama**: Menyambungkan dan membuka website **Portofolio** milikmu yang sudah ada secara langsung di layar pengunjung.
  - **Deretan Frame Pameran 3D**: Menampilkan ringkasan proyek unggulan (infrastruktur jaringan, FTTH, maupun sistem perangkat lunak) sebelum pengunjung membuka detail penuhnya.

### 3.2. Zona 2: Sayap Infrastruktur Jaringan, Bisnis & Sistem Inti

#### 3. Ruangan NOC (Network Operations Center)
- **Wujud Ruangan Kantor 3D**: Ruang pusat komando berpendingin dengan dinding kaca gelap, **Video Wall raksasa** (susunan 6 layar monitor besar di dinding depan), meja panjang operator dengan 3 monitor lengkung, kursi kerja *high-back*, dan rak *core router* dengan lampu indikator LED biru/hijau yang berkedip.
- **Interaksi Objek 3D & Fitur**:
  - **Video Wall Dinding Utama**: Membuka website **NOC** yang sudah ada secara penuh (*embedded view*) untuk memantau trafik jaringan utama tanpa pindah tab browser.
  - **Rak Core Router 3D**: Menampilkan status cepat sesi BGP, kapasitas *upstream*, suhu perangkat, dan *latency*.
  - **Telepon Darurat Meja NOC**: Mengirimkan log anomali jaringan langsung ke ruangan **Agents Ku** untuk dianalisis oleh asisten AI.

#### 4. Ruangan Panel FTTH (Ruang Kendali Serat Optik & OLT)
- **Wujud Ruangan Kantor 3D**: Ruang teknis telekomunikasi yang dilengkapi deretan **Kabinet Rak OLT (Optical Line Terminal)**, panel distribusi kabel *patch cord* fiber optik berwarna kuning/biru, meja kerja teknisi, dan layar peta jalur distribusi ODC/ODP.
- **Interaksi Objek 3D & Fitur**:
  - **Kabinet Rak OLT & Monitor Teknisi**: Membuka website **Panel FTTH** yang sudah ada untuk memantau dan mengelola pelanggan fiber optik.
  - **Panel Indikator Sinyal Optik**: Menampilkan jumlah ONT *Online*, daftar modem pelanggan yang terputus (*LOS / Loss of Signal* dengan indikator lampu merah berkedip di rak 3D), serta peringatan redaman kabel tinggi (*High Attenuation*).
  - **Papan Tiket Gangguan**: Membuat tugas perbaikan lapangan otomatis ke ruangan **Tugas** jika ada jalur fiber yang putus.

#### 5. Ruangan Billing PT (Ruang Keuangan & Administrasi Korporat)
- **Wujud Ruangan Kantor 3D**: Ruang kantor divisi keuangan/akuntansi dengan meja kerja rapi, komputer layar ganda, mesin cetak dokumen di sudut meja, lemari kabinet arsip (*filing cabinet*) 4 laci, dan brankas kas kecil.
- **Interaksi Objek 3D & Fitur**:
  - **Komputer Meja Keuangan**: Membuka sistem pembuatan *invoice* resmi PT, kalkulasi otomatis PPN 11% dan PPh, serta pencetakan tagihan PDF.
  - **Lemari Kabinet Arsip 3D**: Membuka daftar seluruh *invoice* pelanggan korporat maupun retail berdasarkan status (*Lunas*, *Menunggu Pembayaran*, *Jatuh Tempo*).
  - **Buku Besar Kas di Meja**: Menampilkan rekapitulasi arus kas masuk bulanan dan total piutang yang belum tertagih.

#### 6. Ruangan Habitat Web (Ruang Radar Domain & Server)
- **Wujud Ruangan Kantor 3D**: Ruang pemantauan server yang memiliki meja bundar berhologram bola dunia/jaringan di tengah ruangan serta layar daftar status domain di dinding.
- **Interaksi Objek 3D & Fitur**:
  - **Meja Radar Server**: Memantau status hidup/mati (*HTTP 200 OK* dan waktu *ping*) dari seluruh website dan aplikasi web yang kamu kelola.
  - **Panel Sertifikat Dinding**: Menampilkan hitung mundur masa aktif sertifikat SSL/TLS dan masa berlaku domain agar tidak ada website yang mati karena lupa diperpanjang.

#### 7. Ruangan Operating System (Ruang Kontrol Multi-Monitor)
- **Wujud Ruangan Kantor 3D**: Ruang kerja futuristik dengan meja kokpit melengkung yang dikelilingi banyak layar melayang (*floating multi-monitors*).
- **Interaksi Objek 3D & Fitur**:
  - **Meja Kokpit Multi-Layar**: Mengaktifkan mode **Desktop Operating System** di layar browser, di mana kamu bisa membuka jendela **NOC**, **Panel FTTH**, **Billing PT**, dan **Terminal** secara berdampingan sekaligus di satu layar kerja (*multi-window multitasking*).

#### 8. Ruangan Task Manager (Ruang Mesin & Utilitas Server)
- **Wujud Ruangan Kantor 3D**: Ruang utilitas mesin gedung dengan menara indikator beban kerja server, panel meteran daya CPU/RAM, dan sakelar kontrol layanan.
- **Interaksi Objek 3D & Fitur**:
  - **Menara Metrik Server**: Menampilkan persentase penggunaan CPU, memori RAM, dan kapasitas penyimpanan dari seluruh komponen sistem (Next.js, Laravel, Python, Go, Database, dan Storage).
  - **Panel Sakelar Layanan**: Memungkinkan pemantauan antrean proses latar belakang (*background jobs*) dan melakukan *restart* layanan secara terukur.

### 3.3. Zona 3: Sayap Produktivitas, AI & Perencanaan Proyek

#### 9. Ruangan Agents Ku (Ruang Kerja Staf AI Virtual)
- **Wujud Ruangan Kantor 3D**: Ruang kerja tim asisten cerdas yang berisi 3 meja kerja melingkar dengan inti cahaya AI di atasnya (mewakili agen khusus NOC, agen keuangan Billing, dan agen perencana proyek).
- **Interaksi Objek 3D & Fitur**:
  - **Meja Agen NOC**: Memerintahkan AI memeriksa rangkuman gangguan jaringan harian.
  - **Meja Agen Billing**: Memerintahkan AI menyiapkan draf pesan pengingat tagihan untuk klien PT yang belum membayar.
  - **Meja Komando Utama**: Membuka ruang diskusi (*chat instruksi*) untuk mendelegasikan tugas otomasi kepada asisten AI.

#### 10. Ruangan Tugas (Ruang Eksekusi Harian & Papan Kanban)
- **Wujud Ruangan Kantor 3D**: Ruang kerja kolaboratif dengan **Papan Tulis Kaca Besar (*Kanban Whiteboard*)** yang penuh dengan tempelan kartu warna-warni di dinding, meja kerja panjang, dan jam dinding target harian.
- **Interaksi Objek 3D & Fitur**:
  - **Papan Kanban Dinding 3D**: Membuka papan manajemen tugas harian (*Antrean / To Do*, *Sedang Dikerjakan*, dan *Selesai*) untuk memindahkan progres pekerjaan teknis maupun bisnis.
  - **Meja Kerja Eksekusi**: Menambahkan tugas baru lengkap dengan label kategori dan prioritas.

#### 11. Ruangan Gudang Perencanaan Next Project / Tugas
- **Wujud Ruangan Kantor 3D**: Ruang arsitek/perencanaan (*War Room / Idea Lab*) dengan meja gambar *blueprint* lebar di tengah ruangan, rak maket proyek masa depan, dan papan peta ekspansi di dinding.
- **Interaksi Objek 3D & Fitur**:
  - **Meja Blueprint Tengah**: Membuka daftar rencana proyek masa depan (seperti ekspansi jalur FTTH baru, fitur aplikasi baru, atau pengadaan infrastruktur), lengkap dengan estimasi anggaran modal (RAB) dan persentase kesiapan.
  - **Rak Cetak Biru**: Memindahkan rencana proyek yang sudah matang langsung ke dalam **Ruangan Tugas** untuk mulai dikerjakan.

#### 12. Ruangan Drive (Ruang Arsip Dokumen & Server Penyimpanan)
- **Wujud Ruangan Kantor 3D**: Ruang arsip perusahaan yang dipenuhi deretan rak lemari berkas (*archive shelves*), laci dokumen legalitas, dan unit penyimpanan *Network Attached Storage* (NAS).
- **Interaksi Objek 3D & Fitur**:
  - **Rak Lemari Dokumen**: Membuka pengelola berkas awan (*Cloud Drive*) untuk menyimpan kontrak PT, dokumen legalitas, topologi jaringan, dan file *backup* konfigurasi router/OLT.
  - **Meja Pemindai Berkas**: Mengunggah file kerja baru ke dalam folder yang terorganisasi rapi (terpisah dari penyimpanan foto pribadi).

#### 13. Ruangan Setting (Ruang Panel Kontrol Gedung)
- **Wujud Ruangan Kantor 3D**: Ruang kontrol teknisi gedung dengan papan sakelar pengaturan dinding, terminal konfigurasi konektor web, dan panel manajemen kunci akses.
- **Interaksi Objek 3D & Fitur**:
  - **Terminal Konektor Web**: Mengatur dan mengubah alamat URL untuk ketiga web yang sudah ada (**NOC**, **Panel FTTH**, dan **Portofolio**).
  - **Panel Keamanan & Preferensi**: Mengatur tema pencahayaan gedung 3D, kredensial integrasi sistem, dan penggantian PIN **Ruangan Rahasia**.

### 3.4. Zona 4: Sayap Pribadi, Studio Foto & Brankas Rahasia

#### 14. Ruangan Saya Pribadi (Ruang Kerja Eksekutif / Sanctuary Pribadi)
- **Wujud Ruangan Kantor 3D**: Ruang kerja direktur/pribadi yang hangat dan nyaman—berbeda dari ruang NOC yang dingin. Dilengkapi meja kayu eksklusif, lampu meja bercahaya kuning hangat, kursi kulit ergonomis, sofa santai, tanaman hijau, pemutar musik di sudut ruangan, dan jendela besar.
- **Interaksi Objek 3D & Fitur**:
  - **Jam Pasir / Timer di Meja**: Menjalankan *Pomodoro Focus Timer* saat ingin bekerja tenang tanpa gangguan.
  - **Speaker / Pemutar Musik Sudut**: Menyalakan suara latar (*ambient rain / lo-fi synth*) untuk membantu konsentrasi.
  - **Buku Jurnal di Meja Kayu**: Membuka catatan harian dan *scratchpad* pribadi pemilik.

#### 15. Ruangan Terpisah Penyimpanan untuk Foto dan Pengelolaannya
- **Wujud Ruangan Kantor 3D**: Ruang **Studio & Galeri Fotografi Pribadi** yang terpisah dari ruang Drive dokumen—dilengkapi dinding galeri berbingkai foto dengan lampu sorot atas (*track lighting*), meja kurasi visual dengan monitor kalibrasi warna, dan lemari penyimpanan media.
- **Interaksi Objek 3D & Fitur**:
  - **Dinding Galeri Foto 3D**: Membuka koleksi album foto beresolusi tinggi (dokumentasi lapangan, infrastruktur, maupun foto pribadi) dengan penyaringan per album.
  - **Meja Studio Edit & Pengelolaan**: Menyediakan fitur pengelolaan foto lengkap—melihat informasi resolusi/EXIF, mengatur pengelompokan album, serta menyesuaikan pencahayaan dan warna foto (*brightness, contrast, saturation*).

#### 16. Ruangan Rahasia (Ruang Brankas Bawah Tanah / Vault Terisolasi)
- **Wujud Ruangan Kantor 3D**: Ruangan berpelindung baja di sudut terdalam gedung yang tertutup **Pintu Besi Brankas Melingkar (*Heavy Vault Door*)** dengan lampu laser merah dan panel tombol PIN digital di samping pintu.
- **Interaksi Objek 3D & Fitur**:
  - **Panel PIN Pintu Brankas**: Saat ruangan ini diklik, pintu tidak langsung terbuka melainkan memunculkan layar kunci PIN/Passphrase.
  - **Kotak Deposit di Dalam Brankas**: Setelah PIN benar, pintu brankas 3D terbuka dan menampilkan penyimpanan terenkripsi untuk password *root* utama, kunci SSH, dan catatan paling sensitif, lengkap dengan tombol penguncian instan (*Quick Lock*).

## 4. Kebutuhan Non-Fungsional Khusus Lingkungan 3D

1. **Kelancaran Kamera & Performa Render 3D**:
   - Denah kantor 3D wajib berjalan mulus (60 FPS pada PC/Laptop kerja) dengan menggunakan model 3D bergaya *Low-Poly Modern Isometric* yang bersih dan pencahayaan yang sudah dioptimasi.
   - Transisi kamera dari **Tampilan Seluruh Lantai Gedung (*Building Overview*)** menuju **Tampilan Masuk ke Dalam Ruangan (*Room Interior Zoom-In*)** harus bergerak mulus menggunakan interpolasi kamera (*smooth camera gliding*) tanpa patahan.
2. **Kemudahan Penggunaan Harian (*Ergonomi Kerja*)**:
   - Ketika pemilik sudah berada di dalam sebuah ruangan 3D dan mengklik monitor/meja kerja, panel kerja fungsional (seperti layar web NOC atau tabel Billing PT) akan terbuka sebagai lapisan antarmuka yang jelas dan nyaman dibaca berjam-jam, dengan latar ruangan 3D yang tetap terlihat di belakangnya.
   - Tersedia tombol pintas di bilah samping untuk berpindah cepat antar-ruangan apabila sedang menangani kondisi darurat jaringan tanpa harus menunggu animasi kamera 3D.
