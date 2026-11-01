# Spesifikasi Keamanan, SSO, Iframe & Brankas Rahasia: NEXUS 3D Virtual Office OS (`security-vault.md`)

Dokumen ini menetapkan standar arsitektur keamanan menyeluruh untuk **NEXUS 3D Virtual Office OS**, mencakup pemisahan tegas antara pengunjung publik dan pemilik kantor, mekanisme *Single Sign-On* (SSO) lintas-bahasa pemrograman, aturan penyematan aman (*Iframe & CORS*) untuk website **NOC**, **Panel FTTH**, dan **Portofolio** yang sudah ada, serta alur enkripsi berlapis pada **Ruangan Rahasia**.

## 1. Model Zonasi Keamanan 4 Lapis (*Four-Tier Security Zoning*)

Untuk memastikan orang luar yang mengunjungi halaman publik tidak pernah bisa mengintip data internal perusahaan maupun ruang pribadi, gedung virtual dibagi menjadi 4 lingkaran pertahanan:

| Zona Pertahanan | Ruangan di Dalamnya | Tingkat Proteksi | Perilaku Visual pada Gedung Kaca 3D Saat Diakses Tamu |
| :--- | :--- | :--- | :--- |
| **Lingkar 0: Zona Publik Terbuka** | • **About (Lobi Resepsionis)**<br>• **Portofolio (Showroom)** | Terbuka tanpa login (`Public Route`). Dilindungi *Rate Limiter* pada formulir buku tamu. | Ruangan menyala terang dengan kaca bening; tamu dapat mengklik meja resepsionis dan layar proyektor portofolio. |
| **Lingkar 1: Zona Produktivitas & AI** | • **Agents Ku**<br>• **Tugas**<br>• **Gudang Perencanaan**<br>• **Drive**<br>• **Setting** | Wajib terautentikasi melalui **SSO Token (Laravel Sanctum)** milik Owner. | Kaca ruangan otomatis menjadi buram gelap (*frosted/blackout glass*); isi perabot dan layar di dalamnya tidak dirender ke browser tamu. |
| **Lingkar 2: Zona Infrastruktur & Keuangan PT** | • **NOC**<br>• **Panel FTTH**<br>• **Billing PT**<br>• **Habitat Web**<br>• **Operating System**<br>• **Task Manager** | Wajib **SSO Token Owner** + Validasi *Origin/Referer* ketat + Pembatasan IP/VPN opsional untuk konektor perangkat OLT/Router. | Kaca ruangan buram gelap bagi tamu; alamat URL asli web NOC dan Panel FTTH disembunyikan sepenuhnya dari respons API publik. |
| **Lingkar 3: Zona Pribadi & Brankas Rahasia** | • **Ruangan Saya Pribadi**<br>• **Ruangan Penyimpanan Foto**<br>• **Ruangan Rahasia** | Wajib **SSO Token Owner** + **Presigned URL Berbatas Waktu** (untuk Foto) + **Verifikasi PIN & Enkripsi Sisi Klien AES-256-GCM** (khusus Ruangan Rahasia). | Terletak di sayap paling belakang gedung; bagi tamu tidak dapat diklik, dan bagi Owner sekalipun **Ruangan Rahasia** tetap terkunci pintu baja sampai PIN dimasukkan. |

## 2. Pencegahan Kebocoran Data Saat Membuka Gerbang Publik (Portofolio & About)

Agar pembukaan akses publik pada ruangan **Portofolio** dan **About** tidak membocorkan informasi sensitif dari 14 ruangan lainnya, diterapkan 4 aturan isolasi ketat:

1. **Pemisahan Endpoint API Publik vs. Privat (*Strict Route Segregation*)**:
   - Pengunjung tanpa login hanya diizinkan memanggil dua endpoint: `GET /api/v1/public/lobby-status` dan `POST /api/v1/public/guestbook`.
   - Endpoint publik ini **dilarang keras** mengembalikan alamat URL internal web NOC, URL Panel FTTH, daftar tugas, maupun metrik server.
2. **Pembersihan Data Objek 3D untuk Tamu (*Server-Side Scene Sanitization*)**:
   - Saat halaman gedung 3D dibuka tanpa token login Owner, Next.js hanya memuat detail interaktif untuk blok ruangan **About** dan **Portofolio**.
   - Empat belas ruangan lainnya hanya ditampilkan sebagai siluet arsitektur luar berlampu redup tanpa memuat data teks, angka redaman FTTH, atau nama klien PT ke dalam memori browser pengunjung.
3. **Koneksi WebSocket Terautentikasi (*Authenticated Telemetry Stream*)**:
   - Aliran data *real-time* dari servis **Go Telemetry** (`ws://.../ws/telemetry` yang membawa angka trafik Gbps NOC dan status server) menolak koneksi yang tidak menyertakan tiket sesi Owner yang valid.
4. **Pembatasan Pengiriman Pesan Buku Tamu (*Anti-Spam & Rate Limiting*)**:
   - Formulir kontak di meja resepsionis **About** dibatasi maksimal 3 pengiriman pesan per alamat IP setiap 15 menit untuk mencegah spam ke inbox pemilik.

