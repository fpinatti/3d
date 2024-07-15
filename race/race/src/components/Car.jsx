import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { CuboidCollider, CylinderCollider, interactionGroups, RigidBody, useRevoluteJoint } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export default function Car(props) {
	const { nodes, materials } = useGLTF('./assets/models/sedanSports-transformed.glb')

	const carBody = useRef()
	const wheelFR = useRef()
	const wheelFL = useRef()
	const wheelRR = useRef()
	const wheelRL = useRef()
	// const wheelsFront = useRef()
	// const wheelsRear = useRef()

	const jointWheel1 = useRevoluteJoint(
		carBody,
		wheelFL,
		[
			[0, 0, 0],
			[0, 0, 0],
			[1, 1, 1],
			[0, 0],
		]
	)

	// jointWheel1.configureMotorVelocity(10, 2)

	const jointWheel2 = useRevoluteJoint(
		carBody,
		wheelFR,
		[
			[0, 0, 0],
			[0, 0, 0],
			[1, 1, 1],
			[0, 0],
		]
	)

	const jointWheel3 = useRevoluteJoint(
		carBody,
		wheelRL,
		[
			[0, 0, 0],
			[0, 0, 0],
			[1, 1, 1],
			[0, 0],
		]
	)

	const jointWheel4 = useRevoluteJoint(
		carBody,
		wheelRR,
		[
			[0, 0, 0],
			[0, 0, 0],
			[1, 1, 1],
			[0, 0],
		]
	)

	// const jointWheel2 = useRevoluteJoint(
	// 	bodyA,
	// 	wheelsRear,
	// 	[
	// 		[0, 0, 0],
	// 		[0, 0, 0],
	// 		[0, .1, 0],
	// 	]
	// )
	
	useFrame(() => {
		// if (wheelsFront.current) {
		// 	wheelsFront.current.applyTorqueImpulse({ x: 0, y: 0, z: 0 }, true)
		// }
		if (jointWheel1.current) {
			jointWheel1.current.configureMotorVelocity(10, .2)
		}
	}, [])



	// const jointWheel3 = useRevoluteJoint(
	// 	bodyA,
	// 	wheel3,
	// 	[
	// 		[0, 0, 0],
	// 		[0, 0, 0],
	// 		[0, .1, 0],
	// 	]
	// )

	// const jointWheel4 = useRevoluteJoint(
	// 	bodyA,
	// 	wheel4,
	// 	[
	// 		[0, 0, 0],
	// 		[0, 0, 0],
	// 		[0, .1, 0],
	// 	]
	// )

	return (
		<>
			<group position={[0, 2, 0]}>
				<RigidBody ref={carBody} collisionGroups={interactionGroups(0,[1])}>
					<mesh>
						<boxGeometry args={[1, .5, 2]} />
						<meshStandardMaterial color={ 'green' } />
					</mesh>
				</RigidBody>
				<RigidBody ref={wheelFR} collisionGroups={interactionGroups(0,[1])}>
					<mesh rotation={[0, 0, Math.PI * .5]} position={[.5, -.3, -.6]}>
						<cylinderGeometry args={[.3, .3, .2]} />
						<meshStandardMaterial color={ 'black' } />
					</mesh>
				</RigidBody>
				<RigidBody ref={wheelFL} collisionGroups={interactionGroups(0,[1])}>
					<mesh rotation={[0, 0, Math.PI * .5]} position={[-.5, -.3, -.6]}>
						<cylinderGeometry args={[.3, .3, .2]} />
						<meshStandardMaterial color={ 'black' } />
					</mesh>
				</RigidBody>
				<RigidBody ref={wheelRR} collisionGroups={interactionGroups(0,[1])}>
					<mesh rotation={[0, 0, Math.PI * .5]} position={[.5, -.3, .6]}>
						<cylinderGeometry args={[.3, .3, .2]} />
						<meshStandardMaterial color={ 'black' } />
					</mesh>
				</RigidBody>
				<RigidBody ref={wheelRL} collisionGroups={interactionGroups(0,[1])}>
					<mesh rotation={[0, 0, Math.PI * .5]} position={[-.5, -.3, .6]}>
						<cylinderGeometry args={[.3, .3, .2]} />
						<meshStandardMaterial color={ 'black' } />
					</mesh>
				</RigidBody>

			</group>
		</>
	)
}