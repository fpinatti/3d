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
	// scene
	const scene = createScene()
    
	// camera
	const camera = createCamera()
	scene.add(camera)
	camera.position.z = 8
	camera.position.y = 4
    
	// materials
	// bakedTexture.flipY = false;
	// bakedMaterial = new THREE.MeshBasicMaterial({ 
	//     color: 0xffffff,
	//     map: bakedTexture,
	// })
    
	// renderer
	const renderer = setRenderer(camera, scene)
	setCameraControls(camera, renderer)
    
	// lights
	const ambientLight = createAmbientLight()
	scene.add(ambientLight)
    
	const directionalLight = createDirectionalLight()
	directionalLight.castShadow = true
	directionalLight.position.set(0, 10, 0)
	scene.add(directionalLight)
    
	// const directionalLight2 = createDirectionalLight()
	// directionalLight2.position.set(0, 0, 8)
	// scene.add(directionalLight2)

	// /**
	//  * leafs
	//  */
	// const particles = createParticles({
	//     count: 20,
	//     size: .1,
	//     texture: leafTexture,
	// });
	// particles.position.set(0, 0, -1);

	const mapContainer = new THREE.Group()
	scene.add(mapContainer)

	const unitsPerRow = 7
	const map = [
		'building_wall.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'unit_boat.glb', 'water.glb',
		'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'building_dock.glb', 'water.glb',
		'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'river_start.glb', 'water.glb',
		'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'water_rocks.glb',
		'grass.glb', 'dirt.glb', 'dirt.glb', 'building_cabin.glb', 'grass.glb', 'grass.glb', 'grass.glb',
		'grass.glb', 'dirt.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb',
		'grass.glb', 'grass_hill.glb', 'grass.glb', 'grass.glb', 'grass_forest.glb', 'grass.glb', 'grass.glb',
		'sand_rocks.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass_forest.glb', 'grass_forest.glb', 'building_sheep.glb',
		'sand.glb', 'sand_rocks.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb', 'grass.glb',
	]

	map.forEach((item, index) => {
		let x = index % unitsPerRow
		let z = Math.floor(index / unitsPerRow)
		if (z % 2 !== 0) {
			x += .5
		}
		z -= .2 * z
		const model = models[item].clone()
		model.position.set(x, 0, z)
		mapContainer.add(model)
	})

}

// let grassTexture;
// let fireTexture;
// let leafTexture;
// let bakedTexture;
const models = {}
window.addEventListener('DOMContentLoaded', async () => {
	const promises = []
	
	modelsData.models.forEach((item) => {
		const promise = loadModel(`models/${item}`).then((model) => {
			models[item] = model
		})
		promises.push(promise)
	})
	Promise.all(promises).then(() => {
		main()
	})
	// if (bakedVersion) {
	//     await loadTexture('textures/baked.jpg').then(texture => bakedTexture = texture);
	// }
	// await loadTexture('textures/grass Displacement.png').then(texture => grassTexture = texture);
	// await loadTexture('textures/fire_sheet.png').then(texture => fireTexture = texture);
	// await loadTexture('textures/leaf.png').then(texture => leafTexture = texture);
	// main()
})