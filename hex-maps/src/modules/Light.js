import * as THREE from 'three'
import gsap from 'gsap'

const createAmbientLight = () => {
	const light = new THREE.AmbientLight(0xffffff)
	return light
}

const createDirectionalLight = () => {
	const light = new THREE.PointLight( 0xffffff, 2 )
	return light
}

const createSpotLight = () => {
	const light = new THREE.SpotLight( 0xffffff, 2, 10, .2, 1, 0 )
	return light
}

const shakeLight = (light) => {
	gsap.to({}, {
		duration: .3,
		repeat: -1,
		onRepeat: () => {
			light.angle = .15 + (Math.random() * .15)
		},
	})
}

export {
	createAmbientLight,
	createDirectionalLight,
	createSpotLight,
	shakeLight,
}