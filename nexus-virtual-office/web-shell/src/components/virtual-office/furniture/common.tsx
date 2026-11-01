'use client'
import { memo } from 'react'
import * as THREE from 'three'
import { MATS, std } from './materials'

export const Desk = memo(function Desk({
  w = 0.9,
  d = 0.5,
  h = 0.72,
  top = MATS.woodLight,
  legs = MATS.metal,
  drawers = false,
  modesty = true,
}: {
  w?: number
  d?: number
  h?: number
  top?: THREE.Material
  legs?: THREE.Material
  drawers?: boolean
  modesty?: boolean
}) {
  return (
    <group>
      <mesh position={[0, h, 0]} castShadow receiveShadow material={top}>
        <boxGeometry args={[w, 0.05, d]} />
      </mesh>
      {[
        [-w / 2 + 0.05, -d / 2 + 0.05],
        [w / 2 - 0.05, -d / 2 + 0.05],
        [-w / 2 + 0.05, d / 2 - 0.05],
        [w / 2 - 0.05, d / 2 - 0.05],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, h / 2, z]} castShadow material={legs}>
          <boxGeometry args={[0.035, h, 0.035]} />
        </mesh>
      ))}
      {modesty && (
        <mesh position={[0, h - 0.18, -d / 2 + 0.06]} material={legs}>
          <boxGeometry args={[w - 0.16, 0.22, 0.02]} />
        </mesh>
      )}
      {drawers && (
        <group position={[w / 2 - 0.16, h / 2 - 0.05, 0]}>
          <mesh material={legs} castShadow><boxGeometry args={[0.28, h - 0.12, d - 0.08]} /></mesh>
          {[0.14, -0.02, -0.18].map((y) => (
            <mesh key={y} position={[0, y + 0.1, d / 2 - 0.055]} material={MATS.metalLight}>
              <boxGeometry args={[0.2, 0.01, 0.01]} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
})

export const OfficeChair = memo(function OfficeChair({ color = MATS.fabricDark, scale = 1 }: { color?: THREE.Material; scale?: number }) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.45, 0]} castShadow material={color}><boxGeometry args={[0.36, 0.07, 0.36]} /></mesh>
      <mesh position={[0, 0.72, -0.16]} castShadow material={color}><boxGeometry args={[0.36, 0.44, 0.06]} /></mesh>
      <mesh position={[0, 0.62, 0.02]} material={MATS.metal}><boxGeometry args={[0.05, 0.24, 0.05]} /></mesh>
      <mesh position={[0, 0.3, 0]} material={MATS.metal}><cylinderGeometry args={[0.03, 0.03, 0.28, 8]} /></mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[Math.cos((i / 5) * Math.PI * 2) * 0.14, 0.16, Math.sin((i / 5) * Math.PI * 2) * 0.14]} rotation={[0, -(i / 5) * Math.PI * 2, 0]} material={MATS.metal}>
          <boxGeometry args={[0.24, 0.02, 0.035]} />
        </mesh>
      ))}
      {[-0.2, 0.2].map((x) => (
        <mesh key={x} position={[x, 0.58, 0]} material={MATS.dark}><boxGeometry args={[0.04, 0.03, 0.3]} /></mesh>
      ))}
    </group>
  )
})

export const Monitor = memo(function Monitor({
  w = 0.4,
  h = 0.25,
  screen = MATS.screenGlow,
  content = true,
}: {
  w?: number
  h?: number
  screen?: THREE.Material
  content?: boolean
}) {
  return (
    <group>
      <mesh position={[0, 0.09, 0]} material={MATS.metal}><boxGeometry args={[0.16, 0.02, 0.12]} /></mesh>
      <mesh position={[0, 0.17, -0.02]} material={MATS.metal}><boxGeometry args={[0.03, 0.2, 0.03]} /></mesh>
      <mesh position={[0, 0.33, 0]} castShadow material={MATS.dark}><boxGeometry args={[w, h, 0.025]} /></mesh>
      <mesh position={[0, 0.33, 0.014]} material={screen}><planeGeometry args={[w - 0.03, h - 0.03]} /></mesh>
      {content && (
        <group position={[0, 0.33, 0.016]}>
          <mesh position={[-w / 2 + 0.08, h / 2 - 0.05, 0]} material={std('#e2e8f0', 0.6, 0, '#e2e8f0', 0.5)}><planeGeometry args={[0.1, 0.02]} /></mesh>
          <mesh position={[0, 0.03, 0]} material={std('#ffffff', 0.6, 0, '#ffffff', 0.35)}><planeGeometry args={[w - 0.1, 0.015]} /></mesh>
          <mesh position={[0, 0.0, 0]} material={std('#ffffff', 0.6, 0, '#ffffff', 0.25)}><planeGeometry args={[w - 0.16, 0.012]} /></mesh>
          <mesh position={[0, -0.03, 0]} material={std('#ffffff', 0.6, 0, '#ffffff', 0.2)}><planeGeometry args={[w - 0.13, 0.01]} /></mesh>
        </group>
      )}
    </group>
  )
})

