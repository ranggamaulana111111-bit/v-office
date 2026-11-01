'use client'
import { useEffect, useRef, useState } from 'react'
import {
  Building2, Menu, X, ExternalLink, ShieldCheck, Sparkles, Activity, ChevronRight,
  Wifi, WifiOff, Loader2, Info, Database,
} from 'lucide-react'
import { floors, allRooms, floorOf, type Room } from '@/components/virtual-office/office-config'
import { BuildingScene } from '@/components/virtual-office/BuildingScene'
import { RoomInformationPanel } from '@/components/virtual-office/RoomInformationPanel'
import { RoomPanelContent } from '@/components/virtual-office/RoomPanels'
import { BuildingToolbar } from '@/components/virtual-office/ui/BuildingToolbar'
import type { ViewCommand, ViewCommandType } from '@/components/virtual-office/CameraController'
import { OperationalContext } from '@/lib/OperationalContext'
import { useApiStatus } from '@/lib/useApiStatus'
import { API_BASE } from '@/lib/api'

const DOT: Record<Room['status'], string> = {
  online: 'bg-emerald-500',
  warning: 'bg-amber-500',
  critical: 'bg-rose-500',
  offline: 'bg-slate-400',
}

export default function Home() {
  const api = useApiStatus(15000)
  return (
    <OperationalContext.Provider value={api}>
      <Shell online={api.online} latency={api.latency} lastUpdated={api.lastUpdated} error={api.error} />
    </OperationalContext.Provider>
  )
}

