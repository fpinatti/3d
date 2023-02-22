import { useState, useRef } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CustomGeometry from './components/CustomGeometry'

extend({ OrbitControls })
// import reactLogo from './assets/react.svg'
// import './App.css'

function Experience() {
	const [count, setCount] = useState(0)
	const cubeRef = useRef()

	const { camera, gl } = useThree()

	useFrame((state, delta) => {
		// console.log('tick', count, cubeRef, delta)
	})
	return (
		<>
			<directionalLight position={ [0, 2, 2] } />
			<ambientLight
				intensity={ 1 }
				color='#0f0fff'
			/>
			<orbitControls args={ [camera, gl.domElement] } />
			<mesh ref={ cubeRef } rotation-y={ 1.2 }>
				<boxGeometry args={ [ 2, 2 ]} />
				<meshStandardMaterial />
			</mesh>
			<CustomGeometry />
		</>
	)
}

export default Experience
