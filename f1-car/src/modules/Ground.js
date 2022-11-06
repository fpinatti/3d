import * as Scene from './Scene'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
// import { GUI } from 'dat.gui'
// import { gsap } from 'gsap'
// import { getTexture } from './Material'
// import * as Camera from './Camera'

// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()
let model
let physics
let groundMaterial

const init = (physWorld, material) => {
	const groundGeo = new THREE.PlaneGeometry(1000, 1000, 1, 1)
	const groundMat = new THREE.MeshLambertMaterial({
		color: 0x00FFFF,
	})
	model = new THREE.Mesh(groundGeo, groundMat)
	Scene.scene.add(model)
	model.position.y = -.1
	model.rotation.set(Math.PI * 1.5, 0, 0)
	initPhysics(physWorld, material)
}

const initPhysics = (world, material) => {
	physics = new CANNON.Body({
		mass: 0,
		material,
		// type: CANNON.BODY_TYPES.STATIC,
		// collisionFilterGroup: 1,
		position: new CANNON.Vec3(0, 0, 0),
		shape: new CANNON.Plane()
	})
	physics.quaternion.setFromEuler(-Math.PI * .5, 0, 0)
	world.addBody(physics)
	// model.position.copy(physics.position)
	// model.quaternion.copy(physics.quaternion)
}

const tick = () => {

}

export {
	init,
	model,
	physics,
	tick,
	groundMaterial,
}