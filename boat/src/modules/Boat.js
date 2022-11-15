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
const wheelBodies = []
let physics
const currentSteering = {
	value: 0
}
let vehicle
const vehicleWeight = 40
const vehicleWidth = 2
const vehicleHeight = 1
const vehicleDepth = 2.5
const engineForce = 2000
let currentForce = 0
const followCam = new THREE.Object3D()
const camCenterPivot = new THREE.Object3D()
const isFollowCamEnabled = false
let brakeLight
const camPositions = [
	new THREE.Vector3(0, 5, 10),
	new THREE.Vector3(0, 3, 4.4),
]
let impulsePoint = 1
let currentCamPosition = 0
let smokeHolder
let smokeTimer
let timao
let wheelBar
let wheel1
let wheel2
// let planetMesh

const init = (physWorld) => {
	// buildBoatBody()
	loadBoatModel()
	
	Scene.scene.add(model)
	initPhysics(physWorld)

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
	smokeHolder.position.set(0, 4, .5)
	// const axesHelper = new THREE.AxesHelper(3)
	// smokeHolder.add(axesHelper)
	model.add(smokeHolder)

	Smoke.init()
	smokeTimer = setInterval(animateSmoke, 500)
}

const loadBoatModel = () => {
	const boat = new THREE.Group()
	loadModel('models/steamboat.glb').then((gltf) => {
		// console.log(gltf.scene)
		// gltf.children.map((element) => {
		gltf.scene.traverse((element) => {
			// console.log(element.name)
			if (element.name === 'timao') {
				timao = element
			} else if (element.name === 'wheelBar') {
				wheelBar = element
			} else if (element.name === 'wheel1') {
				wheel1 = element
			} else if (element.name === 'wheel2') {
				wheel2 = element
			}
			element.receiveShadow = true
			element.castShadow = true
		// 	// if (element.name === 'head-group') {
		// 	// 	head = element
		// 	// 	animateEyes(element.children.find(element => element.name === 'eyes'))
		// 	// } else if (element.name === 'carrot') {
		// 	// 	carrot = element
		// 	// 	carrot.position.z = 3
		// 	// }
		// 	// console.log(element)
		// 	// if (bakedVersion) {
		// 	// 	if (element.name.indexOf('picture') >= 0) {
		// 	// 		console.log('picture')
		// 	// 		element.material = pictureMaterial
		// 	// 	} else {
		// 	// 		element.material = bakedMaterial
		// 	// 	}
		// 	// }
		})
		boat.add(gltf.scene)
		// Scene.scene.add(gltf.scene)
		gltf.scene.scale.set(2.5, 2.5, 2.5)
		gltf.scene.position.y = -2
		gltf.scene.rotation.y = Math.PI
		model.add(boat)
		model.castShadow = true
		// window.addEventListener('mousemove', onMouseMove)
	})
}

const animateSmoke = () => {
	if (!currentForce) return
	Smoke.activate(smokeHolder)
}

const floatImpulse = () => {
	// console.log('float')
	impulsePoint *= -1
	vehicle.applyLocalImpulse(
		new CANNON.Vec3(0, 200, 0),
		new CANNON.Vec3(0, 0, impulsePoint)
	)
}

// const buildBoatBody = () => {
// 	const boat = new THREE.Group()
// 	const bodyMat = new THREE.MeshStandardMaterial({
// 		color: 0xffcaee,
// 	})
// 	const shipBody = new THREE.BoxGeometry(
// 		vehicleWidth * 2,
// 		vehicleHeight * 2,
// 		vehicleDepth * 2
// 	)
// 	const boatSegment1 = new THREE.Mesh(shipBody, bodyMat)
// 	boatSegment1.castShadow = true
// 	boatSegment1.receiveShadow = true
// 	const boatSegment2 = new THREE.Mesh(shipBody, bodyMat)
// 	boatSegment2.scale.set(.8, 1, .7)
// 	boatSegment2.position.set(0, -2, 0)
// 	boatSegment2.castShadow = true
// 	boatSegment2.receiveShadow = true
// 	const boatChimney = new THREE.Mesh(shipBody, bodyMat)
// 	boatChimney.scale.set(.3, 1, .1)
// 	boatChimney.position.set(0, 2, 4)
// 	boatChimney.castShadow = true
// 	boatChimney.receiveShadow = true
// 	boat.add(boatSegment1)
// 	boat.add(boatSegment2)
// 	boat.add(boatChimney)
// 	model.add(boat)
// 	model.castShadow = true
// }

const onKeyDown = (evt) => {
	// console.log(evt)
	switch (evt.code) {
	case 'ArrowUp':
		if (currentForce < 0) return
		currentForce = -engineForce
		updateWheelAnimation()
		// animateSmoke()
		break
	case 'ArrowDown':
		if (currentForce > 0) return
		// animateSmoke()
		updateWheelAnimation()
		currentForce = engineForce
		break
	case 'ArrowRight':
		// vehicle.torque = new CANNON.Vec3(10000, 0, 0)
		gsap.to(currentSteering, {
			duration: 1,
			value: -1
		})
		// steering = 1
		break 
	case 'ArrowLeft':
		// steering = -1
		gsap.to(currentSteering, {
			duration: 1,
			value: 1
		})
		break 
	// case 40:
	// 	brakeLight.material.color.set('#ff0000')
	// 	vehicle.setBrake(0, 2)
	// 	vehicle.setBrake(0, 3)
	// 	vehicle.applyEngineForce(-engineForce, 2)
	// 	vehicle.applyEngineForce(-engineForce, 3)
	// 	break
	// case 49: // camera Number 1
	// 	currentCamPosition = 0
	// 	changeCamera()
	// 	// Camera.camera.position.set(0, 5, 10)
	// 	// followCam.position.copy(Camera.camera.position)
	// 	break
	// case 50: // camera Number 2
	// 	currentCamPosition = 1
	// 	changeCamera()
	// 	// camCenterPivot.position.x = 2
	// 	// Camera.camera.position.set(0, 3, 4.4)
	// 	// followCam.position.copy(Camera.camera.position)
	// 	break 
	}
}

