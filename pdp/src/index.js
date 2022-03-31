import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import { createCamera, setCameraControls } from './modules/Camera'
import { createAmbientLight, createDirectionalLight, createSpotLight, shakeLight} from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Player from './modules/Player'
import * as Airplane from './modules/Airplane'
import * as World from './modules/World'
let render
let clock

const main = () => {
	// scene
	const scene = createScene()
    
	// camera
	const camera = createCamera()
	scene.add(camera)
	// camera.position.z = 8
	// camera.position.y = 4
    
	// renderer
	render = Renderer.setRenderer(camera, scene)
	setCameraControls(camera, render)
    
	// lights
	const ambientLight = createAmbientLight()
	scene.add(ambientLight)
	
	const directionalLight = createDirectionalLight()
	directionalLight.castShadow = true
	directionalLight.position.set(3, 5, 3)
	scene.add(directionalLight)
	
	// const directionalLight2 = createDirectionalLight()
	// directionalLight2.position.set(0, 0, 8)
	// scene.add(directionalLight2)

	/**
	 * Clock
	 */
	clock = new THREE.Clock()

	// external models
	// Player.init(scene, clock)
	Airplane.init(scene)
	// World.init(scene)
	tick()

}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})
	Renderer.tick()
	// Player.tick()
}

window.addEventListener('DOMContentLoaded', async () => {
	main()
})