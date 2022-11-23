import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
import * as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Player from './modules/Player'
import * as Sky from './modules/Sky'
import * as Ground from './modules/Ground'
import * as Builder from './modules/Builder'
import * as Pointer from './modules/Pointer'
import * as THREE from 'three'
import * as Scene from './modules/Scene'
import * as Joystick from './modules/Joystick'
import { loadTexture, loadModel, loadHDR, addAssetToCollection, getAsset } from './modules/AssetLoader'
let world
let clock
let followCam
const modelsLib = [
	{
		id: 'treePine',
		file: 'models/treePine.glb',
	},
	{
		id: 'treePineSnow',
		file: 'models/treePineSnow.glb',
	},
	{
		id: 'treePineSnowed',
		file: 'models/treePineSnowed.glb',
	},
	{
		id: 'treeDecorated',
		file: 'models/treeDecorated.glb',
	},
	{
		id: 'snowFort',
		file: 'models/snowFort.glb',
	},
	{
		id: 'snowmanFancy',
		file: 'models/snowmanFancy.glb',
	},
	{
		id: 'rockFormationLarge',
		file: 'models/rockFormationLarge.glb',
	},
	{
		id: 'present',
		file: 'models/present.glb',
	},
	{
		id: 'lightsRed',
		file: 'models/lightsRed.glb',
	},
	{
		id: 'candyCane',
		file: 'models/candyCane.glb',
	},
	{
		id: 'cabinFloor',
		file: 'models/cabinFloor.glb',
	},
	{
		id: 'cabinRoofFlat',
		file: 'models/cabinRoofFlat.glb',
	},
	{
		id: 'cabinWall',
		file: 'models/cabinWall.glb',
	},
	{
		id: 'cabinDoor',
		file: 'models/cabinDoor.glb',
	},
	{
		id: 'cabinWindowLarge',
		file: 'models/cabinWindowLarge.glb',
	},
]

const main = () => {
	// scene
	const scene = createScene()
	
	// camera
	Camera.createCamera()
	
	// renderer
	const render = Renderer.setRenderer(Camera.camera, scene)
	Camera.setCameraControls(Camera.camera, render)
    
	// lights
	Light.init()
	
	/**
	 * Clock
	 */
	clock = new THREE.Clock()
	clock.start()
	clock.running = true

	// Player
	Player.init()

	Ground.init()

	Sky.init()

	Joystick.init()

	Builder.init(modelsLib)

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

	const delta = clock.getElapsedTime()

	Player.tick(delta)
	Light.tick()

	Renderer.tick()
	Camera.orbitControls.update()

}

window.addEventListener('DOMContentLoaded', async () => {
	await loadHDR('textures/aristea_wreck_puresky_1k.hdr').then(hdr => addAssetToCollection('background', hdr))
	await loadTexture('textures/grass.jpg').then(texture => addAssetToCollection('grass', texture))
	await loadTexture('textures/hills.jpg').then(texture => addAssetToCollection('hillsDisplacement', texture))
	for (let i=0; i<=modelsLib.length - 1; i++) {
		await loadModel(modelsLib[i].file).then(model => addAssetToCollection(modelsLib[i].id, model))
	}
	// await loadModel('models/treePine.glb').then(model => addAssetToCollection('treePine', model))
	// await loadModel('models/treePineSnow.glb').then(model => addAssetToCollection('treePineSnow', model))
	// await loadModel('models/treePineSnowed.glb').then(model => addAssetToCollection('treePineSnowed', model))
	// await loadModel('models/treeDecorated.glb').then(model => addAssetToCollection('treeDecorated', model))
	// await loadModel('models/snowFort.glb').then(model => addAssetToCollection('snowFort', model))
	// await loadModel('models/snowmanFancy.glb').then(model => addAssetToCollection('snowmanFancy', model))
	// await loadModel('models/rockFormationLarge.glb').then(model => addAssetToCollection('rockFormationLarge', model))
	// await loadModel('models/present.glb').then(model => addAssetToCollection('present', model))
	// await loadModel('models/lightsRed.glb').then(model => addAssetToCollection('lightsRed', model))
	// await loadModel('models/candyCane.glb').then(model => addAssetToCollection('candyCane', model))
	// await loadModel('models/cabinFloor.glb').then(model => addAssetToCollection('cabinFloor', model))
	// await loadModel('models/cabinRoofFlat.glb').then(model => addAssetToCollection('cabinRoofFlat', model))
	// await loadModel('models/cabinWall.glb').then(model => addAssetToCollection('cabinWall', model))
	// await loadModel('models/cabinDoor.glb').then(model => addAssetToCollection('cabinDoor', model))
	// await loadModel('models/cabinWindowLarge.glb').then(model => addAssetToCollection('cabinWindowLarge', model))

	// await loadModel('models/construction_light.glb').then(model => addAssetToCollection('construction_light', model))
	// await loadModel('models/construction_pylon.glb').then(model => addAssetToCollection('construction_pylon', model))
	// await loadModel('models/garbageTruck.glb').then(model => addAssetToCollection('garbageTruck', model))
	// await loadModel('models/light_curved.glb').then(model => addAssetToCollection('light_curved', model))
	// await loadModel('models/police.glb').then(model => addAssetToCollection('police', model))
	// await loadModel('models/garbageTruck.glb').then(model => addAssetToCollection('garbageTruck', model))
	// await loadModel('models/road_bend.glb').then(model => addAssetToCollection('road_bend', model))
	// await loadModel('models/road_curve.glb').then(model => addAssetToCollection('road_curve', model))
	// await loadModel('models/road_end.glb').then(model => addAssetToCollection('road_end', model))
	// await loadModel('models/road_slant.glb').then(model => addAssetToCollection('road_slant', model))
	// await loadModel('models/road_split.glb').then(model => addAssetToCollection('road_split', model))
	// await loadModel('models/road_straight.glb').then(model => addAssetToCollection('road_straight', model))
	main()
})