import { Center, Clone, PivotControls, TransformControls, useGLTF } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"

function Projectile(props) {
	// <Clone object={ projectileModel.scene } />

	const body = useRef(null)

	useEffect(() => {
		// console.log(props)
		body.current.applyImpulse({x: .034, y: .06, z: 0}, false)
		// body.current.applyTorqueImpulse({ x: 0, y: 0, z: .1 }, true)
	}, [body])

	const onCollision = (collision) => {
		console.log(collision)
	}

	return (
		<RigidBody
			ref={ body }
			rotation={ [0, Math.PI * -.5, 0] }
			position={ [-3, .5, 0] }
			mass={ 1 }
			colliders={ false }
			onIntersectionEnter={ onCollision }
			userData={ {type: 'carrot'} }
		>
			<Clone object={ props.model } />
			{/* <mesh scale={ .2 }>
				<sphereGeometry />
				<meshBasicMaterial />
			</mesh> */}
			<CuboidCollider
				args={ [.1, .1, .1]}
				restitution={ 1 }
			/>
		</RigidBody>
	)
}

export default function Projectiles(props) {

	const [projectiles, setProjectiles] = useState([])
	const projectileModel = useGLTF('./assets/models/carrot.gltf')

	const destroyProjectile = (id) => {
		const filtered = projectiles.filter((item) => {
			return item.props.id !== id
		})
		setProjectiles(filtered)
		// console.log(filtered)
		// console.log('destroy projectile', id)
	}
	const createProjectile = () => {
		const id = Math.random();
		setProjectiles([
			...projectiles,
			<Projectile key={ id } model={ projectileModel.scene } />,
		])
	}
	
	return (
		<>
			<mesh onClick={ createProjectile } position={ [-3, 3, 0] }>
				<boxGeometry />
				<meshNormalMaterial />
			</mesh>
			{[ ...projectiles ]}
			{/* {[ ...projectiles ]}
			<RigidBody
				rotation={ [0, Math.PI * -.5, 0] }
				position={ [-3, .5, 0] }
				ref={ body }
				mass={ 1 }
				userData={ {type: 'carrot', onCollision: props.whenCollide, id: props.id } }
			>
			
				<Clone object={ projectileModel.scene } />
			</RigidBody> */}
		</>
	)
}