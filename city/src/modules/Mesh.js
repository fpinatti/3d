import * as THREE from 'three'

const createBoxGeometry = () => {
	const width = 2
	const height = 2
	const depth = 2
	const geometry = new THREE.BoxGeometry(width, height, depth)
	return geometry
}

const createSphereGeometry = () => {
	const radius = 2
	const heightSegments = 10
	const widthSegments = 10
	const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
	return geometry
}

const createMesh = (material) => {
	const geometry = createSphereGeometry()
	const mesh = new THREE.Mesh(geometry, material)
	return mesh
}

export {
	createBoxGeometry,
	createSphereGeometry,
	createMesh,
}