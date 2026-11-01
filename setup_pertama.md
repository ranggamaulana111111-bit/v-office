# Panduan Setup Pertama Kali (Edisi Laragon & MySQL): NEXUS 3D Virtual Office OS

Dokumen ini adalah panduan langkah demi langkah untuk memulai **Paket 3 (Next.js + Three.js + Laravel 11 + Python + Go)** menggunakan **Laragon dan MySQL** sepenuhnya **tanpa Docker Desktop**.

Karena kamu sudah menggunakan **Laragon**, pekerjaanmu jauh lebih ringan karena **PHP, Composer, MySQL, Node.js, dan HeidiSQL/phpMyAdmin** sudah tersedia langsung di dalam Laragon.

## 1. Persiapan Awal di Laragon (*Pre-Flight Check*)

Buka aplikasi **Laragon** di komputermu, klik tombol **Start All**, lalu buka **Terminal Laragon** (klik tombol **Terminal** di Laragon atau tekan `Ctrl + Alt + T`) dan pastikan komponen berikut aktif:

| Komponen di Laragon | Versi yang Disarankan | Cara Cek di Terminal Laragon | Kegunaan di Virtual Office |
| :--- | :--- | :--- | :--- |
| **PHP & Composer** | `PHP 8.2` atau `8.3` | `php -v` dan `composer -V` | Menjalankan otak bisnis **Laravel 11 API**. |
| **MySQL (Bawaan Laragon)** | `MySQL 8.0+` / `MariaDB` | Buka tombol **Database** di Laragon (HeidiSQL) | Menyimpan seluruh tabel **Billing PT**, **Tugas**, **Gudang**, **Drive**, **Foto**, dan **Ruangan Rahasia**. |
| **Node.js & NPM** | `Node v20+` | `node -v` dan `npm -v` | Menjalankan tampilan **Next.js** dan gedung **Three.js 3D**. |
| **Python & Go** *(Bisa Menyusul)* | `Python 3.11+` & `Go 1.22+` | `python --version` & `go version` | Menjalankan ruangan **Agents Ku** dan **Habitat Web** di tahap akhir. |

## 2. Tahap 1: Membuat Folder Induk di Dalam `C:\laragon\www`

Supaya rapi dan terintegrasi langsung dengan lingkungan Laragon, buat satu folder induk di dalam direktori `www` milik Laragon.

Buka **Terminal Laragon** (posisi awal otomatis berada di `C:\laragon\www`), lalu jalankan perintah berikut:

```bash
mkdir nexus-virtual-office
cd nexus-virtual-office
mkdir services
```

Di dalam folder `C:\laragon\www\nexus-virtual-office`, struktur proyekmu akan terbagi menjadi 4 folder bersih:

| Nama Folder | Teknologi | Cara Jalan di Laragon | Ruangan yang Dihidupkan |
| :--- | :--- | :--- | :--- |
| `web-shell` | Next.js + Three.js + Tailwind | `http://localhost:3000` | Gedung Kantor 3D Transparan, **Operating System**, **About**, serta konektor ke web **NOC**, **Panel FTTH**, dan **Portofolio**. |
| `core-api` | Laravel 11 API + MySQL | `http://localhost:8000` | Login pemilik, **Billing PT**, **Tugas**, **Gudang Perencanaan**, **Drive**, **Ruangan Foto**, **Ruangan Rahasia**, dan **Setting**. |
| `services/ai-agents` | Python FastAPI | `http://localhost:8001` | Asisten AI otomatis di ruangan **Agents Ku**. |
| `services/telemetry-go` | Go (Golang) WebSocket | `http://localhost:8080` | Pemantau *real-time* untuk **Habitat Web**, **Task Manager**, dan sinyal lampu gedung 3D. |

## 3. Tahap 2: Membuat Database MySQL di Laragon

