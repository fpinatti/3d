// import { folder, useControls } from 'leva'

import useGlobal from '@/hooks/store/useGlobal'

const Lights = () => {
  const { isLamp } = useGlobal()
  //   const { mainLightIntensity } = useControls('Environment', {
  //     blur: {
  //       value: 0.8,
  //       min: 0,
  //       max: 1,
  //       step: 0.01,
  //     },
  //     showBackground: false,
  //     Lights: folder({
  //       mainLightIntensity: {
  //         value: 1.1,
  //         min: 0,
  //         max: 5,
  //         step: 0.1,
  //       },
  //     }),
  //     Fog: folder({
  //       fogColor: {
  //         value: '#ffffff',
  //       },
  //       fogNear: {
  //         value: 1,
  //         min: 0,
  //         max: 10,
  //         step: 0.1,
  //       },
  //       fogFar: {
  //         value: 100,
  //         min: 0,
  //         max: 1000,
  //         step: 0.1,
  //       },
  //     }),
  //   })

  return (
    <>
      <directionalLight
        position={[3, 40, -3]}
        castShadow
        intensity={isLamp ? 3 : 0}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={50}
        shadow-camera-right={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
      />
      <ambientLight intensity={isLamp ? 3 : 0} />
    </>
  )
}

export default Lights
