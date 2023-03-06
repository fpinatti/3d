import { CameraControls, CameraShake } from '@react-three/drei'

export default function Camera() {
	return <>
		<CameraControls
			smoothTime={ 0 }
			makeDefault
		/>
		{/* <CameraShake /> */}
	</>
}