import * as THREE from 'three'
import * as Scene from './Scene'
import * as Camera from './Camera'
import gsap from 'gsap'
import { loadModel } from './Model'

const target = new THREE.Vector3()

let mouseX = 0
let mouseY = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
let model
let head
// let eyes
let carrot
// let raycaster
const pointer = new THREE.Vector2()

const onMouseMove = (event) => {

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1

	mouseX = (event.clientX - windowHalfX)
	mouseY = (event.clientY - windowHalfY)
	target.x = ( mouseX * .2 - target.x ) * .02
	target.y = ( - mouseY - target.y ) * .02
	target.z = Camera.camera.position.z
	// console.log(target)
	if (model) {
		head.lookAt(target)
	}
	if (carrot) {
		// const p = new THREE.Vector3(pointer.x, pointer.y, 0)
		// const carrotPos = p.project(Camera.camera)
		// carrotPos.x = (carrotPos.x + 1) / 2 * width;
		// console.log(carrotPos)
		carrot.position.x = pointer.x * 10
		carrot.position.y = Math.max(1, pointer.y * 10)
	}
}

const init = () => {
	// external models
	// raycaster = new THREE.Raycaster()
	// raycaster.params.Points.threshold = threshold

	loadModel('models/bunny.glb').then((gltf) => {
		// gltf.children.map((element) => {
		gltf.traverse((element) => {
			console.log(element)
			if (element.name === 'head-group') {
				head = element
				animateEyes(element.children.find(element => element.name === 'eyes'))
			} else if (element.name === 'carrot') {
				carrot = element
				carrot.position.z = 3
			}
			// console.log(element)
			element.receiveShadow = true
			element.castShadow = true
			// if (bakedVersion) {
			// 	if (element.name.indexOf('picture') >= 0) {
			// 		console.log('picture')
			// 		element.material = pictureMaterial
			// 	} else {
			// 		element.material = bakedMaterial
			// 	}
			// }
		})
		Scene.scene.add(gltf)
		model = gltf
		window.addEventListener('mousemove', onMouseMove)
	})
}

const animateEyes = (eyes) => {
	// eyes = element.children.find(element => element.name === 'eyes')
	const tl = gsap.timeline({
		repeat: -1,
	})
	tl.to(eyes.scale, {
		duration: .2,
		y: .1,
		x: 1.2,
		delay: 2,
	})
	tl.to(eyes.scale, {
		duration: .1,
		y: 1,
		x: 1,
	})
}

const tick = () => {
	
}

export {
	init,
	tick
}