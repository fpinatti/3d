import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
import { createBoxGeometry, createMesh } from './modules/Mesh'
import { loadModel } from './modules/Model'
import { loadTexture } from './modules/Material'
import { createAmbientLight, createDirectionalLight, createSpotLight, shakeLight} from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Player from './modules/Player'
import * as Step1 from './modules/steps/Step1'
import * as dat from 'dat.gui'
import { Vector3 } from 'three'

let render
let camera
let clock
const gui = new dat.GUI()

const main = () => {
	// scene
	const scene = createScene()
    
	// camera
	Camera.createCamera(scene)
	// Camera.camera
	// Camera.camera.position = new Vector3()
	// Camera.camera.lookAt(7, 0, 0)

	// const cubeFolder = gui.addFolder('camera')
	// cubeFolder.add(camera.position, 'x', -10, 10, .01)
	// cubeFolder.add(camera.position, 'y', -10, 10, .01)
	// cubeFolder.add(camera.position, 'z', -10, 10, .01)
	// cubeFolder.add(camera.rotation, 'x', Math.PI * -2, Math.PI * 2)
	// cubeFolder.add(camera.rotation, 'y', Math.PI * -2, Math.PI * 2)
	// cubeFolder.add(camera.rotation, 'z', Math.PI * -2, Math.PI * 2)
	// cubeFolder.open()
	// const cameraFolder = gui.addFolder('Camera')
	// cameraFolder.add(camera.position, 'z', 0, 10)
	// cameraFolder.open()

    
	// renderer
	render = Renderer.setRenderer(Camera.camera, scene)
	Camera.setCameraControls(Camera.camera, render)
	// Camera.camera.position.set(-0.8954560055081231, 2.758100273413415, 4.5174096943097455)
	// Camera.camera.quaternion.set(0.5251922739323438, -0.06636340415330302, -0.8416989419762347, -0.10635725206607319)
	Camera.orbitControls.update()
    
	// lights
	const ambientLight = createAmbientLight()
	scene.add(ambientLight)
	
	const directionalLight = createDirectionalLight()
	directionalLight.castShadow = true
	directionalLight.position.set(3, 5, 3)
	scene.add(directionalLight)
	
	const directionalLight2 = createDirectionalLight()
	directionalLight2.position.set(0, 0, 8)
	scene.add(directionalLight2)

	// const material = createMaterial('standard')
	// const sphere = createMesh(material)
	// scene.add(sphere)

	/**
	 * Clock
	 */
	clock = new THREE.Clock()

	// external models
	tick()

	Step1.activate(resources)

}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})
	Renderer.tick()
	// Player.tick()
	// Camera.orbitControls.update()
}

const resources = {
	step1: {},
}
window.addEventListener('DOMContentLoaded', async () => {
	await loadTexture('textures/step1-billboard.jpg').then(texture => resources.step1['billboard'] = texture)
	await loadModel('models/pinatti_walk_2.gltf').then(gltf => resources.step1['player'] = gltf)
	main()
})