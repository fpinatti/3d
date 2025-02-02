import useGlobal from '@/hooks/store/useGlobal'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useState } from 'react'
import * as THREE from 'three'

interface LampProps {
  position?: [number, number, number]
}

const Lamp = ({ position = [0, 0, 0] }: LampProps) => {
  const { isLamp, setLamp } = useGlobal()

  return (
    <RigidBody type="fixed" name="lamp" colliders={false}>
      <mesh position={position} receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={new THREE.Color(0x33ac33)} transparent />
        <CuboidCollider
          args={[0.5, 0.5, 0.5]}
          sensor
          onIntersectionEnter={({ colliderObject }) => {
            // toggle lamp
            if (colliderObject?.name === 'player') {
              setLamp(!isLamp)
            }
          }}
        />
      </mesh>
    </RigidBody>
  )
}

export default Lamp
