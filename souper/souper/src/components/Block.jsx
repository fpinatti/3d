import { Center, Clone, PivotControls, Text, TransformControls, useGLTF } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"

export default function Block(props) {

	const [projectiles, setProjectiles] = useState([])
	const [enabled, setEnabled] = useState(true)

	const disable = () => {
		console.log('DISABLE BLOCK')
		setEnabled(false)
	}

	const blockProperties = {
		'fixed': {
			color: 'grey',
			mass: 1000,
			restitution: 0,
			friction: 0,
			size: 1,
		},
		'carrot': {
			color: 'orange',
			mass: 3,
			restitution: 0,
			friction: 0,
			size: 1,
		},
		'cabbage': {
			color: 'green',
			mass: .000000001,
			restitution: 0,
			friction: 0,
			size: .5,
		}
	}
	// const projectileModel = useGLTF('./assets/models/carrot.gltf')

	const getBlockFromType = () => {
		const blockProps = blockProperties[props.type]
		return <>
			<mesh>
				<boxGeometry args={ [blockProps.size, blockProps.size, blockProps.size] } />
				<meshPhysicalMaterial color={ blockProps.color } />
			</mesh>
			<CuboidCollider
				args={ [blockProps.size * .5, blockProps.size * .5, blockProps.size * .5]}
				restitution={ blockProps.restitution }
				friction={ blockProps.friction }
				mass={ blockProps.mass }
			/>
		</>
	}
	
	return (<>
		<RigidBody
			// ref={ body }
			// rotation={ [0, Math.PI * -.5, 0] }
			position={ props.position }
			mass={ 1 }
			type='dynamic'
			colliders={ false }
			scale= { enabled ? 1 : 0 }
			// onIntersectionEnter={ onCollision }
			userData={ {type: props.type, disableMe: disable } }
		>
			<Center>
				{ getBlockFromType() }
			</Center>
			<Text>{ enabled }</Text>
			{/* <mesh scale={ .2 }>
				<sphereGeometry />
				<meshBasicMaterial />
			</mesh> */}
		</RigidBody>
	</>)
}