export const DualMonitor = memo(function DualMonitor({ scale = 1, screen = MATS.screenGlow }: { scale?: number; screen?: THREE.Material }) {
  return (
    <group scale={scale}>
      <group position={[-0.19, 0, 0]} rotation={[0, 0.18, 0]}><Monitor w={0.34} h={0.22} screen={screen} /></group>
      <group position={[0.19, 0, 0]} rotation={[0, -0.18, 0]}><Monitor w={0.34} h={0.22} screen={screen} /></group>
    </group>
  )
})

export const Keyboard = memo(function Keyboard() {
  return (
    <group>
      <mesh position={[0, 0.755, 0.16]} material={MATS.dark}><boxGeometry args={[0.28, 0.012, 0.09]} /></mesh>
      <mesh position={[0.24, 0.755, 0.16]} material={MATS.dark}><boxGeometry args={[0.06, 0.012, 0.09]} /></mesh>
    </group>
  )
})

export const Cabinet = memo(function Cabinet({
  w = 0.45,
  h = 1.1,
  d = 0.32,
  color = MATS.woodDark,
  shelves = 3,
}: {
  w?: number
  h?: number
  d?: number
  color?: THREE.Material
  shelves?: number
}) {
  return (
    <group>
      <mesh position={[0, h / 2, 0]} castShadow material={color}><boxGeometry args={[w, h, d]} /></mesh>
      {Array.from({ length: shelves }).map((_, i) => (
        <mesh key={i} position={[0, (h / (shelves + 1)) * (i + 1), d / 2 + 0.002]} material={MATS.metalLight}>
          <boxGeometry args={[w * 0.72, 0.012, 0.008]} />
        </mesh>
      ))}
    </group>
  )
})

export const Bookshelf = memo(function Bookshelf({ w = 0.8, h = 1.5, d = 0.28 }: { w?: number; h?: number; d?: number }) {
  const colors = ['#b45309', '#1d4ed8', '#b91c1c', '#166534', '#7c3aed', '#0f766e']
  return (
    <group>
      <mesh position={[0, h / 2, -d / 2]} material={MATS.woodDark}><boxGeometry args={[w, h, 0.03]} /></mesh>
      {[-w / 2, w / 2].map((x) => (
        <mesh key={x} position={[x, h / 2, 0]} material={MATS.woodDark}><boxGeometry args={[0.03, h, d]} /></mesh>
      ))}
      {[0.05, 0.42, 0.78, 1.14].map((y) => (
        <mesh key={y} position={[0, y, 0]} material={MATS.wood}><boxGeometry args={[w, 0.03, d]} /></mesh>
      ))}
      {[0.2, 0.2, 0.2].map((_, row) =>
        Array.from({ length: 5 }).map((_, i) => (
          <mesh key={`${row}-${i}`} position={[-w / 2 + 0.1 + i * 0.14, 0.58 + row * 0.36, 0.02]} castShadow material={std(colors[(row + i) % colors.length], 0.85, 0)}>
            <boxGeometry args={[0.09, 0.22, 0.16]} />
          </mesh>
        )),
      )}
    </group>
  )
})

