'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BallCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { Explosion } from '../explosion'

export interface DefenseProps {
  id: number
  position: [number, number, number]
  target: [number, number, number]
  onCompleteProjectile: () => void
  onCollideWithEnemy: (missileId: number) => void
}

const size = 1
export function Defense({
  position,
  target,
  onCompleteProjectile,
  onCollideWithEnemy,
}: DefenseProps) {
  const posRef = useRef(position)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const animationRef = useRef(null)
  const [isExploding, setIsExploding] = useState(false)

  const processedMissilesRef = useRef(new Set<number>())

  useEffect(() => {
    animationRef.current = gsap.to(posRef.current, {
      0: target[0],
      1: target[1],
      2: target[2],
      duration: 1,
      ease: 'none',
      onUpdate: () => {
        rigidBodyRef.current?.setTranslation(
          { x: posRef.current[0], y: posRef.current[1], z: posRef.current[2] },
          true
        )
      },
      onComplete: () => {
        setIsExploding(true)
      },
    })

    return () => {
      // Clean up animation on unmount
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [])

  // Handle collision events
  const handleCollision = (event: any) => {
    // console.log('collision defense with missile')
    // const otherColliderObject = event.colliderObject
    // if (otherColliderObject && otherColliderObject.name === 'missile') {
    //   console.log('cooliision')
    //   // onCollision?.('missile');
    // }
  }

  // const debounced = (missileId) => {
  //   console.log('missileId', missileId)
  //   onCollideWithEnemy(missileId)
  // }

  const handleCollision2 = (event: any) => {
    // const otherColliderObject = event.colliderObject
    if (event?.colliderObject?.name === 'missile') {
      const missileId = event.rigidBodyObject.userData.id

      // Check if we've already processed this missile
      if (!processedMissilesRef.current.has(missileId)) {
        // Add to set FIRST to prevent multiple calls
        processedMissilesRef.current.add(missileId)
        // Then call the handler
        onCollideWithEnemy(missileId)
      }
    }
  }

  // console.log('defense')

  return (
    <>
      {!isExploding && (
        <RigidBody
          ref={rigidBodyRef}
          position={posRef.current}
          type="dynamic"
          gravityScale={0}
          sensor
          onIntersectionEnter={handleCollision}
          name="defense"
        >
          <mesh castShadow>
            <cylinderGeometry args={[size, size, size]} />
            <meshStandardMaterial color="#44ff44" />
          </mesh>
        </RigidBody>
      )}

      {isExploding && (
        <RigidBody type="dynamic" gravityScale={0} name="defense">
          <Explosion
            explosionComplete={() => {
              onCompleteProjectile()
            }}
            position={posRef.current}
          />
          <BallCollider
            position={posRef.current}
            args={[2, 2, 2]}
            sensor
            onIntersectionEnter={handleCollision2}
          />
        </RigidBody>
      )}
    </>
  )
}
