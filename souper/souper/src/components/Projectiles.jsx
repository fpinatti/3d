import { Center, Clone, PivotControls, TransformControls, useGLTF } from "@react-three/drei"
import { CuboidCollider, BallCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"

function Projectile(props) {

	const body = useRef(null)

	useEffect(() => {
		if (props.direction) {
			const strength = {x: .306, y: props.direction[0] * .45, z: props.direction[1] * -.31}
			body.current.applyImpulse(strength, false)
		}
	}, [body])

	const onCollision = (collision) => {
		// console.log(collision)
	}

	return (
		<RigidBody
			ref={ body }
			rotation={ [0, Math.PI * -.5, 0] }
			position={ [-2.7, .4, 0] }
			colliders={ false }
			onIntersectionEnter={ onCollision }
			angularDamping={ 1 }
			linearDamping={ .2 }
			// userData={ {type: 'carrot'} }
		>
			<Center>
				<Clone object={ props.model } scale={ 2.5 } />
			</Center>
			<BallCollider
				args={ [.2]}
				restitution={ 0 }
				mass={ 1 }
			/>
		</RigidBody>
	)
}

export default function Projectiles(props) {

	const [projectiles, setProjectiles] = useState([])
	const projectileModel = useGLTF('./assets/models/cannon-ball.gltf')

	const destroyProjectile = (id) => {
		const filtered = projectiles.filter((item) => {
			return item.props.id !== id
		})
		setProjectiles(filtered)
	}
	const createProjectile = () => {
		if (!props.nextProjectileDirection) return
		const id = Math.random();
		setProjectiles([
			...projectiles,
			<Projectile key={ id } model={ projectileModel.scene } direction={ props.nextProjectileDirection } />,
		])
	}

	useEffect(() => {
		createProjectile()
	}, [props.nextProjectileDirection])
	
	return (
		<>
			{[ ...projectiles ]}
		</>
	)
}