import { useMatcapTexture } from '@react-three/drei'
import * as THREE from 'three'

const Ground = () => {

	const [matcap] = useMatcapTexture('579241_B5D25D_0E1D2D_97C284')
	return (
		<mesh rotation={ [Math.PI * -.5, 0, 0] } receiveShadow>
			<planeGeometry args={[ 100, 100 ]} />
			<meshMatcapMaterial
				matcap={ matcap }
				// side={ THREE.DoubleSide }
			/>
		</mesh>
	)
}

export default Ground