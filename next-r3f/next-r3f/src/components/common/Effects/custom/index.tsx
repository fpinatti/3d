// import React, { forwardRef, useMemo } from 'react';
// import { Uniform } from 'three';
// import { Effect } from 'postprocessing';

// const fragmentShader = `
// varying vec2 vUv;
// varying float vDisplacement;

// void main() {
//   gl_FragColor = vec4(0.5 + 0.5 * vDisplacement, 0.3 + 0.3 * vDisplacement, 1.0, 1.0);
// }
// `;

// let _uParam;

// // Effect implementation
// class MyCustomEffectImpl extends Effect {
//   constructor({ param = 0.1 } = {}) {
//     super('MyCustomEffect', fragmentShader, {
//       uniforms: new Map([['param', new Uniform(param)]]),
//     });

//     _uParam = param;
//   }

//   update(renderer, inputBuffer, deltaTime) {
//     this.uniforms.get('param').value = _uParam;
//   }
// }

// // Effect component
// export const MyCustomEffect = forwardRef(({ param }, ref) => {
//   const effect = useMemo(() => new MyCustomEffectImpl(param), [param]);
//   return <primitive ref={ref} object={effect} dispose={null} />;
// });
