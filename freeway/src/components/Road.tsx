// import { OrbitControls } from "@react-three/drei";
import { useBox } from '@react-three/cannon'
import {
  Clone,
  Cylinder,
  MeshReflectorMaterial,
  useAnimations,
  useGLTF,
  useMatcapTexture,
  useTexture,
} from '@react-three/drei'
import { useEffect, useState } from 'react'
import Enemy from './Enemy'
// import { CuboidCollider, CylinderCollider, MeshCollider, RigidBody, vec3 } from '@react-three/rapier'

// const models = [...Array(5)]

const Road = ({ position, color }) => {
  const blockSize = [20, 0.2, 2]
  const [ref, api] = useBox(() => ({
    args: [blockSize[0], blockSize[1], blockSize[2]],
    type: 'Kinematic',
    mass: 0,
    position: [position[0] * blockSize[0], position[1], position[2] * blockSize[2]],
    material: { friction: 1, restitution: 0.2 },
    isTrigger: false,
  }))

  return (
    <>
      <mesh ref={ref} receiveShadow>
        <boxGeometry args={[blockSize[0], blockSize[1], blockSize[2]]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  )
}

export default Road
