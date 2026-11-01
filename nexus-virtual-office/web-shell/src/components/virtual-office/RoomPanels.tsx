'use client'
import { useEffect, useState } from 'react'
import type { Room } from './office-config'

import { apiUrl } from '@/lib/api'
import { useOperational } from '@/lib/OperationalContext'
const NOC_URL = process.env.NEXT_PUBLIC_EXISTING_NOC_URL || 'https://billing.alkonek.online/noc/dashboard'
const FTTH_URL = process.env.NEXT_PUBLIC_EXISTING_FTTH_URL || 'https://billing.alkonek.online/noc/features/map'
const PORTO_URL = process.env.NEXT_PUBLIC_EXISTING_PORTOFOLIO_URL || 'https://ranggamrw.my.id'

const card: React.CSSProperties = { background: '#0b1220', border: '1px solid #1e293b', borderRadius: 8, padding: 10, fontSize: 12 }
const chip: React.CSSProperties = { display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700 }
const btn: React.CSSProperties = { padding: '6px 10px', background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, fontSize: 11, cursor: 'pointer' }
const input: React.CSSProperties = { padding: 6, background: '#0b1220', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, fontSize: 12, width: '100%' }

function ApiBadge() {
  const op = useOperational()
  const live = op?.online && op.operational
  return (
    <span style={{ ...chip, color: live ? '#34d399' : '#f59e0b', background: live ? '#052e1c' : '#3a2a05', border: '1px solid currentColor' }}>
      {live ? 'OPERATIONAL API • SEED' : 'MOCK • API OFFLINE'}
    </span>
  )
}

function DeviceStats() {
  const op = useOperational()
  const d = op?.operational?.devices
  if (!d) return <div style={{ fontSize: 10, color: '#f59e0b' }}>Operational API belum tersedia — menampilkan data DEMO, bukan telemetry produksi.</div>
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
      <div style={card}><div style={{ color: '#94a3b8', fontSize: 10 }}>Dipantau</div><b>{d.monitored}</b></div>
      <div style={card}><div style={{ color: '#94a3b8', fontSize: 10 }}>Online</div><b style={{ color: '#34d399' }}>{d.online}</b></div>
      <div style={card}><div style={{ color: '#94a3b8', fontSize: 10 }}>Offline</div><b style={{ color: d.offline ? '#f43f5e' : '#94a3b8' }}>{d.offline}</b></div>
      <div style={card}><div style={{ color: '#94a3b8', fontSize: 10 }}>Avg ping</div><b>{d.avg_ping_ms} ms</b></div>
    </div>
  )
}

function Embed({ url, label }: { url: string; label: string }) {
  const [live, setLive] = useState(true)
  const [src, setSrc] = useState(url)
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <button style={btn} onClick={() => setLive((v) => !v)}>{live ? 'Telemetry' : 'Live Iframe'}</button>
        <span style={{ ...chip, color: '#38bdf8', background: '#082f49' }}>{label}</span>
        <ApiBadge />
      </div>
      <DeviceStats />
      {live ? (
        <iframe src={src} style={{ width: '100%', height: 260, border: '1px solid #1e293b', borderRadius: 8, background: '#fff' }} />
      ) : (
        <div style={{ display: 'grid', gap: 6 }}>
          <div style={card}><b>Status</b> • BGP stable <span style={{ color: '#10B981' }}>UP</span></div>
          <div style={card}><b>Upstream</b> • 2 Gbps • latency 12 ms</div>
          <div style={card}><b>Perangkat</b> • 24 aktif • 1 warning</div>
          <div style={{ fontSize: 10, color: '#f59e0b' }}>DEMO DATA – bukan telemetry produksi</div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 6 }}>
        <input style={input} value={src} onChange={(e) => setSrc(e.target.value)} />
        <button style={btn} onClick={() => setLive(true)}>Buka</button>
      </div>
    </div>
  )
}

