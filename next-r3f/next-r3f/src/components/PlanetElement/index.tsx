// import useGlobal from '@/hooks/store/useGlobal'
import { useAttachToSphere } from '@/hooks/useAttachToSphere'
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { gsap } from 'gsap'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

interface PlanetElementProps extends GroupProps {
  lat: number
  long: number
  radius: number
  src: string
  offset: { x: number; y: number; z: number }
}

const PlanetElement = ({
  src,
  lat,
  long,
  radius,
  offset = { x: 0, y: 0, z: 0 },
  ...props
}: PlanetElementProps) => {
  const model = useGLTF(src)
  const wrapperRef = useRef<THREE.Group>(null)

  useAttachToSphere(wrapperRef, radius, lat, long, offset)

  return (
    <>
      <group {...props} ref={wrapperRef}>
        <primitive object={model.scene} />
      </group>
    </>
  )
}

export default PlanetElement
