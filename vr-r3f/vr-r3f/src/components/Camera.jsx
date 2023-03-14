import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useXR } from "@react-three/xr"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'

const Camera = (props) => {

	const cameraRef = useRef()
	const { gl, camera } = useThree()
	const [camPosition, setCamPosition] = useState([0, 0, 0])
	const { isPresenting } = useXR()

	
	// if (props.direction.z) {
	// 	setCamPosition([0, 0, props.direction.z])
	// }
	
	// const cam = gl.xr.getCamera()

	useEffect(() => {
		if (gl.xr.isPresenting) {
			setCamPosition([0, 0, 3])
		}
		setCamPosition([props.direction.x, props.direction.y, props.direction.z])
		// console.log(cameraRef.current.lookAt)
		cameraRef.current.lookAt(
			cameraRef.current.position.x,
			cameraRef.current.position.y,
			cameraRef.current.position.z - 10
		)
	}, [isPresenting, cameraRef, props.direction])

	return (<>
		<group position={camPosition}>
			<primitive object={ camera } ref={ cameraRef } />
		</group>
		{/* <CameraControls /> */}
	</>)
}

export default Camera