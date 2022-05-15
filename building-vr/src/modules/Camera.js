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
const raycaster = new THREE.Raycaster()
let currentStep = 1

const createCamera = () => {
	camera = new THREE.PerspectiveCamera( 
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	camera.position.set(-1, 40, 20.6)

	gsap.registerPlugin(MotionPathPlugin)
	getMarkers()
	animateCamera(currentStep)
	addKeyboardListeners()
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
	// orbitControls.minPolarAngle = 0
	// orbitControls.maxPolarAngle = 1.3
}

const onKeyPress = (event) => {
	// if (event.key === '1') {
	animateCamera(event.key)
	// }
}

const addKeyboardListeners = () => {
	document.addEventListener('keypress', onKeyPress)
}

const animateCamera = (index) => {
	currentStep = index - 1
	setMarkersVisibility()
	const curve = [
		{x: camera.position.x, y: camera.position.y, z: camera.position.z},
		markers[currentStep].position,
	]

	const targetLookAt = markers[currentStep].lookAt
	gsap.to(lookAtPos, {
		duration: 2,
		x: targetLookAt.x,
		y: targetLookAt.y,
		z: targetLookAt.z,
	})
	

	gsap.to(camera.position, {
		duration: 6,
		motionPath: {
			path: curve,
			ease: 'smooth.inOut',
		},
	})
}

const getMarkers = () => {
	const pageMarkers = document.querySelectorAll('.marker')
	pageMarkers.forEach(element => {
		const raw3dPosition = element.getAttribute('data-position').split(',')
		const positionInSpace = new THREE.Vector3(raw3dPosition[0], raw3dPosition[1], raw3dPosition[2])
		const raw3dLookat = element.getAttribute('data-lookAt').split(',')
		const pointLookAt = new THREE.Vector3(raw3dLookat[0], raw3dLookat[1], raw3dLookat[2])
		markers.push({
			position: positionInSpace,
			lookAt: pointLookAt,
			element,
		})
	})
}

const setMarkersVisibility = () => {
	markers.forEach((marker, index) => {
		marker.element.classList.remove('current-step')
		if (currentStep === index) {
			marker.element.classList.add('current-step')
		}
	})
}

const tick = () => {
	camera.lookAt(lookAtPos)
	markers.forEach(point => {
		const screenPosition = point.position.clone()
		screenPosition.project(camera)
		raycaster.setFromCamera(screenPosition, camera)
		const intersects = raycaster.intersectObjects(Scene.scene.children, true)
		if (intersects.length) {
			const intersectionDistance = intersects[0].distance
			const pointDistance = point.position.distanceTo(camera.position)
			if(intersectionDistance < pointDistance) {
				point.element.classList.remove('visible')
			} else {
				point.element.classList.add('visible')
			}
		} else {
			point.element.classList.add('show')
		}
		const translateX = screenPosition.x * Renderer.sizes.width * .5
		const translateY = -screenPosition.y * Renderer.sizes.height * .5
		point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
	})
}

export {
	createCamera,
	setCameraControls,
	orbitControls,
	camera,
	tick,
	lookAtPos,
}