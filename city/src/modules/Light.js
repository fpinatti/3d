import * as THREE from 'three'
import gsap from 'gsap'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import * as Scene from './Scene'

let gui

const createAmbientLight = () => {
	const light = new THREE.AmbientLight(0xffffff, .4)
	Scene.scene.add(light)
}

const createSunLight = () => {
	const light = new THREE.HemisphereLight(
		new THREE.Color(0x6ca2ce),
		new THREE.Color(0x3f3128),
		1,
	)
	Scene.scene.add(light)
}

const createDirectionalLight = () => {
	const light = new THREE.DirectionalLight( 0xffffff, 1)
	light.position.set(7.8, 14.9, -5.4)
	light.shadow.bias = -0.002
	light.shadow.mapSize.width = 1024
	light.shadow.mapSize.height = 1024
	light.shadow.camera.top = 15
	light.shadow.camera.bottom = -15
	light.shadow.camera.left = 15
	light.shadow.camera.right = -15
	light.castShadow = true
	Scene.scene.add(light)
	// const helper = new THREE.CameraHelper(light.shadow.camera)
	// Scene.scene.add(helper)

	const lightParams = gui.addFolder('directional light position')
	lightParams.add(light.position, 'x', -40, 40, .1).listen().onChange(() => {
		light.lookAt(new THREE.Vector3(0, 0, 0))
	})
	lightParams.add(light.position, 'y', -40, 40, .1).listen()
	lightParams.add(light.position, 'z', -40, 40, .1).listen()
	lightParams.add(light, 'intensity', -3, 3, .1).listen()
}

const createSpotLight = () => {
	const light = new THREE.SpotLight( 0xffffff, 2, 10, .2, 1, 0 )
	return light
}

const createRectLight = (width, height) => {
	const light = new THREE.RectAreaLight(0xffffff, 2, width, height)
	light.position.set(3.9, 14.5, 2)
	light.lookAt(0, 0, 0)
	Scene.scene.add(light)
	light.castShadow = true
	const helper = new RectAreaLightHelper(light)
	light.add(helper)
	const lightParams = gui.addFolder('directional light position')
	lightParams.add(light.position, 'x', -40, 40, .1).listen()
	lightParams.add(light.position, 'y', -40, 40, .1).listen()
	lightParams.add(light.position, 'z', -40, 40, .1).listen()
	lightParams.add(light.intensity, 'z', -40, 40, .1).listen()

	light.scale.set(2, 2, 2)
	//light.shadow.mapSize.height = 5000
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

const initLights = (guiInstance) => {
	gui = guiInstance
	createAmbientLight()
	createSunLight()
	createDirectionalLight()
	// createRectLight()
}

export {
	initLights,
	createAmbientLight,
	createDirectionalLight,
	createSpotLight,
	createRectLight,
	shakeLight,
}