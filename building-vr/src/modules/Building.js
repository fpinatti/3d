import * as THREE from 'three'
import * as Scene from './Scene'
import * as Camera from './Camera'
import gsap from 'gsap'
import { loadModel } from './Model'

const target = new THREE.Vector3()

let model
// let raycaster
const pointer = new THREE.Vector2()


const init = () => {
	// external models
	// raycaster = new THREE.Raycaster()
	// raycaster.params.Points.threshold = threshold

	loadModel('models/projeto-lori.glb').then((gltf) => {
		// gltf.children.map((element) => {
		gltf.traverse((element) => {
			console.log(element)
			// if (element.name === 'head-group') {
			// 	head = element
			// 	animateEyes(element.children.find(element => element.name === 'eyes'))
			// } else if (element.name === 'carrot') {
			// 	carrot = element
			// 	carrot.position.z = 3
			// }
			// console.log(element)
			element.receiveShadow = true
			element.castShadow = true
			// if (bakedVersion) {
			// 	if (element.name.indexOf('picture') >= 0) {
			// 		console.log('picture')
			// 		element.material = pictureMaterial
			// 	} else {
			// 		element.material = bakedMaterial
			// 	}
			// }
		})
		Scene.scene.add(gltf)
		model = gltf
	})
}


const tick = () => {
	
}

export {
	init,
	tick
}