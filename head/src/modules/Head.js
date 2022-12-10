import * as Scene from './Scene'
import * as Camera from './Camera'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
// import { GUI } from 'dat.gui'
import { gsap } from 'gsap'
import { getAsset } from './AssetLoader'
import ColorPicker from 'simple-color-picker'
// import { getTexture } from './Material'
// import * as Camera from './Camera'

// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()
const vrCam = new THREE.Object3D()
const model = new THREE.Group()
const materialAvatar = new THREE.MeshStandardMaterial({
	color: 0xd6b685,
	side: THREE.DoubleSide,
	roughness: 0,
})
const materialEyelashes = new THREE.MeshStandardMaterial({
	color: 0x000000,
})
const materialHair = new THREE.MeshStandardMaterial({
	color: 0x00ff00,
	side: THREE.DoubleSide,
})

const init = () => {
	const head = getAsset('head').scene
	// head.position.y = -8
	head.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true
			child.receiveShadow = true
			if (child.name === 'Hairstyle_001') {
				child.material = materialHair
			}
			if (child.name === 'Avatar') {
				child.material = materialAvatar
			}
			if (child.name === 'Eyelashes') {
				child.material = materialEyelashes
			}
		}
	})
	head.scale.set(8, 8, 8)
	// head.castShadow = true
	// model.castShadow = true
	model.add(head)

	Scene.scene.add(model)

	const colorPickerHair = new ColorPicker({
		color: '#FF0000',
		background: '#454545',
		el: document.querySelector('.color-picker-1'),
		width: 200,
		height: 200,
	})
	colorPickerHair.onChange(() => {
		materialHair.color = new THREE.Color(colorPickerHair.getHexNumber())
	})

	const colorPickerAvatar = new ColorPicker({
		color: '#ffffff',
		background: '#454545',
		el: document.querySelector('.color-picker-2'),
		width: 200,
		height: 200,
	})
	colorPickerAvatar.onChange(() => {
		materialAvatar.color = new THREE.Color(colorPickerAvatar.getHexNumber())
	})

	vrCam.position.set(0, 10, 15)

	// const box = new THREE.BoxGeometry(3, 3, 3, 3, 3)
	// const g1 = new THREE.Mesh(box, materialAvatar)
	// g1.position.set(0, 8, 4)
	// g1.castShadow = true
	// Scene.scene.add(g1)
	// colorPicker.appendTo('.color-picker')
}


export {
	init,
	model,
	vrCam,
	// tick,
}