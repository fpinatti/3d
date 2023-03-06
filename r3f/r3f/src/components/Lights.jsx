import { SpotLight, useDepthBuffer, AccumulativeShadows, RandomizedLight, ContactShadows, Shadow } from "@react-three/drei";
import { useEffect } from 'react';

export default function Lights() {

	let depthBuffer
	// useEffect(() => {
	// 	depthBuffer = useDepthBuffer()
	// }, [])

	return <>
		<directionalLight
			castShadow
			position={ [0, 10, 2] }
		/>
		<ambientLight
			intensity={ 1 }
			color='#0f0fff'
		/>
		<SpotLight
			distance={5}
			angle={0.15}
			attenuation={5}
			position={ [0, 1, 0]}
			// depthBuffer={depthBuffer}
			anglePower={5} // Diffuse-cone anglePower (default: 5)
		/>
		{/* <AccumulativeShadows temporal frames={100} scale={10}>
			<RandomizedLight amount={8} position={[5, 5, -10]} />
		</AccumulativeShadows> */}
		{/* <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" /> */}
		<Shadow
			color="black"
			colorStop={0}
			opacity={0.5}
			fog={false} // Reacts to fog (default=false)
		/>
	</>
}