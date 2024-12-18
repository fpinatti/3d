import { Canvas } from '@react-three/fiber'
import Camera from '@/components/common/Camera'
import Lights from '@/components/common/Lights'
import Ground from '@/components/common/Ground'
import TextureModel from '@/components/TextureModel'
import AnimatedModel from '@/components/AnimatedModel'
import Effects from '@/components/common/Effects'
import Title from '@/components/scenes/sample/components/Title'
import ButtonDevice from '@/components/ButtonDevice'
import useGlobal from '@/hooks/store/useGlobal'
import Lever from '@/components/Lever'

const HomePage = () => {
  const { isFxEnabled1, isFxEnabled2, isFxEnabled3, setFx1, setFx2, setFx3 } =
    useGlobal()

  return (
    <Canvas camera={{ position: [0, 5, 20] }} shadows>
      <Camera />
      <Lights />
      <Effects />
      <group>
        <Title position={[0, 3, 0]} />
        <ButtonDevice
          position={[-4, 2, 9]}
          onAction={() => {
            setFx1(!isFxEnabled1)
          }}
        />
        <ButtonDevice
          position={[1, 2, 7]}
          onAction={() => {
            setFx2(!isFxEnabled2)
          }}
        />
        <ButtonDevice
          position={[6, 2, 11]}
          onAction={() => {
            setFx3(!isFxEnabled3)
          }}
        />
      </group>
      <Lever position={[1, 2, 13]} />

      {/* <AnimatedModel position={[-8, 0, 60]} />
      <TextureModel position={[3, 5, 45]} /> */}
      <Ground position={[0, 0, 0]} />
    </Canvas>
  )
}

export default HomePage
