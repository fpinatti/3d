import * as THREE from 'three'
import gsap from 'gsap'
import * as Scene from './Scene'

const stepsAnimation = {x: 0}
let spriteBoard
let resources

const createBillboard = (texture) => {
	transitionOut()
	// texture.repeat.set(.15, 1)
	texture.wrapS = THREE.RepeatWrapping   
	texture.wrapT = THREE.RepeatWrapping
	const material = new THREE.SpriteMaterial({ 
		map: texture,
		// blending: THREE.AdditiveBlending,
	})

	spriteBoard = new THREE.Sprite(material)
	spriteBoard.scale.x = 3
	spriteBoard.scale.y = 3
	spriteBoard.position.z = 4
	Scene.scene.add(spriteBoard)
	transitionIn()
}

const setupKeys = () => {
	document.addEventListener('keydown', (event) => {
		const keyPressed = event.key
		if (keyPressed === '1') {
			createBillboard(resources['billboard'])
		}
	})
}

const transitionIn = () => {
	spriteBoard.position.y = 10
	gsap.to(spriteBoard.position, {
		y: 0,
		duration: 2,
		onCompleteParams: [spriteBoard],
		onComplete: (p) => {
			console.log(p)
		},
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
	if (!spriteBoard) {
		return
	}
	gsap.to(spriteBoard.position, {
		y: 10,
		duration: 2,
		onCompleteParams: [spriteBoard],
		onComplete: (p) => {
			Scene.scene.remove(p)
		},
	})
}

const init = (assets) => {
	resources = assets
	setupKeys()
}


export {
	createBillboard,
	init,
}