function Shell({ online, latency, lastUpdated, error }: { online: boolean; latency: number | null; lastUpdated: string | null; error: string | null }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [focus, setFocus] = useState<string | null>(null)
  const [exploded, setExploded] = useState(false)
  const [sidebar, setSidebar] = useState(true)
  const [modal, setModal] = useState<Room | null>(null)
  const [clock, setClock] = useState('--:--:--')
  const [ready, setReady] = useState(false)
  const [command, setCommand] = useState<ViewCommand | null>(null)
  const nonce = useRef(0)

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const p = (n: number) => String(n).padStart(2, '0')
      setClock(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`)
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  const selectedRoom = selected ? allRooms.find((r) => r.id === selected) ?? null : null
  const selectedFloor = selected ? floorOf(selected) : null
  const focusFloor = focus ? floors.find((f) => f.id === focus) : null

  const pick = (id: string) => {
    setSelected(id)
    setFocus(null)
  }
  const overview = () => {
    setSelected(null)
    setFocus(null)
    setExploded(false)
    emit('reset')
  }
  const reset = () => {
    setSelected(null)
    setFocus(null)
    setExploded(false)
    emit('reset')
  }
  const emit = (type: ViewCommandType) => {
    nonce.current += 1
    setCommand({ id: nonce.current, type })
  }

  return (
    <main className="relative flex h-screen w-screen flex-col overflow-hidden bg-slate-100 text-slate-900">
      <header className="z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/85 px-3 backdrop-blur-xl sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <button onClick={() => setSidebar((s) => !s)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Toggle sidebar">
            {sidebar ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
            <Building2 size={18} />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-[13px] font-extrabold leading-tight tracking-wide sm:text-sm">NEXUS VIRTUAL HEADQUARTERS</h1>
            <p className="hidden text-[10px] font-medium text-slate-500 sm:block">3D Virtual Office Operating System • 16 Modul</p>
          </div>
          <nav className="ml-3 hidden items-center gap-1 text-[10px] font-semibold text-slate-400 lg:flex" aria-label="Breadcrumb">
            <span className="text-slate-500">NEXUS</span>
            <ChevronRight size={11} />
            <span className={focusFloor || selectedFloor ? 'text-slate-700' : 'text-slate-500'}>{selectedFloor?.label ?? focusFloor?.label ?? 'Overview'}</span>
            {selectedRoom && (
              <>
                <ChevronRight size={11} />
                <span className="max-w-[160px] truncate text-slate-900">{selectedRoom.name}</span>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold text-slate-600 md:flex">
            <Database size={11} /> 4 Lantai • 16 Ruangan
          </span>
          <button
            onClick={() => emit('reset')}
            title={error ?? 'Status API'}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${online ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}
          >
            {online ? <Wifi size={11} /> : <WifiOff size={11} />}
            <span className="hidden sm:inline">{online ? 'API LIVE' : 'API MOCK'}</span>
            {online && latency !== null && <span className="font-mono">{latency}ms</span>}
          </button>
          <span className="rounded-full bg-slate-900 px-2.5 py-1 font-mono text-[11px] font-bold text-white">{clock}</span>
        </div>
      </header>

      {error && (
        <div className="z-30 flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-1.5 text-[10px] font-semibold text-amber-700">
          <Info size={12} /> API operasional tidak tersedia ({error}). Visualisasi berjalan dengan data DEMO/MOCK yang jelas ditandai. Data seed tidak dianggap telemetry produksi.
        </div>
      )}

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {sidebar && (
          <>
            <div className="absolute inset-0 z-20 bg-slate-900/20 backdrop-blur-[1px] md:hidden" onClick={() => setSidebar(false)} />
            <aside className="absolute inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:relative md:z-20 md:bg-white/80 md:shadow-none">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Modul Per Lantai</span>
                <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">16</span>
              </div>
              {floors.map((floor) => (
                <div key={floor.id} className="mb-2.5">
                  <button
                    onClick={() => { setFocus(focus === floor.id ? null : floor.id); setSelected(null) }}
                    className={`mb-1 flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition ${focus === floor.id ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: floor.accent }} />
                      {floor.label}
                    </span>
                    <span className="text-[9px] opacity-70">{floor.rooms.length}</span>
                  </button>
                  <div className="grid gap-0.5">
                    {floor.rooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => pick(room.id)}
                        className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition ${selected === room.id ? 'bg-slate-100 ring-1 ring-slate-300' : 'hover:bg-slate-50'}`}
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[9px] font-bold text-white" style={{ background: room.color }}>{room.n}</span>
                        <span className="flex-1 truncate text-[11px] font-semibold text-slate-700">{room.name}</span>
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[room.status]}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                <p className="text-[9px] font-semibold leading-relaxed text-slate-500">Data operasional agregat berasal dari API Laravel (data seed). Konektor NOC, FTTH, dan Portofolio tersambung ke sistem eksternal.</p>
              </div>
            </aside>
          </>
        )}

        <div className="relative min-w-0 flex-1">
          {!ready && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-slate-100">
              <Loader2 size={26} className="animate-spin text-slate-400" />
              <p className="text-[11px] font-semibold text-slate-500">Membangun model arsitektur headquarters...</p>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-1/3 animate-pulse rounded-full bg-slate-400" /></div>
            </div>
          )}
          <BuildingScene
            selected={selected}
            onSelect={pick}
            exploded={exploded}
            focus={focus}
            command={command}
            onReady={() => setReady(true)}
          />

          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col gap-1">
            <span className="rounded-full border border-slate-200 bg-white/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-slate-500 shadow backdrop-blur">
              {exploded ? 'Exploded View' : focusFloor ? `${focusFloor.label} View` : 'Building Overview'}
            </span>
            {lastUpdated && (
              <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-2 py-0.5 text-[9px] font-medium text-slate-400 shadow-sm backdrop-blur">
                <Activity size={9} /> sinkron {new Date(lastUpdated).toLocaleTimeString('id-ID', { hour12: false })}
              </span>
            )}
          </div>

          {!selectedRoom && (
            <div className="pointer-events-none absolute left-1/2 top-4 z-10 hidden -translate-x-1/2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[10px] font-semibold text-slate-500 shadow backdrop-blur sm:block">
              Klik ruangan untuk detail • Drag untuk rotasi • Scroll untuk zoom
            </div>
          )}

          {!selectedRoom && (
            <div className="pointer-events-none absolute right-4 top-4 z-10 hidden rounded-xl border border-slate-200 bg-white/85 p-2.5 shadow-lg backdrop-blur md:block">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">Status Operasional</p>
              {(['online', 'warning', 'critical', 'offline'] as const).map((s) => (
                <div key={s} className="flex items-center gap-1.5 text-[10px] font-semibold capitalize text-slate-600">
                  <span className={`h-2 w-2 rounded-full ${DOT[s]}`} /> {s === 'offline' ? 'locked' : s}
                </div>
              ))}
            </div>
          )}

          {selectedRoom && (
            <div className="pointer-events-none absolute inset-x-2 bottom-28 z-30 flex justify-end md:bottom-auto md:right-4 md:top-4 md:inset-x-auto">
              <RoomInformationPanel
                room={selectedRoom}
                floorLabel={selectedFloor?.label ?? 'HQ'}
                onClose={() => setSelected(null)}
                onOpen={(r) => setModal(r)}
              />
            </div>
          )}

          <BuildingToolbar
            floors={floors}
            focus={focus}
            exploded={exploded}
            onOverview={overview}
            onFloor={(id) => { setFocus(id); setSelected(null); if (id === null) setExploded(false) }}
            onExploded={() => setExploded((e) => !e)}
            onReset={reset}
            onZoom={(d) => emit(d === 'in' ? 'zoomIn' : 'zoomOut')}
            onRotate={(d) => emit(d === 'left' ? 'rotateLeft' : 'rotateRight')}
          />
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={() => setModal(null)}>
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ background: modal.color }}>{modal.n}</span>
                <div>
                  <h2 className="text-sm font-bold">{modal.name}</h2>
                  <p className="text-[10px] text-slate-500">{modal.module} • {modal.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-600"><ShieldCheck size={11} /> Secure</span>
                <button onClick={() => setModal(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Tutup"><X size={16} /></button>
              </div>
            </div>
            <div className="p-4">
              <RoomPanelContent room={modal} />
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 text-[10px] text-slate-500">
                <Sparkles size={12} /> Modul terintegrasi Laravel API <code className="rounded bg-white px-1 font-mono">{API_BASE}</code>
                <ExternalLink size={12} className="ml-auto" />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
