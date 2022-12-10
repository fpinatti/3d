import * as Scene from './Scene'
import * as Head from './Head'
import * as Camera from './Camera'
import * as Renderer from './Renderer'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
// import { GUI } from 'dat.gui'
import { gsap } from 'gsap'
import { getAsset } from './AssetLoader'
// import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js'

// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()

const init = () => {
	const renderer = Renderer.renderer
	const controller1 = renderer.xr.getController(0)
	// Scene.scene.add(controller1)

	const controller2 = renderer.xr.getController(1)
	// Scene.scene.add(controller2)
	console.log(controller1)

	const controllerModelFactory = new XRControllerModelFactory()
	const handModelFactory = new XRHandModelFactory()

	// Hand 1
	const controllerGrip1 = renderer.xr.getControllerGrip(0)
	controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1))
	Scene.scene.add(controllerGrip1)

	const hand1 = renderer.xr.getHand(0)
	// hand1.addEventListener('pinchstart', onPinchStartLeft)
	// hand1.addEventListener('pinchend', () => {
	// 	// scaling.active = false

	// })
	hand1.add(handModelFactory.createHandModel(hand1))
	// Scene.scene.add(hand1)

	// Hand 2
	const controllerGrip2 = renderer.xr.getControllerGrip(1)
	controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2))
	// Scene.scene.add(controllerGrip2)

	const hand2 = renderer.xr.getHand(1)
	// hand2.addEventListener('pinchstart', onPinchStartRight)
	// hand2.addEventListener('pinchend', onPinchEndRight)
	hand2.add( handModelFactory.createHandModel(hand2))
	// Scene.scene.add(hand2)

	//Raycaster Geometry
	const geometry = new THREE.BufferGeometry().setFromPoints([
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, -1)
	])

	const line = new THREE.Line(geometry)
	line.name = 'line'
	line.scale.z = 50

	controller1.add(line.clone())
	controller2.add(line.clone())

	// raycaster = new THREE.Raycaster();

	Head.vrCam.add(controller1)
	Head.vrCam.add(controller2)
	Head.vrCam.add(controllerGrip1)
	Head.vrCam.add(controllerGrip2)

}


export {
	init,
	// tick,
}