import { Float, Trail, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import gsap from 'gsap'
import useGlobal from '@/hooks/store/useGlobal'

const initY = 20

type HelicopterModelProps = {
  position: [number, number, number]
}

const HelicopterModel = ({ position = [0, 0, 0] }: HelicopterModelProps) => {
  const model = useGLTF('./assets/models/heli.glb')
  const { isHelicopter } = useGlobal()

  useEffect(() => {
    const tgY = isHelicopter ? -5 : initY
    gsap.to(model.scenes[0].position, {
      duration: 3,
      y: tgY,
      ease: 'power2.inOut',
      // repeat: -1,
    })
  }, [isHelicopter, model])

  useEffect(() => {
    // console.log(model.nodes)
    // const nodes = Object.values(model.nodes)
    // nodes.forEach((element) => {
    //   element.castShadow = true
    // })
    gsap.to(model.nodes.helice.rotation, {
      duration: 0.2,
      y: Math.PI * 0.5,
      ease: 'linear',
      repeat: -1,
    })
    // gsap.to(model.nodes.BackMotor.rotation, {
    //   duration: 0.2,
    //   x: Math.PI * 0.5,
    //   ease: 'linear',
    //   repeat: -1,
    // })
    // gsap.to(model.nodes.TopFin.rotation, {
    //   duration: 0.2,
    //   y: Math.PI * 0.5,
    //   ease: 'linear',
    //   repeat: -1,
    // })
  }, [])

  return (
    <>
      <group scale={8} position={position} rotation={[0, Math.PI, 0]}>
        <Float>
          <primitive object={model.scene} />
        </Float>
      </group>
    </>
  )
}

export default HelicopterModel
