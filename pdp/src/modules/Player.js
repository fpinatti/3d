import { loadModel } from './Model'
import * as THREE from 'three'
import * as Scene from './Scene'

let mixer
let idleAction, walkAction
let engineClock
let keyPressed = ''
let model

const init = (gltf) => {
	
	model = gltf.scene
	/**
	 * Skeleton
	 */
	const skeleton = new THREE.SkeletonHelper(model)
	// skeleton.visible = false
	Scene.scene.add(skeleton)
	/**
	 * Animations
	 */
	setupAnimations(gltf)
	Scene.scene.add(model)

	/**
	 * Keyboard Events
	 */
	setupKeys()

}

const setupKeys = () => {
	document.addEventListener('keydown', (event) => {
		keyPressed = event.key
		if (keyPressed === 'ArrowRight') {
			walkAction.play()
		}
	})

	document.addEventListener('keyup', () => {
		keyPressed = ''
		walkAction.stop()
	})
}

const setupAnimations = (gltf) => {
	const animations = gltf.animations
	mixer = new THREE.AnimationMixer(gltf.scene)
	idleAction = mixer.clipAction(animations[0])
	walkAction = mixer.clipAction(animations[1])
	idleAction.play()
	walkAction.setEffectiveTimeScale(2)
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
	model,
}