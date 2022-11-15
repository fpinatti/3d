import * as Scene from './Scene'
import * as Smoke from './Smoke'
import * as Camera from './Camera'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { gsap } from 'gsap'
import nipplejs from 'nipplejs'
const MOVE_JOYSTICK_EVENT = 'move_joystick_evt'
const RELEASE_JOYSTICK_EVENT = 'release_joystick_evt'
// import { getTexture } from './Material'
// import * as Camera from './Camera'

// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()


const init = () => {
	const options = {
		zone: document.getElementById('joystickWrapper1'),
		size: 120,
		multitouch: true,
		maxNumberOfNipples: 2,
		mode: 'static',
		restJoystick: true,
		shape: 'circle',
		position: { top: '10px', left: '60px' },
		dynamicPage: true,
	}
	const joyManager = nipplejs.create(options)

	joyManager['0'].on('move', function (evt, data) {
		// const forward = data.vector.y
		// const turn = data.vector.x

		const moveJoystickEvt = new CustomEvent(MOVE_JOYSTICK_EVENT, {
			detail: {
				x: data.vector.x,
				y: data.vector.y,
			}
		})

		dispatchEvent(moveJoystickEvt)
		// if (forward > 0) {
		// 	fwdValue = Math.abs(forward)
		// 	bkdValue = 0
		// } else if (forward < 0) {
		// 	fwdValue = 0
		// 	bkdValue = Math.abs(forward)
		// }

		// if (turn > 0) {
		// 	lftValue = 0
		// 	rgtValue = Math.abs(turn)
		// } else if (turn < 0) {
		// 	lftValue = Math.abs(turn)
		// 	rgtValue = 0
		// }
	})

	joyManager['0'].on('end', function () {
		const releaseJoystickEvt = new CustomEvent(RELEASE_JOYSTICK_EVENT)

		dispatchEvent(releaseJoystickEvt)
		// bkdValue = 0
		// fwdValue = 0
		// lftValue = 0
		// rgtValue = 0
	})

}

export {
	init,
	MOVE_JOYSTICK_EVENT,
	RELEASE_JOYSTICK_EVENT,
}
