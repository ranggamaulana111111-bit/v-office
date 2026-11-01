'use client'
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export type CameraTarget = {
  position: [number, number, number]
  lookAt: [number, number, number]
}

export type ViewCommandType = 'zoomIn' | 'zoomOut' | 'rotateLeft' | 'rotateRight' | 'reset'
export type ViewCommand = { id: number; type: ViewCommandType }

type Controls = { target: THREE.Vector3; update: () => void }

const MIN = 5.5
const MAX = 46

export function CameraController({ target, command }: { target: CameraTarget; command: ViewCommand | null }) {
  const controls = useRef<Controls | null>(null)
  const { camera } = useThree()
  const desiredPos = useRef(new THREE.Vector3(...target.position))
  const desiredLook = useRef(new THREE.Vector3(...target.lookAt))

  useEffect(() => {
    desiredPos.current.set(...target.position)
    desiredLook.current.set(...target.lookAt)
  }, [target])

  useEffect(() => {
    if (!command) return
    const look = controls.current?.target.clone() ?? desiredLook.current.clone()
    if (command.type === 'reset') {
      desiredPos.current.set(...target.position)
      desiredLook.current.set(...target.lookAt)
      return
    }
    const offset = camera.position.clone().sub(look)
    if (command.type === 'zoomIn') offset.multiplyScalar(0.8)
    if (command.type === 'zoomOut') offset.multiplyScalar(1.25)
    if (command.type === 'rotateLeft') offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.32)
    if (command.type === 'rotateRight') offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -0.32)
    const dist = THREE.MathUtils.clamp(offset.length(), MIN, MAX)
    offset.setLength(dist)
    desiredLook.current.copy(look)
    desiredPos.current.copy(look).add(offset)
  }, [command, camera, target])

  useFrame(() => {
    camera.position.lerp(desiredPos.current, 0.09)
    if (controls.current) {
      controls.current.target.lerp(desiredLook.current, 0.09)
      controls.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controls as never}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minPolarAngle={Math.PI / 7}
      maxPolarAngle={Math.PI / 2.25}
      minDistance={MIN}
      maxDistance={MAX}
      makeDefault
    />
  )
}
