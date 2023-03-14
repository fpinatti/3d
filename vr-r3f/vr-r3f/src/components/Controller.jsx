import { Billboard, ScreenSpace, Text, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

const Controller = (props) => {

	const speed = .1

	const [sub, get] = useKeyboardControls()

	useFrame(() => {
		let x = 0
		let y = 0
		let z = 0
		const forward = get().forward
		if (forward) {
			z = -speed
		}
		const back = get().back
		if (back) {
			z = speed
		}
		const right = get().right
		if (right) {
			x = speed
		}
		const left = get().left
		if (left) {
			x = -speed
		}
		props.onMove({x, y, z})
	})

	return (
		<>
			{/* <ScreenSpace depth={1}>
				<Text
					fontSize={.1}
					position={[-.8, .5, 0]}
					onPointerDown={ onMoveForward }
				>
					Forward
				</Text>
				<Text
					fontSize={.1}
					position={[-.8, .3, 0]}
					onPointerDown={ onMoveBackward }
				>
					Back
				</Text>

			</ScreenSpace> */}
			{/* <Billboard
				position={ [-3, 1, 0] }
				follow
				lockX
			>
			</Billboard> */}
		</>
	)
}

export default Controller