import * as Scene from './Scene'
import * as Camera from './Camera'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
// import { GUI } from 'dat.gui'
import { gsap } from 'gsap'

let model
const smokePool = []
let currentSmokeIndex = 0

const init = () => {
	const material = new THREE.MeshStandardMaterial({
		color: 0x000000,
	})
	const geometry = new THREE.BoxGeometry(
		.3,
		.3,
		.3
	)
	// animate()
	for (let i=0; i<50; i++) {
		// model = new THREE.Mesh(geometry, material)
		const smoke = new THREE.Mesh(geometry, material)
		smoke.visible = false
		smokePool.push(smoke)
		Scene.scene.add(smoke)
	}
	// model.position.set(0, 5, 0)
	// buildBoatBody()
	
	// Scene.scene.add(model)
	// initPhysics(physWorld)
	// torque = vehicle.torque

	// followCam.position.copy(Camera.camera.position)
	// Scene.scene.add(followCam)
	// followCam.parent = model

	// addListeners()

	// const axesHelper = new THREE.AxesHelper(3)
	// model.add(axesHelper)
}

const animate = (model) => {
	model.visible = true
	const timeline = gsap.timeline()
	timeline.to(model.position, {
		duration: 1,
		z: 0,
	})
	timeline.to(model.scale, {
		duration: 1,
		x: 4,
		y: 4,
		z: 4,
	}, '<')
	timeline.to(model.scale, {
		duration: 1,
		x: 0,
		y: 0,
		z: 0,
		onComplete: () => {
			model.visible = false
		}
	})
	timeline.to(model.position, {
		duration: 1,
		z: 6,
	}, '1')
	timeline.to(model.rotation, {
		duration: 1,
		x: Math.PI * (Math.random() * 2),
		y: Math.PI * (Math.random() * 2),
		z: Math.PI * (Math.random() * 2),
	}, '0')
}

const activate = (smokeHolder) => {
	currentSmokeIndex++
	if (currentSmokeIndex >= 50) {
		currentSmokeIndex = 0
	}
	const currentSmoke = smokePool[currentSmokeIndex]
	// const currentSmoke = smokePool.find((element) => element.visible === false)
	currentSmoke.visible = true
	const worldPosition = new THREE.Vector3()
	smokeHolder.getWorldPosition(worldPosition)
	currentSmoke.position.set(
		worldPosition.x,
		worldPosition.y,
		worldPosition.z,
	)
	animate(currentSmoke)
}

const tick = (delta) => {
	

}

export {
	init,
	model,
	activate,
	tick,
}