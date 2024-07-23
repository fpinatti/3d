import { BallCollider, CuboidCollider, euler, quat, RigidBody, vec3 } from '@react-three/rapier'
import { useGLTF, Clone, useTexture, PerspectiveCamera, CameraControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useMouse } from '@uidotdev/usehooks'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Vector3 } from 'three'
import { Triplet, useBox } from '@react-three/cannon'
import CarModel from '../assets/carModel'

gsap.registerPlugin(useGSAP)
// const autoTime = 0
let currentRotation = 0
const Player = ({ joystickPos }) => {
  const boxSize: Triplet = [0.4, 0.3, 0.7]
  const [currentPos, setCurrentPos] = useState([0, 0.1, 0])
  const [direction, setDirection] = useState(new Vector3(0, 0, 0.5))
  const [currentSteerX, setCurrentSteerX] = useState(0)
  const [ref, api] = useBox(() => ({
    args: boxSize,
    type: 'Kinematic',
    mass: 1,
    position: currentPos,
    material: { friction: 1, restitution: 1 },
  }))

  const rotation = useRef([0, 0, 0])
  useEffect(() => {
    const unsubscribe = api.rotation.subscribe((v) => (rotation.current = v))
    return unsubscribe
  }, [])

  // console.log(rotation.current)

  const screenWidth = document.body.clientWidth
  const screenHeight = document.body.clientHeight
  const [mouse] = useMouse()
  const mouseX = mouse.x / screenWidth - 0.5 || 0
  const mouseY = mouse.y / screenHeight - 0.5 || 0

  const cam = useRef()
  const [isAccelerating, setIsAccelerating] = useState(false)
  useFrame((_, delta) => {
    api.wakeUp()
    if (currentSteerX) {
      currentRotation -= currentSteerX * 0.1
    }
    api.rotation.set(0, currentRotation, 0)
    const d1 = new Vector3(0, 0, 1)
    const d2 = d1.applyAxisAngle(new Vector3(0, 1, 0), currentRotation).normalize().multiplyScalar(1)
    api.velocity.set(d2.x, d2.y, d2.z)
  })

  window.onmousedown = () => {
    setCurrentSteerX(mouseX)
  }

  window.onmouseup = () => {
    setCurrentSteerX(0)
  }

  return (
    <>
      <mesh ref={ref} receiveShadow castShadow>
        <CarModel scale={[0.3, 0.3, 0.3]} castShadow receiveShadow />
        <group position={[0, 0.5, -1]}>
          {/* <PerspectiveCamera ref={cam} far={100} near={0.1} fov={128} /> */}
          <CameraControls makeDefault ref={cam} />
        </group>
      </mesh>
    </>
  )
}

export default Player
