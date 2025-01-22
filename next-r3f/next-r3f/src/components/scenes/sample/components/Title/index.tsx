import { Float, useGLTF, useTransf } from '@react-three/drei'
import { useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { FlakesTexture } from 'three-stdlib'

type TitleProps = {
  position: [number, number, number]
}

const Title = ({ position = [0, 0, 0] }: TitleProps) => {
  const { scene, materials } = useGLTF('./assets/models/pinland-title.glb')
  // const [] =
  // useEffect(() => {
  //   const nodes = Object.values(model.nodes)
  //   nodes.forEach((element) => {
  //     element.castShadow = true
  //   })
  // }, [])

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      const meshObj = obj as THREE.Mesh
      if (meshObj.isMesh) {
        meshObj.receiveShadow = true
        meshObj.castShadow = true
        meshObj.material.color.set('orange')
        meshObj.material.normalMap = new THREE.CanvasTexture(
          new FlakesTexture(),
          THREE.UVMapping,
          THREE.RepeatWrapping,
          THREE.RepeatWrapping,
        )
        meshObj.material.normalMap.repeat.set(40, 40)
        meshObj.material.normalScale.set(0.1, 0.1)
      }
    })
    // console.log(materials)
    // materials.default.
    // materials.color.set('orange')
    // materials.default.roughness = 0
    // materials.default.normalMap = new THREE.CanvasTexture(
    //   new FlakesTexture(),
    //   THREE.UVMapping,
    //   THREE.RepeatWrapping,
    //   THREE.RepeatWrapping,
    // )
  })

  return (
    <>
      <group scale={12} position={position}>
        <Float>
          <primitive object={scene} />
        </Float>
      </group>
    </>
  )
}

export default Title
