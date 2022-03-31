import { loadModel } from './Model'
import * as THREE from 'three'

// let mixer
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''

const init = (scene) => {
	// engineClock = clock
	loadModel('models/main_scenario.gltf').then((gltf) => {
		const model = gltf.scene
		scene.add(model)
		model.rotation.y = Math.PI * .5

		/**
		 * Keyboard Events
		 */
		setupKeys()

	})
}

const setupKeys = () => {
	// document.addEventListener('keydown', (event) => {
	// 	keyPressed = event.key
	// 	if (keyPressed === 'ArrowRight') {
	// 		walkAction.play()
	// 	}
	// })

	// document.addEventListener('keyup', () => {
	// 	keyPressed = ''
	// 	walkAction.stop()
	// })
}

const tick = () => {

}

export {
	init,
	tick,
}