import { loadModel } from './Model'
import * as THREE from 'three'
import gsap from 'gsap'

// let mixer
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''
let model

const init = (scene) => {
	// engineClock = clock
	loadModel('models/airplane.gltf').then((gltf) => {
		model = gltf.scene
		console.log(model)
		scene.add(model)

		// const box = new THREE.BoxHelper(model, 0xffff00 );
		// scene.add( box );

		/**
		 * Keyboard Events
		 */
		setupKeys()

	})
}

const setupKeys = () => {
	document.addEventListener('keydown', (event) => {
		const keyPressed = event.key
		if (keyPressed === 'ArrowRight') {
			move(5)
		} else if (keyPressed === 'ArrowLeft') {
			move(-5)
		}
	})

	document.addEventListener('keyup', () => {
		gsap.to(model.position, {
			duration: 1,
			x: 0,
			y: 0,
			ease: 'linear',
		})
		gsap.to(model.rotation, {
			duration: 1,
			z: 0,
			ease: 'linear',
		})
	})
}

const move = (pos) => {
	gsap.to(model.position, {
		duration: 1,
		x: pos,
		ease: 'linear',
	})
	gsap.to(model.rotation, {
		duration: 1,
		z: pos,
		ease: 'linear',
	})
}

const tick = () => {

}

export {
	init,
	tick,
}