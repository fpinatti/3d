import * as THREE from 'three'
import { getAsset } from './AssetLoader'
let model
const dimensions = new THREE.Vector3(1, .5, 1)

const create = (asset, blockPosition, scaleFactor) => {
	const modelAsset = getAsset(asset)
	const childModel = modelAsset.scene.children[0]
	childModel.position.set(blockPosition.x * scaleFactor, blockPosition.y * scaleFactor, blockPosition.z * scaleFactor)
	childModel.scale.set(dimensions.x * scaleFactor, dimensions.y, dimensions.z * scaleFactor)
	model = childModel.clone()
	model.receiveShadow = true
	return model
}

const tick = () => {

}

export {
	create,
	tick,
	model,
	dimensions,
}