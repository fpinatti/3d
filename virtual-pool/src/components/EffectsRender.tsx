import { EffectComposer, DepthOfField, Noise, Vignette } from "@react-three/postprocessing"
import { folder, useControls } from 'leva'

const EffectsRender = () => {

	const {
		focusDistance,
		bokehScale,
		focalLength,
	} = useControls('Effects', {
		focusDistance: {
			value: 0,
			min: -1,
			max: 1,
			step: .01,
		},
		focalLength: {
			value: 0,
			min: 0,
			max: .5,
			step: .001,
		},
		bokehScale: {
			value: 0,
			min: 0,
			max: 100,
			step: .01,
		},
	})

	return (
		<EffectComposer>
			<DepthOfField focusDistance={ focusDistance } focalLength={ focalLength } bokehScale={ bokehScale } height={ 400 } />
			<Noise opacity={0.15} premultiply={ false } />
        	<Vignette eskil={false} offset={0.1} darkness={.8} />
		</EffectComposer>
	)
}

export default EffectsRender