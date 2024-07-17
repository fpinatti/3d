import { BallCollider, RigidBody } from '@react-three/rapier'
import { useGLTF, Clone, useTexture } from '@react-three/drei'
import { useEffect, useState } from 'react'

export enum BallOwner {
  Player = 'player',
  CPU = 'cpu',
}

const Player = () => {
  return (
    <>
      <mesh receiveShadow castShadow position={[0, 1, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.7]} />
        <meshToonMaterial color={'red'} />
      </mesh>
    </>
  )
}

export default Player
