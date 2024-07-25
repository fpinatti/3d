import { Canvas } from '@react-three/fiber'
// import { Physics } from '@react-three/rapier'
import Camera from './components/Camera'
import Lights from './components/Lights'
import Ground from './components/Ground'
import Race from './components/Race'
import { Suspense, useState } from 'react'
import { Leva } from 'leva'
import Opening from './components/Opening'
import { Provider } from 'react-redux'
import { store } from './store'
import EndGame from './components/EndGame'
import { useMouse } from '@uidotdev/usehooks'
import { Debug, Physics } from '@react-three/cannon'
import { Joystick } from 'react-joystick-component'
// import AnimatedModel from "./components/AnimatedModel";
// import TextureModel from "./components/TextureModel";
// import PerformanceMonitor from "./components/PerformanceMonitor";
// import EffectsRender from "./components/EffectsRender";

function App() {
  const [joystickPos, setJoystickPos] = useState({})
  const onJoystickMove = (evt: IJoystickUpdateEvent): void => {
    setJoystickPos({ x: evt.x, y: evt.y })
  }

  return (
    <>
      <Leva hidden />
      <Joystick
        size={100}
        // sticky={true}
        baseColor="red"
        stickColor="blue"
        move={onJoystickMove}
        stop={onJoystickMove}
      ></Joystick>

      <Provider store={store}>
        <Canvas camera={{ position: [-2, 4, -5], fov: 120 }} shadows style={{ background: 'black' }}>
          <Suspense>
            {/* <Camera /> */}
            <Physics allowSleep>
              {/* <Debug scale={1.1} color={'red'}> */}
              {/* <Lights /> */}
              {/* <Opening />
              <EndGame /> */}
              <Race joystickPos={joystickPos} />
              {/* </Debug> */}
            </Physics>
            <Ground />
          </Suspense>
        </Canvas>
      </Provider>
    </>
  )
}

export default App
