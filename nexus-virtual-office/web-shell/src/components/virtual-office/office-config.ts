export type RoomStatus = 'online' | 'warning' | 'critical' | 'offline'

export type Room = {
  id: string
  name: string
  n: number
  module: string
  desc: string
  activity: string
  status: RoomStatus
  type: string
  color: string
  pos: [number, number, number]
  w: number
  d: number
  area: string
  capacity: string
}

export type Floor = {
  id: string
  label: string
  short: string
  sub: string
  y: number
  color: string
  wall: string
  accent: string
  rooms: Room[]
}

export const FLOOR_GAP = 4

export const floors: Floor[] = [
  {
    id: 'G',
    label: 'Ground Floor',
    short: 'GROUND',
    sub: 'Infrastructure & Vault',
    y: -6,
    color: '#a8b3bf',
    wall: '#e2e8ee',
    accent: '#0ea5e9',
    rooms: [
      { id: 'habitat', name: 'Habitat Web', n: 5, module: 'Habitat Web', desc: 'Radar domain, uptime, ping, dan masa aktif SSL.', activity: '18 domain dipantau • semua HTTP 200', status: 'online', type: 'monitoring', color: '#14B8A6', pos: [-3.9, 0, -1.25], w: 2.35, d: 2.0, area: '24 m²', capacity: '4 operator' },
      { id: 'taskmgr', name: 'Task Manager', n: 6, module: 'Task Manager', desc: 'Beban CPU/RAM dan kontrol layanan kontainer.', activity: 'CPU 14.2% • RAM 38%', status: 'online', type: 'ops', color: '#8B5CF6', pos: [-1.3, 0, -1.25], w: 2.35, d: 2.0, area: '18 m²', capacity: '2 operator' },
      { id: 'os', name: 'Operating System', n: 7, module: 'Operating System', desc: 'Mode multi-window desktop operating system.', activity: 'Terminal & 4 jendela aktif', status: 'online', type: 'ops', color: '#6366F1', pos: [1.3, 0, -1.25], w: 2.35, d: 2.0, area: '18 m²', capacity: '2 operator' },
      { id: 'drive', name: 'Drive', n: 8, module: 'Drive', desc: 'Arsip dokumen, backup router, dan cloud storage.', activity: '1.2 TB terpakai • 48 berkas', status: 'online', type: 'archive', color: '#EAB308', pos: [3.9, 0, -1.25], w: 2.35, d: 2.0, area: '20 m²', capacity: '3 arsiparis' },
      { id: 'rahasia', name: 'Ruangan Rahasia', n: 9, module: 'Vault', desc: 'Brankas terenkripsi untuk kredensial paling sensitif.', activity: 'Terkunci • PIN required', status: 'offline', type: 'vault', color: '#F43F5E', pos: [0, 0, 1.45], w: 2.5, d: 2.0, area: '12 m²', capacity: '1 admin' },
    ],
  },
  {
    id: '1',
    label: 'First Floor',
    short: 'FIRST',
    sub: 'Operational Headquarters',
    y: -2,
    color: '#c8a273',
    wall: '#efe6d6',
    accent: '#10b981',
    rooms: [
      { id: 'about', name: 'Lobby & Reception', n: 1, module: 'About', desc: 'Pusat penyambutan tamu dan profil perusahaan NEXUS.', activity: 'Reception standby • 2 tamu terdaftar', status: 'online', type: 'lobby', color: '#10B981', pos: [-2.6, 0, -1.25], w: 2.8, d: 2.0, area: '42 m²', capacity: '12 tamu' },
      { id: 'portofolio', name: 'Portofolio Showroom', n: 2, module: 'Portofolio', desc: 'Galeri karya dan studi kasus proyek perusahaan.', activity: 'Showreel aktif • 12 proyek tampil', status: 'online', type: 'showroom', color: '#10B981', pos: [2.6, 0, -1.25], w: 2.8, d: 2.0, area: '36 m²', capacity: '10 tamu' },
      { id: 'noc', name: 'NOC', n: 3, module: 'NOC', desc: 'Network Operations Center, pemantauan jaringan real-time.', activity: 'BGP stable • 1,428 ONT online', status: 'online', type: 'noc', color: '#06B6D4', pos: [-2.6, 0, 1.45], w: 2.8, d: 2.0, area: '34 m²', capacity: '6 operator' },
      { id: 'ftth', name: 'FTTH Infrastructure', n: 4, module: 'Panel FTTH', desc: 'Kontrol OLT, ODF, dan distribusi serat optik.', activity: 'OLT normal • 3 LOS terdeteksi', status: 'warning', type: 'ftth', color: '#0EA5E9', pos: [2.6, 0, 1.45], w: 2.8, d: 2.0, area: '30 m²', capacity: '4 teknisi' },
    ],
  },
  {
    id: '2',
    label: 'Second Floor',
    short: 'SECOND',
    sub: 'Business & Digital Operations',
    y: 2,
    color: '#93a8c4',
    wall: '#e4eaf2',
    accent: '#3b82f6',
    rooms: [
      { id: 'billing', name: 'Billing PT', n: 10, module: 'Billing PT', desc: 'Invoice korporat, kas, PPN 11%, dan PPh.', activity: '5 invoice • 1 jatuh tempo', status: 'warning', type: 'billing', color: '#3B82F6', pos: [-3.9, 0, -1.25], w: 2.35, d: 2.0, area: '26 m²', capacity: '4 staf' },
      { id: 'setting', name: 'Setting', n: 11, module: 'Setting', desc: 'Konfigurasi URL konektor dan PIN brankas.', activity: 'Konektor tersinkron', status: 'online', type: 'setting', color: '#94A3B8', pos: [-1.3, 0, -1.25], w: 2.35, d: 2.0, area: '16 m²', capacity: '2 admin' },
      { id: 'agents', name: 'Agents Ku', n: 12, module: 'Agents Ku', desc: 'Tiga asisten AI: NOC, Billing, dan Planner.', activity: '3 agent aktif • 0 antrean', status: 'online', type: 'ai', color: '#A855F7', pos: [1.3, 0, -1.25], w: 2.35, d: 2.0, area: '22 m²', capacity: '3 agent' },
      { id: 'tugas', name: 'Tugas', n: 13, module: 'Tugas', desc: 'Papan Kanban harian lintas divisi.', activity: '8 tugas • 3 in progress', status: 'online', type: 'tasks', color: '#D946EF', pos: [3.9, 0, -1.25], w: 2.35, d: 2.0, area: '28 m²', capacity: '8 orang' },
    ],
  },
  {
    id: '3',
    label: 'Third Floor',
    short: 'THIRD',
    sub: 'Development & Creative HQ',
    y: 6,
    color: '#b3a0d6',
    wall: '#ece6f3',
    accent: '#8b5cf6',
    rooms: [
      { id: 'gudang', name: 'Gudang Perencanaan', n: 14, module: 'Gudang Perencanaan', desc: 'Roadmap proyek, RAB, dan kesiapan rencana.', activity: '4 proyek • 62% kesiapan rata-rata', status: 'online', type: 'planning', color: '#F59E0B', pos: [-3.2, 0, -1.25], w: 2.6, d: 2.0, area: '38 m²', capacity: '10 orang' },
      { id: 'pribadi', name: 'Ruangan Saya', n: 15, module: 'Ruangan Saya', desc: 'Sanctuary pribadi dengan Pomodoro dan jurnal.', activity: 'Focus timer siap', status: 'online', type: 'personal', color: '#F59E0B', pos: [0, 0, -1.25], w: 2.6, d: 2.0, area: '28 m²', capacity: '1 eksekutif' },
      { id: 'foto', name: 'Ruang Foto', n: 16, module: 'Ruang Foto', desc: 'Studio foto dan galeri dengan color grading.', activity: '24 foto • 3 album', status: 'online', type: 'photo', color: '#EC4899', pos: [3.2, 0, -1.25], w: 2.6, d: 2.0, area: '34 m²', capacity: '3 kru' },
    ],
  },
]

export const allRooms = floors.flatMap((f) => f.rooms)

export const floorOf = (roomId: string) => floors.find((f) => f.rooms.some((r) => r.id === roomId))

export const floorIndex = (floorId: string) => floors.findIndex((f) => f.id === floorId)
