import gsap from 'gsap'
import * as MotionPathPlugin from 'gsap/MotionPathPlugin'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Renderer from './Renderer'
import * as Scene from './Scene'
let camera
let orbitControls
let markers = []
let lookAtPos = new THREE.Vector3(0,0,0)
// const raycaster = new THREE.Raycaster()
let currentStep = 1

const createCamera = () => {
	camera = new THREE.PerspectiveCamera( 
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	camera.position.set(-1, 40, 20.6)
	animateCamera()
	return camera
}

const setCameraControls = (renderer) => {
	orbitControls = new OrbitControls(camera, renderer.domElement)
	orbitControls.enableDamping = true
	// orbitControls.target = new THREE.Vector3(0, 1, 0)
	// orbitControls.minDistance = 0
	// orbitControls.maxDistance = 8
	// orbitControls.minAzimuthAngle = -1
	// orbitControls.maxAzimuthAngle = .3
	orbitControls.minPolarAngle = 0
	orbitControls.maxPolarAngle = 1.5
}

const animateCamera = () => {
	

	gsap.to(camera.position, {
		x: 5,
		y: 6,
		z: 13,
		duration: 6,
		ease: 'smooth.inOut',
		// onUpdate: updateCameraTarget,
	})
}

// const updateCameraTarget = () => {
// 	camera.lookAt(lookAtPos)
// }

const tick = () => {
	// camera.lookAt(lookAtPos)
	orbitControls?.update()
}

export {
	createCamera,
	setCameraControls,
	orbitControls,
	camera,
	tick,
	lookAtPos,
}