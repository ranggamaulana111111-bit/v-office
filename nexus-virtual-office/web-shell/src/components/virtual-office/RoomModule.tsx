'use client'
import { memo, useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import type { Room } from './office-config'
import { MATS } from './furniture/materials'
import { Furniture } from './furniture'
import { Wall, WindowPane, GlassPartition, DoorFrame, CeilingLight } from './Architecture'

const WALL_H = 3.0
const WALL_T = 0.1

export const RoomModule = memo(function RoomModule({
  room,
  selected,
  onSelect,
  compact,
}: {
  room: Room
  selected: boolean
  onSelect: (id: string) => void
  compact?: boolean
}) {
  const [hover, setHover] = useState(false)
  const active = selected || hover
  const winW = Math.min(1.15, room.w * 0.52)
  const openings = useMemo(() => [{ x: 0, y: 1.02, w: winW, h: 1.15 }], [winW])
  const doorW = Math.min(0.85, room.w * 0.32)
  const sideGlass = Math.max(0.2, (room.w - doorW) / 2 - 0.06)

  return (
    <group position={room.pos}>
      {/* room floor */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[room.w - 0.04, room.d - 0.04]} />
        <meshStandardMaterial color={room.color} roughness={0.88} emissive={room.color} emissiveIntensity={active ? 0.18 : 0.035} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[Math.max(room.w, room.d) * 0.46, Math.max(room.w, room.d) * 0.47, 4, 1, Math.PI / 4]} />
        <meshBasicMaterial color={room.color} transparent opacity={active ? 0.9 : 0.18} />
      </mesh>

      {/* back wall + window */}
      <group position={[0, 0, -room.d / 2]}>
        <Wall length={room.w} height={WALL_H} thickness={WALL_T} openings={openings} material={MATS.offWhite} />
        <group position={[0, 1.02 + 1.15 / 2, 0]}><WindowPane w={winW} h={1.15} /></group>
        <mesh position={[0, 0.06, 0]} material={MATS.metalLight}><boxGeometry args={[room.w, 0.12, 0.14]} /></mesh>
      </group>

      {/* side partitions */}
      <group position={[-room.w / 2, 0, 0]}>
        <Wall length={room.d} height={WALL_H} thickness={WALL_T} material={MATS.offWhite} />
      </group>
      <mesh position={[-room.w / 2 + 0.03, WALL_H - 0.02, 0]} material={MATS.metal}><boxGeometry args={[0.02, 0.04, room.d]} /></mesh>

      {/* front glazing with door */}
      <group position={[0, 0, room.d / 2]}>
        <group position={[-(doorW / 2 + sideGlass / 2), 0, 0]}>
          <GlassPartition length={sideGlass} height={WALL_H - 0.1} panels={1} />
        </group>
        <group position={[doorW / 2 + sideGlass / 2, 0, 0]}>
          <GlassPartition length={sideGlass} height={WALL_H - 0.1} panels={1} />
        </group>
        <group position={[0, 0, 0]}><DoorFrame w={doorW} h={2.2} glass /></group>
        <mesh position={[0, WALL_H - 0.06, 0]} material={MATS.metal}><boxGeometry args={[room.w, 0.1, 0.06]} /></mesh>
        <mesh position={[0, 0.04, 0]} material={MATS.metal}><boxGeometry args={[room.w, 0.06, 0.06]} /></mesh>
      </group>

      <group position={[0, WALL_H - 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <CeilingLight w={Math.min(1.0, room.w * 0.4)} />
      </group>

      {/* furniture (compact hides some detail groups but keeps silhouette) */}
      <group position={[0, 0.02, 0]} visible>
        <Furniture room={room} />
      </group>

      {active && (
        <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(room.w, room.d) * 0.475, Math.max(room.w, room.d) * 0.495, 48]} />
          <meshBasicMaterial color={room.color} transparent opacity={0.95} />
        </mesh>
      )}

      {active && !compact && (
        <Html position={[0, WALL_H + 0.42, 0]} center distanceFactor={12}>
          <div style={{ background: 'rgba(15,23,42,0.94)', color: '#fff', padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', border: `1px solid ${room.color}`, boxShadow: '0 6px 18px rgba(0,0,0,.35)' }}>
            <span style={{ color: room.color }}>#{room.n}</span> {room.name}
            <div style={{ fontSize: 9, fontWeight: 500, color: '#cbd5e1', marginTop: 2 }}>{room.module} • {room.status.toUpperCase()} • {room.area}</div>
          </div>
        </Html>
      )}

      {/* interaction surface */}
      <mesh
        position={[0, WALL_H / 2, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto' }}
        onClick={(e) => { e.stopPropagation(); onSelect(room.id) }}
      >
        <boxGeometry args={[room.w, WALL_H, room.d]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>
    </group>
  )
})
