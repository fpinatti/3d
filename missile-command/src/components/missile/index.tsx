import { gsap } from 'gsap'
import { RigidBody, RapierRigidBody, CuboidCollider } from '@react-three/rapier'
import { useRef, useState, useEffect } from 'react'
import { Explosion } from '../explosion'
import { Trail } from '@react-three/drei'
import { Vector3 } from 'three'
import { useModelLoader } from '@/store/useModelLoader'
import { Model } from '../utils/model'

export interface MissileProps {
  id: number
  position: [number, number, number]
  target: [number, number, number]
  isEnemy: boolean
  onCompleteProjectile: () => void
}

export function Missile({ id, position, target, isEnemy, onCompleteProjectile }: MissileProps) {
  const posRef = useRef(position)
  const [isExploding, setIsExploding] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const animationRef = useRef(null)
  const animationCompleteRef = useRef(false)
  const meshRef = useRef(null)

  useEffect(() => {
    // Store the animation timeline in a ref so we can control it
    animationRef.current = gsap.to(posRef.current, {
      0: target[0],
      1: target[1],
      2: target[2],
      duration: 10,
      onStart: () => {
        setIsAnimating(true)
      },
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
          position={posRef.current}
          type="dynamic"
          gravityScale={0}
          sensor
          name="missile"
          userData={{ id: id }}
          onIntersectionEnter={handleCollision}
        >
          {/* meteor */}

          {/* Simple missile model with rotation */}
          <group ref={meshRef}>
            {/* <Model path="/assets/meteor.glb" position={[-2, -0.2, -2]}></Model> */}
            <Model path="/assets/meteor.glb" position={[0, 0, 0]} scale={0.45} center />
            {/* <CuboidCollider args={[0.3, 0.3, 0.3]} /> */}
            {/* <mesh castShadow position={[0, 0, 0]}>
              <sphereGeometry args={[0.2, 10, 10]} />
              <meshStandardMaterial color={isEnemy ? '#ff4444' : '#44ff44'} />
            </mesh> */}
          </group>

          {/* Trail effect */}
          {/* <Trail
            decay={0.95}
            width={isAnimating ? 3 : 0}
            length={10}
            color={isEnemy ? '#ff4444' : '#44ff44'}
            attenuation={(width) => width}
            target={meshRef}
          /> */}
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
