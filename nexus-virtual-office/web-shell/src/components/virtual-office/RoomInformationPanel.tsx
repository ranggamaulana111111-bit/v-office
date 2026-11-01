'use client'
import { X, ExternalLink, MapPin, Users, Maximize } from 'lucide-react'
import type { Room } from './office-config'
import { RoomPanelContent } from './RoomPanels'

const STATUS: Record<Room['status'], { color: string; bg: string; label: string }> = {
  online: { color: '#10B981', bg: 'rgba(16,185,129,0.14)', label: 'ONLINE' },
  warning: { color: '#F59E0B', bg: 'rgba(245,158,11,0.14)', label: 'WARNING' },
  critical: { color: '#F43F5E', bg: 'rgba(244,63,94,0.14)', label: 'CRITICAL' },
  offline: { color: '#64748B', bg: 'rgba(100,116,139,0.14)', label: 'LOCKED' },
}

export function RoomInformationPanel({ room, floorLabel, onClose, onOpen }: { room: Room; floorLabel: string; onClose: () => void; onOpen: (r: Room) => void }) {
  const s = STATUS[room.status]
  return (
    <div className="pointer-events-auto w-[350px] max-h-[calc(100vh-210px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white shadow" style={{ background: room.color }}>{room.n}</span>
          <div>
            <h3 className="text-sm font-bold leading-tight text-slate-900">{room.name}</h3>
            <p className="text-[10px] font-medium text-slate-500">{floorLabel} · {room.module}</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup">
          <X size={16} />
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}` }}>{s.label}</span>
        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"><Maximize size={9} /> {room.area}</span>
        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"><Users size={9} /> {room.capacity}</span>
        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600"><MapPin size={9} /> {floorLabel}</span>
      </div>

      <p className="mb-1 text-[11px] leading-relaxed text-slate-600">{room.desc}</p>
      <p className="mb-3 text-[11px] font-medium text-slate-500">{room.activity}</p>

      <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-2">
        <RoomPanelContent room={room} />
      </div>

      <button onClick={() => onOpen(room)} className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition hover:bg-slate-700">
        Buka Modul {room.module} <ExternalLink size={12} />
      </button>
    </div>
  )
}
