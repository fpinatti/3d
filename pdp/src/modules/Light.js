import * as THREE from 'three'
import gsap from 'gsap'
import * as Scene from './Scene'

const createAmbientLight = () => {
	const light = new THREE.AmbientLight(0xffffff)
	Scene.scene.add(light)
}

const createDirectionalLight = () => {
	const light = new THREE.DirectionalLight( 0xffffff, .1 )
	light.castShadow = true
	// console.log('>>>>', light.shadow.camera)
	light.shadow.camera.top = 50
	light.shadow.camera.bottom = -50
	light.shadow.camera.left = -50
	light.shadow.camera.right = 50
	light.position.set(15, 17, 14)
	Scene.scene.add(light)
	// const helper = new THREE.DirectionalLightHelper(light)
	// Scene.scene.add(helper)
}

const createSpotLight = () => {
	const light = new THREE.SpotLight( 0xffffff, 2, 10, .2, 1, 0 )
	return light
}

const shakeLight = (light) => {
	gsap.to({}, {
		duration: .3,
		repeat: -1,
		onRepeat: () => {
			light.angle = .15 + (Math.random() * .15)
		},
	})
}

export {
	createAmbientLight,
	createDirectionalLight,
	createSpotLight,
	shakeLight,
}