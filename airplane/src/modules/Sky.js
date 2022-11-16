import * as Scene from './Scene'
import * as THREE from 'three'
import { getTexture } from './Material'

const init = () => {
	const texture = getTexture('sky')
	// texture.repeat = new THREE.Vector2(10, 10)
	// texture.wrapT = THREE.MirroredRepeatWrapping
	// texture.wrapS = THREE.MirroredRepeatWrapping
	const geometry = new THREE.SphereGeometry(
		10000,
		5,
		5
	)
	const material = new THREE.MeshStandardMaterial({
		map: texture,
		side: THREE.DoubleSide,
		envMap: texture,
		envMapIntensity: 10,
		roughness: 0,
	})
	const sky = new THREE.Mesh(geometry, material)
	Scene.scene.add(sky)
	// model.rotation.set(Math.PI * 1.5, 0, 0)
}

export {
	init,
}