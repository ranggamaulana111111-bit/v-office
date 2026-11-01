'use client'
import { memo } from 'react'
import { MATS, std } from './materials'
import { Desk, OfficeChair, DualMonitor, Monitor, Keyboard, Cabinet, Plant, Sofa, CoffeeTable, Rug, Bookshelf, FloorLamp, BoxStack } from './common'

export const AiStudio = memo(function AiStudio({ accent = '#a855f7' }: { accent?: string }) {
  return (
    <group>
      <Rug w={1.8} d={1.0} color={std('#d8d2e8', 0.98, 0)} />
      <group position={[-0.5, 0, 0.05]}>
        <Desk w={0.8} d={0.48} top={MATS.white} />
        <group position={[0, 0.72, -0.1]}><DualMonitor scale={0.75} screen={std(accent, 0.3, 0.1, accent, 0.9)} /></group>
        <Keyboard />
        <group position={[0, 0, 0.4]} rotation={[0, Math.PI, 0]}><OfficeChair color={MATS.fabricDark} /></group>
      </group>
      <group position={[0.55, 0, 0.28]} rotation={[0, -0.5, 0]}>
        <Desk w={0.65} d={0.42} top={MATS.white} />
        <Monitor w={0.32} h={0.2} screen={std('#38bdf8', 0.3, 0.1, '#38bdf8', 0.9)} />
        <Keyboard />
      </group>
      <group position={[0.1, 1.35, -0.55]}>
        <mesh material={std(accent, 0.2, 0.2, accent, 1.4)}><icosahedronGeometry args={[0.16, 1]} /></mesh>
        <mesh material={std(accent, 0.2, 0.4, accent, 0.6)} rotation={[0.6, 0.3, 0]}><torusGeometry args={[0.26, 0.012, 8, 32]} /></mesh>
        <mesh material={std('#ffffff', 0.3, 0.2, '#ffffff', 0.8)}><sphereGeometry args={[0.03, 8, 8]} /></mesh>
      </group>
      <group position={[0.1, 0.35, -0.55]}>
        <mesh material={MATS.metal}><cylinderGeometry args={[0.03, 0.05, 0.6, 8]} /></mesh>
        <mesh position={[0, -0.34, 0]} material={MATS.metal}><cylinderGeometry args={[0.14, 0.16, 0.03, 12]} /></mesh>
      </group>
      <CameraRig x={0.95} z={-0.65} height={1.15} />
      <Softbox x={-1.0} z={-0.7} />
      <group position={[1.0, 0, 0.55]}><Plant scale={0.8} /></group>
    </group>
  )
})

export const CameraRig = memo(function CameraRig({ x = 0, z = 0, height = 1.1 }: { x?: number; z?: number; height?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height / 2, 0]} material={MATS.metal}><cylinderGeometry args={[0.016, 0.016, height, 6]} /></mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.cos((i / 3) * Math.PI * 2) * 0.1, 0.06, Math.sin((i / 3) * Math.PI * 2) * 0.1]} rotation={[0.5, -(i / 3) * Math.PI * 2, 0]} material={MATS.metal}>
          <boxGeometry args={[0.02, 0.2, 0.02]} />
        </mesh>
      ))}
      <mesh position={[0, height + 0.04, 0]} material={MATS.dark}><boxGeometry args={[0.2, 0.13, 0.16]} /></mesh>
      <mesh position={[0, height + 0.04, 0.1]} rotation={[Math.PI / 2, 0, 0]} material={MATS.metal}>
        <cylinderGeometry args={[0.05, 0.06, 0.1, 12]} />
      </mesh>
      <mesh position={[0, height + 0.16, -0.02]} material={MATS.screenGlow}><boxGeometry args={[0.08, 0.05, 0.01]} /></mesh>
    </group>
  )
})

