// import useGlobal from '@/hooks/store/useGlobal'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import React, { useRef, useState } from 'react'

const defaultButtonY = 0.4

interface ButtonDeviceProps {
  props: ThreeElements['mesh']
  onAction: () => void
}

const ButtonDevice = (
  props: ThreeElements['mesh'],
  { onAction }: ButtonDeviceProps,
) => {
  // const { setFx1, isFxEnabled1 } = useGlobal()
  const [currentButtonY, setCurrentButtonY] = useState(defaultButtonY)
  const [isIdle, setIsIdle] = useState(true)
  const buttonY = useRef({ value: defaultButtonY })

  const clickButton = () => {
    if (!isIdle) return
    if (props.onAction) props.onAction()

    gsap.to(buttonY.current, {
      duration: 0.3,
      value: 0.1,
      onUpdate: () => {
        setCurrentButtonY(buttonY.current.value)
      },
      onComplete: () => {
        setIsIdle(true)
      },
      yoyo: true,
      repeat: 1,
    })
    // console.log('click button', buttonHoverY.current)
  }

  return (
    <>
      <group {...props}>
        <mesh castShadow>
          <boxGeometry args={[3, 1, 3]}></boxGeometry>
          <meshStandardMaterial color={0x00aaff} />
        </mesh>
        <mesh position={[0, currentButtonY, 0]} onClick={clickButton}>
          <cylinderGeometry />
          <meshStandardMaterial color={0xff00bb} />
        </mesh>
      </group>
    </>
  )
}

export default ButtonDevice
