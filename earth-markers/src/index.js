import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
import * as Scene from './modules/Scene'
import* as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Earth from './modules/Earth'
import * as Pointer from './modules/Pointer'
import { loadTexture, addTextureToCollection } from './modules/Material'

const main = () => {
	// scene
	const scene = createScene()
    
	// camera
	Camera.createCamera()
	// Scene.scene.add(Camera.camera)

	// renderer
	const render = Renderer.setRenderer(Camera.camera, scene)
	Camera.setCameraControls(Camera.camera, render)
    
	// lights
	Light.init()
	
	/**
	 * Clock
	 */
	// clock = new THREE.Clock()

	// external models
	Earth.init()
	tick()

	/**
	 * Pointer
	 */
	Pointer.init()

}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})

	Renderer.tick()
	Camera.orbitControls.update()

}

window.addEventListener('DOMContentLoaded', async () => {
	await loadTexture('textures/8081_earthmap4k.jpg').then(texture => addTextureToCollection('earthmap', texture))
	await loadTexture('textures/8081_earthbump4k.jpg').then(texture => addTextureToCollection('earthbump', texture))
	main()
})