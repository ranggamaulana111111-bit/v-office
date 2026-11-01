'use client'
import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Grid, Html, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { floors, allRooms, floorOf } from './office-config'
import { FloorSlab } from './FloorSlab'
import { CameraController, type CameraTarget, type ViewCommand } from './CameraController'
import { MATS, std } from './furniture/materials'

export function BuildingScene({
  selected,
  onSelect,
  exploded,
  focus,
  command,
  onReady,
}: {
  selected: string | null
  onSelect: (id: string) => void
  exploded: boolean
  focus: string | null
  command: ViewCommand | null
  onReady?: () => void
}) {
  const target = useMemo<CameraTarget>(() => {
    if (selected) {
      const room = allRooms.find((r) => r.id === selected)
      const floor = floorOf(selected)
      if (room && floor) {
        const idx = floors.findIndex((f) => f.id === floor.id)
        const baseY = floor.y + (exploded ? idx * 2.4 : 0)
        return {
          position: [room.pos[0] * 1.15 + 4.6, baseY + 4.1, room.pos[2] + 5.2],
          lookAt: [room.pos[0], baseY + 1.1, room.pos[2]],
        }
      }
    }
    if (focus) {
      const floor = floors.find((f) => f.id === focus)
      if (floor) {
        const idx = floors.findIndex((f) => f.id === floor.id)
        return {
          position: [11, floor.y + (exploded ? idx * 2.4 : 0) + 7.2, 12.5],
          lookAt: [0, floor.y + (exploded ? idx * 2.4 : 0) + 1.0, 0],
        }
      }
    }
    if (exploded) return { position: [21, 17, 23], lookAt: [0, 3.6, 0] }
    return { position: [15.5, 13.5, 16.5], lookAt: [0, 0, 0] }
  }, [selected, exploded, focus])

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.02, powerPreference: 'high-performance' }}
      camera={{ position: [15.5, 13.5, 16.5], fov: 36, near: 0.1, far: 220 }}
      onCreated={({ gl }) => {
        gl.shadowMap.type = THREE.PCFSoftShadowMap
        onReady?.()
      }}
    >
      <color attach="background" args={['#eef2f7']} />
      <fog attach="fog" args={['#eef2f7', 38, 92]} />

      <ambientLight intensity={0.52} />
      <hemisphereLight args={['#ffffff', '#9aa8b8', 0.65]} />
      <directionalLight
        position={[17, 25, 13]}
        intensity={2.05}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={26}
        shadow-camera-bottom={-22}
        shadow-camera-far={70}
        shadow-bias={-0.00035}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-14, 11, -9]} intensity={0.4} color="#c7d2fe" />

      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.32} />
      </Suspense>

      <AdaptiveDpr pixelated />

      {/* plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9.62, 0]} receiveShadow>
        <planeGeometry args={[95, 95]} />
        <meshStandardMaterial color="#e3e9f0" roughness={0.96} />
      </mesh>
      <Grid
        position={[0, -9.58, 0]}
        args={[80, 80]}
        cellSize={1}
        cellThickness={0.4}
        cellColor="#c6d0dc"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#a8b4c4"
        fadeDistance={62}
        fadeStrength={1.6}
        infiniteGrid
      />
      <ContactShadows position={[0, -9.55, 0]} opacity={0.34} scale={46} blur={2.6} far={22} resolution={1024} />

      {/* podium + entrance */}
      <mesh position={[0, -8.35, 0]} receiveShadow castShadow>
        <boxGeometry args={[12.9, 1.4, 6.4]} />
        <meshStandardMaterial color="#dbe3ec" roughness={0.88} />
      </mesh>
      <mesh position={[0, -7.62, 0]} receiveShadow material={std('#cdd7e2', 0.9, 0.02)}>
        <boxGeometry args={[11.9, 0.08, 5.5]} />
      </mesh>
      <mesh position={[0, -7.58, SLAB_FRONT]} receiveShadow material={std('#c2ccd8', 0.9, 0.02)}>
        <boxGeometry args={[4.2, 0.16, 1.4]} />
      </mesh>
      <group position={[0, -7.5, SLAB_FRONT + 0.9]}>
        <mesh position={[0, 0.03, 0]} receiveShadow material={std('#bcc7d3', 0.9, 0.02)}><boxGeometry args={[4.4, 0.1, 1.6]} /></mesh>
        <mesh position={[0, 0.15, 0.8]} receiveShadow material={std('#b2bdcb', 0.9, 0.02)}><boxGeometry args={[4.4, 0.14, 0.35]} /></mesh>
      </group>
      <Html position={[0, -6.55, SLAB_FRONT + 1.4]} center distanceFactor={15}>
        <div style={{ color: '#0f172a', fontWeight: 900, letterSpacing: 6, fontSize: 14, opacity: 0.55 }}>NEXUS</div>
      </Html>
      {[[-4.6, 2.6], [4.6, 2.6], [-4.6, -2.2], [4.6, -2.2]].map(([x, z], i) => (
        <group key={i} position={[x, -7.55, z]}>
          <mesh castShadow material={MATS.concrete}><boxGeometry args={[0.5, 0.35, 0.5]} /></mesh>
          <mesh position={[0, 0.45, 0]} castShadow material={MATS.leaf}><sphereGeometry args={[0.32, 10, 9]} /></mesh>
        </group>
      ))}

      {floors.map((floor, i) => (
        <FloorSlab key={floor.id} floor={floor} index={i} selected={selected} onSelect={onSelect} exploded={exploded} />
      ))}

      <CameraController target={target} command={command} />
    </Canvas>
  )
}

const SLAB_FRONT = 2.6
