import * as Scene from './Scene'
import * as THREE from 'three'
import { getAsset } from './AssetLoader'
import * as CANNON from 'cannon-es'

const init = () => {
	const texture = getAsset('grass')
	texture.repeat = new THREE.Vector2(10, 10)
	texture.wrapT = THREE.MirroredRepeatWrapping
	texture.wrapS = THREE.MirroredRepeatWrapping
	const geometry = new THREE.PlaneGeometry(20000, 20000, 100, 100)
	const material = new THREE.MeshStandardMaterial({
		map: texture,
		color: 0xffffff,
		// displacementMap: texture,
		// displacementScale: 6,
		// displacementBias: -4,
		// side: THREE.DoubleSide,
	})
	const ground = new THREE.Mesh(geometry, material)
	ground.rotation.set(Math.PI * 1.5, 0, 0)
	ground.position.y = -.1
	Scene.scene.add(ground)
}

export {
	init,
}