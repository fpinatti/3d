import useGlobal from '@/hooks/store/useGlobal'
import usePlayer from '@/hooks/store/usePlayer'
import { useFrame } from '@react-three/fiber'
import {
  CuboidCollider,
  interactionGroups,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier'
import { useRef, useState } from 'react'

interface RescueGuyProps {
  position: [number, number, number]
}

const RescueGuy = ({ position = [0, 0, 0] }: RescueGuyProps) => {
  const [isAlive, setIsAlive] = useState(true)
  return (
    <RigidBody
      mass={1}
      restitution={0}
      colliders={false}
      //   ref={playerRB}
      enabledRotations={[false, false, false]}
      type="fixed"
      onIntersectionEnter={(collider) => {
        if (collider.colliderObject?.name === 'laser') {
          // destroy player
          setIsAlive(false)
        }
        if (collider.colliderObject?.name === 'player') {
          // goto next level
          console.log('goto next level')
        }
      }}
    >
      <group position={position}>
        <mesh receiveShadow>
          <boxGeometry args={[1, 1.3, 1]} />
          <meshStandardMaterial
            color={0x1200cc}
            transparent
            opacity={isAlive ? 1 : 0}
          />
        </mesh>
        {isAlive && <CuboidCollider args={[0.5, 0.6, 0.5]} sensor />}
      </group>
    </RigidBody>
  )
}

export default RescueGuy
