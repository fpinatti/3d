import { Canvas } from '@react-three/fiber'
import Camera from '@/components/common/Camera'
import Lights from '@/components/common/Lights'
import Ground from '@/components/common/Ground'
import HelicopterModel from '@/components/Helicopter'
import Effects from '@/components/common/Effects'
import Title from '@/components/scenes/sample/components/Title'
import ButtonDevice from '@/components/ButtonDevice'
import useGlobal from '@/hooks/store/useGlobal'
import Lever from '@/components/Lever'
import Ship from '@/components/Ship'
import { Physics } from '@react-three/rapier'
import Planet from '@/components/Planet'
import { Leva } from 'leva'
import Cloud from '@/components/Cloud'
import PlanetElement from '@/components/PlanetElement'
import { Environment, Stars } from '@react-three/drei'

const HomePage = () => {
  const {
    isFxEnabled1,
    isFxEnabled2,
    isFxEnabled3,
    isHelicopter,
    setFx1,
    setFx2,
    setFx3,
    setHelicopter,
  } = useGlobal()

  return (
    <>
      <Leva hidden />
      <Canvas camera={{ position: [0, 5, 20] }} shadows>
        <Camera />
        <Lights />
        {/* <Effects /> */}
        <Physics debug>
          <Ship />
          <group>
            <Title position={[0, 5, 0]} />
          </group>
          <HelicopterModel position={[12, 50, -16]} />
          <Cloud position={[0, 10, -7]} />
          <Planet
            // position={[0, 0, 0]}
            position={[0, -14, 0]}
            size={17}
          >
            <>
              <Lever
                // position={[1, 2, 13]}
                lat={Math.PI * 0.3}
                long={Math.PI * -0.1}
                radius={17}
                onAction={() => {
                  setHelicopter(!isHelicopter)
                }}
              />
              <ButtonDevice
                // position={[0, 0, 17]}
                lat={Math.PI * 0.2}
                long={0}
                radius={17}
                // position={[-4, 2, 9]}
                onAction={() => {
                  setFx1(!isFxEnabled1)
                }}
              />
              <ButtonDevice
                lat={Math.PI * 0.2}
                long={Math.PI * 0.1}
                radius={17}
                onAction={() => {
                  setFx2(!isFxEnabled2)
                }}
              />
              <ButtonDevice
                lat={Math.PI * 0.2}
                long={Math.PI * -0.1}
                radius={17}
                onAction={() => {
                  setFx3(!isFxEnabled3)
                }}
              />
              <PlanetElement
                src="/assets/models/park-entrance.glb"
                lat={Math.PI * 0.4}
                long={Math.PI * 0}
                radius={17}
                scale={3}
                offset={{ x: 0, y: -0.6, z: 0 }}
              />
            </>
          </Planet>
        </Physics>
        <Stars count={2000} depth={100} radius={1} saturation={0} />
        <Environment
          files={'./assets/textures/env.hdr'}
          // background={showBackground}
          // blur={blur}
        />
      </Canvas>
    </>
  )
}

export default HomePage
