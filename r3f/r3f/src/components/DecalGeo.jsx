import { Decal, useTexture } from '@react-three/drei'

export default function Camera() {

	const tex = useTexture('./textures/valeriia-neganova-amGWl275tC0-unsplash.jpg')

	return <>
		<mesh position={ [0, 0, 4]}>
			<boxGeometry />
			<meshStandardMaterial />
			<Decal
				map={ tex }
				roughness={1}
				debug // Makes "bounding box" of the decal visible
				position={[0, 0, 0]} // Position of the decal
				rotation={[0, 0, Math.PI * .5]} // Rotation of the decal (can be a vector or a degree in radians)
				scale={[.9, .5, 1]} // Scale of the decal
			/>
		</mesh>
	</>
}