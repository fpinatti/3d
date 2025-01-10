import { useAttachToSphere } from '@/hooks/useAttachToSphere'
import { GroupProps } from '@react-three/fiber'
import { gsap } from 'gsap'
import React, { useRef, useState } from 'react'

const defaultButtonY = 0.4

interface ButtonDeviceProps extends GroupProps {
  onAction: () => void
  lat: number
  long: number
  radius: number
}

const ButtonDevice = ({
  onAction,
  lat,
  long,
  radius,
  ...props
}: ButtonDeviceProps) => {
  const [currentButtonY, setCurrentButtonY] = useState(defaultButtonY)
  const [isIdle, setIsIdle] = useState(true)
  const buttonY = useRef({ value: defaultButtonY })
  const wrapperRef = useRef(null)

  const clickButton = () => {
    if (!isIdle) return
    if (onAction) onAction()

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
  }

  useAttachToSphere(wrapperRef, radius, lat, long)

  return (
    <>
      <group {...props} ref={wrapperRef}>
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
