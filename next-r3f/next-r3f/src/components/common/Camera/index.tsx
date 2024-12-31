import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

const Camera = () => {
  return (
    <OrbitControls />
    // <PerspectiveCamera makeDefault position={[0, 15, 40]} />
  )
}

export default Camera
