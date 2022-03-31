import { loadModel } from './Model'
import * as Scene from './Scene'
// import * as THREE from 'three'

// let mixer
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''

const init = () => {
	// engineClock = clock
	loadModel('models/main_scenario.gltf').then((gltf) => {
		const model = gltf.scene
		Scene.scene.add(model)
		model.rotation.y = Math.PI * .5

	})
}

const tick = () => {

}

export {
	init,
	tick,
}