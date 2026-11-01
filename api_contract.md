# Spesifikasi Kontrak API & WebSocket: NEXUS 3D Virtual Office OS (`api-contract.md`)

Dokumen ini mendefinisikan standar komunikasi data (REST API dan WebSocket) yang menghubungkan **Frontend Shell 3D (Next.js)** dengan tiga layanan *backend* utama di lingkungan **Laragon & MySQL**:
1. **Laravel 11 Core API** (`http://localhost:8000/api/v1`) — Autentikasi, Bisnis, Keuangan PT, Produktivitas, Penyimpanan, dan Brankas.
2. **Python FastAPI AI Engine** (`http://localhost:8001/agent/v1`) — Orkestrasi asisten cerdas di ruangan **Agents Ku**.
3. **Go Telemetry & WebSocket Server** (`ws://localhost:8080/ws/telemetry`) — Aliran data *real-time* untuk indikator lampu gedung 3D, **Habitat Web**, dan **Task Manager**.

## 1. Standar Umum Komunikasi & Header HTTP

Seluruh pertukaran data antar-servis wajib mematuhi aturan amplop JSON (*JSON Envelope*) dan header standar berikut:

| Nama Header | Nilai Standar | Keterangan Penggunaan |
| :--- | :--- | :--- |
| `Accept` | `application/json` | Wajib dikirim pada setiap permintaan REST API ke Laravel dan Python. |
| `Content-Type` | `application/json` (atau `multipart/form-data` saat unggah berkas) | Format standar pengiriman payload data. |
| `Authorization` | `Bearer <sanctum_access_token>` | Wajib disertakan untuk seluruh ruangan Zona 2, Zona 3, dan Zona 4. Tidak diperlukan untuk Zona 1 (Publik). |
| `X-Vault-Session` | `<temporary_vault_session_hash>` | Header khusus saat mengakses endpoint **Ruangan Rahasia** setelah PIN diverifikasi. |

### Format Standar Respons JSON (Envelope)
Setiap respons API dari Laravel dan Python menggunakan struktur seragam:
- **`status`**: Bernilai `"success"` atau `"error"`.
- **`code`**: Kode status HTTP standar (`200`, `201`, `401`, `403`, `422`, `500`).
- **`message`**: Pesan ringkas yang menjelaskan hasil operasi dalam bahasa manusia.
- **`data`**: Objek atau daftar data utama yang diminta oleh ruangan terkait.
- **`meta`**: Informasi tambahan seperti paginasi (`current_page`, `total_items`) atau waktu eksekusi.

## 2. Kontrak Endpoint Laravel 11 Core API (`localhost:8000/api/v1`)

### 2.1. Modul Autentikasi & Gerbang Lobi Publik (Ruangan About & Portofolio)

