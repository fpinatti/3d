import { BallCollider, RigidBody } from '@react-three/rapier'
import { useGLTF, Clone } from '@react-three/drei'
import { useEffect, useState } from 'react'

export enum BallOwner {
  Player = 'player',
  CPU = 'cpu',
}

const Ball = ({ position, size, material, propRef, type, idx }) => {
  const model = useGLTF('./assets/models/ball.glb')
  const [isBallKinematic, setIsBallKinematic] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const onCollisionEvent = (evt) => {
    console.log('col', evt)
    // if ball is player, reset to initial position
    if (type === BallOwner.Player) {
      console.log('white ball is dead')
      setIsBallKinematic(true)
    }
    // if ball is scorable, make it disappear
    if (type === BallOwner.CPU) {
      console.log('cpu ball is dead')
      setIsActive(false)
    }
  }

  useEffect(() => {
    if (isBallKinematic) {
      propRef.current?.setNextKinematicTranslation({
        x: position[0],
        y: position[1],
        z: position[2],
      })
      setTimeout(() => {
        setIsBallKinematic(false)
      }, 50)
    }
  }, [isBallKinematic])

  return (
    <>
      {isActive && (
        <RigidBody
          ref={propRef}
          position={position}
          angularDamping={1}
          linearDamping={0}
          colliders="ball"
          userData={{ type, idx }}
          onIntersectionEnter={onCollisionEvent}
          type={isBallKinematic ? 'kinematicPosition' : 'dynamic'}
        >
          <mesh receiveShadow castShadow>
            <sphereGeometry args={[size, 10]} />
            <meshToonMaterial color={material} />
          </mesh>
          <BallCollider args={[0.2]} mass={0.1} restitution={0.6} friction={1} />
        </RigidBody>
      )}
    </>
  )
}

export default Ball
