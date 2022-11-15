import * as THREE from 'three'
import * as Camera from './Camera'

const mouse = new THREE.Vector2()

const init = () => {
	document.addEventListener('mousemove', onMouseMoveScreen)
}

const onMouseMoveScreen = (event) => {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
	// console.log(mouse)
	// Camera.camera.position.x = mouse.x * .08
	// Camera.camera.position.y = mouse.y * .1
	// console.log(Camera.camera.position.y)
}

export {
	init,
}