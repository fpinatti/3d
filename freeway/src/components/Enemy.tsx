import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Triplet, useBox } from '@react-three/cannon'
import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
// import CarModel from '../assets/carModel'

const Enemy = ({ position, speed, keepDistance = 0 }) => {
  const boxSize: Triplet = [0.4, 0.4, 0.4]
  const objTween = { position: { x: position[0], y: position[1], z: position[2] } }
  const [ref, api] = useBox(() => ({
    args: boxSize,
    type: 'Kinematic',
    mass: 0.1,
    position: [position[0], position[1], position[2]],
    // isTrigger: true,
    userData: { type: 'enemy' },
    // material: { friction: 10, restitution: 0 },
  }))

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
  //   useGSAP(() => {
  //     const tl = gsap.timeline({
  //       repeat: -1,
  //       repeatRefresh: true,
  //       onUpdate: onUpdateTween,
  //     })
  //     path.map((element, index) => {
  //       if (element.position) {
  //         const tgPos = buildTweenProps(element, 'position')
  //         tl.to(objTween.position, {
  //           ...tgPos,
  //           duration: index === 0 ? 0 : speed,
  //           ease: 'none',
  //         })
  //       }
  //       if (element.rotation) {
  //         const tgRot = buildTweenProps(element, 'rotation')
  //         tl.to(objTween.rotation, {
  //           ...tgRot,
  //           duration: index === 0 ? 0.1 : 0.2,
  //           ease: 'none',
  //         })
  //       }
  //     })
  //   })

  return (
    <>
      <mesh ref={ref} receiveShadow castShadow>
        {/* <CarModel scale={[0.3, 0.3, 0.3]} castShadow receiveShadow /> */}
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color={'red'} />
      </mesh>
    </>
  )
}

export default Enemy
