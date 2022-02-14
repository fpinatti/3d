// import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const setPostProcessing = (renderer) => {
	const composer = new EffectComposer(renderer)
	return composer
}

const addScene = (composer, scene, camera) => {
	composer.addPass(new RenderPass(scene, camera))
}

const addGlitch = (composer) => {
	const glitchPass = new GlitchPass()
	// glitchPass.goWild = true
	composer.addPass(glitchPass)
}

const addBloom = (composer) => {
	const bloomPass = new UnrealBloomPass()
	// bloomPass.radius = .1
	bloomPass.strength = 2
	bloomPass.threshold = 0.6
	composer.addPass(bloomPass)
}

const addHalftone = (composer) => {
	const halftonePass = new HalftonePass()
	halftonePass.setSize(1000, 1000)
	composer.addPass(halftonePass)
}

export {
	setPostProcessing,
	addGlitch,
	addScene,
	addBloom,
	addHalftone,
}