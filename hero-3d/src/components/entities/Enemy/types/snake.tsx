import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { EnemyProps } from '..'

const EnemySnake = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onPlayerCollide,
  onLaserCollide,
  isAlive,
}: EnemyProps) => {
  const enemyPos = useRef({ x: -0.6 })
  const ref = useRef<RapierRigidBody>(null)

  useEffect(() => {
    gsap.to(enemyPos?.current, {
      x: 0.9,
      duration: 2,
      repeat: -1,
      ease: 'linear',
      yoyo: true,
      onUpdate: () => {
        ref.current?.setNextKinematicTranslation({
          x: enemyPos.current.x,
          y: 0,
          z: 0,
        })
        ref.current?.nextTranslation()
      },
    })
  }, [])

  return (
    <>
      <RigidBody
        ref={ref}
        colliders={false}
        enabledRotations={[false, false, false]}
        type="kinematicPosition"
        onCollisionEnter={(payload) =>
          onPlayerCollide && onPlayerCollide(payload)
        }
        onIntersectionEnter={(payload) =>
          onLaserCollide && onLaserCollide(payload)
        }
      >
        <group position={position}>
          <mesh receiveShadow>
            <boxGeometry args={[1.3, 0.5, 0.5]} />
            <meshStandardMaterial
              color={0x00ff00}
              transparent
              opacity={isAlive ? 1 : 0}
            />
            {isAlive && <CuboidCollider args={[0.6, 0.25, 0.25]} />}
          </mesh>
        </group>
      </RigidBody>
      <group position={position}>
        <mesh receiveShadow rotation={[0, 0, Math.PI * 0.5]}>
          <cylinderGeometry args={[0.5, 0.5, 0.6]} />
          <meshStandardMaterial color={0x000000} />
        </mesh>
      </group>
    </>
  )
}

export default EnemySnake
