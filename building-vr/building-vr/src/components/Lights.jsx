import { Environment } from "@react-three/drei"

const Lights = () => {
	return (
		<>
			<Environment
				files={ './assets/textures/aristea_wreck_puresky_1k.hdr' }
				background={ true }
				blur={ .8 }
			/>
			<directionalLight
				position={[3, 10, -3]}
				castShadow
				intensity={1.1}
				shadow-mapSize={ [1024, 1024]}
				shadow-camera-near={ 1 }
				shadow-camera-far={ 10 }
				shadow-camera-top={ 7 }
				shadow-camera-right={ 7 }
				shadow-camera-bottom={ -7 }
				shadow-camera-left={ -7 }
			/>
			<ambientLight intensity={ .04 } />
		</>
	)
}

export default Lights