function BillingPanel() {
  const op = useOperational()
  const b = op?.operational?.billing
  const [rows, setRows] = useState([
    { no: 'INV-001', client: 'PT Maju Jaya', total: 1110000, status: 'PAID' },
    { no: 'INV-002', client: 'CV Teknologi Nusantara', total: 555000, status: 'OVERDUE' },
    { no: 'INV-003', client: 'PT Sinar Fiber', total: 2220000, status: 'SENT' },
  ])
  const [form, setForm] = useState({ client: '', total: '' })
  const paid = rows.filter((r) => r.status === 'PAID').reduce((a, b) => a + b.total, 0)
  const due = rows.filter((r) => r.status !== 'PAID').reduce((a, b) => a + b.total, 0)
  const add = () => {
    if (!form.client || !form.total) return
    setRows((r) => [{ no: `INV-${String(r.length + 1).padStart(3, '0')}`, client: form.client, total: Number(form.total), status: 'DRAFT' }, ...r])
    setForm({ client: '', total: '' })
  }
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <ApiBadge />
      {b && (
        <div style={{ ...card, display: 'flex', justifyContent: 'space-between', gap: 6 }}>
          <span>{b.invoices} invoice</span>
          <span style={{ color: '#F59E0B' }}>Piutang Rp {b.outstanding.toLocaleString('id-ID')}</span>
          <span style={{ color: '#10B981' }}>Kas Rp {b.cash.toLocaleString('id-ID')}</span>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        <div style={card}><div style={{ color: '#94a3b8' }}>Lunas</div><b style={{ color: '#10B981' }}>Rp {paid.toLocaleString('id-ID')}</b></div>
        <div style={card}><div style={{ color: '#94a3b8' }}>Piutang</div><b style={{ color: '#F59E0B' }}>Rp {due.toLocaleString('id-ID')}</b></div>
        <div style={card}><div style={{ color: '#94a3b8' }}>PPN 11%</div><b>Rp {Math.round(paid * 0.11).toLocaleString('id-ID')}</b></div>
      </div>
      <div style={{ display: 'grid', gap: 4 }}>
        {rows.map((r) => (
          <div key={r.no} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><b>{r.no}</b> · {r.client}</span>
            <span>Rp {r.total.toLocaleString('id-ID')} <span style={{ ...chip, color: r.status === 'PAID' ? '#10B981' : '#F59E0B', background: '#0b1220', border: '1px solid currentColor' }}>{r.status}</span></span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <input style={input} placeholder="Nama klien" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
        <input style={input} placeholder="Subtotal" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} />
        <button style={btn} onClick={add}>Buat</button>
      </div>
    </div>
  )
}

function TasksPanel() {
  const cols = ['todo', 'in_progress', 'done'] as const
  const labels = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' }
  const [items, setItems] = useState<{ id: number; title: string; status: string }[]>([
    { id: 1, title: 'Audit BGP upstream', status: 'todo' },
    { id: 2, title: 'Rekap invoice April', status: 'in_progress' },
    { id: 3, title: 'Deploy OLT baru', status: 'done' },
  ])
  const move = (id: number) => setItems((it) => it.map((x) => {
    const idx = cols.findIndex((c) => c === x.status)
    return x.id === id ? { ...x, status: cols[(idx + 1) % 3] } : x
  }))
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {cols.map((c) => (
          <div key={c} style={{ ...card, minHeight: 100 }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#94a3b8' }}>{labels[c]}</div>
            {items.filter((i) => i.status === c).map((i) => (
              <button key={i.id} onClick={() => move(i.id)} style={{ ...btn, display: 'block', width: '100%', textAlign: 'left', marginBottom: 4 }}>{i.title}</button>
            ))}
          </div>
        ))}
      </div>
      <span style={{ fontSize: 10, color: '#f59e0b' }}>DEMO – klik kartu untuk memindahkan kolom</span>
    </div>
  )
}

function PlanningPanel() {
  const op = useOperational()
  const p = op?.operational?.projects
  const items = [
    { name: 'Ekspansi FTTH Zona Utara', budget: 250000000, readiness: 72, phase: 'Planning' },
    { name: 'Aplikasi Billing Mobile', budget: 90000000, readiness: 45, phase: 'Design' },
    { name: 'Upgrade Core Router', budget: 180000000, readiness: 88, phase: 'Procurement' },
  ]
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <ApiBadge />
      {p && (
        <div style={{ ...card, display: 'flex', justifyContent: 'space-between' }}>
          <span>{p.total} proyek</span>
          <span>Kesiapan {p.avg_readiness}%</span>
          <span>RAB Rp {p.budget.toLocaleString('id-ID')}</span>
        </div>
      )}
      {items.map((it) => (
        <div key={it.name} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>{it.name}</b><span style={{ ...chip, color: '#F59E0B', background: '#3a2a05' }}>{it.phase}</span></div>
          <div style={{ marginTop: 6, height: 6, background: '#1e293b', borderRadius: 999 }}><div style={{ width: `${it.readiness}%`, height: '100%', background: '#F59E0B', borderRadius: 999 }} /></div>
          <div style={{ marginTop: 4, fontSize: 11, color: '#94a3b8' }}>Kesiapan {it.readiness}% • RAB Rp {it.budget.toLocaleString('id-ID')}</div>
        </div>
      ))}
      <span style={{ fontSize: 10, color: '#f59e0b' }}>Detail proyek = DEMO; agregat di atas dari API.</span>
    </div>
  )
}

function DomainsPanel() {
  const op = useOperational()
  const api = op?.operational?.devices.domains
  const rows = api && api.length
    ? api.map((r) => ({ d: r.domain, code: r.http_status, ping: r.ping_ms, ssl: r.ssl_days_left }))
    : [
        { d: 'alkonek.online', code: 200, ping: 42, ssl: 88 },
        { d: 'billing.alkonek.online', code: 200, ping: 51, ssl: 64 },
        { d: 'ranggamrw.my.id', code: 200, ping: 61, ssl: 120 },
      ]
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      <ApiBadge />
      {rows.map((r) => (
        <div key={r.d} style={{ ...card, display: 'flex', justifyContent: 'space-between', gap: 6 }}>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.d}</span>
          <span style={{ color: r.code === 200 ? '#10B981' : '#F43F5E' }}>HTTP {r.code}</span>
          <span>{r.ping} ms</span>
          <span style={{ color: r.ssl < 30 ? '#F43F5E' : '#94a3b8' }}>SSL {r.ssl}d</span>
        </div>
      ))}
      <span style={{ fontSize: 10, color: '#f59e0b' }}>{api?.length ? 'Sumber: Operational API (data seed, bukan telemetry langsung)' : 'DEMO DATA — API belum tersedia'}</span>
    </div>
  )
}

