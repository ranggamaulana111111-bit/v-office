'use client'
import { memo } from 'react'
import * as THREE from 'three'
import { MATS, std } from './materials'
import { Desk, OfficeChair, DualMonitor, Monitor, Keyboard, Cabinet, Plant, Sofa, CoffeeTable, Rug, Whiteboard, WallScreen, Printer, BoxStack, Bookshelf } from './common'

export const WorkspaceCluster = memo(function WorkspaceCluster({ accent, seats = 2, color = MATS.fabricDark }: { accent: string; seats?: number; color?: THREE.Material }) {
  return (
    <group>
      <Rug w={1.8} d={1.1} color={std('#c3cedb', 0.98, 0)} />
      {Array.from({ length: seats }).map((_, i) => {
        const x = seats === 1 ? 0 : -0.45 + i * 0.9
        return (
          <group key={i} position={[x, 0, 0]}>
            <Desk w={0.8} d={0.48} drawers />
            <group position={[0.02, 0.72, -0.12]}><DualMonitor scale={0.72} screen={i === 0 ? MATS.screenGlow : MATS.screenGreen} /></group>
            <Keyboard />
            <group position={[0, 0, 0.42]} rotation={[0, Math.PI, 0]}><OfficeChair color={color} /></group>
            <mesh position={[0, 0.45, -0.36]} material={std(accent, 0.5, 0.1, accent, 0.15)}><boxGeometry args={[0.78, 0.55, 0.03]} /></mesh>
          </group>
        )
      })}
      <group position={[-1.0, 0, -0.55]}><Cabinet w={0.4} h={1.1} /></group>
      <group position={[1.05, 0, 0.55]}><Plant scale={0.85} /></group>
    </group>
  )
})

export function ConferenceTable({ seats = 8, w = 1.15 }: { seats?: number; w?: number }) {
  const positions = [
    [-0.3, -0.45], [0.3, -0.45],
    [-0.45, 0], [0.45, 0],
    [-0.3, 0.45], [0.3, 0.45],
    [0, -0.45], [0, 0.45],
  ].slice(0, seats)
  return (
    <group>
      <mesh position={[0, 0.72, 0]} castShadow material={MATS.wood}><boxGeometry args={[w, 0.055, 0.6]} /></mesh>
      <mesh position={[0, 0.7, 0]} material={std('#9a6f47', 0.6, 0.05)}><boxGeometry args={[w - 0.12, 0.03, 0.52]} /></mesh>
      {[-w / 2 + 0.12, w / 2 - 0.12].map((x) => (
        <mesh key={x} position={[x, 0.36, 0]} material={MATS.metal}><boxGeometry args={[0.05, 0.7, 0.4]} /></mesh>
      ))}
      <mesh position={[0, 0.78, 0]} material={MATS.dark}><boxGeometry args={[0.24, 0.02, 0.12]} /></mesh>
      {positions.map(([x, z], i) => (
        <group key={i} position={[x * 1.1, 0, z]} rotation={[0, z > 0 ? Math.PI : 0, 0]}>
          <OfficeChair scale={0.9} />
        </group>
      ))}
      <mesh position={[0, 0.78, 0.12]} material={MATS.white}><boxGeometry args={[0.16, 0.01, 0.22]} /></mesh>
    </group>
  )
}

export const MeetingRoom = memo(function MeetingRoom() {
  return (
    <group>
      <group position={[0, 0, 0.12]}><ConferenceTable /></group>
      <group position={[0, 0, -0.95]}><WallScreen w={1.2} h={0.65} /></group>
      <group position={[0, 2.55, -0.9]}>
        <mesh material={MATS.dark}><boxGeometry args={[0.18, 0.06, 0.06]} /></mesh>
        <mesh position={[0, -0.02, 0.04]} material={MATS.screenGlow}><sphereGeometry args={[0.03, 8, 8]} /></mesh>
      </group>
      <group position={[1.05, 0, -1.0]}><Whiteboard w={0.9} h={0.6} /></group>
    </group>
  )
})

