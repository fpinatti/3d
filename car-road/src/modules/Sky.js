import * as Scene from './Scene'
import * as THREE from 'three'
import { getAsset } from './AssetLoader'

const init = () => {
	const texture = getAsset('sky')
	// texture.repeat = new THREE.Vector2(10, 10)
	// texture.wrapT = THREE.MirroredRepeatWrapping
	// texture.wrapS = THREE.MirroredRepeatWrapping
	const geometry = new THREE.SphereGeometry(
		10000,
		8,
		8,
		0,
		Math.PI * 2,
		0,
		Math.PI * .5,
	)
	const material = new THREE.MeshStandardMaterial({
		map: texture,
		side: THREE.DoubleSide,
		envMap: texture,
		envMapIntensity: 1,
		roughness: .5,
	})
	const sky = new THREE.Mesh(geometry, material)
	Scene.scene.add(sky)
	// model.rotation.set(Math.PI * 1.5, 0, 0)
}

export {
	init,
}