import * as THREE from 'three'
import gsap from 'gsap'
import * as Scene from './Scene'
import * as Airplane from './Airplane'
import * as World from './World'

let step = 0
let boards = []

const zoomInCurrentBillboard = () => {
	const board = boards[step]
	gsap.to(board.scale, {
		x: '+=3',
		y: '+=3',
		z: '+=3',
		duration: 2,
		ease: 'Sin.easeInOut',
	})
}

const zoomOutCurrentBillboard = () => {
	const board = boards[step]
	gsap.to(board.scale, {
		x: '-=3',
		y: '-=3',
		z: '-=3',
		duration: 2,
		ease: 'Sin.easeInOut',
	})
}

const mappedKeyMethods = {
	'-': zoomOutCurrentBillboard,
	'=': zoomInCurrentBillboard
}

const createBillboard = (texture, idx) => {
	// if (doTransitionIn) {
	// 	gsap.to(spriteBoard?.position, {
	// 		y: 60,
	// 		duration: 2,
	// 		onCompleteParams: [spriteBoard],
	// 		onComplete: (p) => {
	// 			transitionIn()
	// 		},
	// 	})
	// }
	texture.wrapS = THREE.RepeatWrapping   
	texture.wrapT = THREE.RepeatWrapping
	const material = new THREE.SpriteMaterial({ 
		map: texture,
		transparent: true,
		precision: 'highp'

	})
	// console.log(material)
	// material.opacity = .2
	// material.needsUpdate = true
	const spriteBoard = new THREE.Sprite(material)
	spriteBoard.scale.x = 10
	spriteBoard.scale.y = 10
	spriteBoard.position.set(-10, 0, 0)
	step = idx
	boards.push(spriteBoard)
	Scene.scene.add(spriteBoard)
	
}

const setupKeys = () => {
	document.addEventListener('keydown', (event) => {
		if (mappedKeyMethods.hasOwnProperty(event.key)) {
			mappedKeyMethods[event.key]()
		}
		const keyPressed = parseInt(event.key)
		if (keyPressed >= 0 && keyPressed <= 9) {
			transitionOut()
			step = parseInt(keyPressed)
			transitionIn()

		}
	})
}

const transitionIn = () => {
	Airplane.billboardIn()
	World.billboardIn()
	const board = boards[step]
	gsap.to(board.position, {
		x: -10,
		y: 16,
		duration: 2,
	})
	gsap.to(board.material, {
		opacity: 1,
		duration: .5,
	})
}

const transitionOut = () => {
	const board = boards[step]
	gsap.to(board.position, {
		y: 60,
		duration: 2,
	})
	gsap.to(board.material, {
		opacity: 0,
		duration: .5,
	})
}

const init = (assets) => {
	setupKeys()
	let idx = 0
	for (const key in assets) {
		if (Object.hasOwnProperty.call(assets, key)) {
			createBillboard(assets[key], idx)
			transitionOut()
			idx++
			//const element = object[key];
			
		}
	}
	
}

const fadeOut = () => {
	transitionOut()
}

export {
	createBillboard,
	fadeOut,
	init,
}