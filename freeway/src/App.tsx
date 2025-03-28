import { Canvas } from '@react-three/fiber'
// import { Physics } from '@react-three/rapier'
import Camera from './components/Camera'
import Lights from './components/Lights'
import Ground from './components/Ground'
import Game from './components/Game'
import { Suspense, useState } from 'react'
import { Leva } from 'leva'
import Opening from './components/Opening'
import { Provider } from 'react-redux'
import { store } from './store'
import EndGame from './components/EndGame'
import { useMouse } from '@uidotdev/usehooks'
import { Debug, Physics } from '@react-three/cannon'
import { Center, Environment, Sky } from '@react-three/drei'
import { useSwipeable } from 'react-swipeable'
// import AnimatedModel from "./components/AnimatedModel";
// import TextureModel from "./components/TextureModel";
// import PerformanceMonitor from "./components/PerformanceMonitor";
// import EffectsRender from "./components/EffectsRender";

function App() {
  //   const handlers = useSwipeable({
  //     onSwiped: (eventData) => console.log('User Swiped!', eventData),
  //   })

  return (
    <>
      {/* <Leva hidden /> */}
      <Provider store={store}>
        <Opening />
        <Canvas shadows style={{ background: 'black' }}>
          <Suspense>
            {/* <Camera /> */}
            <Physics allowSleep>
              {/* <Debug scale={1} color={'red'}> */}
              <Lights />
              {/* <EndGame /> */}
              <Environment
                background={true}
                preset="park"
                environmentIntensity={0}
                backgroundBlurriness={0.3}
                // blur={1}
                // backgroundIntensity={1}
                // ground
              />
              <Game />
              {/* </Debug> */}
            </Physics>
            {/* <Ground /> */}
          </Suspense>
        </Canvas>
      </Provider>
    </>
  )
}

export default App
