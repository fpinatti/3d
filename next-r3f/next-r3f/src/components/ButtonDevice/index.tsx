// import useGlobal from '@/hooks/store/useGlobal'
import { MeshProps, ThreeElements, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { Euler, Vector3 } from 'three'

const defaultButtonY = 0.4

// interface ButtonDeviceProps {
//   props: ThreeElements['mesh']
//   onAction: () => void
// }

interface ButtonDeviceProps extends MeshProps {
  onAction: () => void
  lat: number
  long: number
  radius: number
}

// const ButtonDevice = ({ onAction, ...props }: ButtonDeviceProps & ThreeElements["mesh"]) => {

const ButtonDevice = ({
  onAction,
  lat,
  long,
  radius,
  ...props
}: ButtonDeviceProps) => {
  // const { setFx1, isFxEnabled1 } = useGlobal()
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
    // console.log('click button', buttonHoverY.current)
  }

  useEffect(() => {
    // Convert spherical coordinates to Cartesian coordinates
    const x = radius * Math.cos(lat) * Math.sin(long)
    const y = radius * Math.sin(lat)
    const z = radius * Math.cos(lat) * Math.cos(long)
    // Update the position of the object
    wrapperRef?.current?.position.set(x, y, z)

    // Calculate the normal vector
    const normal = new Vector3(x, y, z).normalize()
    // Align the object's rotation with the normal vector
    const up = new Vector3(0, 1, 0)
    // Up direction
    wrapperRef?.current?.quaternion.setFromUnitVectors(up, normal)
  }, [props.position, wrapperRef?.current])

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
