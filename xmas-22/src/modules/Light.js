import * as THREE from 'three'
import gsap from 'gsap'
import * as Scene from './Scene'
import * as Player from './Player'

let dirLight
let fillLight

const createAmbientLight = () => {
	const light = new THREE.AmbientLight(0xffffff, .1)
	Scene.scene.add(light)
}

const createDirectionalLight = () => {
	dirLight = new THREE.SpotLight( 0xffffff, .8, 200, 190, 10)
	dirLight.castShadow = true
	// dirLight.shadow.bias = .012
	dirLight.shadow.camera.top = 0
	dirLight.shadow.camera.bottom = -0
	dirLight.shadow.camera.left = -0
	dirLight.shadow.camera.right = 0
	dirLight.shadow.mapSize.width = 1024
	dirLight.shadow.mapSize.height = 1024
	dirLight.position.set(5, 15, -20)
	// dirLight.shadow.camera
	// const helper = new THREE.CameraHelper(dirLight.shadow.camera)
	// Scene.scene.add(helper)
	Scene.scene.add(dirLight)
}

const createFillLight = () => {
	fillLight = new THREE.DirectionalLight( 0xffffff, .3 )
	fillLight.castShadow = true
	fillLight.shadow.camera.top = 50
	fillLight.shadow.camera.bottom = -50
	fillLight.shadow.camera.left = -50
	fillLight.shadow.camera.right = 50
	fillLight.shadow.mapSize.width = 1024
	fillLight.shadow.mapSize.height = 1024
	fillLight.position.set(30, 100, 0)
	Scene.scene.add(fillLight)
	// const helper = new THREE.DirectionalLightHelper(fillLight)
	// Scene.scene.add(helper)
}

const createHemisphereLight = () => {
	const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, .1)
	Scene.scene.add(light)
}

const init = () => {
	createAmbientLight()	
	createDirectionalLight()
	// createHemisphereLight()
	// createFillLight()
}

const tick = () => {
	// if (Player.model && fillLight) {
	// 	// console.log(Airplane.model)
	// 	const playerPosition = Player.model.position
	// 	fillLight.position.set(
	// 		playerPosition.x,
	// 		playerPosition.y + 10,
	// 		playerPosition.z,
	// 	)
	// 	fillLight.lookAt(playerPosition)
	// }
}

export {
	init,
	tick,
}