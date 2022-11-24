import * as Scene from './Scene'
import * as Smoke from './Smoke'
import * as Camera from './Camera'
import * as Renderer from './Renderer'
import * as THREE from 'three'
import { getAsset } from './AssetLoader'
import * as Joystick from './Joystick'
import { gsap } from 'gsap'
import { GUI } from 'dat.gui'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const itemsCollection = []
const wrapper = new THREE.Object3D()
const actionHistory = []
let objectList
let modelSelected
let control
let sceneObjects
// const gui = new GUI({
// 	name: 'Level Builder',
// 	useLocalStorage: true,
// })

const init = (modelsLib) => {

	/**
	 * World objects
	 */
	objectList = document.querySelector('.objectList')
	modelsLib.forEach((item) => {
		const option = document.createElement('option')
		option.value = item.id
		option.text = item.id
		objectList.appendChild(option)
	})
	
	control = new TransformControls( Camera.camera, Renderer.renderer.domElement )
	Scene.scene.add(control)
	Scene.scene.add(wrapper)
	
	addListeners()

}

const saveScene = () => {
	let sceneInfo = {
		objects: [],
	}
	wrapper.children.forEach((element) => {
		const node = {
			model: element.userData.modelId,
			position: element.position,
			scale: element.scale,
			rotation: element.rotation,
		}
		sceneInfo.objects.push(node)
	})
	localStorage.setItem('sceneInfo', JSON.stringify(sceneInfo))
}

const loadScene = () => {
	const sceneInfo = localStorage.getItem('sceneInfo')
	const sceneInfoObj = JSON.parse(sceneInfo)
	sceneInfoObj.objects.forEach((element) => {
		const model = addObject(element.model)
		model.position.set(
			element.position.x,
			element.position.y,
			element.position.z
		)
		model.rotation.set(
			element.rotation._x,
			element.rotation._y,
			element.rotation._z
		)
		model.scale.set(
			element.scale.x,
			element.scale.y,
			element.scale.z
		)
	})
	// updateGuiWorldObjects()
}

const updateGuiWorldObjects = () => {
	/**
	 * Added objects
	*/
	const currentOptions = sceneObjects.querySelectorAll('option')
	currentOptions.forEach((currentOption, index) => {
		if (index > 0) {
			sceneObjects.removeChild(currentOption)	
		}
	})

	itemsCollection.forEach((element, index) => {
		// modelCollection[element.userData.modelId+index] = element.name
		const option = document.createElement('option')
		option.value = element.name
		option.text = element.userData.modelId+index
		sceneObjects.appendChild(option)
	})
	// modelsLib.forEach((item) => {
	// 	const option = document.createElement('option')
	// 	option.value = item.id
	// 	option.text = item.id
	// 	objectList.appendChild(option)
	// })
	// const addedObjects = {
	// 	addedObject: {}
	// }
	// const modelCollection = {}
	// itemsCollection.forEach((element, index) => {
	// 	modelCollection[element.userData.modelId+index] = element.name
	// })
	// gui.add(addedObjects, 'addedObject', modelCollection)
	// 	.onChange((value) => {
	// 		modelSelected = wrapper.getObjectByName(value)
	// 		control.attach(modelSelected)
	// 	})
	// wrapper
}

const addListeners = () => {
	document.addEventListener( 'click', onClickScreen)
	control.addEventListener('change', onControlUpdate)
	control.addEventListener('dragging-changed', (evt) => {
		Camera.cameraControl.enabled = !evt.value
		// console.log(control.object)
		// if (evt.value) {
		// 	console.log('set history')
		// 	const currentSel = control.object
		// 	actionHistory[0] = {
		// 		model: currentSel,
		// 		position: currentSel.position,
		// 		rotation: currentSel.rotation,
		// 		scale: currentSel.scale,
		// 	}
		// }
	})
	// control.addEventListener('objectChange', (evt) => {
	// 	console.log('bbbb')
	// })
	window.addEventListener('keydown', onKeyDown)
	window.addEventListener('keyup', onKeyUp)

	sceneObjects = document.querySelector('.sceneObjects')
	const btnAddToWorld = document.querySelector('.btnAddToWorld')
	const btnSaveScene = document.querySelector('.btnSaveScene')
	const btnLoadScene = document.querySelector('.btnLoadScene')
	const btnDeleteObject = document.querySelector('.btnDeleteObject')

	
	btnAddToWorld.addEventListener('click', () => {
		// console.log(objectList.value)
		addObject(objectList.value)
	})

	sceneObjects.addEventListener('change', (evt) => {
		// addObject(objectList.value)
		console.log(evt.target.value)
		const selection = wrapper.getObjectByName(evt.target.value)
		control.attach(selection)
	})
	btnSaveScene.addEventListener('click', saveScene)
	btnLoadScene.addEventListener('click', loadScene)
	btnDeleteObject.addEventListener('click', deleteObject)
	
}

const deleteObject = () => {
	wrapper.remove(control.object)
	const elementIndexPosition = itemsCollection.findIndex((element) => element.uuid === control.object.uuid)
	itemsCollection.splice(elementIndexPosition, 1)
	control.detach()
	updateGuiWorldObjects()
}

