'use client'
import { memo, useMemo } from 'react'
import * as THREE from 'three'
import { Instances, Instance } from '@react-three/drei'
import { MATS, std } from './materials'
import { Desk, OfficeChair, DualMonitor, Keyboard, Plant, WallScreen } from './common'

export const ServerRack = memo(function ServerRack({
  x = 0,
  z = 0,
  units = 18,
  color = MATS.screenGreen,
}: {
  x?: number
  z?: number
  units?: number
  color?: THREE.Material
}) {
  const uHeight = 0.072
  const bodyH = units * uHeight + 0.12
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, bodyH / 2, 0]} castShadow material={MATS.graphite}><boxGeometry args={[0.5, bodyH, 0.55]} /></mesh>
      <mesh position={[0, bodyH / 2, 0.28]} material={MATS.dark}><boxGeometry args={[0.44, bodyH - 0.1, 0.015]} /></mesh>
      <mesh position={[0, bodyH / 2, 0.292]} material={MATS.glass}><boxGeometry args={[0.42, bodyH - 0.14, 0.01]} /></mesh>
      <Instances limit={units} range={units}>
        <boxGeometry args={[0.4, 0.045, 0.02]} />
        <meshStandardMaterial color="#111a26" roughness={0.6} metalness={0.4} />
        {Array.from({ length: units }).map((_, i) => (
          <Instance key={i} position={[0, 0.11 + i * uHeight + 0.022, 0.3]} />
        ))}
      </Instances>
      <Instances limit={units * 2} range={units * 2}>
        <boxGeometry args={[0.012, 0.012, 0.01]} />
        <meshStandardMaterial color={color === MATS.screenGreen ? '#22c55e' : '#38bdf8'} emissive={color === MATS.screenGreen ? '#22c55e' : '#38bdf8'} emissiveIntensity={1.4} roughness={0.4} />
        {Array.from({ length: units }).flatMap((_, i) => [
          <Instance key={`a${i}`} position={[-0.14, 0.11 + i * uHeight + 0.03, 0.31]} />,
          <Instance key={`b${i}`} position={[-0.1, 0.11 + i * uHeight + 0.03, 0.31]} />,
        ])}
      </Instances>
      <mesh position={[0, bodyH - 0.035, 0.3]} material={MATS.screenGlow}><boxGeometry args={[0.2, 0.03, 0.01]} /></mesh>
      <mesh position={[0, 0.03, 0]} material={MATS.metal}><boxGeometry args={[0.52, 0.06, 0.57]} /></mesh>
    </group>
  )
})

export const OLTRack = memo(function OLTRack({ x = 0, z = 0 }: { x?: number; z?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.95, 0]} castShadow material={std('#243040', 0.5, 0.4)}><boxGeometry args={[0.58, 1.9, 0.5]} /></mesh>
      <mesh position={[0, 0.95, 0.255]} material={MATS.dark}><boxGeometry args={[0.52, 1.8, 0.015]} /></mesh>
      {[0.35, 0.55, 0.75, 0.95, 1.15, 1.35, 1.55].map((y, i) => (
        <group key={y}>
          <mesh position={[0, y, 0.266]} material={i === 4 ? MATS.screenAmber : MATS.screenGreen}><boxGeometry args={[0.42, 0.08, 0.01]} /></mesh>
          <mesh position={[-0.16, y, 0.274]} material={MATS.screenGlow}><boxGeometry args={[0.04, 0.04, 0.005]} /></mesh>
        </group>
      ))}
      <Instances limit={16} range={16}>
        <boxGeometry args={[0.018, 0.018, 0.01]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.5} />
        {Array.from({ length: 16 }).map((_, i) => (
          <Instance key={i} position={[-0.24 + (i % 8) * 0.035, 0.3, 0.266]} />
        ))}
      </Instances>
      <mesh position={[0, 1.9, 0]} material={MATS.metal}><boxGeometry args={[0.6, 0.03, 0.52]} /></mesh>
    </group>
  )
})

export const ODFRack = memo(function ODFRack({ x = 0, z = 0 }: { x?: number; z?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.9, 0]} castShadow material={std('#dfe6ee', 0.55, 0.1)}><boxGeometry args={[0.5, 1.8, 0.4]} /></mesh>
      {[0.5, 0.72, 0.94, 1.16, 1.38, 1.6].map((y, r) => (
        <group key={y}>
          <mesh position={[0, y, 0.205]} material={MATS.dark}><boxGeometry args={[0.44, 0.14, 0.01]} /></mesh>
          <Instances limit={12} range={12}>
            <cylinderGeometry args={[0.012, 0.012, 0.02, 6]} />
            <meshStandardMaterial color={r === 2 ? '#f59e0b' : '#38bdf8'} emissive={r === 2 ? '#f59e0b' : '#38bdf8'} emissiveIntensity={0.9} roughness={0.4} />
            {Array.from({ length: 12 }).map((_, i) => (
              <Instance key={i} position={[-0.19 + i * 0.034, y, 0.215]} rotation={[Math.PI / 2, 0, 0]} />
            ))}
          </Instances>
        </group>
      ))}
    </group>
  )
})