export const PlanningRoom = memo(function PlanningRoom() {
  return (
    <group>
      <group position={[0, 0, 0.15]}><ConferenceTable seats={6} w={1.3} /></group>
      <group position={[0, 0, -0.9]}>
        <mesh position={[0, 1.35, 0]} material={MATS.white}><boxGeometry args={[1.9, 0.9, 0.03]} /></mesh>
        {['#fde047', '#93c5fd', '#86efac', '#f9a8d4', '#c4b5fd', '#fdba74'].map((c, i) => (
          <mesh key={c} position={[-0.7 + (i % 3) * 0.45, 1.55 - Math.floor(i / 3) * 0.28, 0.02]} material={std(c, 0.9, 0)}>
            <boxGeometry args={[0.2, 0.16, 0.006]} />
          </mesh>
        ))}
      </group>
      <group position={[-1.0, 0, 0.5]}><Plant scale={0.8} /></group>
    </group>
  )
})

export const BillingRoom = memo(function BillingRoom({ accent }: { accent: string }) {
  return (
    <group>
      <group position={[-0.45, 0, 0.1]}>
        <Desk w={0.85} d={0.48} drawers />
        <group position={[0, 0.72, -0.1]}><DualMonitor scale={0.75} screen={MATS.screenGreen} /></group>
        <Keyboard />
        <group position={[0, 0, 0.42]} rotation={[0, Math.PI, 0]}><OfficeChair /></group>
      </group>
      <group position={[0.6, 0, 0.2]} rotation={[0, -0.4, 0]}>
        <Desk w={0.7} d={0.45} />
        <Monitor w={0.32} h={0.2} screen={MATS.screenAmber} />
        <Keyboard />
      </group>
      <group position={[0.95, 0, -0.85]}><Cabinet w={0.45} h={1.3} /></group>
      <group position={[0.55, 0, -0.15]}><Printer x={0.15} z={0} /></group>
      <group position={[-1.05, 0, -0.75]}><Bookshelf w={0.6} h={1.3} /></group>
      <group position={[-1.05, 0, 0.55]}><Plant scale={0.75} /></group>
      <group position={[0.2, 1.62, -0.95]}>
        <mesh material={MATS.dark}><boxGeometry args={[1.0, 0.42, 0.04]} /></mesh>
        <mesh position={[0, 0, 0.025]} material={std(accent, 0.4, 0.1, accent, 0.5)}><planeGeometry args={[0.94, 0.36]} /></mesh>
      </group>
    </group>
  )
})

export const ShowroomRoom = memo(function ShowroomRoom({ accent }: { accent: string }) {
  return (
    <group>
      {[-0.75, 0.15, 0.95].map((x, i) => (
        <group key={x} position={[x, 0, -0.9]} rotation={[0, i === 1 ? 0 : i === 0 ? 0.25 : -0.25, 0]}>
          <mesh position={[0, 0.6, 0]} material={MATS.metal}><boxGeometry args={[0.04, 1.2, 0.04]} /></mesh>
          <mesh position={[0, 1.35, 0]} material={MATS.dark}><boxGeometry args={[0.5, 0.36, 0.03]} /></mesh>
          <mesh position={[0, 1.35, 0.02]} material={i === 1 ? MATS.screenGreen : MATS.screenGlow}><planeGeometry args={[0.45, 0.3]} /></mesh>
          <mesh position={[0, 0.05, 0]} material={MATS.dark}><cylinderGeometry args={[0.18, 0.22, 0.06, 16]} /></mesh>
        </group>
      ))}
      <group position={[0, 0, 0.15]}><Sofa w={0.9} color={MATS.fabricLight} /></group>
      <group position={[0, 0, 0.42]}><CoffeeTable w={0.55} d={0.32} /></group>
      <group position={[1.1, 0, 0.45]}><Plant /></group>
      <group position={[-1.05, 0, 0.55]}><Plant scale={0.8} /></group>
      <group position={[0, 1.8, -1.05]}><Signage2 accent={accent} /></group>
    </group>
  )
})

