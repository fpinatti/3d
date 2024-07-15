import { Environment } from '@react-three/drei'
import { folder, useControls } from 'leva'

const Lights = () => {

	const blur = .8
	const showBackground = false
	const mainLightIntensity = 1.1
	const fogColor = 0xFFFFFF
	const fogNear = 1
	const fogFar = 1000

	// const {
	// 	blur,
	// 	showBackground,
	// 	mainLightIntensity,
	// 	fogColor,
	// 	fogNear,
	// 	fogFar,
	// } = useControls('Environment', {
	// 	blur: {
	// 		value: .8,
	// 		min: 0,
	// 		max: 1,
	// 		step: .01,
	// 	},
	// 	showBackground: false,
	// 	'Lights': folder({
	// 		mainLightIntensity: {
	// 			value: 1.1,
	// 			min: 0,
	// 			max: 5,
	// 			step: .1,
	// 		},
	// 	}),
	// 	'Fog': folder({
	// 		fogColor: {
	// 			value: '#ffffff',
	// 		},
	// 		fogNear: {
	// 			value: 1,
	// 			min: 0,
	// 			max: 10,
	// 			step: .1,
	// 		},
	// 		fogFar: {
	// 			value: 1000,
	// 			min: 0,
	// 			max: 1000,
	// 			step: .1,
	// 		},
	// 	}),
	// })

	return (
		<>
			<fog
				attach="fog"
				color={ fogColor }
				near={ fogNear }
				far={ fogFar }
			/>
			<color attach="background" args={ [fogColor] } />
			<Environment
				files={ './assets/textures/env.hdr' }
				background={ showBackground }
				blur={ blur }
			/>
			<directionalLight
				position={[3, 40, -3]}
				castShadow
				intensity={ mainLightIntensity }
				shadow-mapSize={ [1024, 1024]}
				shadow-camera-near={ 1 }
				shadow-camera-far={ 50 }
				shadow-camera-top={ 50 }
				shadow-camera-right={ 50 }
				shadow-camera-bottom={ -50 }
				shadow-camera-left={ -50 }
			/>
			<ambientLight intensity={ .04 } />
		</>
	)
}

export default Lights