## 3. Arsitektur Single Sign-On (SSO) Lintas 4 Bahasa Pemrograman

Karena sistem menggunakan **Next.js (Frontend)**, **Laravel 11 (Bisnis & MySQL)**, **Python (Agents Ku)**, dan **Go (Habitat Web & Task Manager)**, pemilik cukup melakukan login **satu kali saja** di gerbang masuk kantor virtual:

| Tahap Alur SSO | Komponen yang Terlibat | Cara Kerja Verifikasi Keamanan |
| :--- | :--- | :--- |
| **1. Login Utama di Pintu Gedung** | Next.js → Laravel 11 (`POST /api/v1/auth/login`) | Pemilik memasukkan email, password, dan kode 2FA (opsional). Laravel memverifikasi data di MySQL dan menerbitkan token akses Sanctum. |
| **2. Penyimpanan Sesi Aman** | Next.js (`HttpOnly Secure Cookie` + Memory State) | Token disimpan di dalam *Cookie* berproteksi `HttpOnly` dan `SameSite=Lax` sehingga kebal terhadap pencurian token melalui skrip berbahaya (XSS). |
| **3. Akses ke Ruangan Bisnis (Laravel)** | Next.js → Laravel 11 | Setiap klik pada ruangan **Billing PT**, **Tugas**, **Gudang**, **Drive**, dan **Foto** otomatis menyertakan token tersebut untuk divalidasi oleh middleware `auth:sanctum`. |
| **4. Akses ke Ruangan Agents Ku (Python)** | Next.js → Python FastAPI → Laravel/MySQL | Saat pemilik memberi perintah ke asisten AI di servis Python (`port 8001`), Python memvalidasi token Bearer tersebut ke tabel `personal_access_tokens` di MySQL sebelum menjalankan perintah. |
| **5. Akses ke Habitat Web & Task Manager (Go)** | Next.js → Go Daemon | Saat membuka koneksi WebSocket ke servis Go (`port 8080`), Go memeriksa keabsahan token sesi sehingga hanya pemilik asli yang bisa melihat metrik CPU/RAM atau me-*restart* layanan. |

## 4. Konfigurasi CORS & Izin Penyematan (`frame-ancestors`) untuk Web NOC, Panel FTTH, dan Portofolio

Ketika kamu menyambungkan website **NOC**, **Panel FTTH**, dan **Portofolio** milikmu yang sudah ada ke dalam layar monitor di ruangan 3D Virtual Office, browser modern secara bawaan akan memblokir tampilan *iframe* jika tidak diberi izin eksplisit.

Berikut aturan konfigurasi header keamanan yang tepat agar ketiga web milikmu tampil mulus di dalam Virtual Office namun **tetap tidak bisa disematkan oleh website orang lain**:

### 4.1. Pengaturan Header pada Server Web NOC & Panel FTTH Milikmu
Pada konfigurasi web server (Nginx / Apache / Cloudflare) dari website **NOC** (`noc.domainkamu.id`) dan **Panel FTTH** (`ftth.domainkamu.id`), terapkan aturan header berikut:

| Nama Header Respons pada Web NOC & FTTH | Nilai yang Wajib Diatur | Tujuan Keamanan |
| :--- | :--- | :--- |
| `Content-Security-Policy` | `frame-ancestors 'self' https://office.domainkamu.id http://localhost:3000;` | Mengizinkan halaman NOC dan Panel FTTH dibuka di dalam layar monitor **NEXUS Virtual Office** (baik saat produksi maupun saat uji coba di Laragon `localhost:3000`), sembari memblokir penyematan dari situs luar (*Anti-Clickjacking*). |
| `X-Frame-Options` | *(Hapus header ini atau ubah dari `DENY` menjadi `SAMEORIGIN` jika satu domain)* | Header `Content-Security-Policy: frame-ancestors` di atas adalah pengganti modern yang mendukung izin spesifik lintas-subdomain. |
| `Access-Control-Allow-Origin` | `https://office.domainkamu.id` | Mengizinkan Virtual Office membaca ringkasan status API dari web NOC/FTTH (misalnya jumlah ONT *online* atau trafik utama) tanpa diblokir oleh kebijakan CORS browser. |
| `Access-Control-Allow-Credentials` | `true` | Memungkinkan sesi login pada web NOC/FTTH tetap bertahan ketika dibuka di dalam jendela ruangan **Operating System** atau **NOC**. |

### 4.2. Aturan Sandboxing pada Komponen Bingkai di Next.js
Pada sisi **NEXUS Virtual Office (Next.js)**, bingkai layar monitor yang memuat web NOC, FTTH, dan Portofolio wajib menggunakan atribut pembatas keamanan:
- Mengaktifkan izin yang diperlukan saja: `allow-same-origin`, `allow-scripts`, `allow-forms`, dan `allow-popups` (agar kamu tetap bisa login, menekan tombol *Reboot ONT*, dan mengunduh laporan dari dalam layar NOC/FTTH).
- Menonaktifkan akses `allow-top-navigation` agar halaman di dalam *iframe* tidak dapat secara tidak sengaja menutup atau mengalihkan halaman utama Virtual Office milikmu.

