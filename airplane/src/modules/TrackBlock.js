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
const dimensions = new THREE.Vector3(15, 5, 5)

const create = (physWorld, groundGeo, groundMaterial, blockPosition, groundPhysMaterial) => {
	// const materialCopy = groundMaterial.clone()
	// materialCopy.opacity = Math.random() * .7 + .3
	const groundMesh = new THREE.Mesh(groundGeo, groundMaterial)
	groundMesh.receiveShadow = true
	// const geo = new THREE.BoxGeometry(
	// 	dimensions.x,
	// 	dimensions.y,
	// 	dimensions.z,
	// )
	// const mat = new THREE.MeshStandardMaterial({
	// 	color: 0xffffff,
	// 	// side: THREE.DoubleSide,
	// 	roughness: .8,
		
	// })
	// model = mesh
	// model.receiveShadow = true
	// model.castShadow = true
	// console.log(mesh)
	initPhysics(physWorld, blockPosition, groundPhysMaterial)
	groundMesh.position.set(blockPosition.x, blockPosition.y, blockPosition.z)
	return groundMesh
	// model.rotation.set(Math.PI * 1.5, 0, 0)
}

const initPhysics = (world, blockPosition, groundPhysMaterial) => {
	physics = new CANNON.Body({
		// mass: 0,
		material: groundPhysMaterial,
		type: CANNON.BODY_TYPES.STATIC,
		// collisionFilterGroup: 1,
		position: new CANNON.Vec3(blockPosition.x, blockPosition.y * -.5, blockPosition.z),
		shape: new CANNON.Box(new CANNON.Vec3(5, .5, 5))
	})
	// physics.quaternion.setFromEuler(-Math.PI * .5, 0, 0)
	world.addBody(physics)
	// model.position.copy(physics.position)
	// model.quaternion.copy(physics.quaternion)
}

const tick = () => {

}

export {
	create,
	physics,
	tick,
	model,
	dimensions,
}