import { Clone, useGLTF } from '@react-three/drei'
import { RefObject, useEffect } from 'react'
import { Object3D, Vector3 } from 'three'

export const useLoadModel = () => {
  const button = useGLTF('assets/models/button.glb')
  const lever = useGLTF('assets/models/lever.glb')

  return {
    button,
    lever,
  }
}
