import * as THREE from 'three'
import * as Scene from './Scene'
import * as Camera from './Camera'
import * as Player from './Player'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'

let camera
let scene
let renderer

const setRenderer = (userCamera, userScene) => {
	camera = userCamera
	scene = userScene
	const canvas = document.querySelector('.wrapper-3d')
	renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true,
	})
	renderer.setClearColor(0x000000)
	renderer.shadowMap.enabled = true
	renderer.outputEncoding = THREE.sRGBEncoding
	renderer.toneMapping = THREE.CineonToneMapping
	renderer.toneMappingExposure = .8
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.setSize(window.innerWidth, window.innerHeight, false)
	renderer.xr.enabled = true
	renderer.xr.addEventListener( 'sessionstart', onEnterVR)
	document.body.appendChild(VRButton.createButton(renderer))
	return renderer
}

const onEnterVR = () => {
	Player.vrCam.add(Camera.camera)

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

const renderVr = () => {
	renderer.render(Scene.scene, Camera.camera)
}

const tick = () => {
	if (renderer.xr.isPresenting) {
		renderer.setAnimationLoop(renderVr)
		return
	}
	renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
	onWindowResize()
})

export {
	setRenderer,
	tick,
}