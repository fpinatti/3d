import { Environment } from "@react-three/drei"

const Lights = () => {
	return (
		<>
			<Environment
				files={ './assets/textures/river_walk_1_4k.hdr' }
				background={ true }
				blur={ .8 }
			/>
			<directionalLight
				position={[0, 7, -3]}
				castShadow
				intensity={.31}
				shadow-mapSize={ [1024, 1024]}
				shadow-camera-near={ 1 }
				shadow-camera-far={ 10 }
				shadow-camera-top={ 7 }
				shadow-camera-right={ 7 }
				shadow-camera-bottom={ -7 }
				shadow-camera-left={ -7 }
			/>
			<ambientLight intensity={ .2 } />
		</>
	)
}

export default Lights