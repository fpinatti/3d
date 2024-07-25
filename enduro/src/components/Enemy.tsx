import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Triplet, useBox } from '@react-three/cannon'
import CarModel from '../assets/carModel'

gsap.registerPlugin(useGSAP)
const Enemy = ({ path, speed }) => {
  const objTween = { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
  const boxSize: Triplet = [0.4, 0.3, 0.7]
  const [ref, api] = useBox(() => ({
    args: boxSize,
    type: 'Kinematic',
    mass: 1,
    position: [0, 0.3, 0],
    material: { friction: 1, restitution: 1 },
  }))

  const onUpdateTween = () => {
    // api.wakeUp()
    api.position.set(objTween.position.x, objTween.position.y, objTween.position.z)
    api.rotation.set(objTween.rotation.x, objTween.rotation.y, objTween.rotation.z)
  }

  const buildTweenProps = (element, property) => {
    const tgPosX = element[property].x
    const tgPosY = element[property].y
    const tgPosZ = element[property].z
    const tgPos = {}
    if (tgPosX) tgPos.x = tgPosX
    if (tgPosY) tgPos.y = tgPosY
    if (tgPosZ) tgPos.z = tgPosZ
    return tgPos
  }

  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatRefresh: true,
      onUpdate: onUpdateTween,
    })
    path.map((element, index) => {
      if (element.position) {
        const tgPos = buildTweenProps(element, 'position')
        tl.to(objTween.position, {
          ...tgPos,
          duration: index === 0 ? 0 : speed,
          ease: 'none',
        })
      }
      if (element.rotation) {
        const tgRot = buildTweenProps(element, 'rotation')
        tl.to(objTween.rotation, {
          ...tgRot,
          duration: index === 0 ? 0.1 : 0.2,
          ease: 'none',
        })
      }
    })
  })

  return (
    <>
      <mesh ref={ref} receiveShadow castShadow>
        <CarModel scale={[0.3, 0.3, 0.3]} castShadow receiveShadow />
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshBasicMaterial color={'purple'} />
      </mesh>
    </>
  )
}

export default Enemy
