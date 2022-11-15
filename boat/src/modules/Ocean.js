import * as Scene from './Scene'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Water } from 'three/examples/jsm/objects/Water'
import waterVertexShader from '../shaders/water/vertex.glsl'
import waterFragmentShader from '../shaders/water/fragment.glsl'
// import { GUI } from 'dat.gui'
// import { gsap } from 'gsap'
// import { getTexture } from './Material'
// import * as Camera from './Camera'

// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()
let model
let physics
let groundMaterial
let water
let uniforms

const init = (physWorld) => {
	// const groundGeo = new THREE.PlaneGeometry(1000, 1000, 1, 1)
	// const groundMat = new THREE.MeshLambertMaterial({
	// 	color: 0x00FFFF,
	// })
	// model = new THREE.Mesh(groundGeo, groundMat)
	// Scene.scene.add(model)
	// model.position.y = -.1
	// model.rotation.set(Math.PI * 1.5, 0, 0)
	// initPhysics(physWorld)

	// uniforms = {
	// 	iGlobalTime: {
	// 		type: 'f',
	// 		value: 1.0
	// 	},
	// 	iResolution: {
	// 		type: 'v2',
	// 		value: new THREE.Vector2(0, 0)
	// 	},
	// 	iMouse: {
	// 		type: 'v2',
	// 		value: new THREE.Vector2(0, 0)
	// 	},
	// 	iTime: {
	// 		type: 'f',
	// 		value: 1.0
	// 	},
	// };
	// uniforms.iResolution.value.x = 1.0
	// uniforms.iResolution.value.y = 1.0
	
	// const waterMaterial = new THREE.ShaderMaterial({
	// 	uniforms,
	// 	vertexShader: waterVertexShader,
	// 	fragmentShader: waterFragmentShader,
	// })
	const waterGeometry = new THREE.PlaneGeometry(10000, 10000)

	water = new Water(
		waterGeometry,
		{
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: new THREE.TextureLoader().load(
				'textures/waternormals.jpg', 
				(texture) => {
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping
				}
			),
			sunDirection: new THREE.Vector3(10, 0, 20),
			sunColor: 0xffffff,
			waterColor: 0x0000ff,
			distortionScale: .1,
		}
	)
	// water = new THREE.Mesh(waterGeometry, waterMaterial)
	water.rotation.x = - Math.PI / 2
	// folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
	// folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
	// water.material.uniforms.distortionScale = 0.18
	// water.material.uniforms.size = 0.00000000001
	// console.log(water.material.uniforms.distortionScale)
	Scene.scene.add(water)
}

const initPhysics = (world) => {
	physics = new CANNON.Body({
		mass: 0,
		// material,
		// type: CANNON.BODY_TYPES.STATIC,
		// collisionFilterGroup: 1,
		position: new CANNON.Vec3(0, 0, 0),
		shape: new CANNON.Plane()
	})
	physics.quaternion.setFromEuler(-Math.PI * .5, 0, 0)
	world.addBody(physics)
	// model.position.copy(physics.position)
	// model.quaternion.copy(physics.quaternion)
}

const tick = () => {
	// water.material.uniforms['iTime'].value += .01
	water.material.uniforms['time'].value += 0.1 / 60.0
}

export {
	init,
	model,
	physics,
	tick,
	groundMaterial,
}