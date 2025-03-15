import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const SmokeMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0xffffff),
  },
  // Vertex Shader
  `
  uniform float uTime;
  void main() {
    vec3 transformed = position;
    transformed.y += sin(transformed.x + uTime) * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform vec3 uColor;
  void main() {
    gl_FragColor = vec4(uColor, 1.0);
  }
  `,
)

extend({ SmokeMaterial })

export default SmokeMaterial
