import { Scene } from 'three'
// import * as THREE from 'three'

let scene

const createScene = () => {
	scene = new Scene()
	// scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.09 )
	return scene
}

export {
	createScene,
	scene,
}