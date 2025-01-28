import usePlayer from '@/hooks/store/usePlayer'
import {
  BallCollider,
  CuboidCollider,
  interactionGroups,
  RigidBody,
} from '@react-three/rapier'
import { useEffect } from 'react'

interface BombProps {
  position: [number, number, number]
  isExploded: boolean
  id: number
}

const Bomb = ({ position = [0, 0, 0], isExploded, id }: BombProps) => {
  const { explodeBomb } = usePlayer()

  useEffect(() => {
    setTimeout(() => {
      explodeBomb(id, true)
    }, 3000)
  }, [])

  const color = isExploded ? 0x3f00aa : 0xf1ff00

  return (
    <RigidBody
      mass={1}
      restitution={0}
      colliders={false}
      enabledRotations={[false, false, false]}
      type="dynamic"
      collisionGroups={interactionGroups(5, [0, 1])}
    >
      {/* <PerspectiveCamera makeDefault position={[0, 2, 15]} /> */}
      <group position={position}>
        <mesh receiveShadow>
          <sphereGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <CuboidCollider args={[0.5, 0.75, 0.5]} />
        {isExploded && (
          <BallCollider
            args={[2]}
            sensor
            scale={1}
            onIntersectionEnter={({ other }) => {
              const colliderData = other.rigidBodyObject?.userData
              if (colliderData && colliderData.type === 'explodable') {
                colliderData.onBombHit()
              }
            }}
          />
        )}
      </group>
    </RigidBody>
  )
}

export default Bomb
