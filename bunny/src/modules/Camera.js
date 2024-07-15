import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let camera
let orbitControls

const createCamera = () => {
	camera = new THREE.PerspectiveCamera( 
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	return camera
}

const setCameraControls = (renderer) => {
	orbitControls = new OrbitControls(camera, renderer.domElement)
	orbitControls.enableDamping = true
	orbitControls.target = new THREE.Vector3(0, 1, 0)
	orbitControls.minDistance = 0
	orbitControls.maxDistance = 8
	orbitControls.minAzimuthAngle = -1
	orbitControls.maxAzimuthAngle = .3
	orbitControls.minPolarAngle = 0
	orbitControls.maxPolarAngle = 1.3
}

export {
	createCamera,
	setCameraControls,
	orbitControls,
	camera,
}