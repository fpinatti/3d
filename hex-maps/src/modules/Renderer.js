import { 
	setPostProcessing,
	// addGlitch,
	addScene,
	addBloom,
	addHalftone
} from './PostProcessing'
import * as THREE from 'three'

let camera
let scene
let renderer
// post processing
let composer

const setRenderer = (userCamera, userScene) => {
	camera = userCamera
	scene = userScene
	const canvas = document.querySelector('.wrapper-3d')
	renderer = new THREE.WebGLRenderer({
		canvas,
	})
	renderer.setClearColor(0x096a74),
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.setSize( window.innerWidth, window.innerHeight, false)
	composer = setPostProcessingComposer(renderer)
	addScene(composer, scene, camera)
	// addGlitch(composer)
	addBloom(composer)
	addHalftone(composer)
	tick()
	return renderer
}

/**
 * Post Processing
 */
const setPostProcessingComposer = (renderer) => {
	return setPostProcessing(renderer)
}

const onWindowResize = () => {
	const canvas = renderer.domElement
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	camera.aspect = canvas.clientWidth / canvas.clientHeight
	camera.updateProjectionMatrix()

	const pixelRatio = window.devicePixelRatio
	const width  = canvas.clientWidth  * pixelRatio | 0
	const height = canvas.clientHeight * pixelRatio | 0
	renderer.setSize(width, height, false)
}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})
	composer.render()
}

window.addEventListener('resize', () => {
	onWindowResize()
})

export {
	setRenderer,
}