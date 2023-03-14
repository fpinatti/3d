import { OrbitControls } from "@react-three/drei"

const Camera = () => {


	return (
		<OrbitControls
			autoRotate
			autoRotateSpeed={ .2 }
			minDistance={ 7 }
			maxDistance={ 9 }
			maxPolarAngle={ 1.5 }
		/>
	)
}

export default Camera