function OpsPanel() {
  const svc = [
    { n: 'Next.js', cpu: 22, ram: 31 },
    { n: 'Laravel', cpu: 14, ram: 26 },
    { n: 'MySQL', cpu: 9, ram: 44 },
    { n: 'Python', cpu: 3, ram: 12 },
    { n: 'Go', cpu: 7, ram: 18 },
  ]
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      {svc.map((s) => (
        <div key={s.n} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <b>{s.n}</b><span>CPU {s.cpu}%</span><span>RAM {s.ram}%</span><button style={btn}>Restart</button>
        </div>
      ))}
      <span style={{ fontSize: 10, color: '#f59e0b' }}>DEMO DATA</span>
    </div>
  )
}

function AgentsPanel() {
  const op = useOperational()
  const logs = op?.operational?.agents.logs
  const agents = [
    { n: 'NOC-Sentinel-Bot', s: 'Online', a: 'Memantau 24 perangkat' },
    { n: 'Billing-Collector-AI', s: 'Online', a: '3 pengingat tagihan' },
    { n: 'Project-Planner-AI', s: 'Idle', a: 'Menunggu instruksi' },
  ]
  const [chat, setChat] = useState('')
  const [log, setLog] = useState<string[]>([])
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <ApiBadge />
      {logs !== undefined && <div style={card}><b>AI agent logs</b> • {logs} entri tercatat di database</div>}
      {agents.map((a) => (
        <div key={a.n} style={{ ...card, display: 'flex', justifyContent: 'space-between' }}>
          <b>{a.n}</b><span style={{ color: a.s === 'Online' ? '#10B981' : '#94a3b8' }}>{a.s}</span><span style={{ color: '#94a3b8' }}>{a.a}</span>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 6 }}>
        <input style={input} placeholder="Instruksi untuk AI..." value={chat} onChange={(e) => setChat(e.target.value)} />
        <button style={btn} onClick={() => { if (chat) { setLog((l) => [...l, chat]); setChat('') } }}>Kirim</button>
      </div>
      {log.map((l, i) => <div key={i} style={{ ...card, color: '#93c5fd' }}>AI: {l}</div>)}
      <span style={{ fontSize: 10, color: '#f59e0b' }}>DEMO DATA</span>
    </div>
  )
}