Tanpa Docker, kamu cukup membuat satu database MySQL menggunakan **HeidiSQL** atau **phpMyAdmin** bawaan Laragon:

1. Klik tombol **Database** pada jendela Laragon untuk membuka HeidiSQL (atau buka `http://localhost/phpmyadmin`).
2. Buat satu database baru dengan nama:
   - Nama Database: **`nexus_office_db`**
   - Collation: **`utf8mb4_unicode_ci`**
3. Kamu juga bisa langsung membuatnya lewat Terminal Laragon dengan satu baris perintah ini:

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS nexus_office_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

## 4. Tahap 3: Inisialisasi `core-api` (Laravel 11 + MySQL + Multi-Disk Tanpa Docker)

Masuk ke folder `C:\laragon\www\nexus-virtual-office` di Terminal Laragon, lalu bangun mesin *backend* Laravel terlebih dahulu:

### 4.1. Buat Proyek Laravel 11 & Pasang Mode API (Sanctum)
```bash
composer create-project laravel/laravel core-api
cd core-api
php artisan install:api
```

### 4.2. Pasang Paket Pembuat PDF untuk Ruangan Billing PT
```bash
composer require barryvdh/laravel-dompdf
```

### 4.3. Atur `.env` Laravel ke MySQL Laragon
Buka file `.env` di dalam folder `core-api`, lalu sesuaikan bagian database dan URL seperti berikut:

| Baris di `.env` Laravel | Isi Konfigurasi untuk Laragon | Keterangan |
| :--- | :--- | :--- |
| `APP_URL` | `http://localhost:8000` | Alamat API Laravel. |
| `FRONTEND_URL` | `http://localhost:3000` | Alamat tampilan Next.js. |
| `SANCTUM_STATEFUL_DOMAINS` | `localhost:3000` | Agar login pemilik tetap tersimpan saat pindah ruangan. |
| `DB_CONNECTION` | `mysql` | Menggunakan MySQL bawaan Laragon. |
| `DB_HOST` | `127.0.0.1` | Host lokal MySQL. |
| `DB_PORT` | `3306` | Port standar MySQL Laragon. |
| `DB_database` | `nexus_office_db` | Nama database yang dibuat di Tahap 2. |
| `DB_USERNAME` | `root` | Username bawaan Laragon. |
| `DB_PASSWORD` | *(kosongkan)* | Password bawaan MySQL Laragon kosong. |

### 4.4. Cara Memisahkan Penyimpanan Ruangan "Drive" & "Ruangan Foto" Tanpa Docker
Karena kamu tidak memakai Docker/MinIO, Laravel menyediakan fitur **Local Multi-Disk Storage** yang sangat praktis. Kamu cukup memisahkan folder penyimpanannya di dalam `storage/app/`:
- Folder **`storage/app/private-drive`**: Khusus menyimpan dokumen PT, kontrak, dan file *backup* router dari ruangan **Drive**.
- Folder **`storage/app/private-photos`**: Khusus menyimpan koleksi foto resolusi tinggi dan *thumbnail* album dari **Ruangan Penyimpanan Foto**.

Jalankan perintah migrasi dan tautan penyimpanan di terminal `core-api`:
```bash
php artisan migrate
php artisan storage:link
php artisan serve --port=8000
```
Sekarang mesin *backend* Laravel + MySQL milikmu sudah aktif di `http://localhost:8000`.

## 5. Tahap 4: Inisialisasi `web-shell` (Next.js + Three.js Gedung 3D)

Buka tab baru di **Terminal Laragon**, masuk kembali ke `C:\laragon\www\nexus-virtual-office`, lalu buat proyek tampilan 3D-nya:

