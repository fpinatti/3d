import { loadModel } from './Model'
import * as Scene from './Scene'
import * as Camera from './Camera'
// import * as THREE from 'three'
import * as Utils from '../utils/utils'
import gsap from 'gsap'

// let mixer
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''
let model

const init = () => {
	// engineClock = clock
	loadModel('models/airplane.gltf').then((gltf) => {
		model = gltf.scene
		console.log(model)
		animateHelix()
		Scene.scene.add(model)

		// const box = new THREE.BoxHelper(model, 0xffff00 );
		// scene.add( box );

		/**
		 * Keyboard Events
		 */
		setupKeys()

	})
}

const animateHelix = () => {
	const helix = Utils.getElementFromModel(model, 'helix')
	gsap.to(helix.rotation, {
		duration: .25,
		z: Math.PI * 2,
		repeat: -1,
		ease: 'linear',
	})
}

const setupKeys = () => {
	document.addEventListener('keydown', (event) => {
		const keyPressed = event.key
		if (keyPressed === 'ArrowRight') {
			moveX(3)
		} else if (keyPressed === 'ArrowLeft') {
			moveX(-3)
		}

		if (keyPressed === 'ArrowUp') {
			moveY(5)
		} else if (keyPressed === 'ArrowDown') {
			moveY(-5)
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

const moveX = (pos) => {
	gsap.to(model.position, {
		duration: 1,
		x: pos,
		ease: 'linear',
	})
	gsap.to(model.rotation, {
		duration: 1,
		z: pos * .2,
		ease: 'linear',
	})
}

const moveY = (pos) => {
	gsap.to(model.position, {
		duration: 1,
		y: pos,
		ease: 'linear',
	})
}

const tick = () => {
	if (model?.position) {
		Camera.camera.lookAt(model.position)
	}
}

export {
	init,
	tick,
}