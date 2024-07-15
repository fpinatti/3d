import { useTexture, MeshReflectorMaterial } from "@react-three/drei"
import * as THREE from 'three'

const Ground = ({position}) => {

	return (
		<mesh position={ position } receiveShadow>
			<cylinderGeometry args={ [100, 100, 2]} />
			<meshStandardMaterial 
				color={ 'red' }
			/>
		</mesh>
	)
}

export default Ground