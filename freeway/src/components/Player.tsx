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
import ScoreBoard from './ScoreBoard'
import { debounce } from 'lodash'
import playerModel from '../assets/chicken.glb'

gsap.registerPlugin(useGSAP)
const accFactor = 0.5
const maxAcc = 20
const currentPos = [0, 1, 2]
let colliding = false
let isEnabled = true
const zeroVector = new Vector3(0, 0, 0)
const Player = () => {
  const boxSize: Triplet = [0.4, 0.3, 0.7]
  const [score, setScore] = useState(0)
  const [playerPos, setPlayerPos] = useState()

  const model = useGLTF(playerModel)

  const userScored = () => {
    setScore((currentScore) => {
      const sc = currentScore + 1
      return sc
    })
    setTimeout(() => {
      colliding = false
      api.collisionFilterGroup.set(1)
    }, 1500)
  }

  const onCollision = (evt) => {
    if (evt.body.userData.type === 'ground') {
      isEnabled = true
    }
    if (evt.body.userData.type === 'win' && !colliding) {
      colliding = true
      api.collisionFilterGroup.set(10)
      api.position.set(0, 1, 2)
      userScored()
    }
    if (evt.body.userData.type === 'enemy' && !colliding) {
      colliding = true
      api.velocity.set(0, 0, 8)
      api.collisionFilterGroup.set(10)
      api.applyImpulse([0, 5, 9], [0, 0, 0])
      setTimeout(() => {
        colliding = false
        api.collisionFilterGroup.set(1)
      }, 1500)
    }
  }
  const { ref } = useSwipeable({
    onSwiped: (evt) => {
      if (!isEnabled) return
      isEnabled = false
      let impX = 0
      let impZ = 0
      if (evt.dir === 'Up' || evt.dir === 'Down') {
        impZ = evt.deltaY * accFactor
      }
      //   if (evt.dir === 'Left' || evt.dir === 'Right') {
      //     impX = evt.deltaX * accFactor
      //   }
      impZ = Math.max(impZ, -maxAcc)
      impZ = Math.min(impZ, maxAcc)
      impX = Math.max(impX, -maxAcc)
      impX = Math.min(impX, maxAcc)
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
    collisionFilterGroup: 1,
  }))

  const position = useRef([0, 0, 0])
  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => (position.current = v))
    return unsubscribe
  }, [])

  const resetPlayer = () => {
    api.velocity.set(0, 0, 0)
    api.position.set(currentPos[0], currentPos[1], currentPos[2])
  }

  const camera = useRef()
  useFrame(() => {
    const v3 = new Vector3(position.current[0], position.current[1], position.current[2])
    if (v3.distanceTo(zeroVector) > 30) {
      resetPlayer()
    }
    camera.current.position.lerp(
      new Vector3(position.current[0], position.current[1] + 1, position.current[2] + 3),
      0.1
    )
    // debounce(() => {
    setPlayerPos(position.current)
    // }, 1000)
  })

  return (
    <>
      <ScoreBoard position={playerPos} score={score} />
      <mesh ref={player} receiveShadow castShadow>
        {/* <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshPhysicalMaterial color={'purple'} /> */}
        <Clone
          // ref={player}
          receiveShadow
          castShadow
          object={model.scene}
          rotation={[0, Math.PI * -0.5, 0]}
          position={[0, -0.15, 0]}
          scale={0.0013}
        />
      </mesh>
      <PerspectiveCamera ref={camera} makeDefault position={[0, 3, 7]} fov={60} />
      {/* <CameraShake intensity={0.1} maxPitch={0.01} maxRoll={0.2} decay={10}> */}
      {/* </CameraShake> */}
    </>
  )
}

export default Player
