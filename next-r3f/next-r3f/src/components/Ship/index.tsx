import { Box, useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

gsap.registerPlugin(MotionPathPlugin)

const bezierPath = [
  { x: 12, y: 9, z: 15 },
  { x: -13, y: 8.5, z: 14 },
  { x: -13, y: 10, z: -5 },
  { x: 11, y: 8, z: -15 },
  { x: 12, y: 9, z: 15 },
]

const Ship = () => {
  const ref = useRef<THREE.Group>(null)
  const model = useGLTF('assets/models/enemy-ufo-d.glb')

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.position, {
        duration: 7,
        repeat: -1,
        // keyframes: bezierPath,
        ease: 'none',
        motionPath: {
          path: bezierPath,
          type: 'power1.inOut',
          autoRotate: true,
          useRadians: true,
        },
      })
    }
  }, [])

  return (
    <group
      ref={ref}
      position={[bezierPath[0].x, bezierPath[0].y, bezierPath[0].z]}
    >
      <primitive object={model.scene} scale={5} />
      {/* <Box args={[5, 1, 3]} castShadow>
        <meshStandardMaterial color="blue" />
      </Box> */}
    </group>
  )
}

export default Ship
