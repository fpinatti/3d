import * as Scene from './Scene'
import * as Smoke from './Smoke'
import * as Camera from './Camera'
import * as THREE from 'three'
import { gsap } from 'gsap'
import nipplejs from 'nipplejs'
const MOVE_JOYSTICK_EVENT = 'move_joystick_evt'
const RELEASE_JOYSTICK_EVENT = 'release_joystick_evt'

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
		const moveJoystickEvt = new CustomEvent(MOVE_JOYSTICK_EVENT, {
			detail: {
				x: data.vector.x,
				y: data.vector.y,
			}
		})

		dispatchEvent(moveJoystickEvt)
	})

	joyManager['0'].on('end', function () {
		const releaseJoystickEvt = new CustomEvent(RELEASE_JOYSTICK_EVENT)
		dispatchEvent(releaseJoystickEvt)
	})

}

export {
	init,
	MOVE_JOYSTICK_EVENT,
	RELEASE_JOYSTICK_EVENT,
}
