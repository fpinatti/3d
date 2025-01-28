import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useState } from 'react'
import * as THREE from 'three'

interface PlatformProps {
  position?: [number, number, number]
  size?: [number, number, number]
  color?: THREE.Color
  type?: 'explodable' | 'hard'
}

const Platform = ({
  position = [0, 0, 0],
  size = [1, 1, 1],
  color = new THREE.Color(0xaaccff),
  type = 'hard',
}: PlatformProps) => {
  const [isBombHit, setIsBombHit] = useState(false)
  const onBombHit = () => {
    console.log('bomb hit')
    setIsBombHit(true)
  }

  return (
    <RigidBody
      type="fixed"
      name="platform"
      userData={{ type: type, onBombHit: onBombHit }}
      colliders={false}
    >
      <mesh position={position} receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          opacity={isBombHit ? 0 : 1}
          transparent
        />
        {!isBombHit && (
          <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
        )}
      </mesh>
    </RigidBody>
  )
}

export default Platform