### 5.1. Buat Proyek Next.js Baru
```bash
cd C:\laragon\www\nexus-virtual-office
npx create-next-app@latest web-shell --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 5.2. Pasang Pustaka 3D (Three.js), State Manager, dan Animasi Window
```bash
cd web-shell
npm install three @types/three @react-three/fiber @react-three/drei zustand lucide-react framer-motion
```

### 5.3. Hubungkan Next.js ke Laravel MySQL & 3 Web Milikmu yang Sudah Ada
Buat file bernama `.env.local` di dalam folder `web-shell`, lalu isi dengan daftar alamat koneksi berikut:

| Variabel di `.env.local` Next.js | Nilai Konfigurasi | Fungsi di Kantor Virtual |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_LARAVEL_API_URL` | `http://localhost:8000/api` | Mengambil & menyimpan data MySQL melalui Laravel (**Billing PT**, **Tugas**, **Gudang**, **Drive**, **Foto**, **Rahasia**). |
| `NEXT_PUBLIC_AI_SERVICE_URL` | `http://localhost:8001` | Alamat servis Python untuk ruangan **Agents Ku**. |
| `NEXT_PUBLIC_TELEMETRY_WS_URL` | `ws://localhost:8080/ws` | Alamat WebSocket Go untuk animasi gedung 3D, **Habitat Web**, dan **Task Manager**. |
| `NEXT_PUBLIC_EXISTING_NOC_URL` | `https://noc.domainkamu.id` | URL web **NOC** milikmu yang sudah ada. |
| `NEXT_PUBLIC_EXISTING_FTTH_URL` | `https://ftth.domainkamu.id` | URL web **Panel FTTH** milikmu yang sudah ada. |
| `NEXT_PUBLIC_EXISTING_PORTOFOLIO_URL` | `https://portofolio.domainkamu.id` | URL web **Portofolio** milikmu yang sudah ada. |

### 5.4. Nyalakan Kantor Virtual 3D
```bash
npm run dev
```
Buka `http://localhost:3000` di browser untuk melihat gedung kantor transparan 3D-mu bekerja.

## 6. Tahap 5: Menyalakan Python (`Agents Ku`) & Go (`Habitat Web`) di Windows/Laragon

Kedua servis tambahan ini dapat kamu nyalakan belakangan setelah tampilan Next.js dan database MySQL Laravel berjalan lancar:

### 6.1. Menjalankan Servis Python (Ruangan Agents Ku) di Windows
```bash
cd C:\laragon\www\nexus-virtual-office\services\ai-agents
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn httpx pymysql
uvicorn main:app --reload --port 8001
```

### 6.2. Menjalankan Servis Go (Ruangan Habitat Web & Task Manager)
```bash
cd C:\laragon\www\nexus-virtual-office\services\telemetry-go
go mod init nexus-telemetry
go get github.com/gorilla/websocket
go get github.com/go-sql-driver/mysql
go run main.go
```

## 7. Daftar Cek Keberhasilan Setup Laragon (*First-Run Checklist*)

- [ ] **Cek 1 (MySQL Laragon)**: Buka HeidiSQL di Laragon dan pastikan database `nexus_office_db` sudah berisi tabel-tabel hasil `php artisan migrate`.
- [ ] **Cek 2 (API Laravel Aktif)**: Buka `http://localhost:8000` di browser dan pastikan respon Laravel berjalan tanpa error koneksi database.
- [ ] **Cek 3 (Gedung 3D Next.js Aktif)**: Buka `http://localhost:3000` dan pastikan tampilan gedung kantor 3D muncul beserta navigasi ke 16 ruangan.
- [ ] **Cek 4 (Konektor Web NOC, FTTH, Portofolio)**: Klik monitor/layar di ruangan **NOC**, **Panel FTTH**, dan **Portofolio** untuk memastikan web milikmu yang sudah ada terbuka dengan lancar.
- [ ] **Cek 5 (Folder Penyimpanan Terpisah)**: Pastikan folder `storage/app/private-drive` (untuk **Ruangan Drive**) dan `storage/app/private-photos` (untuk **Ruangan Foto**) terbentuk dengan rapi di dalam proyek Laravel.
