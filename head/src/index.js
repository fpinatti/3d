import './styles.css'
import { createScene } from './modules/Scene'
import * as Camera from './modules/Camera'
// import * as Scene from './modules/Scene'
import * as Light from './modules/Light'
import * as Renderer from './modules/Renderer'
import * as Head from './modules/Head'
import * as VrController from './modules/VrController'
import * as Ground from './modules/Ground'
import * as Scene from './modules/Scene'
import * as THREE from 'three'
import { loadTexture, loadModel, loadHDR, addAssetToCollection, getAsset } from './modules/AssetLoader'

const main = () => {
	// scene
	const scene = createScene()
	Scene.setEnv(getAsset('hdr'))
    
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

	// ground
	Ground.init()
	// car
	Head.init()
	// Car.dummy.add(Camera.camera)
	tick()

	/**
	 * Vr controller
	 */
	// VrController.init()

	/**
	 * Pointer
	 */
	// Pointer.init()

}

const tick = () => {
	requestAnimationFrame(() => {
		tick()
	})

	// Car.tick()
	Light.tick()
	const vec = new THREE.Vector3()
	Head.model.position.copy(vec)
	vec.y = 10
	// const targCam = new THREE.Vector3(vec.x, vec.y, vec.z)
	Camera.camera.lookAt(vec)
	// Camera.camera.position.lerpVectors(Camera.camera.position, targCam, .5)

	// physicsDebugger.update()
	Renderer.tick()
	Camera.orbitControls.update()

}

window.addEventListener('DOMContentLoaded', async () => {
	// await loadTexture('textures/8081_earthmap4k.jpg').then(texture => addAssetToCollection('earthmap', texture))
	await loadHDR('textures/lauter_waterfall_1k.hdr').then(asset => addAssetToCollection('hdr', asset))
	await loadModel('models/hair_woman.glb').then(asset => addAssetToCollection('head', asset))
	
	// await loadTexture('textures/8081_earthbump4k.jpg').then(texture => addTextureToCollection('earthbump', texture))
	main()
})