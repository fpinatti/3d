import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Camera from './components/Camera'
import Lights from './components/Lights'
import Ground from './components/Ground'
import TableWithBalls from './components/TableWithBalls'
import { Suspense } from 'react'
import { Leva } from 'leva'
// import AnimatedModel from "./components/AnimatedModel";
// import TextureModel from "./components/TextureModel";
// import PerformanceMonitor from "./components/PerformanceMonitor";
// import EffectsRender from "./components/EffectsRender";

function App() {
  return (
    <>
      <Leva hidden />
      <Canvas camera={{ position: [0, 7, 8] }} shadows>
        <Suspense>
          <Physics debug>
            <Camera />
            <Lights />
            <TableWithBalls />
            {/* <EffectsRender /> */}
            {/* <PerformanceMonitor /> */}
            {/* <AnimatedModel position={[-8, 0, 60]} /> */}
            {/* <TextureModel position={[3, 5, 45]} /> */}
            <Ground position={[0, -1, 0]} />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
