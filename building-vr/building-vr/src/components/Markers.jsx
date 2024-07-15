import { Html } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { EasePack } from "gsap/all"
import * as THREE from 'three'

const Markers = ({ selected, markers }) => {

	const camOrigin = useRef()
	const camTarget = useRef()
	const three = useThree()

	useFrame((state) => {
		// three.camera.position.set(
		// 	camOrigin.current.position.x,
		// 	camOrigin.current.position.y,
		// 	camOrigin.current.position.z,
		// )
		// three.camera.lookAt(camTarget.current.position)
	})

	useEffect(() => {
		const selectMarker = markers[selected]
		if (selectMarker) {
			const [posX, posY, posZ] = selectMarker.pov
			gsap.to(camOrigin.current.position, {
				duration: 2,
				x: posX,
				y: posY,
				z: posZ,
			})
			const [tgX, tgY, tgZ] = selectMarker.position
			gsap.to(camTarget.current.position, {
				duration: 2,
				x: tgX,
				y: tgY,
				z: tgZ,
			})
		}
	}, [selected])

	return (
		<>
			<mesh ref={ camOrigin }>
				<sphereGeometry />
				<meshBasicMaterial color={ 'red' } />
			</mesh>
			<mesh ref={ camTarget }>
				<sphereGeometry />
				<meshBasicMaterial color={ 'purple' } />
			</mesh>
			{ markers.map((item, idx) => {
					return <group key={ idx } visible={ true }>
					<mesh position={item.position}>
						<Html center className="tag" occlude={ 'raycast' }>
							<p>{item.label}</p>
						</Html>
						{/* <boxGeometry /> */}
						<meshNormalMaterial />
					</mesh>
				</group>		
			}) }
		</>
	)
}

export default Markers