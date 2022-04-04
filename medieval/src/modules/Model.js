// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const loadModel = (file) => {
	const loader = new OBJLoader()
	return new Promise(function(resolve) {
		loader.load(file, function (object) {
			resolve(object)
		})
	})
}

export {
	loadModel,
}