const updateWheelAnimation = () => {
	// if (wheel1 && wheel2) {
	// 	gsap.to(wheel1.rotation, {
	// 		duration: 1,
	// 		x: wheel1.rotation.x + currentForce
	// 	})
		
	// 	// wheel1.rotation.x += vehicle.velocity.z
	// 	// wheel2.rotation.x += vehicle.velocity.z
	// }
}

// const changeCamera = () => {
// 	const currentCamera = camPositions[currentCamPosition]
// 	// gsap.to(Camera.camera.position, {
// 	// 	x: currentCamera.x,
// 	// 	y: currentCamera.y,
// 	// 	z: currentCamera.z,
// 	// 	duration: 2,
// 	// 	onUpdate: () => {
// 	// 		// followCam.position.copy(Camera.camera.position)
// 	// 	}
// 	// })
	
// 	Camera.camera.position.set(
// 		currentCamera.x,
// 		currentCamera.y,
// 		currentCamera.z
// 	)
// 	followCam.position.copy(Camera.camera.position)
// }

const onKeyUp = (evt) => {
	switch (evt.code) {
	case 'ArrowUp':
	case 'ArrowDown':
		// gsap.to(currentSteering, {
		// 	duration: .3,
		// 	value: 0
		// })
		currentForce = 0
		break
	case 'ArrowLeft':
	case 'ArrowRight':
		gsap.to(currentSteering, {
			duration: 1,
			value: 0
		})
	}
	// vehicle.applyEngineForce(0, 2)
	// vehicle.applyEngineForce(0, 3)
	// console.log('key up', evt.keyCode)
}

const addListeners = () => {
	document.addEventListener('keydown', onKeyDown)
	document.addEventListener('keyup', onKeyUp)
	addEventListener(Joystick.MOVE_JOYSTICK_EVENT, (evt) => {
		// thrust
		currentForce = engineForce * -evt.detail.y
		updateWheelAnimation()
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

const initPhysics = (world) => {

	/**
	 * Vehicle
	 */
	vehicle = new CANNON.Body({
		mass: vehicleWeight,
		position: new CANNON.Vec3(0, 3, -5),
		angularDamping: .8,
		linearDamping: 1,
		shape: new CANNON.Box(new CANNON.Vec3(vehicleWidth, vehicleHeight, vehicleDepth))
	})
	
	world.addBody(vehicle)


	// Update the wheel bodies
	world.addEventListener('postStep', tickPhysics)

}

const tickPhysics = () => {
	// for (let i = 0; i < vehicle.wheelInfos.length; i++) {
	// 	vehicle.updateWheelTransform(i)
	// 	const wheelInfo = vehicle.wheelInfos[i]
	// 	const transform = wheelInfo.worldTransform
	// 	const wheelBody = wheelBodies[i]
	// 	wheelBody.customMesh.position.copy(transform.position)
	// 	wheelBody.customMesh.quaternion.copy(transform.quaternion)
	// }
	
	vehicle.angularVelocity = new CANNON.Vec3(0, currentSteering.value, 0)
	vehicle.applyLocalForce(
		new CANNON.Vec3(0, 0, currentForce),
		new CANNON.Vec3(0, 0, 1),
	)
	// console.log(vehicle.velocity.length())
	// console.log(vehicle.velocity)
	// vehicle.torque = new CANNON.Vec3(0, steering * 5000, 0)

	model.position.copy(vehicle.position)
	model.quaternion.copy(vehicle.quaternion)

	if (wheel1 && wheel2) {
		// const v1 = new CANNON.Vec3()
		const speedRotation = Math.round(vehicle.velocity.lengthSquared())
		wheel1.rotation.x += speedRotation * .01
		wheel2.rotation.x += speedRotation * .01
	}

	if (timao) {
		timao.rotation.z += currentSteering.value * .1
	}
	// torque += steering
	// console.log(steering)
	// console.log(vehicle.chassisBody.velocity.z)
}

const tick = (delta) => {
	
	// if (vehicle.position.y < 2) {
	// 	waveStrenght = 10
	// }

	// if (vehicle.position.y > 2.5) {
	// 	waveStrenght = 0
	// }
	// // deltaTime = Math.abs(Math.sin(deltaTime * .3))
	// // vehicle.velocity.y += 1
	// vehicle.applyLocalImpulse(
	// 	new CANNON.Vec3(0, waveStrenght, 0),
	// 	new CANNON.Vec3()
	// )

	vehicle.position.y = (Math.sin(delta) + 2) * .3
	vehicle.torque.z = (Math.sin(delta)) * 300
	vehicle.torque.x = (Math.sin(delta)) * 300

	// console.log((Math.sin(delta)) * 300)
	// vehicle.position.y = 0
	
	if (isFollowCamEnabled) {
		Camera.camera.position.lerp(followCam.getWorldPosition(new THREE.Vector3()),  1)
		const lookOffset = model.position.add(camCenterPivot.position)
		// camCenterPivot.position.y -= .001
		// lookOffset.x += 3
		Camera.camera.lookAt(lookOffset)
	}

	Camera.camera.lookAt(new THREE.Vector3(
		vehicle.position.x,
		0,
		0,
	))
	// console.log(Camera.camera)

	// console.log(vehicle)

}

export {
	init,
	model,
	physics,
	tick,
}