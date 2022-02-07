import * as THREE from 'three'
import gsap from 'gsap'

const radius = 3
const startY = 4
const particlesGroupPosition = []

const createParticles = (config) => {
	// geometry
	const geometry = new THREE.BufferGeometry()
	const particlesPosition = new Float32Array(config.count * 3)

	for (let i=0; i < config.count; i++) {
		const idx = i * 3
		const posX = (Math.random() * radius) - (radius * .5)
		const posY = startY - (Math.random() * .4)
		const posZ = (Math.random() * radius) - (radius * .5)
		particlesGroupPosition[idx] = { index: idx, axis: 'x', val: posX }
		particlesGroupPosition[idx + 1] = { index: idx + 1, axis: 'y', val: posY }
		particlesGroupPosition[idx + 2] = { index: idx + 2, axis: 'z', val: posZ }
		particlesPosition[idx] = posX // x
		particlesPosition[idx + 1] = posY // y
		particlesPosition[idx + 2] = posZ // z
	}

	geometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3))

	// material
	const material = new THREE.PointsMaterial({
		size: config.size,
		sizeAttenuation: true,
		blending: THREE.AdditiveBlending,
		transparent: true,
		map: config.texture,
	})

	// particles
	const particles = new THREE.Points(geometry, material)

	// animate
	const particlesGeometryPosition = particles.geometry.attributes.position
	const particlesGeometryArray = particlesGeometryPosition.array
	particlesGroupPosition.map((item) => {
		if (item.axis === 'y') {
			gsap.to(item, {
				duration: 3 + (Math.random() * 5),
				val: -1,
				repeat: -1,
				repeatDelay: Math.random() * 3,
				ease: 'linear',
				onUpdateParams: [item.index],
				onUpdate: (index) => {
					particlesGeometryArray[index] = particlesGroupPosition[index].val
					particlesGeometryPosition.needsUpdate = true
				},
			})
		}
		return item
	})
	return particles
}

export {
	createParticles,
}