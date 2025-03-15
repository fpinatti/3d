import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points } from '@react-three/drei'
import SmokeMaterial from './shaders/smokeMaterial'

const SmokeParticles = () => {
  const pointsRef = useRef<any>()

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const particlePositions = new Float32Array(1000 * 3) // Adjust the number of particles
  for (let i = 0; i < particlePositions.length; i++) {
    particlePositions[i] = (Math.random() - 0.5) * 10 // Adjust the spread of particles
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={particlePositions}
          count={1000}
          itemSize={3}
        />
      </bufferGeometry>
      {/* <SmokeMaterial attach="material" uColor="gray" /> */}
    </points>
  )
}

export default SmokeParticles
