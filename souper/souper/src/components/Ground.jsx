import { RigidBody } from "@react-three/rapier";

export default function Ground() {

	return (
		<RigidBody
			type='fixed'
			restitution={ 0 }
		>
			<mesh>
				<boxGeometry args={ [10, .2, 10] } />
				<meshNormalMaterial />
			</mesh>
		</RigidBody>
	)
}