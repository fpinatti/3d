import * as Scene from './Scene'
import * as Camera from './Camera'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
// import { GUI } from 'dat.gui'
import { gsap } from 'gsap'
// import { getTexture } from './Material'
// import * as Camera from './Camera'

// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()
const model = new THREE.Group()
const wheelBodies = []
let physics
const currentSteering = {
	value: 0
}
const wheelMeshes = []
let vehicle
const wheelRadius = 1.3
const carWeight = 50
const carBodyWidth = 2
const carBodyHeight = 1
const carBodyDepth = 5.5
const engineForce = 200
const maxSteeringAngle = .3
const followCam = new THREE.Object3D()
const camCenterPivot = new THREE.Object3D()
const isFollowCamEnabled = true
let brakeLight
const camPositions = [
	new THREE.Vector3(0, 5, 10),
	new THREE.Vector3(0, 3, 4.4),
]
let currentCamPosition = 0
// let planetMesh

const init = (physWorld, wheelMaterial) => {
	buildCarBody()

	/**
	 * Wheels
	 */
	buildWheel()
	buildWheel()
	buildWheel()
	buildWheel()

	Scene.scene.add(model)
	initPhysics(physWorld, wheelMaterial)

	followCam.position.copy(Camera.camera.position)
	Scene.scene.add(followCam)
	followCam.parent = model

	brakeLight.material.color.set('#cc0000')

	addListeners()

}

const buildWheel = () => {

	const mesh = new THREE.Group()
	mesh.castShadow = true

	const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, 1.5, 12, 1)
	const tireColor = new THREE.MeshStandardMaterial({
		color: 0x111111,
		roughness: 0.2,
	})
	const rimColor = new THREE.MeshStandardMaterial({
		color: 0xdead36,
		metalness: .5,
	})

	const wheel = new THREE.Group()
	// wheel.castShadow = true
	const tire = new THREE.Mesh(wheelGeo, tireColor)
	const rim = new THREE.Mesh(wheelGeo, rimColor)
	wheel.castShadow = true
	rim.scale.set(.6, 1.2, .6)
	wheel.add(rim)
	wheel.add(tire)

	wheel.rotation.set(0, 0, Math.PI * -.5)
	mesh.add(wheel)
	Scene.scene.add(mesh)
	wheelMeshes.push(mesh)

	return wheel
}

const buildCarBody = () => {
	const car = new THREE.Group()
	const bodyMat = new THREE.MeshPhongMaterial({
		color: 0xffcaee,
	})
	const neutralMat = new THREE.MeshPhongMaterial({
		color: 0xffffff,
	})
	const bodySegment1 = new THREE.BoxGeometry(1, 1, 1)
	const carSegment1 = new THREE.Mesh(bodySegment1, bodyMat)
	carSegment1.scale.set(4, 2, 5)
	carSegment1.castShadow = true
	carSegment1.receiveShadow = true
	const carSegment2 = new THREE.Mesh(bodySegment1, bodyMat)
	carSegment2.scale.set(2, 1, 3)
	carSegment2.position.set(0, 0, -4)
	carSegment2.castShadow = true
	carSegment2.receiveShadow = true
	const carSegment3 = new THREE.Mesh(bodySegment1, bodyMat)
	carSegment3.scale.set(2, 1, 3)
	carSegment3.position.set(0, 0, 3)
	carSegment3.castShadow = true
	carSegment3.receiveShadow = true
	const airFoilBase1 = new THREE.Mesh(bodySegment1, bodyMat)
	airFoilBase1.scale.set(.2, 1, .2)
	airFoilBase1.position.set(1, 1, 4)
	airFoilBase1.castShadow = true
	airFoilBase1.receiveShadow = true
	const airFoilBase2 = new THREE.Mesh(bodySegment1, bodyMat)
	airFoilBase2.scale.set(.2, 1, .2)
	airFoilBase2.position.set(-1, 1, 4)
	const airFoil = new THREE.Mesh(bodySegment1, bodyMat)
	airFoil.scale.set(4, .3, 1)
	airFoil.position.set(0, 1.4, 4)
	airFoil.castShadow = true
	airFoil.receiveShadow = true
	const frontWing = new THREE.Mesh(bodySegment1, bodyMat)
	frontWing.scale.set(5, .3, 1)
	frontWing.position.set(0, 0, -5.5)
	brakeLight = new THREE.Mesh(bodySegment1, neutralMat)
	brakeLight.name = 'brakeLight'
	brakeLight.scale.set(1, .3, .2)
	brakeLight.position.set(0, 0, 4.5)
	car.add(carSegment1)
	car.add(carSegment2)
	car.add(carSegment3)
	car.add(airFoilBase1)
	car.add(airFoilBase2)
	car.add(airFoil)
	car.add(frontWing)
	car.add(brakeLight)
	model.add(car)
	model.castShadow = true
}