const undo = () => {
	if (actionHistory[0]) {
		const actionModel = actionHistory[0].model
		console.log(actionHistory[0])
		actionModel.position.set(
			actionHistory[0].position.x,
			actionHistory[0].position.y,
			actionHistory[0].position.z,
		)
		// actionModel.rotation.set(actionHistory[0].rotation)
		actionModel.scale.set(
			actionHistory[0].scale.x,
			actionHistory[0].scale.y,
			actionHistory[0].scale.z,
		)
	}
}

const onKeyDown = (evt) => {
	switch (evt.keyCode) {
	
	case 81: // Q
		control.setSpace( control.space === 'local' ? 'world' : 'local' )
		break

	case 16: // Shift
		control.setTranslationSnap( 1 )
		control.setRotationSnap( THREE.MathUtils.degToRad( 15 ) )
		control.setScaleSnap( 0.25 )
		break
	case 87: // W
		control.setMode( 'translate' )
		break

	case 69: // E
		control.setMode( 'rotate' )
		break

	case 82: // R
		control.setMode( 'scale' )
		break

	// case 67: // C
	// 	const position = currentCamera.position.clone()

	// 	currentCamera = currentCamera.isPerspectiveCamera ? cameraOrtho : cameraPersp
	// 	currentCamera.position.copy( position )

	// 	orbit.object = currentCamera
	// 	control.camera = currentCamera

	// 	currentCamera.lookAt( orbit.target.x, orbit.target.y, orbit.target.z )
	// 	onWindowResize()
	// 	break

	// case 86: // V
	// 	const randomFoV = Math.random() + 0.1
	// 	const randomZoom = Math.random() + 0.1

	// 	cameraPersp.fov = randomFoV * 160
	// 	cameraOrtho.bottom = - randomFoV * 500
	// 	cameraOrtho.top = randomFoV * 500

	// 	cameraPersp.zoom = randomZoom * 5
	// 	cameraOrtho.zoom = randomZoom * 5
	// 	onWindowResize()
	// 	break

	case 187:
	case 107: // +, =, num+
		control.setSize( control.size + 0.1 )
		break

	case 189:
	case 109: // -, _, num-
		control.setSize( Math.max( control.size - 0.1, 0.1 ) )
		break

	case 88: // X
		control.showX = ! control.showX
		break

	case 89: // Y
		control.showY = ! control.showY
		break

	case 90: // Z
		control.showZ = ! control.showZ
		break

	case 32: // Spacebar
		control.enabled = ! control.enabled
		break

	case 27: // Esc
		control.reset()
		break

	}
}

const onKeyUp = (evt) => {
	
	switch ( evt.keyCode ) {
	case 16: // Shift
		control.setTranslationSnap(null)
		control.setRotationSnap(null)
		control.setScaleSnap(null)
		break

	}
}

const addObject = (item) => {
	const model = getAsset(item).scene.clone()
	model.name = `MODEL__${Math.round(Math.random() * 1000000 + 100000)}`
	model.userData = { modelId: item }
	model.castShadow = true
	model.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true
			child.receiveShadow = true
		}
	})
	itemsCollection.push(model)
	wrapper.add(model)
	updateGuiWorldObjects()
	if (item === 'logo-CI&T') {
		customizeLogo(model)
	}
	return model
}

const customizeLogo = (item) => {
	const materialFabric = new THREE.MeshStandardMaterial({
		map: getAsset('fabricMap'),
		normalMap: getAsset('fabricNormal'),
		roughnessMap: getAsset('fabricRoughness'),
	})
	item.traverse((element) => {
		element.material = materialFabric
		console.log(element)
	})
}

const onControlUpdate = (evt) => {
	// console.log('control update', evt)
}

// const getParentElement = (element) => {
// 	let currentElement = element
// 	do {
// 		currentElement = currentElement.parent
// 	} while (currentElement.name.indexOf('MODEL__') >= 0)
// 	return currentElement
// }

const onClickScreen = (evt) => {
	mouse.x = ( evt.clientX / window.innerWidth ) * 2 - 1
	mouse.y = - ( evt.clientY / window.innerHeight ) * 2 + 1

	raycaster.setFromCamera(mouse, Camera.camera)
	const intersects = raycaster.intersectObjects(itemsCollection, true)
	// console.log(intersects)
	if ( intersects.length > 0 ) {
		// const object = getParentElement(intersects[0].object)
		// modelSelected = object
		// control.attach(object)
		return
		// if ( group.children.includes( object ) === true ) {

		// 	object.material.emissive.set( 0x000000 );
		// 	scene.attach( object );

		// } else {

		// 	object.material.emissive.set( 0xaaaaaa );
		// 	group.attach( object );

		// }

		// controls.transformGroup = true;
		// draggableObjects.push( group );
	}
	// if (modelSelected) {
	// 	modelSelected = null
	// }
	// console.log('nothing clicked')
}

const tick = (delta) => {
	

}

export {
	init,
	tick,
}