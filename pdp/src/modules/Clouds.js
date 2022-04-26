import { loadModel } from './Model'
import * as Scene from './Scene'
// import * as Camera from './Camera'
import * as THREE from 'three'
// import * as Utils from '../utils/utils'
import gsap from 'gsap'

// let mixer
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''
let model
let mixer
let action
let cloudWrapper = new THREE.Group()
cloudWrapper.position.y = -4

const init = () => {
	// engineClock = clock
	Scene.scene.add(cloudWrapper)
	loadModel('models/clouds-smoke.glb').then((gltf) => {
		// console.log(gltf)
		model = gltf.scene
		model.scale.set(.6, .6, .6)
		model.position.y = 3
		// console.log(model)
		cloudWrapper.add(model)
		
		mixer = new THREE.AnimationMixer(model)
		const clips = gltf.animations
		mixer.timeScale = .1
		// console.log(clips)
		const clip = THREE.AnimationClip.findByName(clips, 'KeyAction')
		action = mixer.clipAction(clip)
		action.clampWhenFinished = true
		action.setLoop(THREE.LoopOnce)
		action.play()

		cloudWrapper.rotation.x = Math.PI
		rotateClouds()

	})
}

const rotateClouds = () => {
	gsap.to(cloudWrapper.rotation, {
		duration: 20,
		x: Math.PI * -2.5,
		repeat: -1,
		onRepeat: () => {
			model.position.x = (Math.random() * 8) - 4
			action.stop()
			action.reset()
			action.play()
		},
		ease: 'linear',
	})
}

const tick = (delta) => {
	if (mixer) {
		mixer.update(delta)
	}
}


export {
	init,
	tick,
}