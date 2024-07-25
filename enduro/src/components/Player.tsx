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

const currentSteerX = { v: 0, a: 0 }
const onCollision = () => {
  console.log('collide')
}
let currentRotation = 0
const boxSize: Triplet = [0.4, 0.3, 0.7]
const Player = ({ joystickPos }) => {
  const [currentPos, setCurrentPos] = useState([0, 0.1, 0])
  //   const [direction, setDirection] = useState(new Vector3(0, 0, 0.5))
  //   const [currentSteerX, setCurrentSteerX] = useState(0)
  const [ref, api] = useBox(() => ({
    args: boxSize,
    type: 'Kinematic',
    mass: 1,
    position: currentPos,
    material: { friction: 1, restitution: 1 },
    onCollideBegin: onCollision,
    isTrigger: true,
  }))

  const position = useRef([0, 0, 0])
  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => (position.current = v))
    return unsubscribe
  }, [])

  const screenWidth = document.body.clientWidth
  const screenHeight = document.body.clientHeight
  const [mouse] = useMouse()
  const mouseX = mouse.x / screenWidth - 0.5 || 0
  const mouseY = mouse.y / screenHeight - 0.5 || 0

  const cam = useRef()
  //   const [isAccelerating, setIsAccelerating] = useState(false)
  useFrame((_, delta) => {
    // api.wakeUp()
    api.wakeUp()
    if (currentSteerX.v) {
      currentRotation -= currentSteerX.v
    }
    api.rotation.set(0, currentRotation, 0)
    const d1 = new Vector3(0, 0, 1)
    const d2 = d1.applyAxisAngle(new Vector3(0, 1, 0), currentRotation).normalize().multiplyScalar(currentSteerX.a)
    api.velocity.set(d2.x, d2.y, d2.z)
  })

  window.onmousedown = () => {
    const steer = mouseX > 0 ? 0.009 : -0.009
    gsap.to(currentSteerX, {
      v: steer,
      duration: 0.3,
    })
    //
    gsap.to(currentSteerX, {
      a: 3,
      duration: 1,
    })
  }

  window.onmouseup = () => {
    gsap.to(currentSteerX, {
      v: 0,
      duration: 0.1,
    })
    // gsap.to(currentSteerX, {
    //   a: 0,
    //   duration: 1,
    // })
    console.log(currentRotation, Math.PI * 0.5)
  }

  return (
    <>
      <mesh ref={ref} receiveShadow castShadow>
        <CarModel scale={[0.3, 0.3, 0.3]} castShadow receiveShadow />
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color={'purple'} />
        <group position={[0, 1.2, -4]} rotation={[0, Math.PI, 0]}>
          <PerspectiveCamera makeDefault ref={cam} far={100} near={0.1} />
          {/* <CameraControls ref={cam} /> */}
        </group>
      </mesh>
    </>
  )
}

export default Player
