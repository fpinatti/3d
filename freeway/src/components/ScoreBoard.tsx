import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Triplet, useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Text } from '@react-three/drei'
// import CarModel from '../assets/carModel'

const ScoreBoard = ({ score, position = [0, 0, 0] }) => {
  const ref = useRef()
  useFrame((_) => {
    // 	var left = 0.2;
    const pcX = 0.5
    const pcY = 0.3
    // ref.current.position.set(-1 + 2 * pcX, 1 - 2 * pcY, 1).unproject( camera );
    // _.camera.fov += 0.1
    // console.log(_.camera)
    // var top = 0.1;
    // var depth = 0.7; // from -1 to 1, depends how far into the scene you want the object, -1 being very close, 1 being the furthest away the camera can see
    // ref.current.position.set(-1 + 2 * pcX, 1 - 2 * pcY, 0.7).unproject(_.camera)
    // console.log(ref.current.position)
  })

  //   useEffect(() => {
  //     console.log(position[2])
  //   }, [position])
  return (
    <>
      <group position={[position[0], position[1] + 3, position[2] - 5]}>
        <Text fontSize={0.3} position={[0, 0, 0.1]}>
          {score}
        </Text>
        <mesh ref={ref} position={[0, 0, 0]}>
          {/* <CarModel scale={[0.3, 0.3, 0.3]} castShadow receiveShadow /> */}
          <boxGeometry args={[1, 0.4, 0.1]} />
          <meshPhysicalMaterial color={'yellow'} attach={'material'} />
        </mesh>
      </group>
    </>
  )
}

export default ScoreBoard
