import { Center, PivotControls, TransformControls, useGLTF } from "@react-three/drei"
import { useRef, useState } from "react"
import Projectile from "./Projectiles"

export default function Cannon() {

	const cannon = useGLTF('./assets/models/cannon.gltf')
	const model = useRef()

	return (
		<>
			<PivotControls depthTest={ false }>
				{/* <mesh>
					<boxGeometry />
					<meshBasicMaterial />
				</mesh> */}
				<Center position={ [-3, .3, 0 ]}>
					<primitive
						object={ cannon.scene }
						ref={ model }
						rotation={ [0, Math.PI * -.5, 0] } />
				</Center>
			</PivotControls>

		</>
	)
}