import { useTexture, MeshReflectorMaterial } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from 'three'

const RoomWithTv = ({scrollOffset, position, scale, rotation}) => {

	// useThree gives you access to the R3F state model
	const { viewport, camera } = useThree()
	// // getCurrentViewport is a helper that calculates the size of the viewport
	const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 1])
	// console.log('>>>>', width)
	useEffect(() => {
		// 1 to 2
		// console.log(((scrollOffset / .25) - 1))
	}, [scrollOffset])

	return (
		<mesh
			// position={ position }
			// position-x={((scrollOffset / .25) - 1) * width * 2}
			// position-y={0}
			// position-z={0}
			scale={ scale }
			rotation={ rotation }
			receiveShadow
		>
			<boxGeometry args={ [2, 2, 2]} />
			<meshStandardMaterial 
				color={ 'green' }
			/>
		</mesh>
	)
}

export default RoomWithTv