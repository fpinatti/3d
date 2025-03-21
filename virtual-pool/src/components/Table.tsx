// import { OrbitControls } from "@react-three/drei";
import { MeshReflectorMaterial, useAnimations, useGLTF, useMatcapTexture, useTexture } from '@react-three/drei'
import tableImage from '../assets/green-table.jpg'
import { CuboidCollider, CylinderCollider, MeshCollider, RigidBody, vec3 } from '@react-three/rapier'

const Table = ({ position, clickTable, collisionEvent }) => {
  const model = useGLTF('./assets/models/table.glb')

  const size = [15, 0.1, 9]
  const finalX = size[0] * 0.5
  // const finalY = size[1] * 0.5;
  const finalZ = size[2] * 0.5
  const tableTopY = 3.5
  const tableTopColliderHeight = 2

  const wallRestitution = 0.2
  const wallFriction = 0.0002

  const texture = useTexture({ map: tableImage })
  //   const [matcap, url] = useMatcapTexture(
  //     5,
  //     128 // size of the texture ( 64, 128, 256, 512, 1024 )
  //   )

  return (
    <>
      <RigidBody type="fixed" colliders="trimesh" restitution={0.1} friction={0.1}>
        <group>
          <primitive object={model.scene} />
          <mesh position={[0, tableTopY, 0]} receiveShadow onClick={clickTable}>
            <boxGeometry args={size} />
            {/* <meshStandardMaterial color={'green'} {...texture} /> */}
            <MeshReflectorMaterial {...texture} />
            {/* <meshMatcapMaterial matcap={matcap} toneMapped={true} /> */}
          </mesh>
        </group>
        <CuboidCollider
          position={[0, tableTopY, -finalZ]}
          args={[finalX, tableTopColliderHeight, 0.5]}
          restitution={wallRestitution}
          friction={wallFriction}
        />
        <CuboidCollider
          position={[0, tableTopY, finalZ]}
          args={[finalX, tableTopColliderHeight, 0.5]}
          restitution={wallRestitution}
          friction={wallFriction}
        />
        <CuboidCollider
          position={[finalX, tableTopY, 0]}
          args={[0.5, tableTopColliderHeight, finalZ]}
          restitution={wallRestitution}
          friction={wallFriction}
        />
        <CuboidCollider
          position={[-finalX, tableTopY, 0]}
          args={[0.5, tableTopColliderHeight, finalZ]}
          restitution={wallRestitution}
          friction={wallFriction}
        />

        {/* <CuboidCollider args={[size * 1.5, size * 0.2, size * 1.5]} /> */}
      </RigidBody>
      {/* holes */}
      <RigidBody type="fixed">
        <CylinderCollider sensor position={[finalX - 0.9, tableTopY, finalZ - 0.5]} args={[0.1, 0.3]} />
        <CylinderCollider sensor position={[-finalX + 0.9, tableTopY, finalZ - 0.5]} args={[0.1, 0.3]} />
        <CylinderCollider sensor position={[finalX - 0.9, tableTopY, -finalZ + 0.5]} args={[0.1, 0.3]} />
        <CylinderCollider sensor position={[-finalX + 0.9, tableTopY, -finalZ + 0.5]} args={[0.1, 0.3]} />
        <CylinderCollider sensor position={[0, tableTopY, finalZ - 0.1]} args={[0.1, 0.3]} />
        <CylinderCollider sensor position={[0, tableTopY, -finalZ + 0.1]} args={[0.1, 0.3]} />
      </RigidBody>
    </>
  )
}

export default Table
