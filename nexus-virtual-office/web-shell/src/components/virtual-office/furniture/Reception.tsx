'use client'
import { memo } from 'react'
import { MATS, std } from './materials'
import { OfficeChair, Monitor, Plant, Sofa, CoffeeTable, Rug, WaterCooler, WallClock, FloorLamp } from './common'
import { Signage } from '../Architecture'

export const ReceptionDesk = memo(function ReceptionDesk({ accent }: { accent: string }) {
  return (
    <group>
      {/* curved counter body */}
      <mesh position={[0, 0.47, 0]} rotation={[0, Math.PI, 0]} castShadow material={std('#e9eef4', 0.62, 0.04)}>
        <cylinderGeometry args={[0.78, 0.78, 0.94, 28, 1, true, 0, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.47, 0]} rotation={[0, Math.PI, 0]} material={std('#dbe3ec', 0.6, 0.04)}>
        <cylinderGeometry args={[0.66, 0.66, 0.9, 28, 1, true, 0, Math.PI]} />
      </mesh>
      {/* counter top */}
      <mesh position={[0, 0.96, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow material={MATS.woodLight}>
        <ringGeometry args={[0.62, 0.84, 28, 1, 0, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.945, 0]} rotation={[-Math.PI / 2, 0, 0]} material={std(accent, 0.5, 0.1)}>
        <ringGeometry args={[0.8, 0.84, 28, 1, 0, Math.PI]} />
      </mesh>
      {/* front accent band */}
      <mesh position={[0, 0.62, 0.79]} rotation={[0, Math.PI, 0]} material={std(accent, 0.5, 0.1, accent, 0.2)}>
        <cylinderGeometry args={[0.785, 0.785, 0.06, 28, 1, true, Math.PI * 0.25, Math.PI * 0.5]} />
      </mesh>
      <group position={[0, 0.96, 0.18]}><Monitor w={0.34} h={0.2} /></group>
      <group position={[0.5, 0.96, 0.1]}><Monitor w={0.26} h={0.17} /></group>
      <mesh position={[-0.48, 0.99, 0.05]} material={MATS.dark}><boxGeometry args={[0.18, 0.02, 0.12]} /></mesh>
      <mesh position={[-0.48, 1.02, 0.05]} material={MATS.metalLight}><cylinderGeometry args={[0.035, 0.03, 0.06, 10]} /></mesh>
      <group position={[0, 1.3, 0]}><Signage text="NEXUS" sub="RECEPTION" color="#0f172a" /></group>
      <group position={[0, 0, 0.48]} rotation={[0, Math.PI, 0]}><OfficeChair color={MATS.fabricDark} /></group>
    </group>
  )
})

export const ReceptionFurniture = memo(function ReceptionFurniture({ accent }: { accent: string }) {
  return (
    <group>
      <Rug w={1.7} d={1.0} color={std('#cbd5e1', 0.98, 0)} />
      <group position={[-0.55, 0, 0.05]}><ReceptionDesk accent={accent} /></group>
      <group position={[0.62, 0, -0.42]}>
        <Sofa w={0.85} color={MATS.fabricLight} cushions={3} />
      </group>
      <group position={[0.62, 0, 0.05]}><CoffeeTable w={0.5} d={0.3} /></group>
      <group position={[-0.55, 0, 0.85]}><Plant scale={0.9} /></group>
      <group position={[1.05, 0, 0.55]}><Plant tall /></group>
      <group position={[1.08, 0, -0.45]}><FloorLamp /></group>
      <group position={[-1.05, 0, 0.6]}><WaterCooler /></group>
      <group position={[-1.0, 1.9, -1.0]}><WallClock x={0} y={0} z={0} /></group>
      <mesh position={[0.6, 1.85, -1.02]} material={MATS.woodDark}><boxGeometry args={[1.3, 0.5, 0.05]} /></mesh>
      <group position={[0.6, 1.55, -0.99]}><Signage text="WELCOME TO NEXUS" sub="VIRTUAL HEADQUARTERS" color="#ffffff" /></group>
    </group>
  )
})
