import * as THREE from 'three'
import gsap from 'gsap'
import * as Scene from './Scene'
import * as Airplane from './Airplane'

let step = 0
let boards = []

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
		// blending: THREE.AdditiveBlending,
	})
	// console.log(material)
	// material.opacity = .2
	// material.needsUpdate = true
	const spriteBoard = new THREE.Sprite(material)
	spriteBoard.scale.x = 3
	spriteBoard.scale.y = 3
	spriteBoard.position.set(-10, 0, 0)
	step = idx
	boards.push(spriteBoard)
	Scene.scene.add(spriteBoard)
	
}

const setupKeys = () => {
	document.addEventListener('keydown', (event) => {
		const keyPressed = parseInt(event.key)
		// console.log(keyPressed)
		if (keyPressed >= 0 && keyPressed <= 9) {
			transitionOut()
			step = parseInt(keyPressed)
			transitionIn()

		}
	})
}

const transitionIn = () => {
	Airplane.billboardIn()
	const board = boards[step]
	console.log(board.material.opacity)
	// spriteBoard.position.y = 30
	gsap.to(board.position, {
		x: -10,
		y: 14,
		duration: 2,
	})
	gsap.to(board.material, {
		opacity: 1,
		duration: .5,
	})
	// gsap.to(spriteBoard.position, {
	// 	y: 0,
	// 	duration: 2,
	// 	onCompleteParams: [spriteBoard],
	// 	onComplete: (p) => {
	// 		console.log(p)
	// 	},
	// })
}

const transitionOut = () => {
	// console.log(step)
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