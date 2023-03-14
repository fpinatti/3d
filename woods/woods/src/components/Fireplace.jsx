import { Billboard, Image, useTexture } from "@react-three/drei"

const url = './assets/textures/fire_sheet.png'
import * as THREE from 'three'
import gsap from 'gsap'

const Fireplace = (props) => {

	let stepsAnimation = {x: 0}
	const texture = useTexture(url)
	texture.repeat.set(.15, 1)
	texture.wrapS = THREE.RepeatWrapping   
	texture.wrapT = THREE.RepeatWrapping

	gsap.to(stepsAnimation, {
		duration: 2,
		x: 1,
		repeat: -1,
		ease: 'steps(7)',
		onUpdate: () => {
			texture.offset.x = stepsAnimation.x
		},
	})
	
	return (
		<sprite {...props} castShadow>
			<spriteMaterial map={ texture } />
		</sprite>
		// <Billboard {...props}>
		// 	<Image url={ url } />
		// </Billboard>
	)
}

useTexture.preload(url)

export default Fireplace