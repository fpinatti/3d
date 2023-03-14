import { Environment } from "@react-three/drei"

const Lights = () => {

	return (<>
		<Environment
			preset="sunset"
		/>
		<directionalLight castShadow position={ [6, 10, -3] } />
	</>)
}

export default Lights