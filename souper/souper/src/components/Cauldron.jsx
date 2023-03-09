import { Center, PivotControls, TransformControls, useGLTF } from "@react-three/drei"
import { CylinderCollider, RigidBody } from "@react-three/rapier"
import { useEffect, useRef } from "react"
import gsap from 'gsap'

export default function Cauldron() {

	const cauldron = useGLTF('./assets/models/cauldron.gltf')
	// console.log(cauldron)
	const model = useRef()

	const bubbles = useRef()

	useEffect(() => {
		const ctx_bubbles = gsap.context(() => {
			gsap.to(bubbles.current.scale, {
				x: '1.02',
				y: '1.02',
				z: '1.02',
				repeat: -1,
				yoyo: true,
				ease: 'none',
				duration: 10,
				repeatRefresh: true
			})
			gsap.to(bubbles.current.rotation, {
				y: Math.PI * 2,
				repeat: -1,
				ease: 'none',
				duration: 8,
			})
		}, bubbles);
		return () => {
			ctx_bubbles.revert()
		} 
	}, [])

	const collision = (collisionEvt) => {
		// console.log()
		collisionEvt.rigidBody.userData.disableMe()
		// gsap.to(collisionEvt.rigidBodyObject.scale, {
		// 	x: 0,
		// 	y: 0,
		// 	z: 0,
		// 	duration: .4,
		// })
		// collisionEvt.rigidBodyObject
		// console.log(collisionEvt.rigidBody.userData.id)
		// collisionEvt.rigidBody.userData.onCollision(collisionEvt.rigidBody.userData.id)
	}
	
	return (
		<>
			<RigidBody
				colliders={ false }
				mass={ 0 }
				userData={ {object: 'cauldron'} }
				position={[5, -27, 0]}
				scale={ 23 }
			>
				{/* <PivotControls depthTest={ false }> */}
						<group>
							<primitive
								object={ cauldron.nodes.Sphere015 }
							/>
							<primitive
								object={ cauldron.nodes.Sphere015_1 }
								ref={ bubbles }
							/>
							<primitive
								object={ cauldron.nodes.Sphere015_2 }
							/>
							<primitive
								object={ cauldron.nodes.Sphere015_3 }
							/>
							{/* <primitive
								object={ cauldron.nodes.cauldron }
							/> */}
						</group>
						<CylinderCollider
							args={ [.5, .5] }
							position={ [0, .5, 0] }
							mass={ 0 }
							restitution={ 0 }
						/>
						<CylinderCollider
							args={ [.02, .36] }
							position={ [0, 1.05, 0] }
							onIntersectionEnter={ collision }
							sensor
						/>
					
				{/* </PivotControls> */}
			</RigidBody>
		</>
	)
}