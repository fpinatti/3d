import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
// import * as Scene from './modules/Scene'
import * as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Airplane from './modules/Airplane'
import * as TrackBlock from './modules/TrackBlock'
import * as Sky from './modules/Sky'
import * as Ground from './modules/Ground'
import * as Pointer from './modules/Pointer'
import * as THREE from 'three'
import * as Scene from './modules/Scene'
import * as CANNON from 'cannon-es'
import * as Joystick from './modules/Joystick'
import CannonDebugger from 'cannon-es-debugger'
import { loadTexture, addTextureToCollection, getTexture } from './modules/Material'
import { Vector2 } from 'three'
let world
let clock
let physicsDebugger
let followCam
const camTo = new THREE.Vector3()

const main = () => {
	// scene
	const scene = createScene()
	Scene.loadEnv()
    
	// camera
	Camera.createCamera()
	// Scene.scene.add(Camera.camera)

	// renderer
	const render = Renderer.setRenderer(Camera.camera, scene)
	Camera.setCameraControls(Camera.camera, render)
    
	// lights
	Light.init()
	
	/**
	 * Physics
	 */
	world = new CANNON.World({
		gravity: new CANNON.Vec3(0, -9.82, 0),
	})
	world.broadphase = new CANNON.SAPBroadphase(world)
	physicsDebugger = new CannonDebugger(Scene.scene, world)
	// world.defaultContactMaterial.friction = 0
	// const groundMaterial = new CANNON.Material('groundMaterial')
	// const wheelMaterial = new CANNON.Material('wheelMaterial')
	// const wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
	// 	friction: 100,
	// 	restitution: 0,
	// 	contactEquationStiffness: 1000
	// })
	// We must add the contact materials to the world
	// world.addContactMaterial(wheelGroundContactMaterial)
	/**
	 * Clock
	 */
	clock = new THREE.Clock()
	clock.start()
	clock.running = true

	// physical materials
	const groundPhysMaterial = new CANNON.Material()
	const airPlanePhysMaterial = new CANNON.Material()
	const contactMaterial = new CANNON.ContactMaterial(
		groundPhysMaterial,
		airPlanePhysMaterial,
		{
			friction: 0,
			restitution: .5,
		}
	)
	world.addContactMaterial(contactMaterial)
	// ground
	const roadTexture = getTexture('road')
	roadTexture.repeat = new THREE.Vector2(1, 2)
	roadTexture.wrapT = THREE.RepeatWrapping
	console.log(roadTexture)
	const groundGeo = new THREE.BoxGeometry(10, 1, 10)
	const groundMaterial = new THREE.MeshStandardMaterial({
		// color: 0xffff00
		map: roadTexture,
	})
	
	for (let idx = 0; idx <= 100; idx++) {
		const ground = TrackBlock.create(
			world,
			groundGeo,
			groundMaterial,
			new THREE.Vector3(0, 0, 10 * -idx),
			groundPhysMaterial
		)
		// ground.position.set(0, 0, 10 * -idx)
		// console.log(ground)
		Scene.scene.add(ground)
	}
	// Ocean.init(world)
	// car
	Airplane.init(world, airPlanePhysMaterial)

	Sky.init()
	Ground.init()

	Joystick.init()
	// Car.dummy.add(Camera.camera)
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

	world.fixedStep()

	Airplane.tick(clock.getElapsedTime())
	// Ocean.tick(clock.getElapsedTime())
	Light.tick()
	// const vec = Camera.camera.position.copy(Car.dummy.position)
	// const targCam = new THREE.Vector3(vec.x, vec.y, vec.z)
	// Camera.camera.lookAt(Car.model.position)
	// Camera.camera.position.lerpVectors(Camera.camera.position, targCam, .5)

	physicsDebugger.update()
	Renderer.tick()
	Camera.orbitControls.update()

}

window.addEventListener('DOMContentLoaded', async () => {
	await loadTexture('textures/road.jpg').then(texture => addTextureToCollection('road', texture))
	await loadTexture('textures/grass.jpg').then(texture => addTextureToCollection('grass', texture))
	await loadTexture('textures/sky.jpg').then(texture => addTextureToCollection('sky', texture))
	main()
})