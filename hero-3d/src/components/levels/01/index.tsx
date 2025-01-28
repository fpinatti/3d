import { Canvas } from '@react-three/fiber'
import Camera from '@/components/common/Camera'
import Lights from '@/components/common/Lights'
import { Leva } from 'leva'
import { Environment } from '@react-three/drei'

const Level01 = () => {
  return (
    <>
      <Leva hidden />
      <Canvas camera={{ position: [0, 5, 20] }} shadows>
        <Camera />
        <Lights />
        <Environment files={'./assets/textures/env.hdr'} />
      </Canvas>
    </>
  )
}

export default Level01
