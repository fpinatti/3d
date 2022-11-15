import { Scene } from 'three'
import { RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import * as THREE from 'three'

let scene

const createScene = () => {
	scene = new Scene()
	// const axesHelper = new THREE.AxesHelper(10)
	// scene.add(axesHelper)

	// const gridHelper = new THREE.GridHelper( 400, 400, 0x0000ff, 0x808080 )
	// gridHelper.position.x = - 150
	// scene.add( gridHelper)
	
	// scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.03 )
	return scene
}

const loadEnv = () => {
	new RGBELoader()
		.load('textures/drakensberg_solitary_mountain_4k.hdr', function ( texture ) {

			texture.mapping = THREE.EquirectangularReflectionMapping

			scene.background = texture
			scene.environment = texture

		} )
}

export {
	createScene,
	loadEnv,
	scene,
}