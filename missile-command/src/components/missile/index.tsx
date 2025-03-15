import { gsap } from 'gsap'
import { RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier'
import { useRef, useState, useEffect } from 'react'
import { Explosion } from '../explosion'
import { useFrame } from '@react-three/fiber'

interface MissileProps {
  id: number
  position: [number, number, number]
  target: [number, number, number]
  isEnemy: boolean
  onCompleteProjectile: () => void
}

export function Missile({ id, position, target, isEnemy, onCompleteProjectile }: MissileProps) {
  const posRef = useRef(position)
  const [isExploding, setIsExploding] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(position)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const animationRef = useRef(null)
  const animationCompleteRef = useRef(false)

  useEffect(() => {
    // Store the animation timeline in a ref so we can control it
    animationRef.current = gsap.to(posRef.current, {
      0: target[0],
      1: target[1],
      2: target[2],
      duration: 10,
      onUpdate: () => {
        rigidBodyRef.current?.setTranslation(
          { x: posRef.current[0], y: posRef.current[1], z: posRef.current[2] },
          true
        )
      },
      onComplete: () => {
        animationCompleteRef.current = true
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
  const handleCollision = (event) => {
    if (!isExploding) {
      if (event.other.rigidBodyObject?.name === 'city') {
        // Kill the animation
        if (animationRef.current) {
          animationRef.current.kill()
        }
        setIsExploding(true)
      }
    }
  }

  return (
    <>
      {!isExploding && (
        <RigidBody
          ref={rigidBodyRef}
          // position={position} // Initial position
          type="dynamic"
          gravityScale={0}
          sensor
          name="missile"
          userData={{ id: id }}
          // colliders="cuboid"
          onIntersectionEnter={handleCollision}
        >
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, 1.2]} />
            <meshStandardMaterial color={isEnemy ? '#ff4444' : '#44ff44'} />
          </mesh>
        </RigidBody>
      )}
      {isExploding && (
        <Explosion
          explosionComplete={() => {
            onCompleteProjectile()
          }}
          position={posRef.current}
        />
      )}
    </>
  )
}
