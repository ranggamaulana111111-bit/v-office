'use client'
import { memo, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import type { Floor } from './office-config'
import { MATS, std } from './furniture/materials'
import { RoomModule } from './RoomModule'
import { Wall, Railing, Stairs, CeilingLight, Column } from './Architecture'

const SLAB_W = 11.6
const SLAB_D = 5.2
const WALL_H = 3.0

export const FloorSlab = memo(function FloorSlab({
  floor,
  index,
  selected,
  onSelect,
  exploded,
}: {
  floor: Floor
  index: number
  selected: string | null
  onSelect: (id: string) => void
  exploded: boolean
}) {
  const ref = useRef<THREE.Group>(null)
  const targetY = floor.y + (exploded ? index * 2.4 : 0)

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.y += (targetY - ref.current.position.y) * 0.08
  })

  const sideOpenings = useMemo(() => [{ x: 0, y: 1.1, w: 1.5, h: 1.3 }, { x: 2.9, y: 1.1, w: 1.5, h: 1.3 }, { x: -2.9, y: 1.1, w: 1.5, h: 1.3 }], [])
  const backOpenings = useMemo(() => [{ x: 0, y: 1.4, w: 6.0, h: 0.9 }], [])

  return (
    <group ref={ref} position={[0, floor.y, 0]}>
      {/* slab */}
      <mesh position={[0, -0.26, 0]} castShadow receiveShadow>
        <boxGeometry args={[SLAB_W, 0.52, SLAB_D]} />
        <meshStandardMaterial color={floor.color} roughness={0.88} metalness={0.03} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[SLAB_W - 0.1, SLAB_D - 0.1]} />
        <meshStandardMaterial color={floor.wall} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.01, 0.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[SLAB_W - 0.2, 0.72]} />
        <meshStandardMaterial color={floor.color} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.018, -0.22]} rotation={[-Math.PI / 2, 0, 0]} material={std(floor.accent, 0.5, 0.1, floor.accent, 0.25)}>
        <planeGeometry args={[SLAB_W - 0.3, 0.03]} />
      </mesh>

      {/* exterior back + side walls */}
      <group position={[0, 0, -SLAB_D / 2 + 0.06]}>
        <Wall length={SLAB_W} height={WALL_H} thickness={0.16} openings={backOpenings} material={std(floor.wall, 0.85, 0.02)} />
      </group>
      <group position={[-SLAB_W / 2 + 0.06, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Wall length={SLAB_D} height={WALL_H} thickness={0.16} openings={sideOpenings} material={std(floor.wall, 0.85, 0.02)} />
      </group>
      <mesh position={[SLAB_W / 2 - 0.05, WALL_H / 2, 0]} material={std(floor.wall, 0.85, 0.02)}>
        <boxGeometry args={[0.1, WALL_H, SLAB_D]} />
      </mesh>

      {/* railing along cutaway edge */}
      <group position={[-1.3, 0.02, SLAB_D / 2 - 0.08]}>
        <Railing length={SLAB_W - 3.4} />
      </group>
      <group position={[-SLAB_W / 2 + 0.08, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Railing length={SLAB_D - 0.3} />
      </group>

      {/* corridor ceiling lights */}
      {[-4, -2, 0, 2, 4].map((x) => (
        <group key={x} position={[x, WALL_H - 0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <CeilingLight w={0.5} d={0.14} intensity={0.7} />
        </group>
      ))}

      {/* columns */}
      <group position={[-SLAB_W / 2 + 0.5, 0, SLAB_D / 2 - 0.5]}><Column height={WALL_H} /></group>
      <group position={[SLAB_W / 2 - 0.5, 0, -SLAB_D / 2 + 0.5]}><Column height={WALL_H} /></group>

      {/* stair tower */}
      <group position={[SLAB_W / 2 + 0.7, 0, 0.3]}>
        <mesh position={[0, -0.26, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.52, 3.4]} />
          <meshStandardMaterial color={floor.color} roughness={0.88} />
        </mesh>
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} material={std(floor.wall, 0.9, 0.02)}>
          <planeGeometry args={[2.1, 3.3]} />
        </mesh>
        <group position={[0, 0, 1.25]}>
          <Stairs steps={16} rise={4 / 16} run={0.15} width={1.1} />
        </group>
        <group position={[0, 0, 1.68]}><Railing length={1.5} /></group>
        <group position={[-0.2, 0, -1.65]}><Railing length={1.6} /></group>
        <mesh position={[1.08, WALL_H / 2, 0]} material={MATS.glass}><boxGeometry args={[0.02, WALL_H, 3.3]} /></mesh>
      </group>

      {/* floor identity */}
      <Html position={[0, WALL_H + 0.12, -SLAB_D / 2 + 0.1]} center distanceFactor={14}>
        <div style={{ color: '#0f172a', fontWeight: 800, letterSpacing: 3, fontSize: 11, opacity: 0.5, whiteSpace: 'nowrap' }}>
          {floor.short} <span style={{ color: floor.accent }}>•</span> {floor.sub.toUpperCase()}
        </div>
      </Html>

      {floor.rooms.map((room) => (
        <RoomModule key={room.id} room={room} selected={selected === room.id} onSelect={onSelect} compact={exploded} />
      ))}

      {/* status pill */}
      <Html position={[-SLAB_W / 2 + 0.2, 0.35, SLAB_D / 2 + 0.15]} center distanceFactor={16}>
        <div style={{ background: '#ffffff', color: '#0f172a', padding: '5px 12px', borderRadius: 999, fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(0,0,0,.22)', border: '1px solid #e2e8f0' }}>
          {floor.label} <span style={{ color: '#64748b', fontWeight: 500 }}>• {floor.rooms.length} ruangan</span>
        </div>
      </Html>
    </group>
  )
})
