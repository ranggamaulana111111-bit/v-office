'use client'
import { memo, useMemo } from 'react'
import * as THREE from 'three'
import { Instances, Instance, Html } from '@react-three/drei'
import { MATS, std } from './furniture/materials'

export type Opening = { x: number; y: number; w: number; h: number }

export const Wall = memo(function Wall({
  length,
  height,
  thickness = 0.12,
  openings = [],
  material = MATS.offWhite,
}: {
  length: number
  height: number
  thickness?: number
  openings?: Opening[]
  material?: THREE.Material
}) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-length / 2, 0)
    shape.lineTo(length / 2, 0)
    shape.lineTo(length / 2, height)
    shape.lineTo(-length / 2, height)
    shape.closePath()
    openings.forEach((o) => {
      const hole = new THREE.Path()
      hole.moveTo(o.x - o.w / 2, o.y)
      hole.lineTo(o.x + o.w / 2, o.y)
      hole.lineTo(o.x + o.w / 2, o.y + o.h)
      hole.lineTo(o.x - o.w / 2, o.y + o.h)
      hole.closePath()
      shape.holes.push(hole)
    })
    const g = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false, curveSegments: 4 })
    g.translate(0, 0, -thickness / 2)
    g.computeVertexNormals()
    return g
  }, [length, height, thickness, openings])

  return <mesh geometry={geo} material={material} castShadow receiveShadow />
})

export const WindowPane = memo(function WindowPane({
  w,
  h,
  frame = MATS.metal,
  glass = MATS.glass,
}: {
  w: number
  h: number
  frame?: THREE.Material
  glass?: THREE.Material
}) {
  const t = 0.02
  return (
    <group>
      <mesh material={glass}><boxGeometry args={[w, h, 0.012]} /></mesh>
      {[
        [0, h / 2 - t / 2, w, t],
        [0, -h / 2 + t / 2, w, t],
        [-w / 2 + t / 2, 0, t, h],
        [w / 2 - t / 2, 0, t, h],
        [0, 0, w, t * 0.6],
        [0, 0, t * 0.6, h],
      ].map(([x, y, bw, bh], i) => (
        <mesh key={i} position={[x, y, 0]} material={frame}>
          <boxGeometry args={[bw, bh, 0.035]} />
        </mesh>
      ))}
    </group>
  )
})

export const Railing = memo(function Railing({
  length,
  height = 0.92,
  glassPanel = true,
  step = 0.38,
}: {
  length: number
  height?: number
  glassPanel?: boolean
  step?: number
}) {
  const count = Math.max(2, Math.round(length / step))
  const xs = Array.from({ length: count + 1 }, (_, i) => -length / 2 + (length / count) * i)
  return (
    <group>
      <Instances limit={count + 1} range={count + 1} castShadow>
        <boxGeometry args={[0.028, height, 0.028]} />
        <meshStandardMaterial color="#3f4a59" roughness={0.38} metalness={0.8} />
        {xs.map((x, i) => (
          <Instance key={i} position={[x, height / 2, 0]} />
        ))}
      </Instances>
      <mesh position={[0, height, 0]} material={MATS.metal} castShadow><boxGeometry args={[length + 0.04, 0.035, 0.05]} /></mesh>
      {glassPanel && (
        <mesh position={[0, height * 0.5, 0.002]} material={MATS.glass}>
          <boxGeometry args={[length - 0.06, height - 0.22, 0.008]} />
        </mesh>
      )}
    </group>
  )
})

export const Stairs = memo(function Stairs({
  steps = 16,
  rise = 0.25,
  run = 0.16,
  width = 0.9,
}: {
  steps?: number
  rise?: number
  run?: number
  width?: number
}) {
  const items = Array.from({ length: steps })
  return (
    <group>
      <Instances limit={steps} range={steps} castShadow receiveShadow>
        <boxGeometry args={[width, rise, run]} />
        <meshStandardMaterial color="#cfd7e0" roughness={0.85} metalness={0.05} />
        {items.map((_, i) => (
          <Instance key={i} position={[0, rise * (i + 0.5), -run * i]} />
        ))}
      </Instances>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (width / 2 + 0.01), rise * steps * 0.5, -run * (steps - 1) * 0.5]} rotation={[Math.atan2(rise, run), 0, 0]} material={MATS.metal}>
          <boxGeometry args={[0.04, 0.05, Math.hypot(rise * steps, run * steps)]} />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (width / 2 + 0.03), 0, 0]}>
          <Instances limit={steps} range={steps}>
            <boxGeometry args={[0.02, 0.85, 0.02]} />
            <meshStandardMaterial color="#3f4a59" roughness={0.4} metalness={0.8} />
            {items.map((_, i) => (
              <Instance key={i} position={[0, 0.42 + rise * i, -run * i]} />
            ))}
          </Instances>
        </group>
      ))}
    </group>
  )
})

