import { Canvas } from '@react-three/fiber'
import Camera from './components/Camera'
import Lights from './components/Lights'
import Track from './components/Track'
import Ground from './components/Ground'
import AnimatedModel from './components/AnimatedModel'
import TextureModel from './components/TextureModel'
import PerformanceMonitor from './components/PerformanceMonitor'
import EffectsRender from './components/EffectsRender'
import { Physics, RigidBody, Debug } from "@react-three/rapier";
import Car from './components/Car'

function App() {

	return (
		<>
			<Canvas
				camera={{position: [0, 5, 3]}}
				shadows
			>
				<Camera />
				<Lights />
				{/* <EffectsRender /> */}
				{/* <PerformanceMonitor /> */}
				{/* <AnimatedModel position={[-8, 0, 60]} />
				<TextureModel position={[3, 5, 45]} /> */}
				<Physics>
					<Debug />
					<Car />
					<Track position={ [0, 0, 0] } />
					{/* <Ground position={ [0, -1, 0] } /> */}
				</Physics>
			</Canvas>
		</>
	)
}

export default App
