import * as THREE from 'three'
import { ReactThreeFiber } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>
      // Add other Three.js elements if needed
    }
  }
}
