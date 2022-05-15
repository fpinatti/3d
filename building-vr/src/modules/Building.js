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
	const material = new THREE.MeshNormalMaterial();

	loadModel('models/projeto-lori.glb').then((gltf) => {
		// gltf.children.map((element) => {
		gltf.traverse((element) => {
			// element.material = material
			if (element.geometry?.attributes?.uv) {
				element.geometry.attributes.uv2 = element.geometry.attributes.uv
			}
			element.receiveShadow = true
			element.castShadow = true
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