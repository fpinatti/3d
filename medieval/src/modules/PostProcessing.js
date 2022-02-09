import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

const setPostProcessing = (renderer) => {
	const composer = new EffectComposer(renderer)
	return composer
}

const addScene = (composer, scene, camera) => {
	composer.addPass(new RenderPass(scene, camera))
}

const addGlitch = (composer) => {
	const glitchPass = new GlitchPass()
	composer.addPass(glitchPass)
}

export {
	setPostProcessing,
	addGlitch,
	addScene,
}