const onKeyDown = (evt) => {
	switch (evt.keyCode) {
	case 38:
		vehicle.setBrake(0, 2)
		vehicle.setBrake(0, 3)
		vehicle.applyEngineForce(engineForce, 2)
		vehicle.applyEngineForce(engineForce, 3)
		break
	case 39:
		gsap.to(currentSteering, {
			duration: .3,
			value: -maxSteeringAngle
		})
		break 
	case 37:
		gsap.to(currentSteering, {
			duration: .3,
			value: maxSteeringAngle
		})
		break 
	case 40:
		brakeLight.material.color.set('#ff0000')
		vehicle.setBrake(0, 2)
		vehicle.setBrake(0, 3)
		vehicle.applyEngineForce(-engineForce, 2)
		vehicle.applyEngineForce(-engineForce, 3)
		break
	case 49: // camera Number 1
		currentCamPosition = 0
		changeCamera()
		// Camera.camera.position.set(0, 5, 10)
		// followCam.position.copy(Camera.camera.position)
		break
	case 50: // camera Number 2
		currentCamPosition = 1
		changeCamera()
		// camCenterPivot.position.x = 2
		// Camera.camera.position.set(0, 3, 4.4)
		// followCam.position.copy(Camera.camera.position)
		break 
	}
}

const changeCamera = () => {
	const currentCamera = camPositions[currentCamPosition]
	// gsap.to(Camera.camera.position, {
	// 	x: currentCamera.x,
	// 	y: currentCamera.y,
	// 	z: currentCamera.z,
	// 	duration: 2,
	// 	onUpdate: () => {
	// 		// followCam.position.copy(Camera.camera.position)
	// 	}
	// })
	
	Camera.camera.position.set(
		currentCamera.x,
		currentCamera.y,
		currentCamera.z
	)
	followCam.position.copy(Camera.camera.position)
}

const onKeyUp = (evt) => {
	switch (evt.keyCode) {
	case 37:
	case 39:
		gsap.to(currentSteering, {
			duration: .3,
			value: 0
		})
		break
	case 40:
		brakeLight.material.color.set('#cc0000')
	}
	vehicle.applyEngineForce(0, 2)
	vehicle.applyEngineForce(0, 3)
	console.log('key up', evt.keyCode)
}

const addListeners = () => {
	document.addEventListener('keydown', onKeyDown)
	document.addEventListener('keyup', onKeyUp)
}

const initPhysics = (world, wheelMaterial) => {

	/**
	 * Vehicle
	 */
	let chassisBody = new CANNON.Body({
		mass: carWeight,
		position: new CANNON.Vec3(0, 3, -5),
		angularDamping: .1,
		shape: new CANNON.Box(new CANNON.Vec3(carBodyWidth, carBodyHeight, carBodyDepth))
	})
	chassisBody.angularVelocity.set(0, 0, 0)
	vehicle = new CANNON.RaycastVehicle({
		chassisBody,
		indexRightAxis: 0,
		indexUpAxis: 1,
		indexForwardAxis: 2
	})

	/**
	 * Wheels
	 */
	const wheelOptions = {
		radius: wheelRadius,
		directionLocal: new CANNON.Vec3(0, -1, 0),
		suspensionStiffness: 45,
		suspensionRestLength: 0.4,
		frictionSlip: 5,
		dampingRelaxation: 2.3,
		dampingCompression: 4.5,
		maxSuspensionForce: 200000,
		rollInfluence:  .1,
		axleLocal: new CANNON.Vec3(-1, 0, 0),
		chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
		maxSuspensionTravel: 0.25,
		customSlidingRotationalSpeed: -30,
		useCustomSlidingRotationalSpeed: true
	}

	
	const axlewidth = 1.8
	wheelOptions.chassisConnectionPointLocal.set(axlewidth, 0, -3.8)
	vehicle.addWheel(wheelOptions)
	
	wheelOptions.chassisConnectionPointLocal.set(-axlewidth, 0, -3.8)
	vehicle.addWheel(wheelOptions)
	
	wheelOptions.chassisConnectionPointLocal.set(axlewidth, 0, 3)
	vehicle.addWheel(wheelOptions)
	
	wheelOptions.chassisConnectionPointLocal.set(-axlewidth, 0, 3)
	vehicle.addWheel(wheelOptions)
	
	vehicle.addToWorld(world)
	// Add the wheel bodies
	
	vehicle.wheelInfos.forEach((wheel) => {
		const cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20)
		const wheelBody = new CANNON.Body({
			mass: 1,
			material: wheelMaterial,
		})
		const q = new CANNON.Quaternion();
		q.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
		wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q)
		wheelBodies.push(wheelBody)
	})

	wheelBodies.map((wheel, index) => {
		wheelBodies[index].customMesh = wheelMeshes[index]
	})

	// Update the wheel bodies
	world.addEventListener('postStep', tickPhysics)

}

const tickPhysics = () => {
	for (let i = 0; i < vehicle.wheelInfos.length; i++) {
		vehicle.updateWheelTransform(i)
		const wheelInfo = vehicle.wheelInfos[i]
		const transform = wheelInfo.worldTransform
		const wheelBody = wheelBodies[i]
		wheelBody.customMesh.position.copy(transform.position)
		wheelBody.customMesh.quaternion.copy(transform.quaternion)
	}
	model.position.copy(vehicle.chassisBody.position)
	model.quaternion.copy(vehicle.chassisBody.quaternion)
	// console.log(vehicle.chassisBody.velocity.z)
}

const tick = () => {
	
	vehicle.setSteeringValue(currentSteering.value, 0)
	vehicle.setSteeringValue(currentSteering.value, 1)
	
	if (isFollowCamEnabled) {
		Camera.camera.position.lerp(followCam.getWorldPosition(new THREE.Vector3()),  1)
		const lookOffset = model.position.add(camCenterPivot.position)
		// camCenterPivot.position.y -= .001
		// lookOffset.x += 3
		Camera.camera.lookAt(lookOffset)
	}

	// console.log(vehicle)

}

export {
	init,
	model,
	physics,
	tick,
}