| Metode | Endpoint | Akses | Fungsi Utama | Struktur Payload Request | Struktur Data Response (`data`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/public/lobby-status` | Publik (Tanpa Token) | Mengambil profil ringkas pemilik, status kehadiran di kantor, dan daftar sorotan proyek untuk ruangan **About** & **Portofolio**. | *(Tidak ada body)* | `owner_name`, `presence_status` (`AVAILABLE`, `DEEP_WORK`, `MAINTENANCE`), `status_note`, `portfolio_url`, `featured_projects[]` |
| `POST` | `/public/guestbook` | Publik (Tanpa Token) | Mengirim pesan tamu atau permintaan jadwal *meeting* dari meja resepsionis **About**. | `sender_name`, `sender_email`, `company`, `message`, `preferred_date` | `ticket_id`, `received_at`, `auto_reply_message` |
| `POST` | `/auth/login` | Publik | Login pemilik kantor untuk mendapatkan token akses ke 16 ruangan. | `email`, `password`, `device_name` | `access_token`, `token_type` (`Bearer`), `user_profile`, `unlocked_zones[]` |
| `POST` | `/auth/logout` | Owner (Bearer Token) | Mencabut sesi token aktif dan mengunci kembali seluruh ruangan privat. | *(Tidak ada body)* | `logged_out_at` |

### 2.2. Modul Ruangan Billing PT (Keuangan, Invoice & Kas Perusahaan)

| Metode | Endpoint | Akses | Fungsi Utama | Struktur Payload Request | Struktur Data Response (`data`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/billing/summary` | Owner | Mengambil ringkasan kas masuk bulan ini, total piutang belum dibayar, dan total pajak PPN 11%. | Query: `month`, `year` | `total_paid_idr`, `total_unpaid_idr`, `total_overdue_idr`, `tax_ppn_collected_idr`, `invoice_count` |
| `GET` | `/billing/invoices` | Owner | Menampilkan daftar *invoice* di Lemari Kabinet Arsip 3D ruang **Billing PT**. | Query: `status` (`ALL`, `PAID`, `UNPAID`, `OVERDUE`), `client_id` | Daftar objek: `invoice_number`, `client_name`, `service_description`, `subtotal_idr`, `ppn_idr`, `total_idr`, `status`, `due_date`, `pdf_download_url` |
| `POST` | `/billing/invoices` | Owner | Membuat *invoice* PT baru dari komputer meja **Billing PT** sekaligus men-generate file PDF. | `client_id`, `client_name`, `npwp`, `items[]` (`description`, `qty`, `unit_price`), `apply_ppn_11` (`true`/`false`), `due_date` | `invoice_id`, `invoice_number` (misal `INV-2026-084`), `total_idr`, `status`, `pdf_url` |
| `PATCH` | `/billing/invoices/{id}/status` | Owner | Mengubah status pembayaran *invoice* (misal dari `UNPAID` menjadi `PAID`) dan mencatatnya ke arus kas PT. | `status` (`PAID` / `UNPAID` / `CANCELLED`), `payment_date`, `payment_method` | `invoice_number`, `old_status`, `new_status`, `cashflow_entry_id` |

### 2.3. Modul Ruangan Tugas (Kanban Harian) & Gudang Perencanaan (Next Project)

| Metode | Endpoint | Akses | Fungsi Utama | Struktur Payload Request | Struktur Data Response (`data`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Owner | Mengambil seluruh kartu tugas untuk Papan Tulis Kanban 3D di ruangan **Tugas**. | Query: `category` (`NOC`, `FTTH`, `BILLING`, `DEV`), `status` | Daftar objek: `id`, `title`, `description`, `column_status` (`todo`, `in_progress`, `review`, `done`), `category_tag`, `priority`, `due_date` |
| `POST` | `/tasks` | Owner | Menambahkan tugas baru (termasuk lemparan tiket otomatis dari ruang **NOC** atau **Panel FTTH**). | `title`, `description`, `category_tag`, `priority` (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), `source_room` | `id`, `title`, `column_status` (`todo`), `created_at` |
| `PATCH` | `/tasks/{id}/move` | Owner | Memindahkan posisi kartu tugas antar-kolom Kanban. | `column_status` (`todo` / `in_progress` / `review` / `done`) | `id`, `column_status`, `updated_at` |
| `GET` | `/planning/projects` | Owner | Mengambil daftar rancangan proyek masa depan di meja *blueprint* **Gudang Perencanaan**. | Query: `priority` | Daftar objek: `id`, `project_name`, `current_phase`, `estimated_budget_idr`, `priority_level`, `readiness_percent`, `blueprint_specs_json` |
| `POST` | `/planning/projects` | Owner | Menyimpan ide atau rencana ekspansi proyek baru ke Gudang Perencanaan. | `project_name`, `current_phase`, `estimated_budget_idr`, `priority_level`, `readiness_percent`, `blueprint_specs_json` | `id`, `project_name`, `created_at` |
| `POST` | `/planning/projects/{id}/promote` | Owner | Mempromosikan rencana proyek yang sudah matang dari **Gudang Perencanaan** menjadi daftar tugas aktif di ruangan **Tugas**. | `initial_tasks[]` (`title`, `category_tag`) | `promoted_project_id`, `created_task_ids[]` |

### 2.4. Modul Penyimpanan Terpisah: Ruangan Drive vs. Ruangan Penyimpanan Foto

| Metode | Endpoint | Akses | Fungsi Utama | Struktur Payload Request | Struktur Data Response (`data`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/drive/files` | Owner | Membuka daftar berkas dokumen kerja & *backup* router dari disk `private-drive`. | Query: `folder_path`, `search`, `extension` | Daftar objek: `file_id`, `file_name`, `folder_path`, `mime_type`, `size_bytes`, `updated_at`, `download_signed_url` |
| `POST` | `/drive/upload` | Owner | Mengunggah dokumen PT atau file konfigurasi router ke ruangan **Drive**. | `multipart/form-data`: `file`, `folder_path`, `notes` | `file_id`, `file_name`, `size_bytes`, `storage_disk` (`private-drive`) |
| `GET` | `/photos/albums` | Owner | Mengambil daftar album dan koleksi foto dari disk `private-photos` untuk dinding galeri **Ruangan Foto**. | Query: `album_name`, `favorite_only` | Daftar objek: `photo_id`, `title`, `album_name`, `thumbnail_url`, `full_res_signed_url`, `exif_json` (`resolution`, `camera`, `captured_at`), `color_grading_json` |
| `POST` | `/photos/upload` | Owner | Mengunggah foto baru ke **Ruangan Penyimpanan Foto** dan memicu pembuatan *thumbnail* otomatis. | `multipart/form-data`: `photo_file`, `title`, `album_name` | `photo_id`, `thumbnail_url`, `exif_json`, `storage_disk` (`private-photos`) |
| `PATCH` | `/photos/{id}/grading` | Owner | Menyimpan pengaturan koreksi warna non-destruktif dari meja studio **Ruangan Foto**. | `brightness` (60–150), `contrast` (60–150), `saturation` (0–180), `preset_name` | `photo_id`, `color_grading_json`, `updated_at` |

### 2.5. Modul Ruangan Saya Pribadi, Ruangan Rahasia & Setting

| Metode | Endpoint | Akses | Fungsi Utama | Struktur Payload Request | Struktur Data Response (`data`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/personal/workspace` | Owner | Mengambil catatan jurnal pribadi, riwayat durasi fokus *Pomodoro*, dan preferensi suara *ambient* di **Ruangan Saya Pribadi**. | *(Tidak ada body)* | `journal_content`, `total_focus_minutes_today`, `ambient_preset` |
| `PUT` | `/personal/workspace` | Owner | Menyimpan perubahan jurnal pribadi dan mencatat sesi fokus selesai. | `journal_content`, `add_focus_minutes` | `saved_at`, `total_focus_minutes_today` |
| `POST` | `/vault/verify-pin` | Owner | Memverifikasi PIN/Passphrase di panel pintu brankas 3D **Ruangan Rahasia**. | `pin_hash` | `vault_session_token`, `expires_in_seconds` (misal `300` detik) |
| `GET` | `/vault/items` | Owner + Header `X-Vault-Session` | Mengambil daftar *ciphertext* terenkripsi dari dalam **Ruangan Rahasia**. | *(Tidak ada body)* | Daftar objek: `item_id`, `category`, `encrypted_title`, `ciphertext_payload`, `iv_hex`, `salt_hex` |
| `POST` | `/vault/items` | Owner + Header `X-Vault-Session` | Menyimpan entri rahasia baru yang sudah dienkripsi di browser (`AES-256-GCM`). | `category`, `encrypted_title`, `ciphertext_payload`, `iv_hex`, `salt_hex` | `item_id`, `created_at` |
| `GET` | `/settings/connectors` | Owner | Mengambil konfigurasi URL untuk 3 web existing (**NOC**, **Panel FTTH**, **Portofolio**) beserta mode tampilannya. | *(Tidak ada body)* | `noc_url`, `noc_mode`, `ftth_url`, `ftth_mode`, `portofolio_url`, `presence_status` |
| `PUT` | `/settings/connectors` | Owner | Memperbarui alamat URL web NOC, FTTH, dan Portofolio dari ruangan **Setting**. | `noc_url`, `ftth_url`, `portofolio_url`, `presence_status` | `updated_at`, `connectors` |

## 3. Kontrak Endpoint Python FastAPI — Ruangan Agents Ku (`localhost:8001/agent/v1`)

Servis Python menerima token autentikasi yang sama dengan Laravel dan bertugas menjalankan asisten cerdas di ruangan **Agents Ku**.

| Metode | Endpoint | Fungsi Utama | Struktur Payload Request | Struktur Data Response (`data`) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/agent/v1/analyze-noc` | Menganalisis lemparan log alarm dari ruangan **NOC** atau data redaman tinggi dari **Panel FTTH**. | `source_room` (`noc` / `ftth`), `alarm_logs[]`, `affected_olt_port`, `rx_power_dbm` | `agent_name` (`NOC-Sentinel-Bot`), `severity` (`INFO`, `WARNING`, `CRITICAL`), `root_cause_summary`, `recommended_actions[]`, `suggested_task_title` |
| `POST` | `/agent/v1/billing-digest` | Memeriksa daftar *invoice* belum lunas di MySQL dan menyusun draf pengingat penagihan klien PT. | `filter_status` (`UNPAID`, `OVERDUE`), `tone` (`FORMAL_CORPORATE`, `POLITE_REMINDER`) | `agent_name` (`Billing-Collector-AI`), `unpaid_count`, `total_outstanding_idr`, `draft_messages[]` (`client_name`, `invoice_number`, `whatsapp_draft`, `email_draft`) |
| `POST` | `/agent/v1/chat` | Berdiskusi bebas dengan asisten AI di meja komando ruangan **Agents Ku**. | `agent_persona` (`NOC`, `BILLING`, `PLANNER`, `GENERAL`), `prompt_text`, `include_office_context` (`true`/`false`) | `reply_text`, `referenced_rooms[]`, `suggested_follow_up_actions[]`, `executed_at` |
| `GET` | `/agent/v1/activity-logs` | Mengambil riwayat pekerjaan otomatis yang telah diselesaikan oleh para agen AI. | Query: `limit` | Daftar objek: `log_id`, `timestamp`, `agent_name`, `summary_text`, `target_room` |

## 4. Kontrak WebSocket & REST Go Telemetry (`localhost:8080`)

Servis Go menyuplai data berkecepatan tinggi untuk ruangan **Habitat Web**, **Task Manager**, serta menggerakkan **indikator lampu LED di Gedung Kaca Transparan 3D**.

### 4.1. Aliran Data WebSocket (`ws://localhost:8080/ws/telemetry`)
Begitu pengguna membuka halaman utama gedung 3D di Next.js, browser membuka koneksi WebSocket ke servis Go. Setiap **3 detik**, servis Go mengirimkan paket JSON bertipe `BUILDING_HEARTBEAT`:

| Nama Field pada Paket WebSocket | Tipe Data | Kegunaan pada Gedung 3D & Ruangan |
| :--- | :--- | :--- |
| `event_type` | `String` (`"BUILDING_HEARTBEAT"`) | Penanda pembaruan rutin kondisi gedung kantor 3D. |
| `timestamp_wib` | `String` (`"19:48:00 WIB"`) | Memperbarui jam kerja di bar atas Virtual Office. |
| `noc_summary` | `Object` (`rx_gbps`, `tx_gbps`, `bgp_up`, `alarm_level`) | Mengatur warna & kecepatan kedip lampu LED pada rak router 3D di **Ruangan NOC** (`GREEN`, `AMBER`, atau `RED_BLINK`). |
| `ftth_summary` | `Object` (`online_ont`, `los_count`, `high_attenuation_count`) | Menyalakan indikator peringatan di atas atap kaca **Ruangan Panel FTTH** jika `los_count > 0`. |
| `habitat_domains` | `Array of Objects` (`host`, `http_status`, `ping_ms`, `ssl_days_left`) | Memperbarui daftar status domain di ruangan **Habitat Web** dan kecepatan putar bola dunia radar 3D. |
| `system_resources` | `Array of Objects` (`service_name`, `port`, `cpu_percent`, `ram_mb`, `state`) | Menggerakkan tinggi menara indikator di ruangan **Task Manager** untuk memantau beban Next.js, Laravel, MySQL, Python, dan Go. |

### 4.2. Endpoint Tindakan Cepat pada Servis Go (`http://localhost:8080/telemetry/v1`)

| Metode | Endpoint | Fungsi Utama | Struktur Payload Request | Struktur Data Response (`data`) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/telemetry/v1/domains/check-now` | Memicu pengecekan paksa (*instant ping & SSL check*) untuk seluruh domain di ruangan **Habitat Web**. | `hosts[]` (opsional, kosongkan untuk cek semua) | `checked_count`, `results[]` (`host`, `http_code`, `latency_ms`, `ssl_valid_days`) |
| `POST` | `/telemetry/v1/services/restart` | Meminta pengelola proses di ruangan **Task Manager** untuk me-*restart* worker atau membersihkan *cache* servis tertentu. | `service_name` (`laravel-worker`, `python-ai`, `telemetry-cache`) | `service_name`, `action_status` (`RESTARTED`), `new_pid`, `uptime_seconds` |
