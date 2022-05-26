import { loadModel } from './Model'
import * as Scene from './Scene'
import * as Utils from '../utils/utils'
import gsap from 'gsap'
import * as THREE from 'three'

let model
// let idleAction, walkAction
// let engineClock
// let keyPressed = ''

const init = (assets) => {
	loadModel('models/main_scenario.glb').then((gltf) => {
		createSky(assets.sky)
		model = gltf.scene
		const materialBaked = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map: assets.world,
		})
		const materialRoad = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			map: assets.road,
		})
		assets.world.flipY = false
		model.traverse((child) => {
			if (child.name === 'landing-ground') {
				child.material = materialRoad
			} else if (child.parent?.name === 'ground') {
				console.log('ground', child)
			} else {
				child.material = materialBaked
			}
			child.castShadow = true
			child.receiveShadow = true
			console.log(child.name)
		})
		Scene.scene.add(model)
		
		const ground = Utils.getElementFromModel(model, 'ground')
		ground.position.set(0, -30, -25)
		ground.scale.set(2, 2, 2)

		const landingGround = Utils.getElementFromModel(model, 'landing-ground')
		// landingGround.position.set(0, -15, 0)
		landingGround.position.set(0, 0, -40)
		// model.position.y = -5
		// model.position.x = 0

		const thanks = Utils.getElementFromModel(model, 'tks')
		thanks.position.z = 80

		const helper = new THREE.AxesHelper()
		model.add(helper)
		// model.rotation.y = Math.PI * .5

	})
}

const createSky = (sky) => {
	const geometry = new THREE.SphereBufferGeometry(60, 10, 10)
	const material = new THREE.MeshBasicMaterial({
		map: sky,
		side: THREE.DoubleSide,
	})
	const mesh = new THREE.Mesh(geometry, material)
	Scene.scene.add(mesh)
}

const animateEarth = () => {
	const ground = Utils.getElementFromModel(model, 'ground')
	gsap.to(ground.rotation, {
		duration: 20,
		z: - Math.PI * 2,
		repeat: -1,
		ease: 'Power3.easeInOut',
	})
}

const doLanding = () => {
	const ground = Utils.getElementFromModel(model, 'ground')
	gsap.to(ground.position, {
		duration: 1,
		y: -20,
		z: -20,
		ease: 'Power3.easeInOut',
	})

	const landingGround = Utils.getElementFromModel(model, 'landing-ground')
	landingGround.position.z = -50
	const tl = gsap.timeline({repeat: 0})
	tl.to(landingGround.position, {y: 0, duration: 3, ease: 'Sin.easeInOut'})
	tl.to(landingGround.position, {z: -100, duration: 10, ease: 'Sin.easeInOut'}, '-=1')

	const thanks = Utils.getElementFromModel(model, 'tks')
	gsap.to(thanks.position, {
		duration: 10,
		z: 10,
		ease: 'Cubic.easeInOut',
	})

	const sun = Utils.getElementFromModel(model, 'sun')
	const cloud1 = Utils.getElementFromModel(model, 'cloud')
	const cloud2 = Utils.getElementFromModel(model, 'cloud001')
	const cloud3 = Utils.getElementFromModel(model, 'cloud002')
	gsap.to(sun.position, {
		duration: 3,
		y: 20,
		ease: 'Power3.easeInOut',
	})
	gsap.to(cloud1.position, {
		duration: 3,
		y: 20,
		ease: 'Power3.easeInOut',
	})
	gsap.to(cloud2.position, {
		duration: 3,
		y: 24,
		ease: 'Power3.easeInOut',
	})
	gsap.to(cloud3.position, {
		duration: 3,
		y: 25,
		ease: 'Power3.easeInOut',
	})

}

const doTakeOff = () => {
	animateEarth()
	const ground = Utils.getElementFromModel(model, 'ground')
	gsap.to(ground.position, {
		duration: 3,
		x: 0,
		y: 6,
		z: -3,
		delay: 3,
		ease: 'Power3.easeInOut',
	})
	const landingGround = Utils.getElementFromModel(model, 'landing-ground')
	const tl = gsap.timeline({repeat: 0})
	tl.to(landingGround.position, {z: -90, duration: 3, ease: 'Cubic.easeIn'})
	tl.to(landingGround.position, {y: -50, duration: 6, ease: 'Cubic.easeInOut'}, '-=1')
}

const tick = () => {

}

export {
	init,
	doLanding,
	tick,
	doTakeOff,
}