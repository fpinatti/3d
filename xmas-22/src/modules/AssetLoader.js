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

export {
	loadTexture,
	loadModel,
	loadHDR,
	addAssetToCollection,
	getAsset,
}