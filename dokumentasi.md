# Dokumentasi Teknis & Arsitektur Sistem: NEXUS 3D Virtual Office OS (Edisi Laragon & MySQL)

## 1. Arsitektur *Hybrid Powerhouse* untuk Lingkungan Kantor 3D

Sistem **NEXUS 3D Virtual Office OS** memadukan mesin grafis 3D di sisi browser dengan empat layanan *backend* terpisah di lingkungan **Laragon & MySQL**, serta jembatan penghubung (*bridge*) ke tiga website milikmu yang sudah berjalan (**NOC**, **Panel FTTH**, dan **Portofolio**).

| Komponen Arsitektur | Teknologi yang Digunakan | Peran dalam Kantor Virtual 3D |
| :--- | :--- | :--- |
| **3D Spatial Engine & Frontend Shell** | Next.js (TypeScript) + Three.js (React Three Fiber & Drei) + Zustand | Merender gedung kaca transparan dan perabot interior 16 ruangan kantor 3D, mengatur pergerakan kamera *zoom-in* ke meja/rak server, menangani deteksi klik pada objek 3D (*raycasting*), serta membuka jendela kerja di atas kanvas 3D. |
| **External Web Connector Bridge** | Persistent Iframe Container + Reverse Proxy + PostMessage | Menyambungkan website **NOC**, **Panel FTTH**, dan **Portofolio** yang sudah ada agar langsung tampil saat monitor/layar di dalam ruangan 3D diklik. |
| **Core Business, Database & Storage Backend** | Laravel 11 + Laravel Sanctum + **MySQL 8.0+ (Laragon)** + Multi-Disk Storage | Menjalankan seluruh logika bisnis di balik objek ruangan: pembuatan *invoice* PDF di **Billing PT**, papan kerja di **Tugas**, rencana di **Gudang Perencanaan**, manajemen berkas di **Drive**, pengelolaan album di **Ruangan Foto**, serta brankas di **Ruangan Rahasia**. |
| **AI Agent Orchestrator** | Python 3.12 (FastAPI) + PyMySQL + LLM Integration | Menghidupkan staf asisten virtual di dalam ruangan **Agents Ku** untuk menganalisis log gangguan jaringan dan membantu rekapitulasi administrasi PT. |
| **Real-Time Telemetry Daemon** | Go (Golang 1.23) + WebSocket Server | Mengirimkan sinyal status *real-time* ke dalam ruangan 3D (seperti membuat lampu indikator rak server 3D di ruang **NOC/FTTH** berkedip merah jika ada gangguan, serta menyuplai data ke ruang **Habitat Web** dan **Task Manager**). |

## 2. Cara Kerja Gedung Kaca Transparan 3D (*Living Transparent Building*)

Saat aplikasi pertama kali dibuka, pengguna disambut oleh tampilan **Gedung Kantor Berdinding Kaca Transparan yang Sedang Bekerja Secara Real-Time**:

### 2.1. Struktur Model Ruangan & Perabot 3D (*Modular 3D Scene Graph*)
- **Hierarki Lantai & Dinding Kaca Transparan**: Seluruh gedung dibagi menjadi 16 grup ruangan (*Room Groups*) di atas satu lantai dasar kantor dengan partisi kaca tembus pandang sehingga aktivitas di dalam setiap ruangan langsung terlihat dari luar gedung.
- **Katalog Perabot Interaktif (*Interactive Meshes*)**: Di dalam masing-masing grup ruangan diletakkan model 3D perabot kantor berformat ringan (`.glb` / `.gltf` atau geometri teroptimasi) yang diberi penanda identitas (*metadata tag*), seperti:
  - Objek `noc_videowall_screen` dan `noc_core_rack` di Ruangan NOC.
  - Objek `ftth_olt_cabinet` dan `ftth_work_desk` di Ruangan Panel FTTH.
  - Objek `billing_computer` dan `billing_filing_cabinet` di Ruangan Billing PT.
  - Objek `tasks_kanban_whiteboard` di Ruangan Tugas.
  - Objek `photo_gallery_wall` dan `photo_grading_desk` di Ruangan Penyimpanan Foto.
  - Objek `secret_vault_door` dan `secret_pin_pad` di Ruangan Rahasia.

### 2.2. Sinkronisasi Visual Gedung 3D dengan Data *Real-Time* (*Live 3D State Binding*)
Kondisi fisik di dalam gedung transparan 3D berubah secara otomatis mengikuti data dari MySQL dan servis Go Telemetry:
- **Indikator Lampu Rak Server 3D**: Jika web **NOC** atau **Panel FTTH** mendeteksi adanya perangkat *down* atau ONT mengalami *Loss of Signal* (LOS), lampu LED pada rak server 3D di ruangan tersebut otomatis berubah dari hijau/biru menjadi merah berkedip yang langsung terlihat menembus dinding kaca gedung.
- **Denyut Aktivitas di Ruangan Agents Ku & Habitat Web**: Inti cahaya di atas meja asisten AI dan bola dunia radar di ruangan Habitat Web berputar mengikuti status proses latar belakang.
- **Indikator Pintu Ruangan Rahasia**: Pintu brankas baja 3D di **Ruangan Rahasia** tetap tertutup rapat dengan lampu indikator merah selama status sesi brankas terkunci, dan berputar membuka secara visual ketika PIN berhasil diverifikasi.
- **Mode Pencahayaan Tamu Publik**: Saat diakses oleh tamu tanpa login, lampu di 14 ruangan kantor privat otomatis diredupkan dan kamera dikunci hanya pada koordinat ruang **About** serta **Portofolio**.

