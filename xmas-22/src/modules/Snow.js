import * as THREE from 'three'
import * as Scene from './Scene'
import gsap from 'gsap'

const count = 500
const radius = 10
const particleSize = .05
const particleVariation = .5
let mesh
const gravity = .001
const gravityVariation = .01
const particleSpeeds = []
const initialParticleY = 4
const windX = .001
const windVariationX = .001
// const startY = 4
// const particlesGroupPosition = []

const createParticles = (config) => {

	const geometry = new THREE.BoxGeometry(particleSize, particleSize, particleSize)
	const material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
	})
	// const material = new THREE.MeshPhongMaterial({
	// 	color: 0xffffff
	// })
	mesh = new THREE.InstancedMesh(geometry, material, count)


	const matrix = new THREE.Matrix4()
	for (let x = 0; x < count; x ++) {
		// const finalSize = particleSize + (Math.random() * particleVariation)
		// matrix.makeScale(
		// 	finalSize,
		// 	finalSize,
		// 	finalSize,
		// )
		matrix.setPosition(
			(Math.random() * radius) - (radius * .5),
			initialParticleY - (Math.random() * 2),
			(Math.random() * radius) - (radius * .5),
		)
		matrix.multiplyScalar(1.2)
		particleSpeeds.push(
			new THREE.Vector3(
				windX + (Math.random() * windVariationX),
				gravity + (Math.random() * gravityVariation),
				0
			)
		)
		mesh.setMatrixAt(x, matrix)
	}
	Scene.scene.add(mesh)

}

const tick = () => {
	if ( mesh ) {
		for (let snowIdx = 0; snowIdx < count; snowIdx++) {
			let currentParticleMatrix = new THREE.Matrix4()
			mesh.getMatrixAt(snowIdx, currentParticleMatrix)
			const pos = new THREE.Vector3()
			pos.setFromMatrixPosition(currentParticleMatrix)
			pos.x -= particleSpeeds[snowIdx].x
			pos.y -= particleSpeeds[snowIdx].y
			if (pos.y < -1) {
				pos.y = initialParticleY
			}
			currentParticleMatrix.makeRotationFromEuler(
				new THREE.Euler(pos.y, pos.y, pos.y)
			)
			currentParticleMatrix.setPosition(pos)
			mesh.setMatrixAt(snowIdx, currentParticleMatrix)
		}
		mesh.instanceMatrix.needsUpdate = true
	}
}

export {
	createParticles,
	tick,
}