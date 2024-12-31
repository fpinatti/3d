import { useTexture, MeshReflectorMaterial } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

const Ground = ({ position }) => {
  return (
    <RigidBody type="fixed" friction={0.5} restitution={0}>
      <mesh position={position} receiveShadow>
        <cylinderGeometry args={[100, 100, 2]} />
        <meshStandardMaterial color={'red'} />
      </mesh>
    </RigidBody>
  )
}

export default Ground
