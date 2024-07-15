import * as THREE from 'three'
import * as Scene from './Scene'
import * as Camera from './Camera'
import gsap from 'gsap'
import { loadModel } from './Model'

const target = new THREE.Vector3()

let model
// let raycaster
const pointer = new THREE.Vector2()


const init = (textures) => {
	// external models
	// raycaster = new THREE.Raycaster()
	// raycaster.params.Points.threshold = threshold
	const worldTexture = textures['world']
	worldTexture.flipY = false
	const bakedMaterial = new THREE.MeshBasicMaterial({
		map: worldTexture
	})

	// const grassTexture = textures['grass']
	// grassTexture.wrapS = THREE.RepeatWrapping
	// grassTexture.wrapT = THREE.RepeatWrapping
	// grassTexture.repeat.set(2, 2)
	const grassMaterial = new THREE.MeshStandardMaterial({
		color: 0x149f38
	})

	const roofTexture = textures['roof']
	// grassTexture.wrapS = THREE.RepeatWrapping
	// grassTexture.wrapT = THREE.RepeatWrapping
	// grassTexture.repeat.set(2, 2)
	const roofMaterial = new THREE.MeshStandardMaterial({
		map: roofTexture
	})

	loadModel('models/house-candy.glb').then((gltf) => {
		// gltf.children.map((element) => {
		gltf.traverse((element) => {
			console.log(element.name)
			if (element.name === 'ground') {
				element.material = grassMaterial
			} else if (element.name.indexOf('logo') >= 0) {
			} else if (element.name === 'roof') {
				element.material = roofMaterial
			} else {
				element.material = bakedMaterial
			}
			// element.material = material
			// if (element.geometry?.attributes?.uv) {
			// 	element.geometry.attributes.uv2 = element.geometry.attributes.uv
			// }
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