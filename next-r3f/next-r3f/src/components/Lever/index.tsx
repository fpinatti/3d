// import useGlobal from '@/hooks/store/useGlobal'
import { useLoadModel } from '@/hooks/store/useLoadModel'
import { useAttachToSphere } from '@/hooks/useAttachToSphere'
import { Clone } from '@react-three/drei'
import { GroupProps, MeshProps, ThreeEvent } from '@react-three/fiber'
import { gsap } from 'gsap'
import React, { useRef, useState } from 'react'

// const defaultLeverRotation = Math.PI * 0.15
interface LeverProps extends GroupProps {
  lat: number
  long: number
  radius: number
  onAction?: () => void
}

const Lever = ({ onAction, lat, long, radius, ...props }: LeverProps) => {
  const { lever } = useLoadModel()
  // const [currentLeverRotation, setCurrentLeverRotation] =
  //   useState(defaultLeverRotation)
  const [isIdle, setIsIdle] = useState(true)
  const leverRotation = useRef({ value: 0 })
  const leverPosition = useRef({ value: 0 })
  const wrapperRef = useRef(null)
  const leverRef = useRef(null)

  const clickButton = (evt: ThreeEvent<MouseEvent>) => {
    const element = evt.object
    leverRotation.current.value = element.position.y
    leverPosition.current.value = element.position.x
    if (!isIdle) return
    setIsIdle(false)
    if (onAction) onAction()
    gsap.to(leverPosition.current, {
      duration: 2,
      //   value: Math.PI * -0.2,
      value: 1,
      onUpdate: () => {
        console.log(leverPosition.current.value)
        leverRef.current.position.z = leverPosition.current.value
        // setCurrentLeverRotation(leverRotation.current.value)
      },
      onComplete: () => {
        setIsIdle(true)
      },
      yoyo: true,
      repeat: 1,
    })
  }

  useAttachToSphere(wrapperRef, radius, lat, long)

  //   console.log(lever)

  return (
    <>
      <group {...props} ref={wrapperRef}>
        {/* <Clone object={lever.nodes['Sphere']}></Clone> */}
        {/* <Clone object={lever.nodes['Sphere_1']}></Clone> */}
        <Clone object={lever.nodes['base']}></Clone>
        <Clone
          object={lever.nodes['lever']}
          onClick={clickButton}
          ref={leverRef}
        ></Clone>
        {/* <mesh castShadow>
          <boxGeometry args={[1, 1, 3]}></boxGeometry>
          <meshStandardMaterial color={0xffaaff} />
        </mesh>
        <group rotation={[currentLeverRotation, 0, 0]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 4]} />
            <meshStandardMaterial color={0xab11c3} />
          </mesh>
          <mesh position={[0, 4, 0]}>
            <sphereGeometry args={[0.5, 10.3]} />
            <meshStandardMaterial color={0x5ca1ff} />
          </mesh>
        </group> */}
      </group>
    </>
  )
}

export default Lever
