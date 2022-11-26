import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import * as Scene from './Scene'
import * as THREE from 'three'
import { getAsset } from './AssetLoader'
const height = .02
const size = .3
const curveSegments = 3
const bevelThickness = 0
const bevelSize = 0

const init = (text) => {

	const textGeo1 = createTextGeo('Merry xmas,')
	const textGeo2 = createTextGeo(text)
	
	const centerOffset1 = - 0.5 * (textGeo1.boundingBox.max.x - textGeo1.boundingBox.min.x) + .5
	const centerOffset2 = - 0.5 * (textGeo2.boundingBox.max.x - textGeo2.boundingBox.min.x)
	const material = new THREE.MeshMatcapMaterial({
		matcap: getAsset('red_matcap')
	})

	const textMesh1 = new THREE.Mesh(textGeo1, material)
	textMesh1.position.set(centerOffset1, 0, -3.5)
	Scene.scene.add(textMesh1)

	const textMesh2 = new THREE.Mesh(textGeo2, material)
	textMesh2.position.set(centerOffset2, 0, -2.8)
	Scene.scene.add(textMesh2)

}

const createTextGeo = (text) => {
	if (!text) text = '=)'
	const textGeo = new TextGeometry(text, {
		font: getAsset('mainFont'),
		size: size,
		height: height,
		curveSegments: curveSegments,
		bevelThickness: bevelThickness,
		bevelSize: bevelSize,
		bevelEnabled: false,
	})

	textGeo.computeBoundingBox()
	textGeo.computeVertexNormals()
	return textGeo
}

export {
	init,
}