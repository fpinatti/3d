import * as THREE from 'three'
import * as Scene from '../Scene'
import * as Player from '../Player'
import * as Camera from '../Camera'

const activate = (resources) => {
	Player.init(resources.step1.player)

	// texture.repeat.set(.15, 1)
	// texture.wrapS = THREE.RepeatWrapping   
	// texture.wrapT = THREE.RepeatWrapping
	// gsap.to(stepsAnimation, {
	// 	duration: 2,
	// 	x: 1,
	// 	repeat: -1,
	// 	ease: 'steps(7)',
	// 	onUpdate: () => {
	// 		texture.offset.x = stepsAnimation.x
	// 	},
	// })
	const material = new THREE.SpriteMaterial({ 
		map: resources.step1['billboard'],
		// blending: THREE.AdditiveBlending,
	})

	const sprite = new THREE.Sprite(material)
	Scene.scene.add(sprite)
	const baseScale = 3
	sprite.scale.x = baseScale * 1.6
	sprite.scale.y = baseScale * 1
	sprite.position.x = 5
	sprite.position.y = 1

	Camera.camera.lookAt(0, 0, 0)
	Camera.camera.position.set(3,6,-2)

	// return sprite
}


export {
	activate,
}