export const Softbox = memo(function Softbox({ x = 0, z = 0, flip = false }: { x?: number; z?: number; flip?: boolean }) {
  return (
    <group position={[x, 0, z]} rotation={[0, flip ? Math.PI : 0, 0]}>
      <mesh position={[0, 0.85, 0]} material={MATS.metal}><cylinderGeometry args={[0.015, 0.015, 1.7, 6]} /></mesh>
      <mesh position={[0, 0.05, 0]} material={MATS.metal}><cylinderGeometry args={[0.16, 0.18, 0.04, 10]} /></mesh>
      <group position={[0, 1.75, 0.14]} rotation={[0.35, 0, 0]}>
        <mesh material={MATS.dark}><boxGeometry args={[0.55, 0.4, 0.22]} /></mesh>
        <mesh position={[0, 0, 0.12]} material={std('#fffbe8', 0.4, 0.1, '#fff3d0', 0.9)}><planeGeometry args={[0.5, 0.35]} /></mesh>
      </group>
    </group>
  )
})

export const PhotoStudio = memo(function PhotoStudio() {
  return (
    <group>
      <mesh position={[0, 1.0, -0.9]} rotation={[0, 0, 0]} receiveShadow material={std('#f4f5f7', 0.9, 0.02)}>
        <cylinderGeometry args={[0.95, 0.95, 2.0, 24, 1, true, Math.PI * 0.55, Math.PI * 0.9]} />
      </mesh>
      <mesh position={[0, 0.35, -1.0]} rotation={[-Math.PI / 2, 0, 0]} material={std('#eef0f3', 0.95, 0)}><circleGeometry args={[0.65, 24]} /></mesh>
      <Softbox x={-0.8} z={0.25} />
      <Softbox x={0.85} z={0.1} flip />
      <CameraRig x={0} z={0.65} height={1.2} />
      <group position={[0.9, 0, -0.85]}><Plant scale={0.7} /></group>
      <group position={[-0.95, 0, -0.9]}><BoxStack x={0} z={0} /></group>
      <group position={[0.55, 0, 1.05]}>
        <mesh position={[0, 0.45, 0]} material={MATS.metal}><cylinderGeometry args={[0.16, 0.16, 0.05, 12]} /></mesh>
        <mesh position={[0, 0.2, 0]} material={MATS.metal}><cylinderGeometry args={[0.03, 0.03, 0.4, 8]} /></mesh>
      </group>
    </group>
  )
})

export const PersonalOffice = memo(function PersonalOffice({ accent = '#f59e0b' }: { accent?: string }) {
  return (
    <group>
      <Rug w={1.6} d={1.05} color={std('#d9cfc0', 0.98, 0)} />
      <group position={[-0.35, 0, -0.2]}>
        <mesh position={[0, 0.74, 0]} castShadow material={MATS.walnut}><boxGeometry args={[1.15, 0.06, 0.6]} /></mesh>
        <mesh position={[0, 0.5, 0.24]} material={MATS.woodDark}><boxGeometry args={[1.15, 0.44, 0.05]} /></mesh>
        <mesh position={[0, 0.4, 0]} material={std(accent, 0.5, 0.1, accent, 0.12)}><boxGeometry args={[1.0, 0.03, 0.5]} /></mesh>
        {[-0.5, 0.5].map((x) => (
          <mesh key={x} position={[x, 0.37, 0]} material={MATS.metal}><boxGeometry args={[0.05, 0.72, 0.5]} /></mesh>
        ))}
        <group position={[0.22, 0.74, -0.1]}><Monitor w={0.42} h={0.26} /></group>
        <group position={[-0.35, 0.75, 0.08]}><Monitor w={0.3} h={0.2} screen={MATS.screenGreen} /></group>
        <Keyboard />
        <mesh position={[-0.38, 0.77, -0.1]} material={MATS.white}><boxGeometry args={[0.18, 0.02, 0.12]} /></mesh>
        <group position={[0, 0, 0.48]}><ExecutiveChair accent={accent} /></group>
      </group>
      <group position={[0.95, 0, 0.2]} rotation={[0, -0.4, 0]}><Sofa w={0.75} color={MATS.fabricLight} cushions={2} /></group>
      <group position={[0.8, 0, -0.55]}><Bookshelf w={0.7} h={1.4} /></group>
      <group position={[-1.05, 0, -0.6]}><Cabinet w={0.45} h={1.25} /></group>
      <group position={[-1.1, 0, 0.55]}><FloorLamp /></group>
      <group position={[1.1, 0, 0.85]}><Plant scale={0.8} /></group>
      <group position={[0.55, 0, -0.85]}><CoffeeTable w={0.45} d={0.3} h={0.4} /></group>
    </group>
  )
})

