import * as Scene from './Scene'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
// import { GUI } from 'dat.gui'
// import { gsap } from 'gsap'
// import { getTexture } from './Material'
// import * as Camera from './Camera'

// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()
let model

const init = () => {
	const groundGeo = new THREE.PlaneGeometry(1000, 1000, 1, 1)
	const groundMat = new THREE.MeshStandardMaterial({
		color: 0x00FFFF,
		envMapIntensity: .2,
	})
	model = new THREE.Mesh(groundGeo, groundMat)
	Scene.scene.add(model)
	model.receiveShadow = true
	model.position.y = -.1
	model.rotation.set(Math.PI * 1.5, 0, 0)
}

const tick = () => {

}

export {
	init,
	model,
	tick,
}