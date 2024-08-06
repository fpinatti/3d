import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Triplet, useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { Clone } from '@react-three/drei'
// import CarModel from '../assets/carModel'

const Scenery = ({ model, position, rotation, scale = 1 }) => {
  return (
    <>
      <mesh receiveShadow castShadow>
        <Clone
          object={model.scene}
          //   rotation={[0, Math.PI * 0.5 * startDirection, 0]}
          position={position}
          rotation={rotation}
          scale={scale}
        />
      </mesh>
    </>
  )
}

export default Scenery
