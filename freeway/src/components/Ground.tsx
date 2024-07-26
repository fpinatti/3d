import { useTexture, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'

const Ground = () => {
  return (
    <mesh position={[0, -1.15, 0]} receiveShadow>
      <cylinderGeometry args={[100, 100, 2]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  )
}

export default Ground
