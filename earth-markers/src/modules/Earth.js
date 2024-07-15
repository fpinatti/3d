import * as Scene from './Scene'
import * as THREE from 'three'
import { GUI } from 'dat.gui'
import { gsap } from 'gsap'
import { getTexture } from './Material'
import * as Camera from './Camera'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let model
let planetMesh

const init = () => {
	const planetGeo = new THREE.SphereBufferGeometry(3, 80, 80)
	const material = new THREE.MeshStandardMaterial({
		map: getTexture('earthmap'),
		displacementMap: getTexture('earthbump'),
		displacementScale: .1
		
	})
	planetMesh = new THREE.Mesh(planetGeo, material)
	Scene.scene.add(planetMesh)
	setTimeout(() => {
		placeMarkerAtLatLong(-22.877440, -47.126310, '#ff0011')
	}, 2000)

	document.addEventListener('mousedown', onMouseDownScreen)
	// console.log(getTexture('planetearth'))
	// return new Promise((resolve, reject) => {
	// 	loadModel('models/shoes.glb').then((gltf) => {
	// 		model = gltf.scene
	// 		// create the palletes
	// 		const basePalette = Palette[Math.round(Math.random() * 90)]
	// 		modelGroups.forEach((arr, index) => {
	// 			const color = new THREE.Color(basePalette[index])
	// 			const material = new THREE.MeshLambertMaterial({
	// 				color 
	// 			})
	// 			materials.push(material)
	// 		})
	// 		model.traverse((child) => {
	// 			child.castShadow = true
	// 			child.receiveShadow = true
	// 			modelGroups.forEach((arr, paletteIndex) => {
	// 				// console.log(child.name)
	// 				if (arr.includes(child.name.toLowerCase())) {
	// 					child.material = materials[paletteIndex]
	// 					// console.log('!!!!', child.name)
	// 				}
	// 			})
	// 		})
	// 		Scene.scene.add(model)
	// 		// model.rotation.x = Math.PI * .5
	// 		// model.rotation.y = Math.PI * .5
	// 		model.position.x = .08
	// 		resolve()
	// 	})
	// })
}



// Marker Proto
const latLongToVector3 = (latitude, longitude, radius, height) => {
	const phi = (latitude)*Math.PI/180;
	const theta = (longitude-180)*Math.PI/180;

	const x = -(radius+height) * Math.cos(phi) * Math.cos(theta);
	const y = (radius+height) * Math.sin(phi);
	const z = (radius+height) * Math.cos(phi) * Math.sin(theta);

	return new THREE.Vector3(x,y,z);
}

const marker = (size, color, vector3Position) => {
	let markerGeometry = new THREE.SphereGeometry(size)
	let markerMaterial = new THREE.MeshLambertMaterial({
		color: color
	})
	let markerMesh = new THREE.Mesh(markerGeometry, markerMaterial)
	markerMesh.position.copy(vector3Position)
	
	return markerMesh
}

const placeMarker = (object, options) => {
	let position = latLongToVector3(options.latitude, options.longitude, options.radius, options.height)
	let markerObject = marker(options.size, options.color, position)
	object.add(markerObject)
	console.log(object)
}

// Place Marker At coordinates
const placeMarkerAtLatLong = function(latitude, longitude, color) {
	// placeMarker(earth.getObjectByName('surface'),{
	placeMarker(planetMesh,{
		latitude: latitude,
		longitude: longitude,
		radius: 0.5,
		height: 2.5,
		size: .1,
		color: color,
	})
}

const onMouseDownScreen = (event) => {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
	raycaster.setFromCamera( mouse.clone(), Camera.camera)
	console.log(raycaster.intersectObject(planetMesh))
}

export {
	init,
	model,
}