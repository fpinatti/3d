import * as THREE from 'three'
import * as Scene from './Scene'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let orbitControls
let camera

const createCamera = () => {
	camera = new THREE.PerspectiveCamera( 
		75,
		window.innerWidth / window.innerHeight,
		0.01,
		20000
	)
	camera.position.set(0, 2, 4)
	// camera.lookAt(new THREE.Vector3(0, 0, 0))
	// camera.position.x = -.1
	// const helper = new THREE.CameraHelper(camera)
	// Scene.scene.add(helper)
}

const setCameraControls = (camera, renderer) => {
	orbitControls = new OrbitControls(camera, renderer.domElement)
	// orbitControls.center = new THREE.Vector3(0, 0, 12)
	// orbitControls.enabled = false
	orbitControls.enableDamping = true
	// orbitControls.minDistance = -10
	orbitControls.maxDistance = 12
}

export {
	createCamera,
	setCameraControls,
	orbitControls,
	camera,
}