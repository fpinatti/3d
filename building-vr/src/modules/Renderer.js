import * as THREE from 'three'
import * as Scene from './Scene'
import * as Camera from './Camera'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass.js'

let renderer
let composer, renderPass, saoPass

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}


const setRenderer = () => {
	const canvas = document.querySelector('.wrapper-3d')
	renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
	})
	renderer.setClearColor(0x65b8cf),
	renderer.shadowMap.enabled = true
	renderer.shadowMap.autoUpdate = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.physicallyCorrectLights = true
	renderer.outputEncoding = THREE.sRGBEncoding
	renderer.setSize(sizes.width, sizes.height, false )
	setComposer()
	tick()
	return renderer
}

const setComposer = () => {
	composer = new EffectComposer(renderer)
	renderPass = new RenderPass(Scene.scene, Camera.camera)
	composer.addPass(renderPass)
	saoPass = new SAOPass(Scene.scene, Camera.camera, false, true )
	saoPass.params.output = SAOPass.OUTPUT.Default
	saoPass.params.saoIntensity = .001
	// gui.add( saoPass.params, 'saoBias', - 1, 1 );
	// 			gui.add( saoPass.params, 'saoIntensity', 0, 1 );
	// 			gui.add( saoPass.params, 'saoScale', 0, 10 );
	// 			gui.add( saoPass.params, 'saoKernelRadius', 1, 100 );
	// 			gui.add( saoPass.params, 'saoMinResolution', 0, 1 );
	// 			gui.add( saoPass.params, 'saoBlur' );
	// 			gui.add( saoPass.params, 'saoBlurRadius', 0, 200 );
	// 			gui.add( saoPass.params, 'saoBlurStdDev', 0.5, 150 );
	// 			gui.add( saoPass.params, 'saoBlurDepthCutoff', 0.0, 0.1 );
	composer.addPass(saoPass)
}

const onWindowResize = () => {
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight
	const canvas = renderer.domElement
	canvas.width = sizes.width
	canvas.height = sizes.height
	Camera.camera.aspect = canvas.clientWidth / canvas.clientHeight
	Camera.camera.updateProjectionMatrix()

	const pixelRatio = window.devicePixelRatio
	const width  = canvas.clientWidth  * pixelRatio | 0
	const height = canvas.clientHeight * pixelRatio | 0
	renderer.setSize(width, height, false)
}

// https://r105.threejsfundamentals.org/threejs/lessons/threejs-webvr.html
const renderVr = () => {
	renderer.render(Scene.scene, Camera.camera)
	if (Camera.orbitControls) {
		Camera.orbitControls.update()
	}
}

const tick = () => {
	if (renderer.xr.isPresenting) {
		renderer.setAnimationLoop(renderVr)
		return
	}
	requestAnimationFrame(() => {
		tick()
	})
	Camera.tick()
	composer.render()
	// renderer.render(Scene.scene, Camera.camera)
		
}

window.addEventListener('resize', () => {
	onWindowResize()
})

export {
	setRenderer,
	sizes,
}