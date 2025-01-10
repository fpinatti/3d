// import useGlobal from '@/hooks/store/useGlobal'
import { useAttachToSphere } from '@/hooks/useAttachToSphere'
import { GroupProps, MeshProps } from '@react-three/fiber'
import { gsap } from 'gsap'
import React, { useRef, useState } from 'react'

const defaultLeverRotation = Math.PI * 0.15
interface LeverProps extends GroupProps {
  lat: number
  long: number
  radius: number
  onAction?: () => void
}

const Lever = ({ onAction, lat, long, radius, ...props }: LeverProps) => {
  const [currentLeverRotation, setCurrentLeverRotation] =
    useState(defaultLeverRotation)
  const [isIdle, setIsIdle] = useState(true)
  const leverRotation = useRef({ value: defaultLeverRotation })
  const wrapperRef = useRef(null)

  const clickButton = () => {
    if (!isIdle) return
    if (onAction) onAction()

    gsap.to(leverRotation.current, {
      duration: 0.3,
      value: Math.PI * -0.2,
      onUpdate: () => {
        setCurrentLeverRotation(leverRotation.current.value)
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
      <group {...props} onClick={clickButton} ref={wrapperRef}>
        <mesh castShadow>
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
        </group>
        {/* <mesh position={[0, currentButtonY, 0]} onClick={clickButton}>
          <cylinderGeometry />
          <meshStandardMaterial color={0xff00bb} />
        </mesh> */}
      </group>
    </>
  )
}

export default Lever
