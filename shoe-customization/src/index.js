import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
import* as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Shoe from './modules/Shoe'
import { Scene } from 'three'
let render
// let clock

const main = () => {
	// scene
	const scene = createScene()
    
	// camera
	Camera.createCamera()
	// Scene.scene.add(Camera.camera)

	// renderer
	render = Renderer.setRenderer(Camera.camera, scene)
	Camera.setCameraControls(Camera.camera, render)
    
	// lights
	Light.init()
	
	/**
	 * Clock
	 */
	// clock = new THREE.Clock()

	// external models
	Shoe.init()
	tick()

}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})
	// const delta = clock.getDelta()
	Renderer.tick()
}

window.addEventListener('DOMContentLoaded', async () => {
	// await loadTexture('textures/step1.jpg').then(texture => resources.frames['step1'] = texture)
	main()
})