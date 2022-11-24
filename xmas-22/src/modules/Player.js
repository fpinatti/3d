import * as Scene from './Scene'
import * as Smoke from './Smoke'
import * as Camera from './Camera'
import * as THREE from 'three'
import { getAsset } from './AssetLoader'
import * as Joystick from './Joystick'
import { gsap } from 'gsap'

const model = new THREE.Group()
let vrCam

const init = () => {
	// buildWorld()
	// buildHouse()
	
	Scene.scene.add(model)

	// followCam.position.copy(Camera.camera.position)
	// Scene.scene.add(followCam)
	// followCam.parent = model

	vrCam = new THREE.Object3D()
	vrCam.position.set(0, -1, -4.5)
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

const buildWorld = () => {
	const worldModel = getAsset('treePineSnow').scene
	Scene.scene.add(worldModel)
	const tree1 = worldModel.clone()
	tree1.position.set(1, 0, 0)
	const tree2 = worldModel.clone()
	tree2.position.set(.5, 0, .5)
	Scene.scene.add(tree1)
	Scene.scene.add(tree2)

	// const snowFort = getAsset('snowFort').scene
	// snowFort.scale.set(4, 4, 4)
	// snowFort.position.set(-3, 0, -2)
	// snowFort.rotation.set(0, Math.PI * -.5, 0)
	// Scene.scene.add(snowFort)

	const snowmanFancy = getAsset('snowmanFancy').scene
	snowmanFancy.scale.set(1.5, 1.5, 1.5)
	snowmanFancy.position.set(-1.5, 0, 2.5)
	snowmanFancy.rotation.set(0, Math.PI * -.25, 0)
	Scene.scene.add(snowmanFancy)

	const rockFormationLarge = getAsset('rockFormationLarge').scene
	rockFormationLarge.position.set(1, 0, -3)
	rockFormationLarge.scale.set(4, 2, 4)
	const rockFormation2 = rockFormationLarge.clone()
	rockFormation2.position.set(4, 0, -3)
	rockFormation2.scale.set(4, 3, 4)
	Scene.scene.add(rockFormationLarge)
	Scene.scene.add(rockFormation2)

	const present = getAsset('present').scene
	present.position.set(.6, 0, 2.2)
	Scene.scene.add(present)
	
	const candyCane = getAsset('candyCane').scene
	candyCane.position.set(0, 0, 2)
	Scene.scene.add(candyCane)

	const treeDecorated = getAsset('treeDecorated').scene
	treeDecorated.scale.set(1.3, 1.3, 1.3)
	treeDecorated.position.set(1.5, 0, 1.3)
	Scene.scene.add(treeDecorated)

	// const world = new THREE.Group()
	// const playerModel = getAsset('police')
	// playerModel.scene.position.y = .1
	// playerModel.scene.rotation.y = Math.PI
	// player.add(playerModel.scene)
	// model.castShadow = true
	// model.matrixAutoUpdate = false
	// model.add(player)
}

const buildHouse = () => {
	const house = new THREE.Object3D()
	Scene.scene.add(house)
	const cabinFloor = getAsset('cabinFloor').scene
	house.add(cabinFloor)
	// roof
	const cabinRoofFlat = getAsset('cabinRoofFlat').scene
	cabinRoofFlat.position.set(0, .96, 0)
	cabinRoofFlat.scale.set(1.3, 1.3, 1.3)
	house.add(cabinRoofFlat)
	// walls
	const cabinWall = getAsset('cabinWall').scene
	cabinWall.position.set(0, 0, -.5)
	house.add(cabinWall)
	const wall2 = cabinWall.clone()
	wall2.position.set(-.5, 0, 0)
	wall2.rotation.set(0, Math.PI * .5, 0)
	house.add(wall2)

	//  window
	const cabinWindowLarge = getAsset('cabinWindowLarge').scene
	cabinWindowLarge.position.set(.5, 0, 0)
	cabinWindowLarge.rotation.set(0, Math.PI * -.5, 0)
	house.add(cabinWindowLarge)

	// door
	const cabinDoor = getAsset('cabinDoor').scene
	cabinDoor.position.set(0, 0, .5)
	house.add(cabinDoor)

	// light
	const lightsRed = getAsset('lightsRed').scene
	lightsRed.position.set(0, .65, .6)
	house.add(lightsRed)

	// house position
	house.position.set(-1, 0, 1)


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