import { Center, PivotControls, TransformControls, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react"
import Projectile from "./Projectiles"

export default function Cannon(props) {

	const cannon = useGLTF('./assets/models/cannon.gltf')
	const barrel = useRef()

	let currentRotationY
	let currentRotationX

	useFrame((state, delta) => {
		const time = state.clock.elapsedTime
		currentRotationX = (Math.cos(time * 5) * .2) + .3
		barrel.current.rotation.x = currentRotationX
		currentRotationY = Math.sin(time) * .4
		barrel.current.rotation.y = currentRotationY
		// console.log(barrel.current)
	})
	
	const onShoot = () => {
		props.onShoot(currentRotationX, currentRotationY)
	}
	// useEffect(() => {
	// 	document.addEventListener('click', onShoot)
	// }, [])


	return (
		<>
			<mesh onClick={ onShoot } position={ [-1, 3, 0] }>
				<boxGeometry />
				<meshBasicMaterial color={ 'red' } />
			</mesh>
			<group rotation={ [0, Math.PI * -.5, 0] } position={ [-3, 0, 0 ]}>
				<primitive
					object={ cannon.nodes.barrel }
					ref={ barrel }
				/>
				<primitive
					object={ cannon.nodes.cannon_1 }
				/>
				<primitive
					object={ cannon.nodes.cannon_2 }
				/>
			</group>
		</>
	)
}