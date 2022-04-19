import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import { createCamera, setCameraControls } from './modules/Camera'
import { createRectLight, createAmbientLight, createDirectionalLight } from './modules/Light'
import { setRenderer } from './modules/Renderer'
import { loadModel } from './modules/Model'
import * as Bunny from './modules/Bunny'
import { loadTexture } from './modules/Material'
import * as Scene from './modules/Scene'
import * as Camera from './modules/Camera'
// import * as dat from 'dat.gui'
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'

const bakedVersion = true
const textures = {}
let bakedMaterial
let pictureMaterial

// const gui = new dat.GUI()

const main = () => {

	// scene
	createScene()
    
	// camera
	createCamera()
	Scene.scene.add(Camera.camera)
	Camera.camera.position.z = 8
	Camera.camera.position.y = 4
    
	// materials
	// if (bakedVersion) {
	// 	textures['sceneTexture'].flipY = false
	// 	bakedMaterial = new THREE.MeshBasicMaterial({ 
	// 		map: textures['sceneTexture'],
	// 	})
	// 	pictureMaterial = new THREE.MeshBasicMaterial({ 
	// 		map: textures['framePicture'],
	// 	})
	// }
    
	// renderer
	const renderer = setRenderer()
	setCameraControls(renderer)
	// gui.add(Camera.orbitControls, 'minDistance', 0, 100)
	// gui.add(Camera.orbitControls, 'maxDistance', 0, 100)
	// gui.add(controls, 'minAzimuthAngle', 0, 34)
	// gui.add(controls, 'maxAzimuthAngle', 0, 34)

	// VR button
	// document.body.appendChild( VRButton.createButton( renderer ) )
	// renderer.xr.enabled = true
	// console.log(renderer.xr.isPresenting)
    
	// lights
	createAmbientLight()
        
	createRectLight()
	createDirectionalLight()

	Bunny.init()

}

window.addEventListener('DOMContentLoaded', async () => {
	// if (bakedVersion) {
	// 	await loadTexture('textures/bakedTexture.jpg').then(texture => textures['sceneTexture'] = texture)
	// 	await loadTexture('textures/bear.jpg').then(texture => textures['framePicture'] = texture)
	// }
	main()
})