export const ExecutiveChair = memo(function ExecutiveChair({ accent }: { accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.48, 0]} castShadow material={MATS.fabricDark}><boxGeometry args={[0.4, 0.08, 0.4]} /></mesh>
      <mesh position={[0, 0.82, -0.17]} castShadow material={MATS.fabricDark}><boxGeometry args={[0.42, 0.62, 0.07]} /></mesh>
      <mesh position={[0, 0.9, -0.13]} material={std(accent, 0.5, 0.1, accent, 0.3)}><boxGeometry args={[0.3, 0.08, 0.03]} /></mesh>
      <mesh position={[0, 0.34, 0]} material={MATS.metal}><cylinderGeometry args={[0.035, 0.035, 0.3, 8]} /></mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[Math.cos((i / 5) * Math.PI * 2) * 0.16, 0.18, Math.sin((i / 5) * Math.PI * 2) * 0.16]} rotation={[0, -(i / 5) * Math.PI * 2, 0]} material={MATS.metal}>
          <boxGeometry args={[0.28, 0.025, 0.04]} />
        </mesh>
      ))}
      {[-0.23, 0.23].map((x) => (
        <mesh key={x} position={[x, 0.62, 0]} material={MATS.dark}><boxGeometry args={[0.05, 0.03, 0.32]} /></mesh>
      ))}
    </group>
  )
})

export const VaultRoom = memo(function VaultRoom({ accent = '#f43f5e' }: { accent?: string }) {
  return (
    <group>
      <mesh position={[0, 0.03, 0]} receiveShadow material={std('#8b95a3', 0.95, 0)}><boxGeometry args={[2.1, 0.06, 1.35]} /></mesh>
      <group position={[0, 0, -0.98]}>
        <mesh position={[0, 1.05, 0]} castShadow material={std('#5f6b79', 0.55, 0.55)}><cylinderGeometry args={[0.72, 0.72, 0.26, 28]} /></mesh>
        <mesh position={[0, 1.05, 0.15]} material={std('#7e8a98', 0.4, 0.7)}><cylinderGeometry args={[0.52, 0.52, 0.06, 28]} /></mesh>
        <mesh position={[0, 1.05, 0.2]} material={MATS.metal}><torusGeometry args={[0.36, 0.025, 8, 28]} /></mesh>
        <InstancesSpokes />
        <mesh position={[0, 1.05, 0.24]} material={MATS.dark}><cylinderGeometry args={[0.1, 0.1, 0.05, 16]} /></mesh>
        <mesh position={[0.42, 1.05, 0.18]} material={std(accent, 0.4, 0.2, accent, 0.7)}><boxGeometry args={[0.12, 0.18, 0.03]} /></mesh>
        <mesh position={[-0.42, 1.05, 0.18]} material={MATS.screenGreen}><boxGeometry args={[0.1, 0.06, 0.02]} /></mesh>
      </group>
      <group position={[0.05, 0, 0.4]}>
        <Desk w={0.9} d={0.45} top={MATS.graphite} />
        <Monitor w={0.34} h={0.22} screen={std(accent, 0.3, 0.1, accent, 0.7)} />
        <Keyboard />
        <group position={[0, 0, 0.4]} rotation={[0, Math.PI, 0]}><OfficeChair color={MATS.fabricDark} /></group>
      </group>
      <group position={[0.95, 0, 0.55]}><Plant scale={0.7} /></group>
    </group>
  )
})

function InstancesSpokes() {
  return (
    <group position={[0, 1.05, 0.21]}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={i} rotation={[0, 0, (i / 8) * Math.PI * 2]} material={MATS.metal}>
          <boxGeometry args={[0.018, 0.62, 0.02]} />
        </mesh>
      ))}
    </group>
  )
}
