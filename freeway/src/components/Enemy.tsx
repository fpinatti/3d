import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Triplet, useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { Clone } from '@react-three/drei'
// import CarModel from '../assets/carModel'

const Enemy = ({ type, position, speed, keepDistance = 0 }) => {
  const boxSize: Triplet = [0.4, 0.3, 0.2]
  const objTween = { position: { x: position[0], y: position[1], z: position[2] } }
  const [ref, api] = useBox(() => ({
    args: boxSize,
    type: 'Kinematic',
    mass: 0.1,
    position: [position[0], position[1], position[2]],
    // isTrigger: true,
    userData: { type: 'enemy' },
    collisionFilterGroup: 1,
    collisionFilterMask: 1,
    // material: { friction: 10, restitution: 0 },
  }))

  const startDirection = position[0] > 0 ? -1 : 1

  useFrame(() => {
    api.wakeUp()
    api.position.set(objTween.position.x, objTween.position.y, objTween.position.z)
  })
  let tl
  useGSAP(() => {
    tl = gsap.to(objTween.position, {
      x: (position[0] + keepDistance) * -1,
      repeat: -1,
      duration: speed,
    })
  })
  return (
    <>
      <mesh ref={ref} receiveShadow castShadow>
        <Clone
          object={type.scene}
          rotation={[0, Math.PI * 0.5 * startDirection, 0]}
          position={[0, -0.2, 0]}
          scale={0.15}
        />
        {/* <boxGeometry args={[0.4, 0.3, 0.2]} /> */}
        <meshBasicMaterial color={'red'} />
      </mesh>
    </>
  )
}

export default Enemy
