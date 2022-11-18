import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
import * as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Player from './modules/Player'
import * as TrackBlock from './modules/TrackBlock'
import * as Sky from './modules/Sky'
import * as Ground from './modules/Ground'
import * as Pointer from './modules/Pointer'
import * as THREE from 'three'
import * as Scene from './modules/Scene'
import * as Joystick from './modules/Joystick'
import { loadTexture, loadModel, loadHDR, addAssetToCollection, getAsset } from './modules/AssetLoader'
import { Vector2 } from 'three'
import * as YUKA from 'yuka'
let world
let clock
let physicsDebugger
let followCam
const entityManager = new YUKA.EntityManager()
const yukaTime = new YUKA.Time()
const yukaVehicle = new YUKA.Vehicle()
const yukaTruck = new YUKA.Vehicle()
// const yukaTarget = new YUKA.GameEntity()

let onPathBehavior

const main = () => {
	// scene
	const scene = createScene()
	// Scene.loadEnv()
    
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
	clock = new THREE.Clock()
	clock.start()
	clock.running = true

	// Player
	// Player.init(world, airPlanePhysMaterial)
	Player.init()

	// Sky.init()
	Ground.init()

	// Joystick.init()
	// Car.dummy.add(Camera.camera)
	tick()

	// Yuka stuff
	yukaVehicle.setRenderComponent(Player.model, sync)
	const path = new YUKA.Path()
	path.loop = true
	path.add(new YUKA.Vector3(0, 0, 0))
	path.add(new YUKA.Vector3(0, 0, -50))
	path.add(new YUKA.Vector3(40, 0, -50))
	path.add(new YUKA.Vector3(40, 0, 30))
	path.add(new YUKA.Vector3(0, 0, 30))
	path.add(new YUKA.Vector3(0, 0, 0))
	// path.add(new YUKA.Vector3(50, 0, -50))
	// path.add(new YUKA.Vector3(50, 0, 100))
	// path.add( new YUKA.Vector3( - 6, 0, 0 ) )
	// path.add( new YUKA.Vector3( - 4, 0, - 4 ) )
	// path.add( new YUKA.Vector3( 0, 0, 0 ) )
	// path.add( new YUKA.Vector3( 4, 0, - 4 ) )
	// path.add( new YUKA.Vector3( 6, 0, 0 ) )
	// path.add( new YUKA.Vector3( 4, 0, 4 ) )
	// path.add( new YUKA.Vector3( 0, 0, 6 ) )
	yukaVehicle.position.copy(path.current())

	const followPathBehavior = new YUKA.FollowPathBehavior( path, 7 )
	yukaVehicle.steering.add(followPathBehavior)

	// use "OnPathBehavior" to realize a more strict path following.
	// it's a separate steering behavior to provide more flexibility.
	onPathBehavior = new YUKA.OnPathBehavior(path)
	yukaVehicle.steering.add(onPathBehavior)

	yukaVehicle.maxSpeed = 10
	yukaVehicle.mass = 1
	entityManager.add(yukaVehicle)


	// enemy
	const enemy = new THREE.Group()
	const enemyModel = getAsset('garbageTruck')
	enemyModel.scene.position.y = .1
	enemyModel.scene.position.z = -5
	enemyModel.scene.rotation.y = Math.PI
	enemy.add(enemyModel.scene)
	enemy.castShadow = true
	enemy.matrixAutoUpdate = false
	Scene.scene.add(enemy)

	yukaTruck.setRenderComponent(enemy, sync)
	yukaTruck.maxSpeed = 10
	yukaTruck.mass = 1
	const seekBehavior = new YUKA.SeekBehavior(yukaVehicle.position)
	yukaTruck.steering.add(seekBehavior)
	entityManager.add(yukaTruck)

	/**
	 * Pointer
	 */
	Pointer.init()

	buildLevel()

}

const sync = (entity, renderComponent ) => {
	renderComponent.matrix.copy(entity.worldMatrix)
}

