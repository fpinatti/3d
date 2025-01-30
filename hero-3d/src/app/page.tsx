'use client'

import BaseLevel from '@/components/levels/base'
import { v4 as uuidv4 } from 'uuid'
import * as THREE from 'three'

export interface ILevelData {
  player: {
    position: [number, number, number]
    id: string
  }
  platforms: {
    size: [number, number, number]
    position: [number, number, number]
    color?: THREE.Color
    type?: 'explodable' | 'hard' | 'portal'
    actionData?: { nextLevel: string }
    id: string
  }[]
}

export default function Home() {
  const levelData = {
    '1-1': {
      player: {
        position: [-4, 4, 0],
        id: uuidv4(),
      },
      platforms: [
        { size: [7, 3, 3], position: [-4.5, 1, 0], id: uuidv4() },
        { size: [7, 3, 3], position: [4.5, 1, 0], id: uuidv4() },
        {
          size: [1, 3, 3],
          position: [-7.5, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 3, 3],
          position: [-1.5, 4, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 3, 3],
          position: [7, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 3, 3],
          position: [-7, 7, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 3, 3],
          position: [-1.5, 7, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 3, 3],
          position: [6.5, 7, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [2, 3, 3],
          position: [0, -2, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '1-2' },
          id: uuidv4(),
        },
      ],
    },
    '1-2': {
      player: {
        position: [0, 7, 0],
        id: uuidv4(),
      },
      rescueGuy: [
        {
          position: [-5.5, 3.3, 0],
          id: uuidv4(),
        },
      ],
      enemies: [
        {
          position: [-2, 4, 0],
          id: uuidv4(),
        },
      ],
      platforms: [
        { size: [7, 3, 3], position: [-4.5, 7, 0], id: uuidv4() },
        { size: [7, 3, 3], position: [4.5, 7, 0], id: uuidv4() },
        {
          size: [2, 3, 3],
          position: [-7, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 3, 3],
          position: [7, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [16, 3, 3],
          position: [0, 1, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [2, 0.5, 3],
          position: [0, 8.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '1-1' },
          id: uuidv4(),
        },
      ],
    },
  }

  return <BaseLevel levelData={levelData} />
}
