'use client'
import { Compass, Layers, Maximize2, Minimize2, RotateCcw, RotateCw, ZoomIn, ZoomOut } from 'lucide-react'
import type { Floor } from '../office-config'

export function BuildingToolbar({
  floors,
  focus,
  exploded,
  onOverview,
  onFloor,
  onExploded,
  onReset,
  onZoom,
  onRotate,
}: {
  floors: Floor[]
  focus: string | null
  exploded: boolean
  onOverview: () => void
  onFloor: (id: string | null) => void
  onExploded: () => void
  onReset: () => void
  onZoom: (dir: 'in' | 'out') => void
  onRotate: (dir: 'left' | 'right') => void
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-2 px-3">
      <div className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white/90 p-1.5 shadow-xl backdrop-blur">
        <button
          onClick={onOverview}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[10px] font-bold transition ${!focus ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <Compass size={12} /> Overview
        </button>
        <span className="mx-0.5 h-5 w-px bg-slate-200" />
        {floors.map((f) => (
          <button
            key={f.id}
            onClick={() => onFloor(focus === f.id ? null : f.id)}
            className={`rounded-xl px-2.5 py-1.5 text-[10px] font-bold transition ${focus === f.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            title={f.label}
          >
            {f.short}
          </button>
        ))}
        <span className="mx-0.5 h-5 w-px bg-slate-200" />
        <button
          onClick={onExploded}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[10px] font-bold transition ${exploded ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          {exploded ? <Minimize2 size={12} /> : <Maximize2 size={12} />} Exploded
        </button>
        <button onClick={onReset} className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100" title="Reset View">
          <RotateCcw size={12} /> Reset
        </button>
      </div>
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-lg backdrop-blur">
        <IconBtn label="Zoom out" onClick={() => onZoom('out')}><ZoomOut size={13} /></IconBtn>
        <IconBtn label="Zoom in" onClick={() => onZoom('in')}><ZoomIn size={13} /></IconBtn>
        <span className="mx-0.5 h-4 w-px bg-slate-200" />
        <IconBtn label="Rotate left" onClick={() => onRotate('left')}><RotateCw size={13} className="-scale-x-100" /></IconBtn>
        <IconBtn label="Rotate right" onClick={() => onRotate('right')}><RotateCw size={13} /></IconBtn>
        <span className="mx-0.5 h-4 w-px bg-slate-200" />
        <span className="flex items-center gap-1 px-1.5 text-[9px] font-semibold text-slate-400"><Layers size={11} /> 4 lantai</span>
      </div>
    </div>
  )
}

function IconBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label={label} title={label} className="rounded-full p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
      {children}
    </button>
  )
}
