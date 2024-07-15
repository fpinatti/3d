import { useTexture } from "@react-three/drei"
import * as THREE from 'three'

const Ground = () => {

	const colorTexture = useTexture('./assets/textures/grass/Grass001_1K_Color.jpg')
	colorTexture.repeat.x = 10
	colorTexture.repeat.y = 10
	colorTexture.wrapS = THREE.RepeatWrapping
	colorTexture.wrapT = THREE.RepeatWrapping

	const normalTexture = useTexture('./assets/textures/grass/Grass001_1K_Normal.jpg')
	normalTexture.repeat.x = 10
	normalTexture.repeat.y = 10
	normalTexture.wrapS = THREE.RepeatWrapping
	normalTexture.wrapT = THREE.RepeatWrapping

	const dispTexture = useTexture('./assets/textures/grass/Grass001_1K_Displacement.jpg')
	dispTexture.repeat.x = 10
	dispTexture.repeat.y = 10
	dispTexture.wrapS = THREE.RepeatWrapping
	dispTexture.wrapT = THREE.RepeatWrapping

	return (
		<mesh rotation={ [Math.PI * -.5, 0, 0] } receiveShadow>
			<planeGeometry args={ [100, 100, 100, 100] } />
			<meshStandardMaterial 
				map={ colorTexture }
				normalMap={ normalTexture }
				displacementMap= { dispTexture }
				displacementScale={ .2 }
			/>
		</mesh>
	)
}

export default Ground