import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let camera

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
	const orbitControls = new OrbitControls(camera, renderer.domElement)
	orbitControls.minDistance = 2
	orbitControls.maxDistance = 12
}

export {
	createCamera,
	setCameraControls,
	camera,
}