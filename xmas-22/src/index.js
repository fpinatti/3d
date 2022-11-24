import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
import * as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Player from './modules/Player'
import * as Sky from './modules/Sky'
import * as Ground from './modules/Ground'
import * as Snow from './modules/Snow'
import * as Builder from './modules/Builder'
import * as Smoke from './modules/Smoke'
import * as Pointer from './modules/Pointer'
import * as THREE from 'three'
import * as Scene from './modules/Scene'
import * as Joystick from './modules/Joystick'
import gsap from 'gsap'
import { loadTexture, loadModel, loadHDR, loadJson, addAssetToCollection, getAsset } from './modules/AssetLoader'
let world
let clock
let smokeChimney
let followCam
let camLookTarget = new THREE.Object3D()

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
	{
		id: 'logo-CI&T',
		file: 'models/logo-cit.glb',
	},
	{
		id: 'cabinRoofChimney',
		file: 'models/cabinRoofChimney.glb',
	},
	{
		id: 'bench',
		file: 'models/bench.glb',
	},
	{
		id: 'cabinRoofCenter',
		file: 'models/cabinRoofCenter.glb',
	},
	{
		id: 'snowPatch',
		file: 'models/snowPatch.glb',
	},	
]

const main = () => {
	// scene
	const scene = createScene()
	
	// camera
	Camera.createCamera()
	
	// renderer
	const render = Renderer.setRenderer(Camera.camera, scene)
	// Camera.setCameraControls(Camera.camera, render)
    
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
	Snow.createParticles()

	Joystick.init()

	Builder.init(modelsLib, false)
	const levelInfo = JSON.stringify(getAsset('level'))
	Builder.loadScene(levelInfo)
	// Camera.cameraControl.enabled = true
	buildChimney()
	doCameraAnimation()

	tick()

	/**
	 * Pointer
	 */
	Pointer.init()

}

const doCameraAnimation = () => {
	// const helper = new THREE.AxesHelper()
	camLookTarget.position.set(0, 5, -8)
	// camLookTarget.add(helper)
	Scene.scene.add(camLookTarget)
	const duration = 20

	const camera = Camera.camera
	camera.position.set(0, 5, 0)
	camera.rotation.set(Math.PI * .2, 0, 0)
	// camera.lookAt(camLookTarget)

	const tl = gsap.timeline()
	tl.to(camera.position, {
		y: 1, 
		duration,
	})
	tl.to(camera.position, {
		x: .5,
		z: -1.5, 
		duration,
	}, '<')
	tl.to(camera.rotation, {
		x: 0,
		duration,
	}, '<')

}

const buildChimney = () => {
	const geo = new THREE.BoxGeometry(.2, .2, .2)
	const mat = new THREE.MeshStandardMaterial({
		color: 0xffffff,
	})
	const mesh = new THREE.Mesh(geo, mat)
	mesh.position.set(-.2, 1.3, -4.4)
	Scene.scene.add(mesh)
	smokeChimney = Smoke.createParticles()
	smokeChimney.position.set(-.2, 1.3, -4.4)
	Scene.scene.add(smokeChimney)
}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})

	const delta = clock.getElapsedTime()
	
	Camera.camera.lookAt(0, 0, -10)
	Smoke.tick()
	Player.tick(delta)
	Light.tick()
	Snow.tick()
	Renderer.tick()
	// Camera.cameraControl.update()

}

window.addEventListener('DOMContentLoaded', async () => {
	// await loadHDR('textures/aristea_wreck_puresky_1k.hdr').then(hdr => addAssetToCollection('background', hdr))
	await loadJson('data/level.json').then(data => addAssetToCollection('level', data))
	await loadHDR('textures/lauter_waterfall_1k.hdr').then(hdr => addAssetToCollection('background', hdr))
	await loadTexture('textures/grass.jpg').then(texture => addAssetToCollection('grass', texture))
	await loadTexture('textures/hills.jpg').then(texture => addAssetToCollection('hillsDisplacement', texture))
	await loadTexture('textures/sky.jpg').then(texture => addAssetToCollection('sky', texture))
	await loadTexture('textures/14487-diffuse.jpg').then(texture => addAssetToCollection('water', texture))
	await loadTexture('textures/concrete/concrete_floor_worn_001_nor_gl_1k.jpg').then(texture => addAssetToCollection('concreteNormal', texture))
	await loadTexture('textures/fabric/fabric_pattern_07_col_1_1k.jpg').then(texture => addAssetToCollection('fabricMap', texture))
	await loadTexture('textures/fabric/fabric_pattern_07_nor_gl_1k.jpg').then(texture => addAssetToCollection('fabricNormal', texture))
	await loadTexture('textures/fabric/fabric_pattern_07_rough_1k.jpg').then(texture => addAssetToCollection('fabricRoughness', texture))

	for (let i=0; i<=modelsLib.length - 1; i++) {
		await loadModel(modelsLib[i].file).then(model => addAssetToCollection(modelsLib[i].id, model))
	}
	const htmlBody = document.querySelector('body')
	htmlBody.classList.add('ready')
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