export const Plant = memo(function Plant({ x = 0, z = 0, scale = 1, tall = false }: { x?: number; z?: number; scale?: number; tall?: boolean }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 0.13, 0]} castShadow material={MATS.concreteDark}><cylinderGeometry args={[0.11, 0.085, 0.26, 12]} /></mesh>
      <mesh position={[0, 0.34, 0]} material={MATS.woodDark}><cylinderGeometry args={[0.02, 0.025, tall ? 0.5 : 0.18, 6]} /></mesh>
      <mesh position={[0, tall ? 0.66 : 0.48, 0]} castShadow material={MATS.leaf}><sphereGeometry args={[tall ? 0.22 : 0.2, 10, 9]} /></mesh>
      <mesh position={[0.13, tall ? 0.74 : 0.58, 0.05]} castShadow material={MATS.leafLight}><sphereGeometry args={[0.13, 8, 8]} /></mesh>
      <mesh position={[-0.12, tall ? 0.58 : 0.44, 0.08]} castShadow material={MATS.leaf}><sphereGeometry args={[0.1, 8, 8]} /></mesh>
    </group>
  )
})

export const Sofa = memo(function Sofa({ w = 0.85, color = MATS.fabric, cushions = 3 }: { w?: number; color?: THREE.Material; cushions?: number }) {
  const cw = (w - 0.2) / cushions
  return (
    <group>
      <mesh position={[0, 0.26, 0]} castShadow receiveShadow material={color}><boxGeometry args={[w, 0.24, 0.45]} /></mesh>
      <mesh position={[0, 0.5, -0.2]} castShadow material={color}><boxGeometry args={[w, 0.4, 0.09]} /></mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (w / 2 - 0.045), 0.4, 0]} castShadow material={color}><boxGeometry args={[0.09, 0.32, 0.45]} /></mesh>
      ))}
      {Array.from({ length: cushions }).map((_, i) => (
        <mesh key={i} position={[-w / 2 + 0.1 + cw / 2 + i * cw, 0.4, 0.03]} castShadow material={color}><boxGeometry args={[cw - 0.03, 0.07, 0.36]} /></mesh>
      ))}
      {[-w / 2 + 0.12, w / 2 - 0.12].map((x, i) => (
        <mesh key={i} position={[x, 0.5, -0.1]} rotation={[0.15, 0, 0]} material={MATS.fabricLight}><boxGeometry args={[0.18, 0.18, 0.06]} /></mesh>
      ))}
    </group>
  )
})

export const CoffeeTable = memo(function CoffeeTable({ w = 0.6, d = 0.35, h = 0.34 }: { w?: number; d?: number; h?: number }) {
  return (
    <group>
      <mesh position={[0, h, 0]} castShadow material={MATS.glass}><boxGeometry args={[w, 0.03, d]} /></mesh>
      <mesh position={[0, h - 0.12, 0]} material={MATS.metal}><boxGeometry args={[w - 0.1, 0.02, d - 0.08]} /></mesh>
      {[[-w / 2 + 0.04, -d / 2 + 0.04], [w / 2 - 0.04, -d / 2 + 0.04], [-w / 2 + 0.04, d / 2 - 0.04], [w / 2 - 0.04, d / 2 - 0.04]].map(([x, z], i) => (
        <mesh key={i} position={[x, h / 2, z]} material={MATS.metal}><cylinderGeometry args={[0.012, 0.012, h, 6]} /></mesh>
      ))}
    </group>
  )
})

export const Rug = memo(function Rug({ w = 1.4, d = 0.9, color = MATS.rug }: { w?: number; d?: number; color?: THREE.Material }) {
  return <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={color}><planeGeometry args={[w, d]} /></mesh>
})

export const FloorLamp = memo(function FloorLamp({ x = 0, z = 0 }: { x?: number; z?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.02, 0]} material={MATS.metal}><cylinderGeometry args={[0.11, 0.11, 0.04, 12]} /></mesh>
      <mesh position={[0, 0.75, 0]} material={MATS.metal}><cylinderGeometry args={[0.015, 0.015, 1.5, 6]} /></mesh>
      <mesh position={[0, 1.5, 0]} castShadow material={std('#f8e9c8', 0.5, 0.1, '#ffe9b8', 0.7)}><cylinderGeometry args={[0.11, 0.17, 0.22, 14]} /></mesh>
    </group>
  )
})

export const WallScreen = memo(function WallScreen({ w = 1.2, h = 0.65, screen = MATS.screenGlow }: { w?: number; h?: number; screen?: THREE.Material }) {
  return (
    <group>
      <mesh position={[0, 1.55, 0]} material={MATS.dark}><boxGeometry args={[w + 0.04, h + 0.04, 0.04]} /></mesh>
      <mesh position={[0, 1.55, 0.025]} material={screen}><planeGeometry args={[w, h]} /></mesh>
      <mesh position={[-w / 2 + 0.12, 1.55 + h / 2 - 0.08, 0.03]} material={MATS.white}><planeGeometry args={[0.12, 0.02]} /></mesh>
    </group>
  )
})

