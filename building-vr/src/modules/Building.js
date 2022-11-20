import * as THREE from 'three'
import * as Scene from './Scene'
import * as Camera from './Camera'
import gsap from 'gsap'
import { loadModel } from './Model'
import { getAsset } from './AssetLoader'

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
			// element.material = material
			if (element.material) {
				element.material.envMapIntensity = .01
			}
			if (element.name.startsWith('glass')) {
				element.material = getGlassMaterial()
				// element.material.needsUpdate = true
			}
			if (element.name.startsWith('grass') || element.name.startsWith('ground')) {
				element.material = getGrassMaterial()
				// element.material.needsUpdate = true
			}
			if (element.name.startsWith('point_light')) {
				setupPointLight(element)
			}
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

const getGlassMaterial = () => {
	const glassMaterial = new THREE.MeshPhysicalMaterial({
		// opacity: .2,
		// transparent: true,
		roughness: 0,
		metalness: .3,
		ior: 3,
		transmission: 1,
	})
	return glassMaterial
	// console.log(element.material)
}

const getGrassMaterial = () => {
	const colorTexture = getAsset('grass_color')
	colorTexture.wrapS = THREE.RepeatWrapping
	colorTexture.wrapT = THREE.RepeatWrapping
	colorTexture.repeat.set(10, 10)

	const roughTexture = getAsset('grass_roughness')
	roughTexture.wrapS = THREE.RepeatWrapping
	roughTexture.wrapT = THREE.RepeatWrapping
	roughTexture.repeat.set(10, 10)

	const dispTexture = getAsset('grass_displacement')
	dispTexture.wrapS = THREE.RepeatWrapping
	dispTexture.wrapT = THREE.RepeatWrapping
	dispTexture.repeat.set(10, 10)

	const normalTexture = getAsset('grass_normal')
	normalTexture.wrapS = THREE.RepeatWrapping
	normalTexture.wrapT = THREE.RepeatWrapping
	normalTexture.repeat.set(10, 10)

	const occTexture = getAsset('grass_occlusion')
	occTexture.wrapS = THREE.RepeatWrapping
	occTexture.wrapT = THREE.RepeatWrapping
	occTexture.repeat.set(10, 10)

	// console.log('a')
	const grassMaterial = new THREE.MeshStandardMaterial({
		// color: 0xff0000,
		map: colorTexture,
		envMapIntensity: .1,
		// opacity: .2,
		// transparent: true,
		aoMap: occTexture,
		aoMapIntensity: .3,
		// // transmission: 1,
		roughnessMap: roughTexture,
		roughness: .9,
		displacementMap: dispTexture,
		displacementScale: .5,
		normalMap: normalTexture,
		// roughnessMap: getAsset('grass_roughness'),
	})
	return grassMaterial
	// console.log(element.material)
}

const setupPointLight = (light) => {
	light.shadow.bias = -0.002
}

const tick = () => {
	
}

export {
	init,
	tick
}