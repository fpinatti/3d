import { gsap } from 'gsap'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useRef, useState, useEffect } from 'react'
import { Explosion } from '../explosion'
import { Trail } from '@react-three/drei'
import { Vector3 } from 'three'

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

  // Calculate initial rotation to face target
  const initialDirection = new Vector3(
    target[0] - position[0],
    target[1] - position[1],
    target[2] - position[2]
  ).normalize()

  // Calculate rotation angle (in radians) around Y axis
  const angleY = Math.atan2(initialDirection.x, initialDirection.z)
  // Calculate rotation angle around X axis (pitch)
  const angleX = Math.atan2(
    initialDirection.y,
    Math.sqrt(initialDirection.x * initialDirection.x + initialDirection.z * initialDirection.z)
  )

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
          {/* Simple missile model with rotation */}
          <group ref={meshRef} rotation={[angleX, angleY, 0]}>
            {/* Missile body */}
            <mesh castShadow>
              <cylinderGeometry args={[0.15, 0.15, 1.2]} />
              <meshStandardMaterial color={isEnemy ? '#ff4444' : '#44ff44'} />
            </mesh>

            {/* Missile nose cone */}
            <mesh position={[0, 0.7, 0]} castShadow>
              <coneGeometry args={[0.15, 0.4, 8]} />
              <meshStandardMaterial color={isEnemy ? '#ff0000' : '#00ff00'} />
            </mesh>

            {/* Fins (4 of them) */}
            <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 0.3, 0.4]} />
              <meshStandardMaterial color={isEnemy ? '#cc3333' : '#33cc33'} />
            </mesh>

            <mesh position={[0, -0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
              <boxGeometry args={[0.05, 0.3, 0.4]} />
              <meshStandardMaterial color={isEnemy ? '#cc3333' : '#33cc33'} />
            </mesh>
          </group>

          {/* Trail effect */}
          <Trail
            decay={0.95}
            width={isAnimating ? 3 : 0}
            length={10}
            color={isEnemy ? '#ff4444' : '#44ff44'}
            attenuation={(width) => width}
            target={meshRef}
          />
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
