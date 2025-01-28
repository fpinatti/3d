import useGlobal from '@/hooks/store/useGlobal'
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  BrightnessContrast,
  ChromaticAberration,
  ColorAverage,
  DotScreen,
  Glitch,
  Grid,
  HueSaturation,
  Outline,
  Scanline,
  Sepia,
  SMAA,
  SSAO,
  ToneMapping,
  //   GodRays,
  //   LensFlare,
  //   SelectiveBloom,
} from '@react-three/postprocessing'
// import { MyCustomEffect } from './custom/index';
// import * as THREE from 'three';

const Effects = () => {
  const { isFxEnabled1, isFxEnabled2, isFxEnabled3 } = useGlobal()
  return (
    <EffectComposer>
      {isFxEnabled1 && (
        <>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <BrightnessContrast
            brightness={0} // brightness. min: -1, max: 1
            contrast={0} // contrast: min -1, max: 1
          />
          <ChromaticAberration
            offset={[0.02, 0.002]} // color offset
          />
          <ColorAverage />
        </>
      )}
      {isFxEnabled2 && (
        <>
          <DotScreen
            angle={Math.PI * 0.5} // angle of the dot pattern
            scale={1.0} // scale of the dot pattern
          />
          <Glitch
            delay={[1.5, 3.5]} // min and max glitch delay
            duration={[0.6, 1.0]} // min and max glitch duration
            strength={[0.3, 1.0]} // min and max glitch strength
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
          <Grid
            // blendFunction={BlendFunction.OVERLAY} // blend mode
            scale={1.0} // grid pattern scale
            lineWidth={0.0} // grid pattern line width
            size={{ width: 10, height: 10 }} // overrides the default pass width and height
          />
          <HueSaturation
            // blendFunction={BlendFunction.NORMAL} // blend mode
            hue={0} // hue in radians
            saturation={0} // saturation in radians
          />
        </>
      )}
      {isFxEnabled3 && (
        <>
          <Outline
            // selection={[meshRef1, meshRef2]} // selection of objects that will be outlined
            selectionLayer={10} // selection layer
            // blendFunction={BlendFunction.SCREEN} // set this to BlendFunction.ALPHA for dark outlines
            patternTexture={null} // a pattern texture
            edgeStrength={2.5} // the edge strength
            pulseSpeed={0.0} // a pulse speed. A value of zero disables the pulse effect
            visibleEdgeColor={0xffffff} // the color of visible edges
            hiddenEdgeColor={0x22090a} // the color of hidden edges
            width={10} // render width
            height={10} // render height
            // kernelSize={KernelSize.LARGE} // blur kernel size
            blur={false} // whether the outline should be blurred
            xRay={true} // indicates whether X-Ray outlines are enabled
          />
          <Scanline
            // blendFunction={BlendFunction.OVERLAY} // blend mode
            density={1.25} // scanline density
          />
          <Sepia
            intensity={1.0} // sepia intensity
            // blendFunction={BlendFunction.NORMAL} // blend mode
          />
          <SMAA />
          <SSAO
            // blendFunction={BlendFunction.MULTIPLY} // blend mode
            samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
            rings={4} // amount of rings in the occlusion sampling pattern
            distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
            distanceFalloff={0.0} // distance falloff. min: 0, max: 1
            rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
            rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
            luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
            radius={20} // occlusion sampling radius
            scale={0.5} // scale of the ambient occlusion
            bias={0.5} // occlusion bias
          />
          <ToneMapping
            // blendFunction={BlendFunction.NORMAL} // blend mode
            adaptive={true} // toggle adaptive luminance map usage
            resolution={256} // texture resolution of the luminance map
            middleGrey={0.6} // middle grey factor
            maxLuminance={16.0} // maximum luminance
            averageLuminance={1.0} // average luminance
            adaptationRate={1.0} // luminance adaptation rate
          />
        </>
      )}
      {/* <MyCustomEffect /> */}
      {/* <SelectiveBloom
        // lights={[lightRef1, lightRef2]} // ⚠️ REQUIRED! all relevant lights
        // selection={[meshRef1, meshRef2]} // selection of objects that will have bloom effect
        selectionLayer={10} // selection layer
        intensity={1.0} // The bloom intensity.
        blurPass={undefined} // A blur pass.
        width={10} // render width
        height={10} // render height
        // kernelSize={KernelSize.LARGE} // blur kernel size
        luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
      /> */}
      {/* <LensFlare
        // blendFunction={BlendFunction.Screen} // The blend function of this effect.
        enabled={true} // Boolean to enable/disable the effect.
        opacity={1.0} // The opacity for this effect. Default: 1.0
        starBurst={true} // Boolean to enable/disable the start burst effect. Can be disabled to improve performance.
        glareSize={0.96} // The glare size. Default: 0.2
        followMouse={false} // Set it to follow the mouse, ignoring the lens position. Default: false
        lensPosition={[0, 0.5, 0]} // The position of the lens flare in 3d space.
        starPoints={6} // The number of points for the star. Default: 6
        flareSize={0.01} // The flare side. Default 0.01
        flareSpeed={0.01} // The flare animation speed. Default 0.01
        flareShape={0.01} // Changes the appearance to anamorphic. Default 0.01
        animated={true} // Animated flare. Default: true
        anamorphic={false} //Set the appearance to full anamorphic. Default: false
        colorGain={new THREE.Color(70, 70, 70)} // Set the color gain for the lens flare. Must be a THREE.Color in RBG format.
        // lensDirtTexture={'/lensDirtTexture.png'} // Texture to be used as color dirt for starburst effect.
        haloScale={0.5} // The halo scale. Default: 0.5
        secondaryGhosts={true} // Option to enable/disable secondary ghosts. Default: true.
        ghostScale={0.0} // Option to enable/disable secondary ghosts. Default: true.
        aditionalStreaks={true} // Option to enable/disable aditional streaks. Default: true.
        smoothTime={0.07} // The time that it takes to fade the occlusion. Default: 0.07
      /> */}
      {/* <GodRays
        sun={sunRef}
        blendFunction={BlendFunction.Screen} // The blend function of this effect.
        samples={60} // The number of samples per pixel.
        density={0.96} // The density of the light rays.
        decay={0.9} // An illumination decay factor.
        weight={0.4} // A light ray weight factor.
        exposure={0.6} // A constant attenuation coefficient.
        clampMax={1} // An upper bound for the saturation of the overall effect.
        width={Resizer.AUTO_SIZE} // Render width.
        height={Resizer.AUTO_SIZE} // Render height.
        kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
        blur={true} // Whether the god rays should be blurred to reduce artifacts.
      /> */}
    </EffectComposer>
  )
}

export default Effects
