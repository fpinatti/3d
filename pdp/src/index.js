import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
// import { createBoxGeometry, createMesh } from './modules/Mesh'
import { loadModel } from './modules/Model'
import { loadTexture } from './modules/Material'
import* as Light from './modules/Light'
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
	Light.init()
	
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
		skyMatcap: resources.assets['skyMatcap'],
		world: resources.assets['world'],
		road: resources.assets['road'],
		text: resources.assets['matcap1'],
	})
	Billboard.init(resources.frames)
	tick()

	// Step1.activate(resources)

}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})
	const delta = clock.getDelta()
	Renderer.tick()
	Airplane.tick(delta)
	Clouds.tick(delta)
}

const resources = {
	frames: {},
	assets: {},
}
window.addEventListener('DOMContentLoaded', async () => {
	await loadTexture('textures/step1.png').then(texture => resources.frames['step1'] = texture)
	await loadTexture('textures/step2.png').then(texture => resources.frames['step2'] = texture)
	await loadTexture('textures/step3.png').then(texture => resources.frames['step3'] = texture)
	await loadTexture('textures/step4.png').then(texture => resources.frames['step4'] = texture)
	await loadTexture('textures/step5.png').then(texture => resources.frames['step5'] = texture)
	await loadTexture('textures/step6.png').then(texture => resources.frames['step6'] = texture)
	await loadTexture('textures/step7.png').then(texture => resources.frames['step7'] = texture)
	await loadTexture('textures/step8.png').then(texture => resources.frames['step8'] = texture)
	await loadTexture('textures/step9.png').then(texture => resources.frames['step9'] = texture)
	await loadTexture('textures/step10.png').then(texture => resources.frames['step10'] = texture)
	await loadTexture('textures/sky.jpg').then(texture => resources.assets['sky'] = texture)
	await loadTexture('textures/sky.png').then(texture => resources.assets['skyMatcap'] = texture)
	await loadTexture('textures/airplane.jpg').then(texture => resources.assets['airplane'] = texture)
	await loadTexture('textures/world.jpg').then(texture => resources.assets['world'] = texture)
	await loadTexture('textures/airport-road.jpg').then(texture => resources.assets['road'] = texture)
	await loadTexture('textures/thanks-matcap.png').then(texture => resources.assets['matcap1'] = texture)
	// await loadModel('models/pinatti_walk_2.gltf').then(gltf => resources.assets['player'] = gltf)
	main()
})