import * as THREE from 'three'
import * as Scene from './Scene'
import gsap from 'gsap'

const count = 10
const particleSize = .1
const particleVariation = .5
let mesh
const gravity = .001
const gravityVariation = .001
const particleSpeeds = []
const initialParticleY = 0
const windX = .001
const windVariationX = .001
// const startY = 4
// const particlesGroupPosition = []

const createParticles = () => {

	const geometry = new THREE.BoxGeometry(particleSize, particleSize, particleSize)
	const material = new THREE.MeshBasicMaterial({
		color: 0x000000,
		transparent: true,
		opacity: .3,
	})
	mesh = new THREE.InstancedMesh(geometry, material, count)


	const matrix = new THREE.Matrix4()
	for (let x = 0; x < count; x ++) {
		matrix.setPosition(
			0,
			initialParticleY,
			0,
		)
		particleSpeeds.push(
			new THREE.Vector3(
				0,
				gravity + (Math.random() * gravityVariation),
				0
			)
		)
		mesh.setMatrixAt(x, matrix)
	}
	// Scene.scene.add(mesh)
	return mesh

}

const tick = () => {
	if (mesh) {
		for (let snowIdx = 0; snowIdx < count; snowIdx++) {
			let currentParticleMatrix = new THREE.Matrix4()
			mesh.getMatrixAt(snowIdx, currentParticleMatrix)
			const pos = new THREE.Vector3()
			pos.setFromMatrixPosition(currentParticleMatrix)
			pos.x += particleSpeeds[snowIdx].x
			pos.y += particleSpeeds[snowIdx].y
			if (pos.y > 2) {
				pos.y = initialParticleY
			}
			currentParticleMatrix.makeRotationFromEuler(
				new THREE.Euler(pos.y, pos.y * 2, pos.y)
			)
			currentParticleMatrix.setPosition(pos)
			// pos.setFromMatrixScale(currentParticleMatrix)
			// pos.x = pos.y = pos.z = .2
			// console.log(pos)
			const puffSize = Math.max(0, 2 - pos.y)
			currentParticleMatrix = currentParticleMatrix.scale(
				new THREE.Vector3(puffSize, puffSize, puffSize)
			)
			mesh.setMatrixAt(snowIdx, currentParticleMatrix)
		}
		mesh.instanceMatrix.needsUpdate = true
	}
}

export {
	createParticles,
	tick,
}