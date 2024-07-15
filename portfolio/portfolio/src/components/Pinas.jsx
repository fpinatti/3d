import { useTexture, MeshReflectorMaterial } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { forwardRef, useEffect } from "react"
import * as THREE from 'three'

const Pinas = forwardRef(({scrollOffset, position, scale, rotation}, ref) => {

	// useThree gives you access to the R3F state model
	const { viewport, camera } = useThree()
	// // getCurrentViewport is a helper that calculates the size of the viewport
	const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 1])
	// console.log('>>>>', width)
	useEffect(() => {
		// console.log(scrollOffset / .25)
	}, [scrollOffset])

	return (
		<mesh
			// position={ position }
			// position-x={(scrollOffset / .25) * width}
			// position-y={0}
			// position-z={0}
			ref={ ref }
			scale={ scale }
			rotation={ rotation }
			receiveShadow
		>
			<boxGeometry args={ [2, 3, .2]} />
			<meshStandardMaterial 
				color={ 'red' }
			/>
		</mesh>
	)
})

export default Pinas