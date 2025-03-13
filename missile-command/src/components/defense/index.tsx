'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap' // Add this import

interface DefenseProps {
  position: [number, number, number]
  target: [number, number, number]
  onCompleteProjectile?: () => void
}

const size = 1
export function Defense({ position, target, onCompleteProjectile }: DefenseProps) {
  const posRef = useRef(position)
  const [currentPosition, setCurrentPosition] = useState(position)
  useEffect(() => {
    gsap.to(posRef.current, {
      0: target[0],
      1: target[1],
      2: target[2],
      duration: 2,
      // ease: 'none',
      // onComplete: () => {
      //   // Create explosion when missile reaches target
      //   setExplosions((prev) => [
      //     ...prev,
      //     {
      //       id: Date.now(),
      //       position: [...defense.position] as Position3D,
      //       time: 0,
      //     },
      //   ])

      //   // Remove the defense missile
      //   setDefenses((prev) => prev.filter((d) => d.id !== defense.id))
      // },
      onUpdate: () => {
        setCurrentPosition([posRef.current[0], posRef.current[1], posRef.current[2]])
        // console.log(posRef.current)
        // Force a re-render to update the missile position
        // setDefenses((prev) => [...prev])
      },
      onComplete: () => {
        onCompleteProjectile?.()
        console.log('complete')
      },
    })
  }, [])

  return (
    <mesh position={currentPosition} castShadow>
      <cylinderGeometry args={[size, size, size]} />
      <meshStandardMaterial color="#44ff44" />
    </mesh>
  )
}