export const FiberRuns = memo(function FiberRuns({ from = [-0.6, 0.9, -0.1], to = [0.5, 1.2, -0.15] }: { from?: [number, number, number]; to?: [number, number, number] }) {
  const curves = useMemo(() => {
    const colors = ['#22d3ee', '#38bdf8', '#a78bfa', '#34d399', '#f472b6']
    return colors.map((c, i) => {
      const a = new THREE.Vector3(...from)
      const b = new THREE.Vector3(...to)
      b.y += i * 0.05
      const mid = a.clone().lerp(b, 0.5)
      mid.y += 0.35 + i * 0.03
      mid.z += 0.18
      const curve = new THREE.CatmullRomCurve3([a, mid, b])
      return { geo: new THREE.TubeGeometry(curve, 24, 0.008, 5, false), color: c }
    })
  }, [from, to])
  return (
    <group>
      {curves.map((c) => (
        <mesh key={c.color} geometry={c.geo}>
          <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
})

export const NocOperator = memo(function NocOperator({ x = 0, z = 0 }: { x?: number; z?: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.76, 0]} castShadow material={MATS.woodLight}><boxGeometry args={[1.35, 0.05, 0.55]} /></mesh>
      <mesh position={[-0.6, 0.38, 0]} material={MATS.metal}><boxGeometry args={[0.04, 0.75, 0.5]} /></mesh>
      <mesh position={[0.6, 0.38, 0]} material={MATS.metal}><boxGeometry args={[0.04, 0.75, 0.5]} /></mesh>
      <mesh position={[0, 0.38, -0.24]} material={MATS.metal}><boxGeometry args={[1.2, 0.75, 0.03]} /></mesh>
      {[-0.4, 0, 0.4].map((dx) => (
        <group key={dx} position={[dx, 0.79, -0.08]}>
          <DualMonitor scale={0.9} screen={dx === 0.4 ? MATS.screenAmber : MATS.screenGlow} />
          <Keyboard />
        </group>
      ))}
      {[-0.4, 0, 0.4].map((dx) => (
        <group key={`c${dx}`} position={[dx, 0, 0.42]} rotation={[0, Math.PI, 0]}><OfficeChair /></group>
      ))}
    </group>
  )
})

export const VideoWall = memo(function VideoWall({ w = 2.1, h = 0.95 }: { w?: number; h?: number }) {
  return (
    <group>
      <mesh position={[0, 1.55, 0]} material={MATS.dark}><boxGeometry args={[w + 0.08, h + 0.08, 0.05]} /></mesh>
      {[-1, 0, 1].flatMap((cx) =>
        [-1, 1].map((cy) => (
          <mesh key={`${cx}-${cy}`} position={[cx * (w / 3.2), 1.55 + cy * (h / 4.2), 0.03]} material={cy > 0 ? MATS.screenGlow : MATS.screenGreen}>
            <planeGeometry args={[w / 3.2 - 0.02, h / 2.2 - 0.02]} />
          </mesh>
        )),
      )}
      <mesh position={[0, 0.9, 0.12]} material={MATS.metal}><boxGeometry args={[w * 0.9, 0.04, 0.18]} /></mesh>
    </group>
  )
})

export const NocRoom = memo(function NocRoom() {
  return (
    <group>
      <group position={[0, 0, -1.0]}><VideoWall /></group>
      <group position={[-0.35, 0, 0.1]}><NocOperator /></group>
      <group position={[0.85, 0, 0.25]}><ServerRack units={14} /></group>
      <group position={[1.05, 0, 0.8]}><Plant scale={0.8} /></group>
    </group>
  )
})

export const FtthRoom = memo(function FtthRoom() {
  return (
    <group>
      <group position={[-0.85, 0, -0.95]}><OLTRack /></group>
      <group position={[-0.05, 0, -0.95]}><ODFRack /></group>
      <group position={[0.85, 0, -0.95]}><ServerRack units={16} color={MATS.screenGlow} /></group>
      <group position={[-0.4, 0, -0.55]}><FiberRuns from={[-0.05, 1.5, -0.65]} to={[0.85, 1.2, -0.6]} /></group>
      <group position={[0.35, 0, 0.28]} rotation={[0, -0.3, 0]}>
        <Desk w={0.95} d={0.5} />
        <DualMonitor scale={0.85} />
        <Keyboard />
        <group position={[0, 0, 0.4]} rotation={[0, Math.PI, 0]}><OfficeChair /></group>
      </group>
      <group position={[-1.05, 0, 0.3]}><Plant scale={0.8} /></group>
    </group>
  )
})

export const MonitoringRoom = memo(function MonitoringRoom() {
  return (
    <group>
      <group position={[0, 0, -0.95]}><VideoWall w={1.8} h={0.85} /></group>
      <group position={[-0.55, 0, 0.1]} rotation={[0, 0.05, 0]}>
        <Desk w={0.95} d={0.45} />
        <DualMonitor scale={0.8} screen={MATS.screenGreen} />
        <Keyboard />
        <group position={[0, 0, 0.38]} rotation={[0, Math.PI, 0]}><OfficeChair /></group>
      </group>
      <group position={[0.55, 0, 0.1]} rotation={[0, -0.05, 0]}>
        <Desk w={0.95} d={0.45} />
        <DualMonitor scale={0.8} screen={MATS.screenGreen} />
        <Keyboard />
        <group position={[0, 0, 0.38]} rotation={[0, Math.PI, 0]}><OfficeChair /></group>
      </group>
    </group>
  )
})

export const OpsRoom = memo(function OpsRoom({ color = MATS.screenGlow }: { color?: THREE.Material }) {
  return (
    <group>
      <group position={[0, 0, -0.95]}><WallScreen w={1.3} h={0.6} screen={color} /></group>
      <group position={[-0.4, 0, 0.05]} rotation={[0, 0.15, 0]}>
        <Desk w={0.85} d={0.45} />
        <DualMonitor scale={0.75} screen={color} />
        <Keyboard />
        <group position={[0, 0, 0.38]} rotation={[0, Math.PI, 0]}><OfficeChair /></group>
      </group>
      <group position={[0.55, 0, 0.2]}>
        <ServerRack units={12} color={color} />
      </group>
      <group position={[1.0, 0, 0.75]}><Plant scale={0.7} /></group>
    </group>
  )
})
