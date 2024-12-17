import { Canvas } from '@react-three/fiber'
import Camera from '@/components/common/Camera'
import Lights from '@/components/common/Lights'
import Ground from '@/components/common/Ground'
import TextureModel from '@/components/TextureModel'
import AnimatedModel from '@/components/AnimatedModel'

const HomePage = () => {
  return (
	<Canvas
		camera={{position: [0, 7, 80]}}
		shadows
	>
		<Camera />
		<Lights />
		{/* <EffectsRender /> */}
		<AnimatedModel position={[-8, 0, 60]} />
		<TextureModel position={[3, 5, 45]} />
		<Ground position={ [0, -1, 0] } />
	</Canvas>	
  )
}

export default HomePage