function VaultPanel() {
  const [pin, setPin] = useState('')
  const [open, setOpen] = useState(false)
  return open ? (
    <div style={{ display: 'grid', gap: 6 }}>
      <div style={card}><b>Root SSH</b> · ssh://root@core-01 <span style={{ color: '#94a3b8' }}>AES-256-GCM</span></div>
      <div style={card}><b>OLT Admin</b> · admin@olt-01 <span style={{ color: '#94a3b8' }}>terenkripsi</span></div>
      <button style={btn} onClick={() => setOpen(false)}>Quick Lock</button>
    </div>
  ) : (
    <div style={{ display: 'grid', gap: 6 }}>
      <input style={input} type="password" placeholder="PIN brankas (1234)" value={pin} onChange={(e) => setPin(e.target.value)} />
      <button style={btn} onClick={() => setOpen(pin === '1234')}>Buka Brankas</button>
      {pin && pin !== '1234' && <span style={{ color: '#F43F5E', fontSize: 11 }}>PIN salah</span>}
    </div>
  )
}

function PhotoPanel() {
  const [b, setB] = useState(100)
  const [c, setC] = useState(100)
  const [s, setS] = useState(100)
  const sliders: { label: string; val: number; set: (n: number) => void }[] = [
    { label: 'Brightness', val: b, set: setB },
    { label: 'Contrast', val: c, set: setC },
    { label: 'Saturation', val: s, set: setS },
  ]
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ height: 120, borderRadius: 8, border: '1px solid #1e293b', background: `linear-gradient(135deg, hsl(200 ${s}% 55%), hsl(280 ${s}% 45%))`, filter: `brightness(${b}%) contrast(${c}%)` }} />
      {sliders.map(({ label, val, set }) => (
        <label key={label} style={{ fontSize: 11, color: '#94a3b8' }}>{label} {val}%<input type="range" min={50} max={150} value={val} onChange={(e) => set(Number(e.target.value))} style={{ width: '100%' }} /></label>
      ))}
      <span style={{ fontSize: 10, color: '#f59e0b' }}>Pratinjau DEMO</span>
    </div>
  )
}

function PersonalPanel() {
  const [sec, setSec] = useState(25 * 60)
  const [run, setRun] = useState(false)
  const [journal, setJournal] = useState('')
  useEffect(() => {
    if (!run) return
    const t = setInterval(() => setSec((v) => (v > 0 ? v - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [run])
  const mm = String(Math.floor(sec / 60)).padStart(2, '0')
  const ss = String(sec % 60).padStart(2, '0')
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ ...card, textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{mm}:{ss}</div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 6 }}>
          <button style={btn} onClick={() => setRun((r) => !r)}>{run ? 'Pause' : 'Start'}</button>
          <button style={btn} onClick={() => { setRun(false); setSec(25 * 60) }}>Reset</button>
        </div>
      </div>
      <textarea style={{ ...input, height: 80 }} placeholder="Jurnal pribadi..." value={journal} onChange={(e) => setJournal(e.target.value)} />
    </div>
  )
}

function DrivePanel() {
  const files = [
    { n: 'router-core-01.rsc', t: 'RouterOS backup', s: '128 KB' },
    { n: 'kontrak-PT-2026.pdf', t: 'Legal', s: '2.4 MB' },
    { n: 'topologi-ftth.docx', t: 'Dokumen', s: '640 KB' },
    { n: 'olt-backup.tar.gz', t: 'Backup', s: '18 MB' },
  ]
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      {files.map((f) => (
        <div key={f.n} style={{ ...card, display: 'flex', justifyContent: 'space-between' }}>
          <span>📄 {f.n}</span><span style={{ color: '#94a3b8' }}>{f.t}</span><span>{f.s}</span>
        </div>
      ))}
      <span style={{ fontSize: 10, color: '#f59e0b' }}>DEMO DATA</span>
    </div>
  )
}

