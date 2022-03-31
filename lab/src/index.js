import * as THREE from 'three'
import './styles.css'
import { initLoader } from './modules/Loader'
import { createScene } from './modules/Scene'
import { createCamera, setCameraControls } from './modules/Camera'
import { createAmbientLight, createDirectionalLight, createSpotLight, shakeLight} from './modules/Light'
import { setRenderer } from './modules/Renderer'
import { createParticles } from './modules/Particles'
import { loadModel } from './modules/Model'
import { createBillboard } from './modules/Billboard'
import { loadTexture } from './modules/Material'
// import { modelsData } from './utils/utils'

const main = () => {
	/**
	 * Scene
	 */
	const scene = createScene()
	// scene.background = sceneBackground
    
	/**
	 * Camera
	 */
	const camera = createCamera()
	scene.add(camera)
	camera.position.z = 8
	camera.position.y = 4
    
	/**
	 * Renderer
	 */
	const renderer = setRenderer(camera, scene)
	setCameraControls(camera, renderer)
    
	/**
	 * Lights
	 */
	const ambientLight = createAmbientLight()
	scene.add(ambientLight)
    
	const directionalLight = createDirectionalLight()
	directionalLight.castShadow = true
	directionalLight.position.set(0, 10, 0)
	scene.add(directionalLight)

	/**
	 * Helpers
	 */
	const axesHelper = new THREE.AxesHelper(5)
	scene.add(axesHelper)

	/**
	 * Models
	 */
	loadModel('models/model.glb').then((gltf) => {
		console.log(gltf)
		scene.add(gltf)
	})

}

window.addEventListener('DOMContentLoaded', () => {
	main()
})