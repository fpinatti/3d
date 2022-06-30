import { loadModel } from './Model'
import * as Scene from './Scene'
import * as THREE from 'three'
import Palette from 'nice-color-palettes'
import { GUI } from 'dat.gui'
import { gsap } from 'gsap'

let model
const modelGroups = [
	['ring', 'ring001', 'ring002', 'ring003', 'ring004', 'ring005', 'ring006', 'ring007', 'ring008', 'ring009'],
	['lace_1_1', 'lace_2', 'lace_3', 'lace_4', 'lace_5', 'lace_6', 'lace_7'],
	['vamp', 'insole', 'outsole', 'stitch', 'stitch10', 'stitch11', 'stitch14', 'stitch15', 'stitch16', 'stitch17', 'stitch18', 'stitch19', 'stitch20'],
	['toe', 'below', 'tongue_binding', 'binding', 'base', 'base001'],
	['stripe', 'tongue_2'],
]
const materials = []

const init = (texture) => {
	return new Promise((resolve, reject) => {
		loadModel('models/shoes.glb').then((gltf) => {
			model = gltf.scene
			// create the palletes
			const basePalette = Palette[Math.round(Math.random() * 90)]
			modelGroups.forEach((arr, index) => {
				const color = new THREE.Color(basePalette[index])
				const material = new THREE.MeshLambertMaterial({
					color 
				})
				materials.push(material)
			})
			model.traverse((child) => {
				child.castShadow = true
				child.receiveShadow = true
				modelGroups.forEach((arr, paletteIndex) => {
					console.log(child.name)
					if (arr.includes(child.name.toLowerCase())) {
						child.material = materials[paletteIndex]
						// console.log('!!!!', child.name)
					}
				})
			})
			Scene.scene.add(model)
			// model.rotation.x = Math.PI * .5
			// model.rotation.y = Math.PI * .5
			model.position.x = .08
			resolve()
		})
	})
}

const sortNewPallete = () => {
	const basePalette = Palette[Math.round(Math.random() * 90)]
	const ring1 = document.querySelector('.ring-circle-1')
	const ring2 = document.querySelector('.ring-circle-2')
	materials.forEach((material, index) => {
		const neutralColor = new THREE.Color(0xFFFFFF)
		const targetColor = new THREE.Color(basePalette[index])
		// material.color = color
		gsap
			.timeline()
			.to(material.color, {
				r: neutralColor.r,
				g: neutralColor.g,
				b: neutralColor.b, 
				duration: .5
			})
			.to(material.color, {
				r: targetColor.r,
				g: targetColor.g,
				b: targetColor.b,
				delay: .4,
				duration: .5
			})
			.fromTo(model.rotation, {
				y: 0,
				duration: 3.5
			}, {
				y: Math.PI * 2,
				duration: 3.5
			}, 0)
			.fromTo(ring1, {
				scale: 0,
				opacity: 1,
			}, {
				scale: 7,
				opacity: 0,
			}, 0)
			.fromTo(ring2, {
				scale: 0,
				opacity: 1,
			}, {
				scale: 11,
				stagger: 1,
			}, 0)
		// const color = new THREE.Color(basePalette[index])
		// const material = new THREE.MeshLambertMaterial({
		// 	color 
		// })
		// materials.push(material)
	})
	console.log('update palette', basePalette)
}

export {
	init,
	sortNewPallete,
	model,
}