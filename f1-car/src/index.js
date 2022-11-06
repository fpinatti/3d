import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
// import * as Scene from './modules/Scene'
import * as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Car from './modules/Car'
import * as TrackBlock from './modules/TrackBlock'
import * as Ground from './modules/Ground'
import * as Pointer from './modules/Pointer'
import * as THREE from 'three'
import * as Scene from './modules/Scene'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
// import { loadTexture, addTextureToCollection } from './modules/Material'
let groundMesh
let world
let carBodyPhysics
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
	// physicsDebugger = new CannonDebugger(Scene.scene, world)
	world.defaultContactMaterial.friction = 0
	const groundMaterial = new CANNON.Material('groundMaterial')
	const wheelMaterial = new CANNON.Material('wheelMaterial')
	const wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
		friction: 100,
		restitution: 0,
		contactEquationStiffness: 1000
	})
	// We must add the contact materials to the world
	world.addContactMaterial(wheelGroundContactMaterial)
	/**
	 * Clock
	 */
	// clock = new THREE.Clock()

	/**
	 * Track
	 */
	for (let idx = 0; idx <= 100; idx++) {
		const block = TrackBlock.create()
		// console.log(block.geometry.parameters.depth)
		block.position.y = -2.5
		block.position.z = block.geometry.parameters.depth * -idx
		Scene.scene.add(block)
	}

	// ground
	Ground.init(world, groundMaterial)
	// car
	Car.init(world, wheelMaterial)
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
	Car.tick()
	Light.tick()
	// const vec = Camera.camera.position.copy(Car.dummy.position)
	// const targCam = new THREE.Vector3(vec.x, vec.y, vec.z)
	// Camera.camera.lookAt(Car.model.position)
	// Camera.camera.position.lerpVectors(Camera.camera.position, targCam, .5)

	// physicsDebugger.update()
	Renderer.tick()
	Camera.orbitControls.update()

}

window.addEventListener('DOMContentLoaded', async () => {
	// await loadTexture('textures/8081_earthmap4k.jpg').then(texture => addTextureToCollection('earthmap', texture))
	// await loadTexture('textures/8081_earthbump4k.jpg').then(texture => addTextureToCollection('earthbump', texture))
	main()
})