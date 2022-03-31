import * as THREE from 'three'

let camera
let scene
let renderer

const setRenderer = (userCamera, userScene) => {
	camera = userCamera
	scene = userScene
	const canvas = document.querySelector('.wrapper-3d')
	renderer = new THREE.WebGLRenderer({
		canvas,
	})
	renderer.setClearColor(0xFFFFFF),
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.setSize(window.innerWidth, window.innerHeight, false)
	return renderer
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
	renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
	onWindowResize()
})

export {
	setRenderer,
	tick,
}