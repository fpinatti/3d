import { loadModel } from './Model'
import * as Scene from './Scene'
import * as Camera from './Camera'
import * as World from './World'
import * as Clouds from './Clouds'
import * as Billboard from './Billboard'
import * as THREE from 'three'
import * as Utils from '../utils/utils'
import gsap from 'gsap'

// let mixer
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''
const targetLookAt = new THREE.Vector3(0, 0, 0)
let model
let isLanded = false
let isLanding = false
let isTakingoff = false
// const airplanePosition = new THREE.Vector3(0, -4, 0)
const airplanePosition = new THREE.Vector3(0, 0, 0)

const init = (texture) => {
	// engineClock = clock
	loadModel('models/airplane.glb').then((gltf) => {
		model = gltf.scene
		const material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map: texture,
		})
		model.traverse((child) => {
			texture.flipY = false
			child.material = material
			child.castShadow = true
			child.receiveShadow = true
			// console.log('>', child)
		})
		model.position.y = airplanePosition.y
		Scene.scene.add(model)
		model.add(Camera.camera)
		// Camera.camera.position.set(0, 2, -10)
		Camera.camera.position.set(-5, 3, 7)

		// const box = new THREE.BoxHelper(model, 0xffff00 );
		// scene.add( box );

		/**
		 * Keyboard Events
		 */
		setupKeys()

	})
}

const doTakeOff = () => {
	isTakingoff = true
	World.doTakeOff()
	animateHelix()
	gsap.to(Camera.camera.position, {
		duration: 4,
		x: 0,
		y: 2,
		z: -10,
		repeat: 0,
		ease: 'Power3.easeInOut',
	})

	gsap.to(targetLookAt, {
		duration: 4,
		y: 14,
		repeat: 0,
		ease: 'Power3.easeInOut',
		delay: 1,
	})

	gsap.to(airplanePosition, {
		duration: 4,
		y: 10,
		repeat: 0,
		ease: 'Power3.easeInOut',
		delay: 3,
		onUpdate: () => {
			model.position.y = airplanePosition.y
		},
		onComplete: () => {
			isTakingoff = false
			Clouds.startAnim()
			
		},
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
	
	// airplanePosition = new THREE.Vector3(0, -4, 0)
}

const setupKeys = () => {
	document.addEventListener('keydown', (event) => {
		if (isLanding || isTakingoff) return
		const keyPressed = event.key
		if (keyPressed === 'ArrowRight') {
			moveX(3)
		} else if (keyPressed === 'ArrowLeft') {
			moveX(-3)
		}

		if (keyPressed === 'ArrowUp') {
			moveY(5)
		} else if (keyPressed === 'ArrowDown') {
			moveY(-2)
		}

		if (keyPressed === 'l') {
			doLanding()
		}
		if (keyPressed === 't') {
			doTakeOff()
		}
	})

	document.addEventListener('keyup', () => {
		
		if (isLanding || isTakingoff) return

		gsap.to(Camera.camera.position, {
			duration: 1,
			y: 2,
			ease: 'Cubic.easeInOut',
		})

		gsap.to(model.position, {
			duration: 1,
			x: airplanePosition.x,
			y: airplanePosition.y,
			ease: 'linear',
		})
		gsap.to(model.rotation, {
			duration: 1,
			z: 0,
			x: 0,
			ease: 'linear',
		})
	})
}

const moveX = (pos) => {
	gsap.to(model.position, {
		duration: 1,
		x: (airplanePosition.x + pos) * 2,
		ease: 'linear',
	})
	gsap.to(model.rotation, {
		duration: 1,
		z: pos * .1,
		ease: 'linear',
	})
}

const moveY = (pos) => {
	gsap.to(Camera.camera.position, {
		duration: 1,
		y: (2 + pos) * .6,
		ease: 'Cubic.easeInOut',
	})

	gsap.to(model.position, {
		duration: 1,
		y: airplanePosition.y + (pos * .2),
		ease: 'linear',
	})
	gsap.to(model.rotation, {
		duration: 1,
		x: (pos * .05),
		ease: 'linear',
	})
}

const doLanding = () => {
	World.doLanding()
	Billboard.fadeOut()
	isLanding = true

	const helix = Utils.getElementFromModel(model, 'helix')

	const tl = gsap.timeline({repeat: 0})
	tl.to(model.position, {y: 0, z: -20, duration: 3, ease: 'Sin.easeInOut'})
	tl.to(helix.rotation, {
		z: helix.rotation.z + Math.PI * 30,
		duration: 10,
		ease: 'Sin.easeInOut',
		onComplete: () => {
			gsap.killTweensOf(helix.rotation)
			isLanded = true
		},
	})

	gsap.to(targetLookAt, {
		duration: 3,
		y: 0,
		z: -8,
		x: 6,
		ease: 'Sin.easeInOut',
	})

	gsap.to(Camera.camera.position, {
		duration: 4,
		z: 9,
		x: -12,
		y: 6,
		repeat: 0,
		ease: 'Power2.easeInOut',
	})

	Clouds.fadeOut()
}

const billboardIn = () => {

	gsap.to(Camera.camera.position, {
		duration: 1,
		x:-5,
		ease: 'Cubic.easeInOut',
	})
	gsap.to(targetLookAt, {
		duration: 1,
		x:-5,
		ease: 'Cubic.easeInOut',
	})
}

const tick = () => {
	if (model?.position && !isLanded) {
		Camera.camera.lookAt(targetLookAt)
	}
}

export {
	init,
	tick,
	billboardIn,
}