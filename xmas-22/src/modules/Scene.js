import { Scene } from 'three'
import * as THREE from 'three'
import { getAsset } from './AssetLoader'
let scene

const createScene = () => {
	scene = new Scene()
	// const axesHelper = new THREE.AxesHelper(10)
	// scene.add(axesHelper)

	// const gridHelper = new THREE.GridHelper( 400, 400, 0x0000ff, 0x808080 )
	// gridHelper.position.x = - 150
	// scene.add( gridHelper)
	
	// scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.01 )
	const texture = getAsset('background')
	scene.background = texture
	scene.environment = texture
	return scene
}

export {
	createScene,
	scene,
}