import { loadModel } from './Model'
import * as THREE from 'three'

let mixer
let idleAction, walkAction
let engineClock
let keyPressed = ''

const init = (scene, clock) => {
	engineClock = clock
	loadModel('models/pinatti_walk_2.gltf').then((gltf) => {
		const model = gltf.scene
		/**
		 * Skeleton
		 */
		const skeleton = new THREE.SkeletonHelper(model)
		// skeleton.visible = false
		scene.add(skeleton)
		/**
		 * Animations
		 */
		console.log('>>', gltf)
		setupAnimations(gltf)
		
		scene.add(model)

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

const setupAnimations = (gltf) => {
	const animations = gltf.animations
	console.log(' ANIMATIONS', animations)
	mixer = new THREE.AnimationMixer(gltf.scene)
	idleAction = mixer.clipAction(animations[0])
	walkAction = mixer.clipAction(animations[1])
	idleAction.stop()
	walkAction.play()
	walkAction.enabled = true
	idleAction.weight = 2
	// walkAction.setEffectiveTimeScale(2)
}

const tick = () => {
	let mixerUpdateDelta = engineClock.getDelta()
	if (mixer) {
		mixer.update(mixerUpdateDelta)
	}
}

export {
	init,
	tick,
}