export const Whiteboard = memo(function Whiteboard({ w = 1.3, h = 0.75 }: { w?: number; h?: number }) {
  const notes = ['#fde047', '#fca5a5', '#93c5fd', '#86efac', '#f9a8d4']
  return (
    <group>
      <mesh position={[0, 1.25, 0]} castShadow material={MATS.white}><boxGeometry args={[w, h, 0.03]} /></mesh>
      <mesh position={[0, 1.25, -0.016]} material={MATS.metalLight}><boxGeometry args={[w + 0.04, h + 0.04, 0.02]} /></mesh>
      {notes.map((c, i) => (
        <mesh key={c} position={[-w / 2 + 0.18 + (i % 3) * 0.36, 1.42 - Math.floor(i / 3) * 0.24, 0.02]} material={std(c, 0.9, 0)}>
          <boxGeometry args={[0.15, 0.13, 0.006]} />
        </mesh>
      ))}
      <mesh position={[0, 0.84, 0.05]} material={MATS.metal}><boxGeometry args={[w * 0.9, 0.02, 0.05]} /></mesh>
    </group>
  )
})

export const Person = memo(function Person({ color = '#334155', x = 0, z = 0 }: { color?: string; x?: number; z?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.15, 0]} castShadow material={MATS.dark}><cylinderGeometry args={[0.09, 0.075, 0.3, 8]} /></mesh>
      <mesh position={[0, 0.47, 0]} castShadow material={std(color, 0.85, 0)}><cylinderGeometry args={[0.11, 0.09, 0.42, 8]} /></mesh>
      <mesh position={[0, 0.78, 0]} castShadow material={std('#c9a07a', 0.9, 0)}><sphereGeometry args={[0.1, 10, 10]} /></mesh>
    </group>
  )
})

export const Printer = memo(function Printer({ x = 0, z = 0 }: { x?: number; z?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.25, 0]} castShadow material={MATS.white}><boxGeometry args={[0.4, 0.34, 0.36]} /></mesh>
      <mesh position={[0, 0.44, 0]} material={MATS.dark}><boxGeometry args={[0.34, 0.03, 0.28]} /></mesh>
      <mesh position={[0, 0.3, 0.185]} material={MATS.metalLight}><boxGeometry args={[0.24, 0.02, 0.02]} /></mesh>
    </group>
  )
})

export const WaterCooler = memo(function WaterCooler({ x = 0, z = 0 }: { x?: number; z?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.4, 0]} castShadow material={MATS.white}><boxGeometry args={[0.3, 0.8, 0.3]} /></mesh>
      <mesh position={[0, 0.95, 0]} castShadow material={std('#bfe3f5', 0.2, 0.1)}><cylinderGeometry args={[0.13, 0.13, 0.35, 14]} /></mesh>
      <mesh position={[0, 0.55, 0.16]} material={MATS.metalLight}><boxGeometry args={[0.08, 0.06, 0.02]} /></mesh>
    </group>
  )
})

export const WallClock = memo(function WallClock({ x = 0, y = 1.9, z = 0 }: { x?: number; y?: number; z?: number }) {
  return (
    <group position={[x, y, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={MATS.metalLight}><cylinderGeometry args={[0.12, 0.12, 0.03, 20]} /></mesh>
      <mesh position={[0, 0, 0.02]} material={MATS.white}><circleGeometry args={[0.1, 20]} /></mesh>
    </group>
  )
})

export const BoxStack = memo(function BoxStack({ x = 0, z = 0 }: { x?: number; z?: number }) {
  return (
    <group position={[x, 0, z]}>
      {[[0, 0.16, 0, 0.36, 0.32, 0.3, '#b4885a'], [0.06, 0.47, 0.03, 0.28, 0.3, 0.26, '#c99a63'], [-0.04, 0.75, -0.02, 0.24, 0.26, 0.22, '#a97a4a']].map((b, i) => (
        <mesh key={i} position={[b[0] as number, b[1] as number, b[2] as number]} castShadow material={std(b[6] as string, 0.9, 0)}>
          <boxGeometry args={[b[3] as number, b[4] as number, b[5] as number]} />
        </mesh>
      ))}
    </group>
  )
})
