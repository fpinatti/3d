import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useState } from 'react'
import * as THREE from 'three'

interface PlatformProps {
  position?: [number, number, number]
  size?: [number, number, number]
  color?: THREE.Color
  actionData?: any
  type?: 'explodable' | 'hard' | 'portal'
}

const Platform = ({
  position = [0, 0, 0],
  size = [1, 1, 1],
  color = new THREE.Color(0xaaccff),
  type = 'hard',
  actionData = {},
}: PlatformProps) => {
  const [isBombHit, setIsBombHit] = useState(false)
  const onBombHit = () => {
    setIsBombHit(true)
  }

  const particles = 20

  const getParticles = () => {}

  return (
    <>
      {!isBombHit && (
        <>
          <RigidBody
            type="fixed"
            restitution={0}
            name="platform"
            userData={{ type: type, onBombHit: onBombHit, ...actionData }}
            colliders={false}
            sensor={type === 'portal' ? true : false}
          >
            <mesh position={position} receiveShadow>
              <boxGeometry args={size} />
              <meshStandardMaterial color={color} transparent opacity={0.5} />
              <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
            </mesh>
          </RigidBody>
        </>
      )}
    </>
  )
}

export default Platform