const buildLevel = () => {
	const roadBlocks = [
		{
			id: 'road_straight',
			position: new THREE.Vector3(0, 0, 0),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(0, 0, -1),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		}
		,
		{
			id: 'road_straight',
			position: new THREE.Vector3(0, 0, -2),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(0, 0, -3),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(0, 0, -4),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_bend',
			position: new THREE.Vector3(0, 0, -5),
			rotation: {x: 0, y: Math.PI * -.5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(1, 0, -5),
			rotation: {x: 0, y: Math.PI, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(2, 0, -5),
			rotation: {x: 0, y: Math.PI, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(3, 0, -5),
			rotation: {x: 0, y: Math.PI, z: 0}
		},
		{
			id: 'road_bend',
			position: new THREE.Vector3(4, 0, -5),
			rotation: {x: 0, y: Math.PI, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(4, 0, -4),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(4, 0, -3),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(4, 0, -2),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(4, 0, -1),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(4, 0, 0),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(4, 0, 1),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(4, 0, 2),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_bend',
			position: new THREE.Vector3(4, 0, 3),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(3, 0, 3),
			rotation: {x: 0, y: Math.PI, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(2, 0, 3),
			rotation: {x: 0, y: Math.PI, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(1, 0, 3),
			rotation: {x: 0, y: Math.PI, z: 0}
		},
		{
			id: 'road_bend',
			position: new THREE.Vector3(0, 0, 3),
			rotation: {x: 0, y: Math.PI * 2, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(0, 0, 2),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		},
		{
			id: 'road_straight',
			position: new THREE.Vector3(0, 0, 1),
			rotation: {x: 0, y: Math.PI * .5, z: 0}
		}

	]
	roadBlocks.map((block) => {
		const blockModel = TrackBlock.create(block.id, block.position, 10)
		blockModel.rotation.set(block.rotation.x, block.rotation.y, block.rotation.z)
		Scene.scene.add(blockModel)
	})

}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})

	const delta = clock.getElapsedTime()

	const yukaDelta = yukaTime.update().getDelta()

	Player.tick(delta)
	Light.tick()
	const vec = yukaVehicle.position
	Camera.camera.position.set(0, 10, vec.z + 10)
	Camera.camera.lookAt(
		new THREE.Vector3(
			vec.x,
			vec.y,
			vec.z
		)
	)
	// console.log(yukaVehicle)
	// Camera.camera.position.lerpVectors(Camera.camera.position, targCam, .5)

	entityManager.update(yukaDelta)

	Renderer.tick()
	Camera.orbitControls.update()

}

window.addEventListener('DOMContentLoaded', async () => {
	await loadHDR('textures/aristea_wreck_puresky_1k.hdr').then(hdr => addAssetToCollection('background', hdr))
	await loadTexture('textures/grass.jpg').then(texture => addAssetToCollection('grass', texture))
	await loadTexture('textures/sky.jpg').then(texture => addAssetToCollection('sky', texture))
	await loadModel('models/construction_barrier.glb').then(model => addAssetToCollection('construction_barrier', model))
	await loadModel('models/construction_light.glb').then(model => addAssetToCollection('construction_light', model))
	await loadModel('models/construction_pylon.glb').then(model => addAssetToCollection('construction_pylon', model))
	await loadModel('models/garbageTruck.glb').then(model => addAssetToCollection('garbageTruck', model))
	await loadModel('models/light_curved.glb').then(model => addAssetToCollection('light_curved', model))
	await loadModel('models/police.glb').then(model => addAssetToCollection('police', model))
	await loadModel('models/garbageTruck.glb').then(model => addAssetToCollection('garbageTruck', model))
	await loadModel('models/road_bend.glb').then(model => addAssetToCollection('road_bend', model))
	await loadModel('models/road_curve.glb').then(model => addAssetToCollection('road_curve', model))
	await loadModel('models/road_end.glb').then(model => addAssetToCollection('road_end', model))
	await loadModel('models/road_slant.glb').then(model => addAssetToCollection('road_slant', model))
	await loadModel('models/road_split.glb').then(model => addAssetToCollection('road_split', model))
	await loadModel('models/road_straight.glb').then(model => addAssetToCollection('road_straight', model))
	main()
})