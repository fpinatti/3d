import { loadModel } from './Model'
import * as Scene from './Scene'
import * as THREE from 'three'

const init = (texture) => {
	loadModel('models/shoes.glb').then((gltf) => {
		const model = gltf.scene
		// const material = new THREE.MeshBasicMaterial({
		// 	color: 0xffffff,
		// 	map: texture,
		// })
		model.traverse((child) => {
			child.castShadow = true
			child.receiveShadow = true
			console.log('>', child.name)
		})
		Scene.scene.add(model)
	})
}

export {
	init,
}