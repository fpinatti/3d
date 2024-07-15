import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const textureCollection = {}

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

export {
	createMaterial,
	loadTexture,
	addTextureToCollection,
	getTexture
}