function Signage2({ accent }: { accent: string }) {
  return (
    <group>
      <mesh material={std(accent, 0.5, 0.1, accent, 0.2)}><boxGeometry args={[1.1, 0.24, 0.02]} /></mesh>
      <mesh position={[0, 0, 0.015]} material={std('#ffffff', 0.5, 0)}><boxGeometry args={[0.9, 0.05, 0.005]} /></mesh>
    </group>
  )
}

export const TaskRoom = memo(function TaskRoom() {
  return (
    <group>
      {[-0.6, 0, 0.6].map((x, i) => (
        <group key={x} position={[x, 0, -0.9]}>
          <mesh position={[0, 1.45, 0]} material={MATS.white}><boxGeometry args={[0.52, 0.95, 0.03]} /></mesh>
          <mesh position={[0, 1.96, 0.018]} material={std(['#f472b6', '#38bdf8', '#34d399'][i], 0.8, 0)}><boxGeometry args={[0.46, 0.06, 0.006]} /></mesh>
          {[0.1, -0.12, -0.34].map((dy, j) => (
            <mesh key={dy} position={[0, 1.68 + dy, 0.02]} material={std(['#fde68a', '#bfdbfe', '#bbf7d0'][j], 0.9, 0)}><boxGeometry args={[0.4, 0.12, 0.006]} /></mesh>
          ))}
        </group>
      ))}
      <group position={[0, 0, 0.35]}><ConferenceTable seats={4} w={0.8} /></group>
      <group position={[-1.05, 0, 0.5]}><Plant scale={0.75} /></group>
    </group>
  )
})

export const ArchiveRoom = memo(function ArchiveRoom() {
  return (
    <group>
      {[-1.0, -0.5, 0, 0.5].map((x) => (
        <group key={x} position={[x, 0, -0.95]}><Bookshelf w={0.42} h={1.5} /></group>
      ))}
      <group position={[-0.6, 0, 0.2]}><BoxStack x={0} z={0} /></group>
      <group position={[0.5, 0, 0.35]}>
        <Desk w={0.75} d={0.45} />
        <Monitor w={0.3} h={0.19} screen={MATS.screenGreen} />
        <Keyboard />
        <group position={[0, 0, 0.4]} rotation={[0, Math.PI, 0]}><OfficeChair /></group>
      </group>
      <group position={[1.05, 0, -0.15]}><Cabinet w={0.4} h={1.2} /></group>
    </group>
  )
})

export const SettingRoom = memo(function SettingRoom() {
  return (
    <group>
      <group position={[-0.5, 0, 0.05]}>
        <Desk w={0.8} d={0.48} />
        <Monitor w={0.34} h={0.22} screen={MATS.screenGlow} />
        <Keyboard />
        <group position={[0, 0, 0.4]} rotation={[0, Math.PI, 0]}><OfficeChair /></group>
      </group>
      <group position={[0.7, 0, -0.9]}><Cabinet w={0.45} h={1.4} /></group>
      <group position={[0.75, 0, 0.3]}><ServerRackIf /></group>
      <group position={[-1.05, 0, 0.6]}><Plant scale={0.75} /></group>
    </group>
  )
})

function ServerRackIf() {
  return (
    <group>
      <mesh position={[0, 0.8, 0]} castShadow material={MATS.graphite}><boxGeometry args={[0.42, 1.6, 0.48]} /></mesh>
      {[0.35, 0.55, 0.75, 0.95, 1.15, 1.35].map((y) => (
        <mesh key={y} position={[0, y, 0.245]} material={MATS.screenGlow}><boxGeometry args={[0.3, 0.03, 0.01]} /></mesh>
      ))}
    </group>
  )
}
