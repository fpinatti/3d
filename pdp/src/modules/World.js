import { loadModel } from './Model'
import * as Scene from './Scene'
import * as Utils from '../utils/utils'
import gsap from 'gsap'
import * as THREE from 'three'

let model
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''

const init = (assets) => {
	loadModel('models/main_scenario.glb').then((gltf) => {
		createSky(assets.sky)
		model = gltf.scene
		const material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map: assets.world,
		})
		model.traverse((child) => {
			assets.world.flipY = false
			child.material = material
		})
		Scene.scene.add(model)
		animateEarth()
		model.position.y = -5
		model.position.x = 0
		const helper = new THREE.AxesHelper()
		model.add(helper)
		// model.rotation.y = Math.PI * .5

	})
}

const createSky = (sky) => {
	const geometry = new THREE.SphereBufferGeometry(18, 10, 10)
	const material = new THREE.MeshBasicMaterial({
		map: sky,
		side: THREE.DoubleSide,
	})
	const mesh = new THREE.Mesh(geometry, material)
	// mesh.rotation.y = Math.PI
	// mesh.position.z = 15
	// mesh.scale.x = 10
	// mesh.scale.y = 10
	Scene.scene.add(mesh)
}

const animateEarth = () => {
	const ground = Utils.getElementFromModel(model, 'ground')
	gsap.to(ground.rotation, {
		duration: 60,
		z: - Math.PI * 2,
		repeat: -1,
		ease: 'linear',
	})
}

const tick = () => {

}

export {
	init,
	tick,
}