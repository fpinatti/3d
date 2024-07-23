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
// import { CuboidCollider, CylinderCollider, MeshCollider, RigidBody, vec3 } from '@react-three/rapier'

// const models = [...Array(5)]

const Road = ({ position }) => {
  const blockSize = [4, 0.2, 2]
  const blockOffset = 0.1

  const [models, setModels] = useState([...Array(5)])
  const [ref, api] = useBox(() => ({
    args: [blockSize[0], blockSize[1], blockSize[2]],
    type: 'Static',
    position: [position[0] * blockSize[0], position[1], position[2] * blockSize[2]],
    material: { friction: 0.00001, restitution: 0.2 },
  }))

  const model = (
    <mesh position={position}>
      <cylinderGeometry args={[0.2, 0.2, 4]} />
      <meshStandardMaterial color={'yellow'} />
    </mesh>
  )

  useEffect(() => {
    const arr = models.map((element) => {
      return (element = [Math.random() * 10 - 5, 0, Math.random() * 10 - 5])
    })
    setModels(arr)
    // console.log(models)
  }, [])

  //   const model = useGLTF('./assets/models/table.glb')

  //   const size = [15, 0.1, 9]
  //   const finalX = size[0] * 0.5
  //   // const finalY = size[1] * 0.5;
  //   const finalZ = size[2] * 0.5
  //   const tableTopY = 3.5
  //   const tableTopColliderHeight = 2

  //   const wallRestitution = 0.2
  //   const wallFriction = 0.0002

  //   const texture = useTexture({ map: tableImage })

  return (
    <>
      {/* {models.map((element, idx) => {
        return (
          <group key={idx} position={element}>
            {model}
          </group>
        )
      })} */}
      <mesh ref={ref} receiveShadow>
        <boxGeometry args={[blockSize[0], blockSize[1], blockSize[2]]} />
        <meshStandardMaterial color={'green'} />
      </mesh>
    </>
  )
}

export default Road
