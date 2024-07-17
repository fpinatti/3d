// import { OrbitControls } from "@react-three/drei";
import { MeshReflectorMaterial, useAnimations, useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import { CuboidCollider, CylinderCollider, MeshCollider, RigidBody, vec3 } from '@react-three/rapier'

const Road = ({ position }) => {
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
  const blockSize = 3.1

  return (
    <>
      <mesh position={[position[0] * blockSize, position[1] * blockSize, position[2] * blockSize]} receiveShadow>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color={'green'} />
        {/* <MeshReflectorMaterial {...texture} /> */}
        {/* <meshMatcapMaterial matcap={matcap} toneMapped={true} /> */}
      </mesh>
    </>
  )
}

export default Road
