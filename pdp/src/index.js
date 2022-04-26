import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
// import { createBoxGeometry, createMesh } from './modules/Mesh'
import { loadModel } from './modules/Model'
import { loadTexture } from './modules/Material'
import { createAmbientLight, createDirectionalLight} from './modules/Light'
import * as Renderer from './modules/Renderer'
// import * as Player from './modules/Player'
import * as Airplane from './modules/Airplane'
import * as World from './modules/World'
import * as Clouds from './modules/Clouds'
import * as Billboard from './modules/Billboard'
let render
// let camera
let clock
// const gui = new dat.GUI()

const main = () => {
	// scene
	const scene = createScene()
    
	// camera
	Camera.createCamera()
	Camera.camera.position.set(0, 1, -6)
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

	// const material = createMaterial('standard')
	// const sphere = createMesh(material)
	// scene.add(sphere)

	/**
	 * Clock
	 */
	clock = new THREE.Clock()

	// external models
	// Player.init(scene, clock)
	Airplane.init(resources.assets['airplane'])
	Clouds.init()
	World.init({
		sky: resources.assets['sky'],
		world: resources.assets['world'],
	})
	Billboard.init(resources.frames)
	tick()

	// Step1.activate(resources)

}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})
	Renderer.tick()
	Airplane.tick()
	Clouds.tick(clock.getDelta())
}

const resources = {
	frames: {},
	assets: {},
}
window.addEventListener('DOMContentLoaded', async () => {
	await loadTexture('textures/sign.jpg').then(texture => resources.frames['billboard'] = texture)
	await loadTexture('textures/sky.jpg').then(texture => resources.assets['sky'] = texture)
	await loadTexture('textures/airplane.jpg').then(texture => resources.assets['airplane'] = texture)
	await loadTexture('textures/world.jpg').then(texture => resources.assets['world'] = texture)
	await loadModel('models/pinatti_walk_2.gltf').then(gltf => resources.assets['player'] = gltf)
	main()
})