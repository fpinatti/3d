import * as THREE from 'three'
import gsap from 'gsap'
import * as Scene from './Scene'
import * as Car from './Car'

let dirLight

const createAmbientLight = () => {
	const light = new THREE.AmbientLight(0xffffff, .2)
	Scene.scene.add(light)
}

const createDirectionalLight = () => {
	dirLight = new THREE.SpotLight( 0xffffff, 1, 150, 5, )
	dirLight.castShadow = true
	// dirLight.shadow.bias = .012
	dirLight.shadow.camera.top = 50
	dirLight.shadow.camera.bottom = -50
	dirLight.shadow.camera.left = -50
	dirLight.shadow.camera.right = 50
	dirLight.shadow.mapSize.width = 1024
	dirLight.shadow.mapSize.height = 1024
	dirLight.position.set(10, 30, 0)
	const helper = new THREE.SpotLightHelper(dirLight)
	Scene.scene.add(helper)
	Scene.scene.add(dirLight)
}

const createFillLight = () => {
	const light = new THREE.DirectionalLight( 0xffffff, .1 )
	light.shadow.camera.top = 50
	light.shadow.camera.bottom = -50
	light.shadow.camera.left = -50
	light.shadow.camera.right = 50
	light.position.set(0, 25, -20)
	Scene.scene.add(light)
	// const helper = new THREE.DirectionalLightHelper(light)
	// Scene.scene.add(helper)
}

const init = () => {
	createAmbientLight()	
	createDirectionalLight()
	createFillLight()
}

const tick = () => {
	dirLight.lookAt(Car.model.position)
}

export {
	init,
	tick,
}