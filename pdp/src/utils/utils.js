const getElementFromModel = (model, elementName) => {
	let returnElement
	model.children.map((element) => {
		if (element.name === elementName) {
			returnElement = element
		}
	})
	return returnElement
}

export {
	getElementFromModel,
}