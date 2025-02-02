import {
  CollisionEnterHandler,
  CuboidCollider,
  RapierCollider,
  RigidBody,
} from '@react-three/rapier'
import { useState } from 'react'
import EnemySpider from './types/spider'
import EnemySnake from './types/snake'
import EnemyBat from './types/bat'
import EnemyMovingBat from './types/movingbat'

export enum EnemyType {
  Spider = 'spider',
  Bat = 'bat',
  MovingBat = 'moving_bat',
  Snake = 'snake',
}
export interface EnemyProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  type?: EnemyType
  isAlive?: boolean
  onPlayerCollide?: (collider: CollisionEnterHandler) => void
  onLaserCollide?: (collider: CollisionEnterHandler) => void
}

const Enemy = ({ position, type = EnemyType.Spider }: EnemyProps) => {
  const [isAlive, setIsAlive] = useState(true)
  const onPlayerCollide = (collider) => {
    if (collider.colliderObject?.name === 'player') {
      // remove player life
      console.log('remove player life')
    }
  }

  const onLaserCollide = (collider) => {
    if (collider.colliderObject?.name === 'laser') {
      setIsAlive(false)
    }
  }
  return (
    <>
      {type === EnemyType.Spider && (
        <EnemySpider
          position={position}
          onPlayerCollide={onPlayerCollide}
          onLaserCollide={onLaserCollide}
          isAlive={isAlive}
        />
      )}
      {type === EnemyType.Snake && (
        <EnemySnake
          position={position}
          onPlayerCollide={onPlayerCollide}
          onLaserCollide={onLaserCollide}
          isAlive={isAlive}
        />
      )}
      {type === EnemyType.Bat && (
        <EnemyBat
          position={position}
          onPlayerCollide={onPlayerCollide}
          onLaserCollide={onLaserCollide}
          isAlive={isAlive}
        />
      )}
      {type === EnemyType.MovingBat && (
        <EnemyMovingBat
          position={position}
          onPlayerCollide={onPlayerCollide}
          onLaserCollide={onLaserCollide}
          isAlive={isAlive}
        />
      )}
    </>
  )
}

export default Enemy
