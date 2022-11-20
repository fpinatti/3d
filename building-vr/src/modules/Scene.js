import * as THREE from 'three'
import { Scene } from 'three'
import { getAsset } from './AssetLoader'
// import * as THREE from 'three'
let scene

const createScene = () => {
	scene = new Scene()
	// scene.fog = new THREE.FogExp2( 0x096a74, 0.06 )
	const hdr = getAsset('sky')
	hdr.encoding = THREE.sRGBEncoding
	scene.background = hdr
	scene.backgroundBlurriness = 0
	scene.environment = hdr
	return scene
}

export {
	createScene,
	scene,
}