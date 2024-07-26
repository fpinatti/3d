import { BallCollider, CuboidCollider, euler, quat, RigidBody, vec3 } from '@react-three/rapier'
import { useGLTF, Clone, useTexture, PerspectiveCamera, CameraControls, CameraShake } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useMouse } from '@uidotdev/usehooks'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Vector3 } from 'three'
import { Triplet, useBox } from '@react-three/cannon'
import { useSwipeable } from 'react-swipeable'
// import CarModel from '../assets/carModel'

gsap.registerPlugin(useGSAP)
const Player = ({ joystickPos }) => {
  const boxSize: Triplet = [0.4, 0.3, 0.7]
  const [currentPos, setCurrentPos] = useState([0, 1, 2])
  let isColliding = false
  const onCollision = (evt) => {
    console.log(evt.body.userData.type)
    if (isColliding) return
    if (evt.body.userData.type === 'enemy') {
      api.velocity.set(0, 0, 4)
      isColliding = true
      setTimeout(() => {
        isColliding = false
      }, 500)
    }
  }
  const { ref } = useSwipeable({
    onSwiped: (evt) => {
      let impX = 0
      let impZ = 0
      if (evt.dir === 'Up' || evt.dir === 'Down') {
        impZ = evt.deltaY * 0.1
      }
      if (evt.dir === 'Left' || evt.dir === 'Right') {
        impX = evt.deltaX * 0.1
      }
      impZ = Math.max(impZ, -10)
      impZ = Math.min(impZ, 10)
      impX = Math.max(impX, -10)
      impX = Math.min(impX, 10)
      api.applyImpulse([impX, 3, impZ], [0, 0, 0])
    },
  }) as {
    ref: RefCallback<Document>
  }

  useEffect(() => {
    ref(document)
    // Clean up swipeable event listeners
    return () => ref({})
  })

  const [player, api] = useBox(() => ({
    args: boxSize,
    type: 'Dynamic',
    mass: 1,
    position: currentPos,
    material: { friction: 1, restitution: 0.1 },
    onCollide: onCollision,
    fixedRotation: true,
  }))

  return (
    <>
      <mesh ref={player} receiveShadow castShadow>
        {/* <CarModel scale={[0.3, 0.3, 0.3]} castShadow receiveShadow /> */}
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshPhysicalMaterial color={'purple'} />
        <PerspectiveCamera makeDefault position={[0, 3, 10]} />
      </mesh>
      {/* <CameraShake intensity={0.1} maxPitch={0.01} maxRoll={0.2} decay={10}> */}
      {/* </CameraShake> */}
    </>
  )
}

export default Player
