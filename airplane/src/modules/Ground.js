import * as Scene from './Scene'
import * as THREE from 'three'
import { getTexture } from './Material'

const init = () => {
	const texture = getTexture('grass')
	texture.repeat = new THREE.Vector2(10, 10)
	texture.wrapT = THREE.MirroredRepeatWrapping
	texture.wrapS = THREE.MirroredRepeatWrapping
	const geometry = new THREE.PlaneGeometry(10000, 10000, 1000, 1000)
	const material = new THREE.MeshStandardMaterial({
		map: texture,
		displacementMap: texture,
		displacementScale: 6,
		displacementBias: -4,
		// side: THREE.DoubleSide,
	})
	const ground = new THREE.Mesh(geometry, material)
	ground.rotation.set(Math.PI * 1.5, 0, 0)
	Scene.scene.add(ground)
}

export {
	init,
}