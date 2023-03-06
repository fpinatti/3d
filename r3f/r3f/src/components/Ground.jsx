import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

export default function Ground() {
	return (
		<RigidBody
			type="fixed"
			rotation={ [ - Math.PI * .5, 0, 0 ] }
			position={ [ 0, 0, 0 ] }
		>
			<mesh
				receiveShadow
			>
				<planeGeometry
					args={ [ 10, 10, 10 ] }
					
				/>
				<meshStandardMaterial
					color={ '#00ff00' }
					side={ THREE.DoubleSide }
				/>
			</mesh>
		</RigidBody>
	)
}