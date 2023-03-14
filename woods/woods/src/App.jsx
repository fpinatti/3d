// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import { Canvas } from '@react-three/fiber'
import Lights from './components/Lights'
import Camera from './components/Camera'
import Particles from './components/Particles'
import Fireplace from './components/Fireplace'
import Tree from './components/Tree'
import { Stage } from '@react-three/drei'
import { Debug, Physics, RigidBody } from '@react-three/rapier'

function App() {

  return (
    <Canvas shadows camera={{position: [-5, 4, 8]}}>
		<Physics>
			{/* <Stage> */}
			<Lights />
			<Camera />
			{/* <Debug /> */}
			<Particles position={ [-.3, -.7, 0] } />
			<Fireplace position={[.6, 1.5, 2.3]} scale-x={1.6} scale-y={3} />
			<Tree />
			{/* </Stage> */}
		</Physics>
	</Canvas>
  )
}

export default App
