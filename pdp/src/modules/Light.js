import * as THREE from 'three'
import gsap from 'gsap'
import * as Scene from './Scene'

const createAmbientLight = () => {
	const light = new THREE.AmbientLight(0xffffff, 1)
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

const createFillLight = () => {
	const light = new THREE.DirectionalLight( 0xffffff, .4 )
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

export {
	init,
}