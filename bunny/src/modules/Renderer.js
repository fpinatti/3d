import * as THREE from 'three'
import * as Scene from './Scene'
import * as Camera from './Camera'
import * as Bunny from './Bunny'

let renderer


const setRenderer = () => {
	const canvas = document.querySelector('.wrapper-3d')
	renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
	})
	renderer.setClearColor(0x65b8cf),
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.setSize( window.innerWidth, window.innerHeight, false )
	
	tick()
	return renderer
}

const onWindowResize = () => {
	const canvas = renderer.domElement
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
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
	renderer.render(Scene.scene, Camera.camera)
	if (Camera.orbitControls) {
		Camera.orbitControls.update()
	}
	Bunny.tick()
	
}

window.addEventListener('resize', () => {
	onWindowResize()
})

export {
	setRenderer,
}