import { Center, PivotControls, TransformControls, useGLTF } from "@react-three/drei"
import { CylinderCollider, RigidBody } from "@react-three/rapier"
import { useRef } from "react"

export default function Cauldron() {

	const cannon = useGLTF('./assets/models/cauldron.gltf')
	const model = useRef()

	const collision = (collisionEvt) => {
		// console.log(collisionEvt.rigidBodyObject)
		// console.log(collisionEvt.rigidBody.userData.id)
		// collisionEvt.rigidBody.userData.onCollision(collisionEvt.rigidBody.userData.id)
	}
	
	return (
		<>
			<RigidBody type="fixed" colliders={ false } userData={ {object: 'cauldron'} }>
				<PivotControls depthTest={ false }>
					<Center position={ [3, .6, 0 ]}>
						<primitive
							object={ cannon.scene }
							ref={ model }
							rotation={ [0, Math.PI * -.5, 0] } />
						<CylinderCollider
							args={ [.5, .6] }
							position={ [0, .5, 0] }
							mass={ 1000 }
							restitution={ 0 }
						/>
						<CylinderCollider
							args={ [.05, .4] }
							position={ [0, 1.04, 0] }
							sensor
						/>
					</Center>
				</PivotControls>
			</RigidBody>
		</>
	)
}