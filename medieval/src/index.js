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
import { modelsData } from './utils/utils'

const main = () => {
	/**
	 * Scene
	 */
	const scene = createScene()
	scene.background = sceneBackground
    
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
    
	// const directionalLight = createDirectionalLight()
	// directionalLight.castShadow = true
	// directionalLight.position.set(0, 10, 0)
	// scene.add(directionalLight)

	/**
	 * World Map
	 */
	const mapContainer = new THREE.Group()
	scene.add(mapContainer)

	const model = models['castle01.obj'].clone()
	model.children[0].material.map = tex1
	scene.add(model)

	// const unitsPerRow = 7
	// const map = [
	// 	'', 'building_wall.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'unit_boat.glb', 'water.glb',
	// 	'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'building_dock.glb', 'water.glb',
	// 	'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'river_start.glb', 'water.glb',
	// 	'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'water_rocks.glb',
	// 	'grass.glb', 'dirt.glb', 'dirt.glb', 'building_cabin.glb', 'grass.glb', 'grass.glb', 'grass.glb',
	// 	'grass.glb', 'dirt.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb',
	// 	'grass.glb', 'sand_rocks.glb', 'grass.glb', 'grass.glb', 'grass_forest.glb', 'grass.glb', 'grass.glb',
	// 	'', 'grass.glb', 'grass.glb', 'grass_forest.glb', 'grass_forest.glb', 'building_sheep.glb', '',
	// 	'', 'sand.glb', 'sand_rocks.glb', 'grass.glb', 'grass.glb', '', '',
	// ]

	// map.forEach((item, index) => {
	// 	if (models[item]) {
	// 		let x = index % unitsPerRow
	// 		let z = Math.floor(index / unitsPerRow)
	// 		if (z % 2 !== 0) {
	// 			x += .5
	// 		}
	// 		z -= .2 * z
	// 		// update x/z to make elements center on wrapper
	// 		x -= 3.5
	// 		z -= 3
	// 		const model = models[item].clone()
	// 		model.position.set(x, 0, z)
	// 		mapContainer.add(model)
	// 	}
	// })

	/**
	 * Helpers
	 */
	const axesHelper = new THREE.AxesHelper(5)
	scene.add(axesHelper)

}

let sceneBackground
const loadTextures = () => {
	sceneBackground = new THREE.CubeTextureLoader()
		.setPath( 'textures/' )
		.load([
			'px.png',
			'nx.png',
			'py.png',
			'ny.png',
			'pz.png',
			'nz.png'
		])
}
const models = {}
let tex1

window.addEventListener('DOMContentLoaded', async () => {
	const promises = []
	
	modelsData.models.forEach((item) => {
		const promise = loadModel(`models/${item}`).then((model) => {
			models[item] = model
		})
		promises.push(promise)
	})
	// wait textures
	promises.push(loadTextures())

	tex1 = await loadTexture('./models/f02_busi015.png');

	Promise.all(promises).then(() => {
		main()
	})

})