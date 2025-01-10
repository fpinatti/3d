import {
  useTexture,
  MeshReflectorMaterial,
  useMatcapTexture,
} from '@react-three/drei'
import { MeshProps, GroupProps } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface PlanetProps extends GroupProps {
  size?: number
  children?: React.ReactNode
}
const Planet = ({ size, children, ...props }: PlanetProps) => {
  const [matcap] = useMatcapTexture(17, 256)
  // console.log('>', size)
  return (
    // <RigidBody type="fixed" friction={0.5} restitution={0}>
    <group {...props}>
      <mesh receiveShadow>
        <sphereGeometry args={[size, size, 30]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
      {children}
    </group>
    // </RigidBody>
  )
}

export default Planet
