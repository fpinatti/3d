import { useAnimations, useGLTF } from '@react-three/drei'
import { Suspense, useEffect } from 'react'

export default function Model({position = [0, 0, 0], scale = [1, 1, 1]}) {

	const model = useGLTF('./models/model (41).gltf')
	// const animations = useAnimations(model.animations, model.scene)

	useEffect(() => {
		// const action = animations.actions.Name
		// action.reset().fadeIn(.5).play()
	}, [])

	return <Suspense>
		<group castShadow>
			<primitive object={ model.scene } position={ position } scale={ scale } />
		</group>
	</Suspense>
}