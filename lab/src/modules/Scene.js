import { Scene } from 'three'
import * as THREE from 'three'

const createScene = () => {
	const scene = new Scene()
	// scene.fog = new THREE.FogExp2( 0x096a74, 0.06 )
	return scene
}

export {
	createScene,
}