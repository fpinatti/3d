'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ExplosionProps {
  position: [number, number, number]
  explosionComplete: () => void
}

export function Explosion({ position, explosionComplete }: ExplosionProps) {
  const groupRef = useRef<import('three').Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      // Initial scale
      groupRef.current.scale.set(0.1, 0.1, 0.1)

      // Explosion animation
      gsap.to(groupRef.current.scale, {
        x: 6,
        y: 6,
        z: 6,
        duration: 3.5,
        ease: 'power2.out',
      })

      // Fade out
      gsap.to((groupRef.current.children[0] as import('three').Mesh).material, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          explosionComplete()
        },
      })
    }
  }, [])

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#ff8844" transparent={true} opacity={1} />
      </mesh>
    </group>
  )
}
