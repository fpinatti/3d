import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'

const loader = new THREE.TextureLoader()
const assetCollection = {}

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

const loadModel = (file) => {
	const loader = new GLTFLoader()
	return new Promise(function(resolve) {
		loader.load(file, function (gltf) {
			resolve(gltf)
		})
	})
}

const loadHDR = (file) => {
	const loader = new RGBELoader()
	return new Promise(function(resolve) {
		loader.load(file, function (texture) {
			texture.mapping = THREE.EquirectangularReflectionMapping
			resolve(texture)
		})
	})
}

const addAssetToCollection = (key, texture) => {
	assetCollection[key] = texture
}

const getAsset = (key) => {
	return assetCollection[key]
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
	loadTexture,
	loadModel,
	loadHDR,
	addAssetToCollection,
	getAsset,
}