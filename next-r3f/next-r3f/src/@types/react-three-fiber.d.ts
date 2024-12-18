import { ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements extends ReactThreeFiber.IntrinsicElements {
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>
      bufferGeometry: ReactThreeFiber.Object3DNode<
        THREE.BufferGeometry,
        typeof THREE.BufferGeometry
      >
      lineBasicMaterial: ReactThreeFiber.Object3DNode<
        THREE.LineBasicMaterial,
        typeof THREE.LineBasicMaterial
      >
      // Add any other specific Three.js elements if needed
    }
  }
}
