import useGlobal from '@/hooks/store/useGlobal'
import usePlayer from '@/hooks/store/usePlayer'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'

interface RescueGuyProps {
  position: [number, number, number]
  actionData?: any
}

const RescueGuy = ({ position = [0, 0, 0], actionData }: RescueGuyProps) => {
  const [isAlive, setIsAlive] = useState(true)
  const { setCurrentLevel, setLamp } = useGlobal()
  const { setSnapshotPlayerPosition } = usePlayer()

  return (
    <RigidBody
      mass={1}
      restitution={0}
      colliders={false}
      enabledRotations={[false, false, false]}
      type="fixed"
      onIntersectionEnter={(collider) => {
        if (collider.colliderObject?.name === 'laser') {
          setIsAlive(false)
        }
        if (collider.colliderObject?.name === 'player') {
          // goto next level
          setSnapshotPlayerPosition(null)
          setLamp(true)
          setCurrentLevel(actionData.nextLevel)
        }
      }}
    >
      <group position={position}>
        <mesh receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
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
