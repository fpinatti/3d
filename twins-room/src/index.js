import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import { createCamera, setCameraControls } from './modules/Camera'
import { createRectLight, createAmbientLight, createDirectionalLight } from './modules/Light'
import { setRenderer } from './modules/Renderer'
import { loadModel } from './modules/Model'
import { loadTexture } from './modules/Material'
import * as Scene from './modules/Scene'
import * as Camera from './modules/Camera'
// import * as dat from 'dat.gui'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'

const bakedVersion = true
const textures = {}
let bakedMaterial
let pictureMaterial

let controller1, controller2
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
	if (bakedVersion) {
		textures['sceneTexture'].flipY = false
		bakedMaterial = new THREE.MeshBasicMaterial({ 
			map: textures['sceneTexture'],
		})
		pictureMaterial = new THREE.MeshBasicMaterial({ 
			map: textures['framePicture'],
		})
	}
    
	// renderer
	const renderer = setRenderer()
	// setCameraControls(renderer)
	// gui.add(Camera.orbitControls, 'minDistance', 0, 100)
	// gui.add(Camera.orbitControls, 'maxDistance', 0, 100)
	// gui.add(controls, 'minAzimuthAngle', 0, 34)
	// gui.add(controls, 'maxAzimuthAngle', 0, 34)

	// VR button
	document.body.appendChild( VRButton.createButton( renderer ) )
	renderer.xr.enabled = true
	// console.log(renderer.xr.isPresenting)
	
	//VR controllers
	const dbgLabel = document.querySelector('.debug-label')
	controller1 = renderer.xr.getController(0)
	controller2 = renderer.xr.getController(1)
	controller1.addEventListener('selectstart', () => {
		Camera.camera.position.z = 9
		dbgLabel.textContent = '1234567'
		console.log('4545')
	})
	controller1.addEventListener('selectend', () => {
		Camera.camera.position.z -= .2
	})
	controller1.addEventListener('connected', (evt) => {
		this.add(buildController(evt.data))
	})
	const controllerModelFactory = new XRControllerModelFactory()
	const controllerGrip1 = renderer.xr.getControllerGrip(0)
	controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1))
	Scene.scene.add( controllerGrip1 )
	Scene.scene.add(controller1)
    
	// lights
	createAmbientLight()
        
	createRectLight()
	createDirectionalLight()

	// external models
	loadModel('models/twins-room.gltf').then((model) => {
		model.children.map((element) => {
			element.receiveShadow = true
			element.castShadow = true
			if (bakedVersion) {
				if (element.name.indexOf('picture') >= 0) {
					console.log('picture')
					element.material = pictureMaterial
				} else {
					element.material = bakedMaterial
				}
			}
		})
		Scene.scene.add(model)
	})

}

function buildController( data ) {

	let geometry, material

	switch ( data.targetRayMode ) {

	case 'tracked-pointer':

		geometry = new THREE.BufferGeometry()
		geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) )
		geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) )

		material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending } )

		return new THREE.Line( geometry, material )

	case 'gaze':

		geometry = new THREE.RingGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 )
		material = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: true } )
		return new THREE.Mesh( geometry, material )

	}

}

window.addEventListener('DOMContentLoaded', async () => {
	if (bakedVersion) {
		await loadTexture('textures/bakedTexture.jpg').then(texture => textures['sceneTexture'] = texture)
		await loadTexture('textures/bear.jpg').then(texture => textures['framePicture'] = texture)
	}
	main()
})