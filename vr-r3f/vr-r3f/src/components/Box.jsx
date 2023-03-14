import { Caustics, MeshRefractionMaterial, MeshTransmissionMaterial, useTexture } from "@react-three/drei"
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { useLoader } from "@react-three/fiber"

const Box = () => {

	// const texture = useTexture('./studio_small_03_1k.hdr')
	const texture = useLoader(RGBELoader, './studio_small_03_1k.hdr')
	// console.log(texture)

	return (
		// <Caustics position={[0, .0001, 0]}>
		<mesh position={ [0, .5, 0] } castShadow>
			<boxGeometry />
			<MeshTransmissionMaterial distortion={ 1 } background={texture} />
			{/* <meshStandardMaterial color={ 'orange' } /> */}
		</mesh>
		// </Caustics>
	)

}

export default Box