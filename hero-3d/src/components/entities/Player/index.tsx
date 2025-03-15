import useGlobal from '@/hooks/store/useGlobal'
import usePlayer from '@/hooks/store/usePlayer'
import { useFrame } from '@react-three/fiber'
import {
  CuboidCollider,
  interactionGroups,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { Group } from 'three'
import SmokeParticles from './smokeParticles'

interface PlayerProps {
  position?: [number, number, number]
}

const Player = ({ position = [0, 0, 0] }: PlayerProps) => {
  const {
    axisX,
    axisY,
    triggerLaser,
    setPlayerPosition,
    setSnapshotPlayerPosition,
    direction,
  } = usePlayer()
  const { setCurrentLevel, isLamp } = useGlobal()
  const playerRB = useRef<RapierRigidBody>(null)
  const ref = useRef<Group>(null)

  useEffect(() => {
    ref.current?.layers?.set(1)
  }, [ref.current])

  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 }
    impulse.x = axisX * 0.3
    impulse.y = axisY * 0.1
    playerRB.current?.applyImpulse(impulse, true)
    const playerTranslation = playerRB.current?.translation()
    setPlayerPosition([
      playerTranslation?.x ?? 0,
      playerTranslation?.y ?? 0,
      playerTranslation?.z ?? 0,
    ])
  })

  if (axisX === 0) {
    const currentVelocity = playerRB.current?.linvel()
    playerRB.current?.setLinvel(
      { x: 0, y: currentVelocity?.y || 0, z: currentVelocity?.z || 0 },
      true,
    )
  }

  const laserSize = triggerLaser ? 1 : 0
  const rocketSize = axisY ? 1 : 0

  return (
    <RigidBody
      position={position}
      colliders={false}
      ref={playerRB}
      enabledRotations={[false, false, false]}
      type="dynamic"
      collisionGroups={interactionGroups(0, [0, 1])}
      onIntersectionEnter={(collider) => {
        const nextLevel = collider.rigidBodyObject?.userData.nextLevel
        if (nextLevel) {
          const playerTranslation = playerRB.current?.translation()
          const newScreenPlayerY = playerTranslation?.y > 0 ? -5 : 5
          setSnapshotPlayerPosition([
            playerTranslation?.x ?? 0,
            newScreenPlayerY,
            playerTranslation?.z ?? 0,
          ])
          setCurrentLevel(nextLevel)
        }
      }}
    >
      <group
        ref={ref}
        // position={position}
        rotation={[0, direction === 'right' ? 0 : Math.PI, 0]}
      >
        <pointLight position={[0, 0, 1]} intensity={isLamp ? 0 : 3.5} />
        {/* head */}
        <mesh receiveShadow position={[0, 0.6, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={0xffaacc} />
        </mesh>
        {/* torso */}
        <mesh receiveShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.5]} />
          <meshStandardMaterial color={0x11f01b} />
        </mesh>
        {/* legs */}
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color={0xf0f011} />
        </mesh>
        {/* laser */}
        <mesh position={[1, 0.5, 0]} scale={laserSize}>
          <boxGeometry args={[2, 0.1, 0.1]} />
          <meshStandardMaterial color={0xff0c12} />
        </mesh>
        {/* jetpack */}
        <mesh position={[-0.4, 0.3, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={0x00a1cc} />
        </mesh>
        {/* rocket  */}
        <mesh position={[-0.6, 0.3, 0]} scale={rocketSize}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color={0x0000c1} />
        </mesh>
        <SmokeParticles />
        <CuboidCollider
          args={[0.3, 0.75, 0.3]}
          name="player"
          mass={1}
          friction={0}
        />
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
