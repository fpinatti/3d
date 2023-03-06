import { useState, useRef } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import CustomGeometry from './components/CustomGeometry'
import Camera from './components/Camera'
import Primitive from './components/Primitive'
import Lights from './components/Lights'
import Ground from './components/Ground'
import Model from './components/Model'
import { Stars, Sky, Environment, Float, Lightformer, Caustics, Backdrop, Stage, Grid, Image, Billboard, Text } from '@react-three/drei'
import TrailElement from './components/TrailElement'
import DecalGeo from './components/DecalGeo.jsx'
import { Debug, Physics } from '@react-three/rapier'
// import './App.css'

function Experience() {
	const [count, setCount] = useState(0)
	const cubeRef = useRef()

	const { camera, gl } = useThree()

	// useFrame((state, delta) => {
	// 	// console.log('tick', count, cubeRef, delta)
	// })
	return (
		<>
			<Camera />
			
			<Environment 
				// preset='sunset'
				files='./textures/rustig_koppie_puresky_1k.hdr'
			>
				<Lightformer
					form="rect" // circle | ring | rect (optional, default = rect)
					intensity={1} // power level (optional = 1)
					color="white" // (optional = white)
					scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
					target={[0, 0, 0]} // Target position (optional = undefined)
				/>
			</Environment>
			{/* <Stars /> */}
			{/* <Sky /> */}
			{/* <Stage adjustCamera intensity={0.5} shadows="contact" environment="city"> */}
			<Lights />
			{/* <TrailElement /> */}
			{/* <Text
				position={ [0, 3, 1] }
				color={ 'purple' }
			>
				TESTE
			</Text>
			<Billboard castShadow position={[0, 3, 0]} scale={ .3 }>
				<Image
					url='./textures/valeriia-neganova-amGWl275tC0-unsplash.jpg'
					scale={ 5 }
				/>
			</Billboard> */}
			<Physics>
				<Debug />
				<Primitive position={ [ 0, 5, 0] } type='cylinder' args={ [1, 1, 1] } />
				<Ground />
			</Physics>
			{/* <DecalGeo /> */}
			{/* <Float> */}
			{/* </Float> */}
			{/* <Caustics debug backside lightSource={[2.5, 5, -2.5]}>
				<Model position={ [ 3, 0, 9] } scale={ [ 2, 2, 2] } />
			</Caustics> */}
			{/* <Backdrop
				floor={0.25} // Stretches the floor segment, 0.25 by default
				segments={20} // Mesh-resolution, 20 by default
				scale={ 10 }
				>
				<meshStandardMaterial color="#353540" />
			</Backdrop> */}
			{/* <Grid /> */}
			{/* </Stage> */}
			{/* <CustomGeometry /> */}
		</>
	)
}

export default Experience
