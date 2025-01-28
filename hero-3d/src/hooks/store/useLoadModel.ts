import { useGLTF } from '@react-three/drei'

export const useLoadModel = () => {
  const button = useGLTF('assets/models/button.glb')
  const lever = useGLTF('assets/models/lever.glb')

  return {
    button,
    lever,
  }
}
