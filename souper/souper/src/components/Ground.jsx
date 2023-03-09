import { RigidBody } from "@react-three/rapier";

export default function Ground() {

	return (
		<RigidBody
			type='fixed'
			restitution={ 0 }
		>
			<mesh position={ [-5, -.5, 0] }>
				<boxGeometry args={ [20, .1, 10] } />
				<meshNormalMaterial />
			</mesh>
			{/* <mesh position={ [15, -5, 0] }>
				<boxGeometry args={ [20, .2, 10] } />
				<meshNormalMaterial />
			</mesh> */}
		</RigidBody>
	)
}