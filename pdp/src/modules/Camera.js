import * as THREE from 'three'
import * as Scene from './Scene'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let orbitControls
let camera

const createCamera = () => {
	camera = new THREE.PerspectiveCamera( 
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		2000
	)
	// const helper = new THREE.CameraHelper(camera)
	Scene.scene.add(camera)
	// scene.add(helper)
}

const setCameraControls = (camera, renderer) => {
	orbitControls = new OrbitControls(camera, renderer.domElement)
	// orbitControls.enabled = false
	orbitControls.minDistance = 2
	orbitControls.maxDistance = 12
}

export {
	createCamera,
	setCameraControls,
	orbitControls,
	camera,
}