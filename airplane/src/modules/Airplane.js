import * as Scene from './Scene'
import * as Smoke from './Smoke'
import * as Camera from './Camera'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { loadModel } from './Model'
import * as Joystick from './Joystick'
// import { GUI } from 'dat.gui'
import { gsap } from 'gsap'

const model = new THREE.Group()
let physics
const currentSteering = {
	value: 0
}
let vehicle
const vehicleWeight = 30
const vehicleWidth = 6
const vehicleHeight = 1
const vehicleDepth = 5
const engineForce = 2000
let currentForce = 0
const followCam = new THREE.Object3D()
const camCenterPivot = new THREE.Object3D()
const isFollowCamEnabled = true
const camPositions = [
	new THREE.Vector3(0, 5, 10),
	new THREE.Vector3(0, 3, 4.4),
]
let smokeHolder
let smokeTimer

const init = (physWorld, airPlanePhysMaterial) => {
	buildBody()
	// loadBoatModel()
	
	Scene.scene.add(model)
	initPhysics(physWorld, airPlanePhysMaterial)

	followCam.position.copy(Camera.camera.position)
	Scene.scene.add(followCam)
	followCam.parent = model

	addListeners()

	buildSmokeHolder()

	// for (let i=0; i<50; i++) {
	// 	const smoke = Smoke.init(i)
	// 	smokePool.push(smoke)
	// 	Scene.scene.add(smoke.model)
	// }
	// animateSmoke()


}

const buildSmokeHolder = () => {
	smokeHolder = new THREE.Group()
	smokeHolder.position.set(0, 0, 3)
	const axesHelper = new THREE.AxesHelper(3)
	smokeHolder.add(axesHelper)
	model.add(smokeHolder)

	Smoke.init()
	smokeTimer = setInterval(animateSmoke, 100)
}

const buildBody = () => {
	const airplane = new THREE.Group()
	const boxGeo = new THREE.BoxGeometry(1, 1, 1, 1)
	const boxMaterial = new THREE.MeshStandardMaterial({
		color: 0xFFFFFF
	})
	const box1 = new THREE.Mesh(boxGeo, boxMaterial)
	box1.castShadow = true
	box1.scale.z = vehicleDepth
	airplane.add(box1)
	const box2 = new THREE.Mesh(boxGeo, boxMaterial)
	box2.castShadow = true
	box2.scale.set(vehicleWidth, .3, 1)
	airplane.add(box2)
	const box3 = new THREE.Mesh(boxGeo, boxMaterial)
	box3.castShadow = true
	box3.scale.set(.3, 1, 1)
	box3.position.set(0, 1, 2)
	airplane.add(box3)
	// airplane.add(gltf.scene)
	model.add(airplane)
}

const animateSmoke = () => {
	if (!currentForce) return
	Smoke.activate(smokeHolder)
}

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

const initPhysics = (world, airPlanePhysMaterial) => {

	/**
	 * Vehicle
	 */
	vehicle = new CANNON.Body({
		mass: vehicleWeight,
		material: airPlanePhysMaterial,
		position: new CANNON.Vec3(0, 3, -5),
		angularDamping: 0,
		linearDamping: .1,
		shape: new CANNON.Box(new CANNON.Vec3(vehicleWidth / 2, vehicleHeight / 2, vehicleDepth / 2))
	})
	
	world.addBody(vehicle)


	// Update the wheel bodies
	world.addEventListener('postStep', tickPhysics)

}

const tickPhysics = () => {
	
	// vehicle.angularVelocity = new CANNON.Vec3(0, currentSteering.value, 0)
	// vehicle.torque.y = currentSteering.value * 10
	vehicle.angularVelocity.y = currentSteering.value
	vehicle.angularVelocity.z = currentSteering.value
	let takeOffFactor = 0
	if (vehicle.velocity.z <= -30) {
		takeOffFactor = vehicle.velocity.z * -6
	}
	
	vehicle.applyLocalForce(
		new CANNON.Vec3(0, takeOffFactor, currentForce * .1),
	)
	model.position.copy(vehicle.position)
	model.quaternion.copy(vehicle.quaternion)

}

const tick = (delta) => {
	

	if (isFollowCamEnabled) {
		Camera.camera.position.lerp(followCam.getWorldPosition(new THREE.Vector3()),  1)
		const lookOffset = model.position.add(camCenterPivot.position)
		// camCenterPivot.position.y -= .001
		// lookOffset.x += 3
		Camera.camera.lookAt(lookOffset)
	}

	// Camera.camera.lookAt(new THREE.Vector3(
	// 	vehicle.position.x,
	// 	0,
	// 	0,
	// ))
	// console.log(Camera.camera)

	// console.log(vehicle)

}

export {
	init,
	model,
	physics,
	tick,
}