## 3. Desain Skema Database Utama pada MySQL (Laragon)

Seluruh data operasional yang baru dibangun disimpan secara terpusat di database **MySQL (`nexus_office_db`)** dan dikelola melalui migrasi Laravel 11:

### 3.1. Modul Administrasi & Billing PT (`pt_clients`, `pt_invoices`, `pt_cashflows`)
- **Tabel `pt_clients`**: Menyimpan daftar perusahaan/pelanggan, NPWP, alamat penagihan, kontak PIC, dan jenis layanan berlangganan (*Dedicated Metro-E*, *FTTH Corporate*, *Managed Service*).
- **Tabel `pt_invoices`**: Menyimpan nomor *invoice*, ID klien, periode tagihan, subtotal, nilai PPN 11%, potongan PPh 23, total tagihan bersih, status pembayaran (`DRAFT`, `SENT`, `PAID`, `OVERDUE`), tanggal jatuh tempo, dan path berkas PDF.
- **Tabel `pt_cashflows`**: Mencatat pemasukan dan pengeluaran operasional PT untuk pelaporan keuangan bulanan.

### 3.2. Modul Produktivitas (`tasks` & `next_projects`)
- **Tabel `tasks` (Ruangan Tugas)**: Menyimpan ID tugas, judul, deskripsi, status kolom Kanban (`todo`, `in_progress`, `review`, `done`), label kategori (`NOC`, `FTTH`, `BILLING`, `DEV`), tingkat prioritas, dan tenggat waktu.
- **Tabel `next_projects` (Gudang Perencanaan)**: Menyimpan nama calon proyek, fase perencanaan saat ini, estimasi anggaran (RAB), skor prioritas, persentase kesiapan, serta kolom bertipe **`JSON`** bawaan MySQL 8 untuk mencatat spesifikasi ide dan kebutuhan sumber daya.

### 3.3. Modul Penyimpanan Dokumen & Galeri Foto Terpisah (`drive_files` & `photo_assets`)
Tanpa memerlukan Docker/MinIO, Laravel menggunakan **Multi-Disk Storage** yang memisahkan folder penyimpanan fisik di disk server/Laragon (serta siap dihubungkan ke S3 kapan saja melalui pengaturan `.env`):
- **Disk `private-drive` & Tabel `drive_files` (Ruangan Drive)**: Menyimpan struktur folder kerja, nama berkas, ukuran, tipe MIME, dan versi file untuk pencadangan konfigurasi router/OLT (`.rsc`, `.backup`) serta dokumen legalitas PT di dalam `storage/app/private-drive/`.
- **Disk `private-photos` & Tabel `photo_assets` (Ruangan Penyimpanan Foto)**: Menyimpan path foto asli beresolusi penuh, path *thumbnail* WebP, ID album foto, serta kolom **`JSON`** di MySQL untuk menyimpan metadata kamera/EXIF dan parameter koreksi warna non-destruktif (*brightness, contrast, saturation*) di dalam `storage/app/private-photos/`.

### 3.4. Modul Brankas Terenkripsi (`secret_vault_items`)
- **Tabel `secret_vault_items` (Ruangan Rahasia)**: Menyimpan judul entri, kategori, *ciphertext* (data yang sudah dienkripsi dengan algoritma `AES-256-GCM` di sisi browser sebelum dikirim ke MySQL), *initialization vector* (IV), dan *salt*. Database MySQL tidak pernah menyimpan kunci dekripsi (*Zero-Knowledge Architecture*).

## 4. Arsitektur Penyambungan 3 Web yang Sudah Ada ke Objek 3D

| Nama Ruangan | Objek Pemicu di Ruangan 3D | Metode Penyambungan Teknis | Keuntungan Operasional |
| :--- | :--- | :--- | :--- |
| **Ruangan NOC** | Layar *Video Wall* Dinding & Monitor Operator | **Persistent Iframe Window**: Web NOC dimuat di dalam kontainer layar yang tetap hidup di latar belakang saat kamu berpindah ke ruangan 3D lain. | Grafik trafik router dan sesi login NOC tidak pernah ter-*reset* atau *reload* saat kamu bolak-balik ke ruang Billing atau Tugas. |
| **Ruangan Panel FTTH** | Kabinet OLT 3D & Meja Monitor Teknisi | **Persistent Iframe + Ringkasan Status**: Membuka web Panel FTTH asli di layar penuh/jendela mengambang serta menarik angka ringkasan jumlah ONT aktif. | Memudahkan pengecekan redaman optik pelanggan langsung dari dalam ruangan FTTH maupun dari ruangan **Operating System**. |
| **Ruangan Portofolio** | Layar Proyektor Showroom & Bingkai Dinding | **Reverse Proxy / Direct Embed**: Memuat halaman web Portofolio yang sudah ada langsung bagi tamu yang berkunjung ke lobi depan. | Tetap mempertahankan desain dan aset portofolio yang sudah kamu bangun sebelumnya tanpa kerja dua kali. |
