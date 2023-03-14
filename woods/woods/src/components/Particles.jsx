import { PointMaterial, Points } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import ColorPalettes from 'nice-color-palettes'
import * as THREE from "three"
// console.log(ColorPalettes)

const Particles = ({ count = 100, position = [0, 0, 0] }) => {
	
	const vertexTotal = count * 3
	const positions = new Float32Array(vertexTotal)
	const colors = new Float32Array(vertexTotal)
	const speeds = new Float32Array(vertexTotal)
	// const sizes = new Float32Array(vertexTotal * 3)
	const radius = 3
	const size = .07
	// const fallSpeed = .01
	const resetWhenReachYPos = 0
	const particleInitY = 4

	const particles = useRef()

	const points = useMemo(() => {
		// lets choose a random palette
		const palette = ColorPalettes[Math.floor(Math.random() * ColorPalettes.length)]
		// console.log(palette)
		const color = new THREE.Color()
		for (let idx = 0; idx < vertexTotal; idx++ ) {
			positions[idx] = (Math.random() * radius) - (radius * .5)
			speeds[idx] = (Math.random() * .01) + .01
			// y pos
			if ((idx + 1) % 3 === 2) {
				positions[idx] = particleInitY
			}
			const randomColor = palette[Math.floor(Math.random() * palette.length)]
			color.setHex(`0x${randomColor.substring(1)}`)
			colors[idx * 3 + 0] = color.r
			colors[idx * 3 + 1] = color.g
			colors[idx * 3 + 2] = color.b
		}
	}, [count])

	useFrame((three) => {
		const { elapsedTime } = three.clock
		positions.map((item, idx) => {
			// move on y axis
			if ((idx + 1) % 3 === 2) {
				let targParticleY = item - speeds[idx]
				if (targParticleY < resetWhenReachYPos) {
					targParticleY = (Math.random() * .3) + particleInitY
				}
				particles.current.geometry.attributes.position.array[idx] = targParticleY
			}
		})
		particles.current.geometry.attributes.position.needsUpdate = true
	})

	return (
		<Points
			position={ position }
			positions={ positions }
			ref={ particles }
			colors={ colors }
		>
			<PointMaterial
				transparent
				threshold={.3}
				vertexColors
				size={size}
				sizeAttenuation={true}
				depthWrite={true}
			/>
		</Points>
		// <points>
		// 	<bufferGeometry>
		// 		<bufferAttribute
		// 			attach={'attributes-position'}
		// 			itemSize={ 3 }
		// 			count={ vertexTotal }
		// 			array={ positions } />
		// 	</bufferGeometry>
		// </points>
	)
}

export default Particles