function SettingsPanel() {
  const [noc, setNoc] = useState(NOC_URL)
  const [ftth, setFtth] = useState(FTTH_URL)
  const [porto, setPorto] = useState(PORTO_URL)
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label style={{ fontSize: 11, color: '#94a3b8' }}>URL NOC<input style={input} value={noc} onChange={(e) => setNoc(e.target.value)} /></label>
      <label style={{ fontSize: 11, color: '#94a3b8' }}>URL Panel FTTH<input style={input} value={ftth} onChange={(e) => setFtth(e.target.value)} /></label>
      <label style={{ fontSize: 11, color: '#94a3b8' }}>URL Portofolio<input style={input} value={porto} onChange={(e) => setPorto(e.target.value)} /></label>
      <button style={btn} onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500) }}>Simpan</button>
      {saved && <span style={{ color: '#10B981', fontSize: 11 }}>Tersimpan lokal (DEMO)</span>}
    </div>
  )
}

function GuestbookPanel() {
  const [msgs, setMsgs] = useState<{ name: string; text: string }[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <div style={{ ...card, color: '#10B981' }}>Owner: Ready for Meeting • Reception Online</div>
      {msgs.map((m, i) => <div key={i} style={card}><b>{m.name}</b><div style={{ color: '#94a3b8' }}>{m.text}</div></div>)}
      <input style={input} placeholder="Nama tamu" value={name} onChange={(e) => setName(e.target.value)} />
      <input style={input} placeholder="Pesan / jadwal meeting" value={text} onChange={(e) => setText(e.target.value)} />
      <button style={btn} onClick={() => { if (name && text) { setMsgs((m) => [...m, { name, text }]); setName(''); setText('') } }}>Kirim Buku Tamu</button>
    </div>
  )
}

export function RoomPanelContent({ room }: { room: Room }) {
  switch (room.module) {
    case 'NOC': return <Embed url={NOC_URL} label="NOC Live" />
    case 'Panel FTTH': return <Embed url={FTTH_URL} label="FTTH Live" />
    case 'Portofolio': return <Embed url={PORTO_URL} label="Portofolio Live" />
    case 'Billing PT': return <BillingPanel />
    case 'Tugas': return <TasksPanel />
    case 'Gudang Perencanaan': return <PlanningPanel />
    case 'Habitat Web': return <DomainsPanel />
    case 'Task Manager': return <OpsPanel />
    case 'Operating System': return <OpsPanel />
    case 'Agents Ku': return <AgentsPanel />
    case 'Vault': return <VaultPanel />
    case 'Ruang Foto': return <PhotoPanel />
    case 'Ruangan Saya': return <PersonalPanel />
    case 'Drive': return <DrivePanel />
    case 'Setting': return <SettingsPanel />
    case 'About': return <GuestbookPanel />
    default: return <div style={card}>{room.desc}</div>
  }
}

export function useLobbyStatus() {
  const [status, setStatus] = useState<string>('MOCK')
  useEffect(() => {
    fetch(apiUrl('/public/lobby-status')).then((r) => (r.ok ? r.json() : null)).then(() => setStatus('LIVE')).catch(() => setStatus('MOCK'))
  }, [])
  return status
}
