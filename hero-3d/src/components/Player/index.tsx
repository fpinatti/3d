import usePlayer from '@/hooks/store/usePlayer'
import { useFrame } from '@react-three/fiber'
import {
  CuboidCollider,
  interactionGroups,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier'
import { useRef } from 'react'

interface PlayerProps {
  position: [number, number, number]
}

const Player = ({ position = [0, 0, 0] }: PlayerProps) => {
  const { axisX, axisY, triggerLaser, setPlayerPosition } = usePlayer()
  const playerRB = useRef<RapierRigidBody>(null)

  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 }
    impulse.x = axisX * 0.1
    impulse.y = axisY * 0.1
    playerRB.current?.applyImpulse(impulse, true)
    const playerTranslation = playerRB.current?.translation()
    setPlayerPosition([
      position[0] + (playerTranslation?.x ?? 0),
      position[1] - (playerTranslation?.y ?? 0),
      position[2] - (playerTranslation?.z ?? 0),
    ])
  })

  const laserSize = triggerLaser ? 1 : 0
  const rocketSize = axisY ? 1 : 0

  return (
    <RigidBody
      mass={1}
      restitution={0}
      colliders={false}
      ref={playerRB}
      enabledRotations={[false, false, false]}
      type="dynamic"
      collisionGroups={interactionGroups(0, [0, 1])}
    >
      <group position={position}>
        <mesh receiveShadow>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshStandardMaterial color={0x11ccba} />
        </mesh>
        <mesh position={[1, 0.5, 0]} scale={laserSize}>
          <boxGeometry args={[2, 0.1, 0.1]} />
          <meshStandardMaterial color={0xff0c12} />
        </mesh>
        <mesh position={[-0.6, 0.3, 0]} scale={rocketSize}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color={0x0000c1} />
        </mesh>
        <CuboidCollider args={[0.5, 0.75, 0.5]} />
      </group>
    </RigidBody>
  )
}

export default Player
