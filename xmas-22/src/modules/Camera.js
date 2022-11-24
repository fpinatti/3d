import * as THREE from 'three'
import * as Scene from './Scene'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let cameraControl
let camera

const createCamera = () => {
	camera = new THREE.PerspectiveCamera( 
		75,
		window.innerWidth / window.innerHeight,
		0.01,
		20000
	)
	camera.position.set(0, 1, 6)
	// camera.lookAt(0, 0, -10)
	// camera.position.x = -.1
	// const helper = new THREE.CameraHelper(camera)
	// Scene.scene.add(helper)
}

const setCameraControls = (camera, renderer) => {
	cameraControl = new OrbitControls(camera, renderer.domElement)
	// cameraControl.center = new THREE.Vector3(0, 0, 12)
	// cameraControl.enabled = false
	cameraControl.enableDamping = true
	// cameraControl.minDistance = -10
	// cameraControl.maxDistance = 12
}

export {
	createCamera,
	setCameraControls,
	cameraControl,
	camera,
}