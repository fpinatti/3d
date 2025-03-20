'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Mesh } from 'three'
import { RigidBody } from '@react-three/rapier'
import useGameStore from '@/store/useGameStore'
import { Position3D } from '@/types/global'

export interface CityProps {
  id?: number
  position: Position3D
  destroyed?: boolean
}

export function City({ position, id }: CityProps) {
  const meshRef = useRef<Mesh>(null)
  const [isDestroyed, setIsDestroyed] = useState(false)
  const { destroyCity } = useGameStore()

  useEffect(() => {
    if (isDestroyed && meshRef.current) {
      gsap.to(meshRef.current.scale, {
        y: 0.2,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [isDestroyed])

  // Handle collision events
  const handleCollision = (event: any) => {
    if (event?.rigidBodyObject?.name === 'missile') {
      setIsDestroyed(true)
      destroyCity(id!)
      // setCitiesRemaining(citiesRemaining - 1)
    }
  }
  return (
    <RigidBody
      position={position}
      gravityScale={0}
      type="dynamic"
      name="city"
      sensor
      onIntersectionEnter={handleCollision}
    >
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[2, 1.5, 2]} />
        <meshStandardMaterial color={isDestroyed ? '#444444' : '#2196f3'} />
      </mesh>
    </RigidBody>
  )
}
