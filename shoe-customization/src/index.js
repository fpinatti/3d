import * as THREE from 'three'
import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
import* as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Shoe from './modules/Shoe'
import { Scene } from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GUI } from 'dat.gui'

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
	Shoe.init().then(() => {
		scrollAnim()
	})
	tick()

	/**
	 * html interaction
	 */
	const btnColors = document.querySelector('.btn-change-colors')
	btnColors.addEventListener('click', () => {
		Shoe.sortNewPallete()
	})

}

const scrollAnim = () => {

	gsap.registerPlugin(ScrollTrigger)

	const model = Shoe.model
	const gui = new GUI()
	const modelFolder = gui.addFolder('Cube')
	modelFolder.add(model.rotation, 'x', 0, Math.PI * 2)
	modelFolder.add(model.rotation, 'y', 0, Math.PI * 2)
	modelFolder.add(model.rotation, 'z', 0, Math.PI * 2)
	modelFolder.open()
	// const cameraFolder = gui.addFolder('Camera')
	// cameraFolder.add(camera.position, 'z', 0, 10)
	// cameraFolder.open()

	
	const scrollWrapper = document.querySelector('.section-scroller')
	gsap
		.timeline({
			scrollTrigger: {
				trigger: scrollWrapper,
				start: 'top top',
				end: 'bottom bottom',
				onUpdate: (evt) => {
					// console.log('update', evt.progress)
				},
				scrub: 1,
				markers: true
			}
		})
		.fromTo(model.rotation, {
			x: Math.PI * .5,
			y: Math.PI * .5,
		},
		{
			x: 0,
			y: 0,
			z: Math.PI * 2,
		}, 0)
		.to(document.body, {
			backgroundColor: '#c244bd'
		})
}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})
	// const delta = clock.getDelta()
	Renderer.tick()
	// if (Camera.camera && Shoe.model) {
	// 	Camera.camera.lookAt(Shoe.model.position)
	// }
}

window.addEventListener('DOMContentLoaded', async () => {
	// await loadTexture('textures/step1.jpg').then(texture => resources.frames['step1'] = texture)
	main()
})