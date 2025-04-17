import { ShaderMaterial } from 'three'
import * as THREE from 'three'

// const vertexShader = `
// varying vec2 vUv;

// void main() {
//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `

// const fragmentShader = `
// uniform vec2 uResolution;
// uniform float uTime;
// uniform vec2 uMouse;

// void main() {
//   vec2 uv = gl_FragCoord.xy / uResolution.xy - 0.5;
//   uv.y *= uResolution.y / uResolution.x;
//   // Paste and adapt your fragment shader logic here!
//   vec4 color = vec4(uv, 0.5 + 0.5 * sin(uTime), 1.0);
//   gl_FragColor = color;
// }
// `

// const starNestShader = {
//   uniforms: {
//     uTime: { value: 0 },
//     uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
//     uMouse: { value: new THREE.Vector2(0, 0) },
//   },
// }

const StarNestShader = {
  uniforms: {
    // uTime: { value: 0 },
    // // uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    // uResolution: { value: new THREE.Vector2(1300, 1300) },
    // uMouse: { value: new THREE.Vector2(0, 0) },
    u_time: { type: 'f', value: Math.random() * 100.0 },
    u_resolution: { type: 'v2', value: new THREE.Vector2(1, 1) },
    u_mouse: { type: 'v2', value: new THREE.Vector2(1, 1, 1) },
    u_position: { type: 'v2', value: new THREE.Vector2(1, 1, 1) },
  },
  vertexShader: `
    // varying vec2 vUv;

    // void main() {
    //   vUv = uv;
    //   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    // }
    varying vec4 v_fragCoord;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        // v_fragCoord = gl_Position = vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    // uniform vec2 uResolution;
    // uniform float uTime;
    // uniform vec2 uMouse;

    // // vec2 iResolution=vec2(1300,1300)
    // float zoom=0.800;
    // float tile=0.850;
    // float speed=0.010;
    // // float speed=1.;
    // vec3 dir=vec3(1,1,1);
    // vec3 from=vec3(0.6,.2,0.3);
    // // vec3 dir=vec3(uv*zoom,1.);
    // // float currentTime=uTime*speed+.25;
    // // float time=1.;
    // int iterations=17;
    // float formuparam=0.53;
    // float stepsize=0.1;
    // float brightness=0.0015;
    // float darkmatter=0.333;
    // float distfading=0.73;
    // float saturation=0.8;
    // int volsteps=20;

    // void main() {
    //   vec2 uv = gl_FragCoord.xy / uResolution.xy - 0.5;
    //   uv.y *= uResolution.y / uResolution.x;
    //   vec4 color = vec4(uv, 0.5 + 0.5 * sin(uTime), 1.0);

    //   //volumetric rendering
    //   float s=0.1,fade=1.;
    //   vec3 v=vec3(0.);
    //   for (int r=0; r<volsteps; r++) {
    //     vec3 p=from+s*dir*.5;
    //     p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
    //     float pa,a=pa=0.;
    //     for (int i=0; i<iterations; i++) {
    //       p=abs(p)/dot(p,p)-formuparam; // the magic formula
    //       a+=abs(length(p)-pa); // absolute sum of average change
    //       pa=length(p);
    //     }
    //     float dm=max(0.,darkmatter-a*a*.001); //dark matter
    //     a*=a*a; // add contrast
    //     if (r>6) fade*=1.-dm; // dark matter, don't render near
    //     v+=fade;
    //     v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
    //     fade*=distfading; // distance fading
    //     s+=stepsize;
    //   }
    //   v=mix(vec3(length(v)),v,saturation); //color adjust

    //   gl_FragColor = vec4(v*.01,1.);;
    //   //  gl_FragColor = vec4(1,1,1,1);
    // }

    varying vec4 v_fragCoord;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_position;
    const int octaves = 2;
    const float seed2 = 73156.8473192;
    const float seed = 43758.5453123;

    precision mediump float;

    uniform vec4 color;

    // Star Nest by Pablo Roman Andrioli


    #define iterations 17
    #define formuparam 0.53

    #define volsteps 20
    #define stepsize 0.1

    #define zoom   0.800
    #define tile   0.850
    #define speed  0.010

    #define brightness 0.0015
    #define darkmatter 0.300
    #define distfading 0.730
    #define saturation 0.850

    //user define
    vec2 iResolution = vec2(1,1);
    vec2 iMouse = vec2(1,1);
    //vec2 iterations = vec2(1,1);

    float iTime = 1.0;
    //vec2 fragCoord = vec2(.1,.1);
    /*void mainImage( out vec4 fragColor, in vec2 fragCoord )*/
    void main()
    {
      //get coords and direction
      vec2 uv=v_fragCoord.xy/u_resolution.xy-.5;
      uv.y*=u_resolution.y/u_resolution.x;
      vec3 dir=vec3(uv*zoom,1.);
      float time=u_time*speed+.25;

      //mouse rotation
      float a1=.5+u_mouse.x/u_resolution.x*2.;
      float a2=.8+u_mouse.y/u_resolution.y*2.;
      mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
      mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
      dir.xz*=rot1;
      dir.xy*=rot2;
      vec3 from=vec3(1.,.5,0.5);
      from+=vec3(time*2.,time,-2.);
      from.xz*=rot1;
      from.xy*=rot2;

      //volumetric rendering
      float s=0.1,fade=1.;
      vec3 v=vec3(0.);
      for (int r=0; r<volsteps; r++) {
        vec3 p=from+s*dir*.5;
        p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
        float pa,a=pa=0.;
        for (int i=0; i<iterations; i++) {
          p=abs(p)/dot(p,p)-formuparam; // the magic formula
          a+=abs(length(p)-pa); // absolute sum of average change
          pa=length(p);
        }
        float dm=max(0.,darkmatter-a*a*.001); //dark matter
        a*=a*a; // add contrast
        if (r>6) fade*=1.-dm; // dark matter, don't render near
        //v+=vec3(dm,dm*.5,0.);
        v+=fade;
        v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
        fade*=distfading; // distance fading
        s+=stepsize;
      }
      v=mix(vec3(length(v)),v,saturation); //color adjust
      gl_FragColor = vec4(v*.01,1.);

    }
  `,
}

const SpaceMaterial = new ShaderMaterial(StarNestShader)

// const SpaceMaterial = new ShaderMaterial({
//   vertexShader: vertexShader,
//   fragmentShader: fragmentShader,
//   uniforms: {
//     uTime: { value: 0 },
//     uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
//     uMouse: { value: new THREE.Vector2(0, 0) },
//   },
// })

export default SpaceMaterial
