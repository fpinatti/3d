import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier"
import { useTexture, MeshReflectorMaterial, useGLTF, Clone } from "@react-three/drei"
import * as THREE from 'three'

const Track = ({position}) => {

	const straightLong = useGLTF('./assets/models/roadStraightLong.glb')
	const corner = useGLTF('./assets/models/roadCornerLarger.glb')
	const roadStart = useGLTF('./assets/models/roadStart.glb')
	const roadBump = useGLTF('./assets/models/roadStraightLongBump.glb')
	
	return (
		<RigidBody position={[0, .3, 0]} scale={ 4 } colliders="trimesh" type="fixed">
			<Clone object={ straightLong.scene }></Clone>
			<Clone object={ straightLong.scene } position={[0,0,-2]}></Clone>
			<Clone object={ corner.scene } position={[0,0,-4]}></Clone>
			{/* <Clone object={ straightLong.scene } position={[5.3,0,-7]} rotation={[0, Math.PI * .5, 0]}></Clone> */}
			<Clone object={ corner.scene } position={[2,0,-7.3]} rotation={[0, Math.PI * -.5, 0]}></Clone>
			<Clone object={ straightLong.scene } position={[5,0,-2]}></Clone>
			<Clone object={ straightLong.scene } position={[5,0,0]}></Clone>
			<Clone object={ corner.scene } position={[5.3,0,-1.3]} rotation={[0, Math.PI * -1, 0]}></Clone>
			<Clone object={ corner.scene } position={[3.3,0,2]} rotation={[0, Math.PI * .5, 0]}></Clone>
			{/* <CuboidCollider args={[.5, .01, 2]} position={[.2, 0, -1]} /> */}
		</RigidBody>
	)
}

export default Track