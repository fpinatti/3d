import { useLoadModel } from '@/hooks/store/useLoadModel'
import { useAttachToSphere } from '@/hooks/useAttachToSphere'
import { Clone } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { Mesh } from 'three'

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
  const [isIdle, setIsIdle] = useState(true)
  const buttonY = useRef({ value: defaultButtonY })
  const wrapperRef = useRef(null)

  const { button } = useLoadModel()

  const clickButton = (element: Mesh) => {
    buttonY.current.value = element.position.y
    if (!isIdle) return
    setIsIdle(false)
    if (onAction) onAction()

    gsap.to(buttonY.current, {
      duration: 0.3,
      value: -0.1,
      onUpdate: () => {
        element.position.y = buttonY.current.value
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
      <mesh castShadow {...props} ref={wrapperRef}>
        {/* <primitive object={button.nodes['base']}></primitive> */}
        <Clone object={button.nodes['base']}></Clone>
        <group
          onClick={(evt) => {
            evt.stopPropagation()
            const object = evt.intersections[0].object as Mesh
            clickButton(object)
          }}
        >
          <Clone object={button.nodes['button']}></Clone>
          {/* <primitive
            object={<Clone object={button.nodes['button']}></Clone>}
          ></primitive> */}
        </group>
      </mesh>
    </>
  )
}

export default ButtonDevice
