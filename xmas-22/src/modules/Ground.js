import * as Scene from './Scene'
import * as THREE from 'three'
import { getAsset } from './AssetLoader'

const init = () => {
	const texture = getAsset('grass')
	texture.repeat = new THREE.Vector2(10, 10)
	texture.wrapT = THREE.MirroredRepeatWrapping
	texture.wrapS = THREE.MirroredRepeatWrapping
	const displaceTexture = getAsset('hillsDisplacement')
	const geometry = new THREE.PlaneGeometry(40, 40, 10, 10)
	const material = new THREE.MeshStandardMaterial({
		// map: texture,
		// wireframe: true,
		envMapIntensity: .2,
		// color: 0xffffff,
		displacementMap: displaceTexture,
		displacementScale: 15,
		displacementBias: -13,
		side: THREE.DoubleSide,
	})
	const ground = new THREE.Mesh(geometry, material)
	ground.rotation.set(Math.PI * 1.5, 0, 0)
	ground.receiveShadow = true
	// ground.position.y = -.1
	Scene.scene.add(ground)

	// water
	const waterGeometry = new THREE.PlaneGeometry(30, 30, 10, 10)
	const waterMaterial = new THREE.MeshStandardMaterial({
		color: 0x0000ff
		// map: texture,
		// wireframe: true,
		// envMapIntensity: .2,
		// color: 0xffffff,
		// displacementMap: displaceTexture,
		// displacementScale: 15,
		// displacementBias: -13,
		// side: THREE.DoubleSide,
	})
	const water = new THREE.Mesh(waterGeometry, waterMaterial)
	water.rotation.set(Math.PI * 1.5, 0, 0)
	water.receiveShadow = true
	water.position.set(0, -.3, 1)
	Scene.scene.add(water)
}

export {
	init,
}