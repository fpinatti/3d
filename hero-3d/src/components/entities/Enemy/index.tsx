import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useState } from 'react'

interface EnemyProps {
  position: [number, number, number]
}

const Enemy = ({ position = [0, 0, 0] }: EnemyProps) => {
  const [isAlive, setIsAlive] = useState(true)
  return (
    <RigidBody
      mass={1}
      restitution={0}
      colliders={false}
      enabledRotations={[false, false, false]}
      type="kinematicPosition"
      onCollisionEnter={(collider) => {
        if (collider.colliderObject?.name === 'player') {
          // remove player life
        }
      }}
      onIntersectionEnter={(collider) => {
        if (collider.colliderObject?.name === 'laser') {
          setIsAlive(false)
        }
      }}
    >
      <group position={position}>
        <mesh receiveShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color={0xc1ab33}
            transparent
            opacity={isAlive ? 1 : 0}
          />
        </mesh>
        {isAlive && <CuboidCollider args={[0.25, 0.25, 0.25]} />}
      </group>
    </RigidBody>
  )
}

export default Enemy
