import * as THREE from 'three'
import gsap from 'gsap'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import * as Scene from './Scene'

const createAmbientLight = () => {
	const light = new THREE.AmbientLight(0xffffff, .3)
	Scene.scene.add(light)
}

const createDirectionalLight = () => {
	const light = new THREE.DirectionalLight( 0xffffff, 1)
	light.position.set(4, 15, 1)
	light.shadow.bias = -0.002
	light.shadow.mapSize.width = 1024
	light.shadow.mapSize.height = 1024
	// light.shadow.radius = 10
	light.castShadow = true
	Scene.scene.add(light)
	// const helper = new THREE.CameraHelper(light.shadow.camera)
	// Scene.scene.add(helper)
}

const createSpotLight = () => {
	const light = new THREE.SpotLight( 0xffffff, 2, 10, .2, 1, 0 )
	return light
}

const createRectLight = (width, height) => {
	const light = new THREE.RectAreaLight(0xffffff, .3, width, height)
	light.position.set(2, 6, 2)
	light.lookAt(0, 0, 0)
	Scene.scene.add(light)
	// light.castShadow = true
	// const helper = new RectAreaLightHelper(light)
	// light.add(helper)
	// return light
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
	createRectLight,
	shakeLight,
}