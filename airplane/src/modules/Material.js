import * as THREE from 'three'
import * as CANNON from 'cannon-es'

const loader = new THREE.TextureLoader()
const textureCollection = {}
let physicMaterials = {}

const createMaterial = (type) => {
	let material
	switch (type) {
	case 'standard':
		material = new THREE.MeshStandardMaterial({
			color: 0xff0000,
		})
		break
	default:
		material = new THREE.MeshBasicMaterial({
			color: 0xff0000,
		})
	}
    
	return material
}

const loadTexture = (url) => {
	return new Promise(function(resolve) {
		loader.load(
			url,
			(texture) => {
				resolve(texture)
			}
		)
	})
}

const addTextureToCollection = (key, texture) => {
	textureCollection[key] = texture
}

const getTexture = (key) => {
	return textureCollection[key]
}


// const initPhysicMaterials = (world) => {
// 	physicMaterials.ground = new CANNON.Material('ground')
// 	// groundMaterial = new CANNON.Material('ground')
// 	physicMaterials.mat1 = new CANNON.ContactMaterial(physicMaterials.ground, mat1, { friction: 0.0, restitution: 0.0 })
// 	const mat2_ground = new CANNON.ContactMaterial(physicMaterials.ground, mat2, { friction: 0.0, restitution: 0.7 })
// 	const mat3_ground = new CANNON.ContactMaterial(physicMaterials.ground, mat3, { friction: 0.0, restitution: 0.9 })

// 	world.addContactMaterial(mat1_ground)
// 	world.addContactMaterial(mat2_ground)
// 	world.addContactMaterial(mat3_ground)
// }

export {
	createMaterial,
	loadTexture,
	addTextureToCollection,
	getTexture,
	// initPhysicMaterials
}