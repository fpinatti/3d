import { useMemo, useRef, useEffect } from 'react'
import { DoubleSide } from 'three'

function CustomGeometry() {

	const geometryRef = useRef()
	// 10 triangles of 3 vertex each
	const vertexCount = 10 * 3
	
	useEffect(() => {
		geometryRef.current.computeVertexNormals()

	}, [])

	// do it only on first load and cache data
	const positions = useMemo(() => {
		// 3 since each vertex contains x/y/z coords
		const positions = new Float32Array(vertexCount * 3)
		// fill with random values
		for (let idx = 0; idx < vertexCount * 3; idx++) {
			positions[idx] = (Math.random() - .5) * 5
		}
		return positions

	}, [])


	return (
		<mesh>
			<bufferGeometry
				ref={ geometryRef }
			>
				<bufferAttribute 
					attach='attributes-position'
					count={ vertexCount }
					itemSize={ 3 }
					array={ positions }
				/>
			</bufferGeometry>
			<meshStandardMaterial
				side={ DoubleSide }
			/>
		</mesh>
	)

}

export default CustomGeometry