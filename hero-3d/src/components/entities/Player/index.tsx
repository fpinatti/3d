import useGlobal from '@/hooks/store/useGlobal'
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
  const { axisX, axisY, triggerLaser, setPlayerPosition, direction } =
    usePlayer()
  const { setCurrentLevel } = useGlobal()
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

  //   console.log(direction)

  return (
    <RigidBody
      mass={1}
      restitution={0}
      colliders={false}
      ref={playerRB}
      enabledRotations={[false, false, false]}
      type="dynamic"
      //   name="player"
      collisionGroups={interactionGroups(0, [0, 1])}
      onIntersectionEnter={(collider) => {
        const nextLevel = collider.rigidBodyObject?.userData.nextLevel
        if (nextLevel) {
          setCurrentLevel(nextLevel)
        }
      }}
    >
      <group
        position={position}
        rotation={[0, direction === 'right' ? 0 : Math.PI, 0]}
      >
        <mesh receiveShadow>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshStandardMaterial color={0x11ccba} />
        </mesh>
        <mesh position={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.5, 0.3, 1]} />
          <meshStandardMaterial color={0xff00ff} />
        </mesh>
        <mesh position={[1, 0.5, 0]} scale={laserSize}>
          <boxGeometry args={[2, 0.1, 0.1]} />
          <meshStandardMaterial color={0xff0c12} />
        </mesh>
        <mesh position={[-0.6, 0.3, 0]} scale={rocketSize}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color={0x0000c1} />
        </mesh>
        <CuboidCollider args={[0.5, 0.75, 0.5]} name="player" />
        {laserSize && (
          <CuboidCollider
            name="laser"
            args={[0.75, 0.25, 0.25]}
            position={[1, 0.5, 0]}
            scale={laserSize}
            sensor
          />
        )}
      </group>
    </RigidBody>
  )
}

export default Player
