import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { EnemyProps } from '..'
import gsap from 'gsap'

const EnemyBat = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onPlayerCollide,
  onLaserCollide,
  isAlive,
}: EnemyProps) => {
  const enemyPos = useRef({ y: 0 })
  const ref = useRef<RapierRigidBody>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    tweenRef.current = gsap.to(enemyPos?.current, {
      y: 0.75,
      duration: 1.5,
      repeat: -1,
      ease: 'linear',
      yoyo: true,
      onUpdate: () => {
        ref.current?.setNextKinematicTranslation({
          x: 0,
          y: enemyPos.current.y,
          z: 0,
        })
        ref.current?.nextTranslation()
      },
    })
    // unmount
    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill()
      }
    }
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
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={0xc1ab33}
              transparent
              //   opacity={isAlive ? 1 : 0}
            />
          </mesh>
          {/* {isAlive && <CuboidCollider args={[0.25, 0.25, 0.25]} />} */}
        </group>
      </RigidBody>
    </>
  )
}

export default EnemyBat