## 5. Arsitektur Enkripsi Berlapis pada "Ruangan Rahasia" (*Zero-Knowledge Vault*)

**Ruangan Rahasia** dirancang sebagai brankas penyimpanan untuk data paling krusial (seperti password *root* router utama BGP, kunci SSH server produksi, *recovery seed phrase*, dan dokumen rahasia). Agar data di dalamnya tetap aman **bahkan jika seseorang berhasil membuka komputer atau melihat isi tabel MySQL di Laragon**, diterapkan skema **Enkripsi Sisi Klien (*Client-Side Zero-Knowledge Encryption*)**:

### 5.1. Alur Kerja Membuka & Mengenkripsi Data di Ruangan Rahasia

| Tahapan Proses | Tempat Eksekusi | Penjelasan Mekanisme Keamanan |
| :--- | :--- | :--- |
| **1. Tantangan PIN / Master Passphrase di Pintu Brankas 3D** | Browser (Next.js) | Meskipun pengguna sudah login sebagai Owner, mengklik pintu baja **Ruangan Rahasia** tidak langsung menampilkan isi ruangan, melainkan hanya membuka panel tombol PIN/Passphrase. |
| **2. Penurunan Kunci Kriptografi (`PBKDF2`)** | Memori Browser (`Web Crypto API`) | PIN/Passphrase yang kamu ketik digabungkan dengan *Salt* acak menggunakan algoritma `PBKDF2` (100.000 iterasi SHA-256) untuk menghasilkan **Kunci Dekripsi AES-256** di memori RAM browser. Kunci asli ini **tidak pernah dikirim melalui jaringan ke Laravel maupun disimpan di MySQL**. |
| **3. Enkripsi Sebelum Simpan (`AES-256-GCM`)** | Memori Browser → MySQL Laravel | Saat kamu menyimpan password *root* atau catatan baru di Ruangan Rahasia, teks aslinya langsung dienkripsi di browser menjadi deretan karakter acak (*ciphertext*), baru kemudian dikirim ke tabel `secret_vault_items` di MySQL. |
| **4. Dekripsi Saat Ditampilkan** | MySQL Laravel → Memori Browser | Saat brankas dibuka, Laravel hanya mengirimkan *ciphertext* ke browser, lalu browser mendekripsinya menggunakan kunci di RAM agar bisa kamu baca di layar. |
| **5. Penguncian Otomatis (*Auto-Wipe & Auto-Lock*)** | Browser & Server | Kunci dekripsi di memori RAM browser otomatis dihapus dan pintu brankas 3D otomatis tertutup kembali apabila: (a) kamu menekan tombol **Kunci Cepat (*Quick Lock*)**, (b) kamu berpindah ke ruangan lain selama lebih dari **5 menit**, atau (c) kamu menutup tab browser. |

### 5.2. Perlindungan Terhadap Percobaan Tebak PIN (*Brute-Force Protection*)
- Apabila terjadi kesalahan input PIN sebanyak **5 kali berturut-turut** pada panel pintu **Ruangan Rahasia**, Laravel otomatis membekukan akses ke endpoint `/api/v1/vault/*` selama **15 menit** dan mencatat peringatan keamanan ke log ruangan **NOC / Task Manager**.

## 6. Keamanan Penyimpanan Terpisah: Ruangan Drive vs. Ruangan Foto

Untuk melindungi berkas dokumen perusahaan di **Ruangan Drive** dan koleksi foto pribadi di **Ruangan Penyimpanan Foto**:

1. **Penyimpanan di Luar Folder Publik (`Non-Public Storage Path`)**:
   - Di dalam proyek Laravel (`core-api`), baik folder `storage/app/private-drive` maupun `storage/app/private-photos` diletakkan **di luar** folder `public/`.
   - Artinya, tidak ada seorang pun di internet yang bisa menebak alamat URL file kontrak PT atau foto pribadimu secara langsung.
2. **Tautan Akses Sementara (*Temporary Signed URLs*)**:
   - Setiap kali kamu membuka **Ruangan Penyimpanan Foto** atau mengunduh file backup router di **Ruangan Drive**, Laravel membuat tautan bertanda tangan kriptografi (*Signed Route*) yang **hanya berlaku selama 15 menit** khusus untuk sesi loginmu saat itu.
3. **Validasi Tipe Berkas Ketat (*Strict MIME Inspection*)**:
   - **Ruangan Penyimpanan Foto** hanya menerima berkas gambar murni (`image/jpeg`, `image/png`, `image/webp`, `image/heic`) dan menolak penyisipan file skrip berbahaya (`.php`, `.sh`, `.exe`).
   - **Ruangan Drive** menyimpan berkas teknis (seperti `.rsc` MikroTik atau `.conf`) sebagai aliran biner/unduhan aman (`Content-Disposition: attachment`) sehingga tidak pernah dieksekusi sebagai program oleh web server.
