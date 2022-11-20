import * as Scene from './Scene'
import * as Smoke from './Smoke'
import * as Camera from './Camera'
import * as THREE from 'three'
import { getAsset } from './AssetLoader'
import * as Joystick from './Joystick'
// import { GUI } from 'dat.gui'
import { gsap } from 'gsap'

const model = new THREE.Group()
const currentSteering = {
	value: 0
}
let vehicle
const wheels = []
const vehicleWeight = 30
const vehicleWidth = 1.6
const vehicleHeight = .5
const vehicleDepth = 3
const engineForce = 2000
let currentForce = 0
const followCam = new THREE.Object3D()
const camCenterPivot = new THREE.Object3D()
const isFollowCamEnabled = false
const camPositions = [
	new THREE.Vector3(0, 5, 10),
	new THREE.Vector3(0, 3, 4.4),
]
let vrCam
// let smokeHolder
// let smokeTimer

const init = () => {
	buildBody()
	// loadBoatModel()
	
	Scene.scene.add(model)

	followCam.position.copy(Camera.camera.position)
	Scene.scene.add(followCam)
	followCam.parent = model

	vrCam = new THREE.Object3D()
	vrCam.position.set(0, .3, -.5)
	vrCam.rotation.y = Math.PI
	const axesHelper = new THREE.AxesHelper()
	vrCam.add(axesHelper)
	model.add(vrCam)

	addListeners()

	// buildSmokeHolder()

	// for (let i=0; i<50; i++) {
	// 	const smoke = Smoke.init(i)
	// 	smokePool.push(smoke)
	// 	Scene.scene.add(smoke.model)
	// }
	// animateSmoke()


}

// const buildSmokeHolder = () => {
// 	smokeHolder = new THREE.Group()
// 	smokeHolder.position.set(0, 0, 3)
// 	const axesHelper = new THREE.AxesHelper(3)
// 	smokeHolder.add(axesHelper)
// 	model.add(smokeHolder)

// 	Smoke.init()
// smokeTimer = setInterval(animateSmoke, 100)
// }

const buildBody = () => {
	const player = new THREE.Group()
	const playerModel = getAsset('police')
	playerModel.scene.position.y = .1
	playerModel.scene.rotation.y = Math.PI
	player.add(playerModel.scene)
	model.castShadow = true
	model.matrixAutoUpdate = false
	model.add(player)
}

// const animateSmoke = () => {
// 	if (!currentForce) return
// 	Smoke.activate(smokeHolder)
// }

const addListeners = () => {
	addEventListener(Joystick.MOVE_JOYSTICK_EVENT, (evt) => {
		// throttle
		currentForce = engineForce * -evt.detail.y
		// leme
		gsap.to(currentSteering, {
			duration: 1,
			value: evt.detail.x * -1
		})
	})
	addEventListener(Joystick.RELEASE_JOYSTICK_EVENT, () => {
		currentForce = 0
		gsap.to(currentSteering, {
			duration: 1,
			value: 0
		})
	})
}

const tick = (delta) => {
	

}

export {
	init,
	model,
	tick,
	vrCam,
}