import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import { createCamera, setCameraControls } from './modules/Camera'
import { initLights } from './modules/Light'
import { setRenderer } from './modules/Renderer'
import { loadModel } from './modules/Model'
import * as Building from './modules/Building'
import { loadHDR, loadTexture, addAssetToCollection } from './modules/AssetLoader'
import * as Scene from './modules/Scene'
import * as Camera from './modules/Camera'
import * as dat from 'dat.gui'
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'

const bakedVersion = true
const textures = {}
let bakedMaterial
let pictureMaterial
const isVr = true

const gui = new dat.GUI()
const debugObject = {}

const main = () => {

	// scene
	createScene()
    
	// camera
	createCamera()
	Scene.scene.add(Camera.camera)

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
	
	const cameraPosFolder = gui.addFolder('camera position')
	cameraPosFolder.add(Camera.camera.position, 'x', -140, 140, 1).listen()
	cameraPosFolder.add(Camera.camera.position, 'y', -140, 140, 1).listen()
	cameraPosFolder.add(Camera.camera.position, 'z', -140, 140, 1).listen()
	const cameraLookAtFolder = gui.addFolder('camera lookat')
	cameraLookAtFolder.add(Camera.lookAtPos, 'x', -140, 140, 1).listen()
	cameraLookAtFolder.add(Camera.lookAtPos, 'y', -140, 140, 1).listen()
	cameraLookAtFolder.add(Camera.lookAtPos, 'z', -140, 140, 1).listen()
	dat.GUI.toggleHide()
	// gui.add(Camera.orbitControls, 'minDistance', 0, 100)
	// gui.add(Camera.orbitControls, 'maxDistance', 0, 100)
	// gui.add(controls, 'minAzimuthAngle', 0, 34)
	// gui.add(controls, 'maxAzimuthAngle', 0, 34)

	// VR button
	// document.body.appendChild( VRButton.createButton( renderer ) )
	// renderer.xr.enabled = true
	// console.log(renderer.xr.isPresenting)
    
	// lights
	initLights()
	// createAmbientLight()
        
	// createRectLight()
	// createDirectionalLight()

	if (isVr) {
		const dummyCam = new THREE.Object3D()
		dummyCam.add(Camera.camera)
		dummyCam.position.set(0, 0, 20)
		// console.log(Camera.camera)
		// Camera.camera.lookAt(110, 0, 0)
		// dummyCam.lookAt(new THREE.Vector3(10, 0, 10))
	}

	Building.init()

}

window.addEventListener('DOMContentLoaded', async () => {
	// if (bakedVersion) {
	await loadHDR('textures/aristea_wreck_puresky_1k.hdr').then(hdr => addAssetToCollection('sky', hdr))
	await loadTexture('textures/grass/Grass001_1K_AmbientOcclusion.jpg').then(texture => addAssetToCollection('grass_occlusion', texture))
	await loadTexture('textures/grass/Grass001_1K_Color.jpg').then(texture => addAssetToCollection('grass_color', texture))
	await loadTexture('textures/grass/Grass001_1K_Displacement.jpg').then(texture => addAssetToCollection('grass_displacement', texture))
	await loadTexture('textures/grass/Grass001_1K_Normal.jpg').then(texture => addAssetToCollection('grass_normal', texture))
	await loadTexture('textures/grass/Grass001_1K_Roughness.jpg').then(texture => addAssetToCollection('grass_roughness', texture))
	// 	await loadTexture('textures/bear.jpg').then(texture => textures['framePicture'] = texture)
	// }
	main()
})