export const Column = memo(function Column({ height = 3.2, radius = 0.11, color = '#e8edf3' }: { height?: number; radius?: number; color?: string }) {
  return (
    <group>
      <mesh position={[0, height / 2, 0]} castShadow material={std(color, 0.7, 0.05)}><cylinderGeometry args={[radius, radius, height, 12]} /></mesh>
      <mesh position={[0, height - 0.04, 0]} material={MATS.concrete}><boxGeometry args={[radius * 2.6, 0.08, radius * 2.6]} /></mesh>
      <mesh position={[0, 0.04, 0]} material={MATS.concrete}><boxGeometry args={[radius * 2.6, 0.08, radius * 2.6]} /></mesh>
    </group>
  )
})

export const GlassPartition = memo(function GlassPartition({
  length,
  height = 2.9,
  panels = 2,
}: {
  length: number
  height?: number
  panels?: number
}) {
  const pw = length / panels
  return (
    <group>
      <mesh position={[0, height / 2, 0]} material={MATS.glass}><boxGeometry args={[length, height, 0.02]} /></mesh>
      <mesh position={[0, height, 0]} material={MATS.metal}><boxGeometry args={[length, 0.03, 0.05]} /></mesh>
      <mesh position={[0, 0.03, 0]} material={MATS.metal}><boxGeometry args={[length, 0.03, 0.05]} /></mesh>
      {Array.from({ length: panels + 1 }).map((_, i) => (
        <mesh key={i} position={[-length / 2 + pw * i, height / 2, 0]} material={MATS.metal}>
          <boxGeometry args={[0.03, height, 0.04]} />
        </mesh>
      ))}
    </group>
  )
})

export const DoorFrame = memo(function DoorFrame({ w = 0.9, h = 2.15, glass = true }: { w?: number; h?: number; glass?: boolean }) {
  return (
    <group>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (w / 2), h / 2, 0]} material={MATS.metalLight}><boxGeometry args={[0.045, h, 0.1]} /></mesh>
      ))}
      <mesh position={[0, h, 0]} material={MATS.metalLight}><boxGeometry args={[w + 0.05, 0.05, 0.1]} /></mesh>
      {glass
        ? <mesh position={[0, h / 2, 0]} material={MATS.glass}><boxGeometry args={[w - 0.06, h - 0.06, 0.012]} /></mesh>
        : <mesh position={[0, h / 2, 0]} material={MATS.wood}><boxGeometry args={[w - 0.06, h - 0.06, 0.04]} /></mesh>}
      <mesh position={[w / 2 - 0.12, h / 2 - 0.05, 0.03]} material={MATS.metal}><cylinderGeometry args={[0.012, 0.012, 0.18, 8]} /></mesh>
    </group>
  )
})

export const CeilingLight = memo(function CeilingLight({
  w = 0.9,
  d = 0.16,
  intensity = 1.1,
}: {
  w?: number
  d?: number
  intensity?: number
}) {
  return (
    <group>
      <mesh position={[0, 0.03, 0]} material={MATS.metal}><boxGeometry args={[w + 0.04, 0.04, d + 0.04]} /></mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[w, 0.015, d]} />
        <meshStandardMaterial color="#fffdf5" emissive="#fff3d6" emissiveIntensity={intensity} roughness={0.4} />
      </mesh>
    </group>
  )
})

export const Elevator = memo(function Elevator({ height = 2.9 }: { height?: number }) {
  return (
    <group>
      <mesh position={[0, height / 2, 0]} material={MATS.metal}><boxGeometry args={[1.7, height, 0.16]} /></mesh>
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, height * 0.46, 0.09]} material={std('#9aa6b4', 0.3, 0.85)}>
          <boxGeometry args={[0.78, height * 0.86, 0.03]} />
        </mesh>
      ))}
      <mesh position={[0, height * 0.46, 0.12]} material={MATS.dark}><boxGeometry args={[0.02, height * 0.84, 0.04]} /></mesh>
      <mesh position={[0, height * 0.94, 0.12]} material={MATS.screenGreen}><boxGeometry args={[0.24, 0.09, 0.02]} /></mesh>
    </group>
  )
})

export function Signage({ text, sub, color = '#0f172a' }: { text: string; sub?: string; color?: string }) {
  return (
    <Html center distanceFactor={13}>
      <div style={{ color, fontWeight: 800, letterSpacing: 2.5, fontSize: 13, textAlign: 'center', textShadow: '0 1px 2px rgba(255,255,255,.6)' }}>
        {text}
        {sub && <div style={{ fontSize: 7, letterSpacing: 1.5, fontWeight: 600, opacity: 0.6, marginTop: 1 }}>{sub}</div>}
      </div>
    </Html>
  )
}
