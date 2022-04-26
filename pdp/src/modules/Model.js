import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loadModel = (file) => {
	const loader = new GLTFLoader()
	return new Promise(function(resolve) {
		loader.load(file, function (gltf) {
			resolve(gltf)
		})
	})
}

export {
	loadModel,
}