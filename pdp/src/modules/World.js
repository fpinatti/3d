import { loadModel } from './Model'
import * as Scene from './Scene'
import * as Utils from '../utils/utils'
import gsap from 'gsap'
// import * as THREE from 'three'

let model
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''

const init = () => {
	// engineClock = clock
	loadModel('models/main_scenario.gltf').then((gltf) => {
		model = gltf.scene
		Scene.scene.add(model)
		animateEarth()
		model.position.y = -6
		model.position.x = 0
		// model.rotation.y = Math.PI * .5

	})
}

const animateEarth = () => {
	const ground = Utils.getElementFromModel(model, 'ground')
	gsap.to(ground.rotation, {
		duration: 2.25,
		z: - Math.PI * 2,
		repeat: -1,
		ease: 'linear',
	})
}

const tick = () => {

}

export {
	init,
	tick,
}