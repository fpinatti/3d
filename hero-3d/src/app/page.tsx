'use client'

import BaseLevel from '@/components/levels/base'
import { v4 as uuidv4 } from 'uuid'
import * as THREE from 'three'
import { EnemyType } from '@/components/entities/Enemy'

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
        position: [-4, 0, 0],
        id: uuidv4(),
      },
      platforms: [
        {
          size: [8, 4, 3],
          position: [-5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-1.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-1.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [0, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '1-2' },
          id: uuidv4(),
        },
      ],
    },
    '1-2': {
      player: {
        position: [0, 5, 0],
        id: uuidv4(),
      },
      rescueGuy: [
        {
          position: [-6.5, -1.5, 0],
          id: uuidv4(),
          actionData: { nextLevel: '2-1' },
        },
      ],
      enemies: [
        {
          position: [-3.5, -0.5, 0],
          id: uuidv4(),
        },
      ],
      platforms: [
        {
          size: [8, 4, 3],
          position: [-5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },

        {
          size: [2, 4, 3],
          position: [-8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [18, 4, 3],
          position: [0, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [0, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '1-1' },
          id: uuidv4(),
        },
      ],
    },
    '2-1': {
      player: {
        position: [-4, 4, 0],
        id: uuidv4(),
      },
      platforms: [
        {
          size: [8, 4, 3],
          position: [-5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-1.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-1.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [0, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-2' },
          id: uuidv4(),
        },
      ],
    },
    '2-2': {
      player: {
        position: [0, 0, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-1.5, -0.5, 0],
          id: uuidv4(),
        },
      ],
      platforms: [
        {
          size: [8, 4, 3],
          position: [-5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-3, 0, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [4, 4, 3],
          position: [-7, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [6.5, 4, 3],
          position: [0, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [4, 4, 3],
          position: [7, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [0, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-1' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-4, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-3' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [4, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-3' },
          id: uuidv4(),
        },
      ],
    },
    '2-3': {
      player: {
        position: [-4, 1, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-2.5, -0.5, 0],
          id: uuidv4(),
        },
      ],
      platforms: [
        {
          size: [4, 4, 3],
          position: [-7, 4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [6.5, 4, 3],
          position: [0, 4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [4, 4, 3],
          position: [7, 4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [4, 4, 3],
          position: [1, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [6, 4, 3],
          position: [-6, -4, 0],
          color: new THREE.Color(0xc1a1e6),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [5.5, -4, 0],
          color: new THREE.Color(0xc1a1e6),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-4, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-2' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [4, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-2' },
          id: uuidv4(),
        },
        {
          size: [6, 1, 3],
          position: [-1, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-4' },
          id: uuidv4(),
        },
      ],
    },
    '2-4': {
      player: {
        position: [0, 0, 0],
        id: uuidv4(),
      },
      rescueGuy: [
        {
          position: [5.5, -1.5, 0],
          id: uuidv4(),
          actionData: { nextLevel: '3-1' },
        },
      ],
      enemies: [
        {
          position: [3, -0.5, 0],
          id: uuidv4(),
        },
      ],
      platforms: [
        {
          size: [6, 4, 3],
          position: [-6, 4, 0],
          color: new THREE.Color(0xc1a1e6),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [5.5, 4, 0],
          color: new THREE.Color(0xc1a1e6),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [18, 4, 3],
          position: [0, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [5, 1, 3],
          position: [-0.5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-3' },
          id: uuidv4(),
        },
      ],
    },
    '3-1': {
      player: {
        position: [-4, 0, 0],
        id: uuidv4(),
      },
      platforms: [
        {
          size: [8, 4, 3],
          position: [-5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-1.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-1.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [0, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-2' },
          id: uuidv4(),
        },
      ],
    },
    '3-2': {
      player: {
        position: [-4, 0, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-2.5, 0.5, 0],
          id: uuidv4(),
          type: EnemyType.Spider,
        },
        {
          position: [0, -2.5, 0],
          id: uuidv4(),
          type: EnemyType.MovingBat,
        },
      ],
      objects: [
        {
          position: [0, 2.5, 0],
          id: uuidv4(),
          type: 'lamp',
        },
      ],
      platforms: [
        {
          size: [8, 4, 3],
          position: [-5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [13, 1, 3],
          position: [-0.5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-3' },
          id: uuidv4(),
        },
      ],
    },
    '3-3': {
      player: {
        position: [0, 1, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-4, -0.5, 0],
          id: uuidv4(),
        },
      ],
      platforms: [
        {
          size: [4, 4, 3],
          position: [-7, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [6.5, 4, 3],
          position: [0, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [4, 4, 3],
          position: [7, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        // {
        //   size: [2, 1, 3],
        //   position: [-4, 6.5, 0],
        //   color: new THREE.Color(0xff016e),
        //   type: 'portal',
        //   actionData: { nextLevel: '2-2' },
        //   id: uuidv4(),
        // },
        // {
        //   size: [2, 1, 3],
        //   position: [4, 6.5, 0],
        //   color: new THREE.Color(0xff016e),
        //   type: 'portal',
        //   actionData: { nextLevel: '2-2' },
        //   id: uuidv4(),
        // },
        // {
        //   size: [6, 1, 3],
        //   position: [-1, -6.5, 0],
        //   color: new THREE.Color(0xff016e),
        //   type: 'portal',
        //   actionData: { nextLevel: '2-4' },
        //   id: uuidv4(),
        // },
      ],
    },
    '3-4': {
      player: {
        position: [-2, 1, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-5, -3, 0],
          id: uuidv4(),
          type: EnemyType.Spider,
        },
        {
          position: [4, -0.5, 0],
          id: uuidv4(),
          type: EnemyType.Bat,
        },
      ],
      objects: [
        {
          position: [4.5, 3.5, 0],
          id: uuidv4(),
          type: 'lamp',
        },
      ],
      platforms: [
        {
          size: [4, 4, 3],
          position: [-7, 4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [6.5, 4, 3],
          position: [0, 4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [4, 4, 3],
          position: [7, 4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [0, 0, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [-7.5, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [9, 4, 3],
          position: [0, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-4, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-3' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [4, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-3' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-5' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-5' },
          id: uuidv4(),
        },
      ],
    },
    '3-5': {
      player: {
        position: [5, 1, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-1.5, -0.5, 0],
          id: uuidv4(),
          type: EnemyType.MovingBat,
        },
      ],
      platforms: [
        {
          size: [3, 4, 3],
          position: [-7.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [9, 4, 3],
          position: [0, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [2, 0, 0],
          color: new THREE.Color(0xf1ccaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [8.5, 0, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [-5.5, -4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, -4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-4' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-4' },
          id: uuidv4(),
        },
        {
          size: [3, 1, 3],
          position: [-0.5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '3-6' },
          id: uuidv4(),
        },
      ],
    },
    '3-6': {
      player: {
        position: [0, 5, 0],
        id: uuidv4(),
      },
      rescueGuy: [
        {
          position: [-6.5, -1.5, 0],
          id: uuidv4(),
          actionData: { nextLevel: '2-1' },
        },
      ],
      enemies: [
        {
          position: [-3.5, -0.5, 0],
          id: uuidv4(),
          type: EnemyType.MovingBat,
        },
      ],
      platforms: [
        {
          size: [7, 4, 3],
          position: [-5.5, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },

        {
          size: [2, 4, 3],
          position: [-8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [18, 4, 3],
          position: [0, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [3, 1, 3],
          position: [-0.5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '1-1' },
          id: uuidv4(),
        },
      ],
    },
    '4-1': {
      player: {
        position: [-4, 0, 0],
        id: uuidv4(),
      },
      platforms: [
        {
          size: [8, 4, 3],
          position: [-5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-1.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-1.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [0, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '1-2' },
          id: uuidv4(),
        },
      ],
    },
    '4-2': {
      player: {
        position: [-4, 0, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [3, 0, 0],
          id: uuidv4(),
          type: EnemyType.Spider,
        },
      ],
      objects: [
        {
          position: [0.5, 3.5, 0],
          id: uuidv4(),
          type: 'lamp',
        },
      ],
      platforms: [
        {
          size: [8, 4, 3],
          position: [-5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8, 4, 3],
          position: [5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [10, 4, 3],
          position: [-0.5, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [0, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-1' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-6, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-3' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-3' },
          id: uuidv4(),
        },
      ],
    },
    '4-3': {
      player: {
        position: [-6, 0, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [4.5, 0, 0],
          id: uuidv4(),
          type: EnemyType.Spider,
        },
      ],
      objects: [
        {
          position: [-6, 3.5, 0],
          id: uuidv4(),
          type: 'lamp',
        },
      ],
      platforms: [
        {
          size: [2, 4, 3],
          position: [-8, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [10, 4, 3],
          position: [-0.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8.5, 4, 3],
          position: [-0.5, 0, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [-7.5, -4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [-0.5, -4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, -4, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-6.5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-2' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-2' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-4' },
          id: uuidv4(),
        },
        {
          size: [3, 1, 3],
          position: [4.5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-4' },
          id: uuidv4(),
        },
      ],
    },
    '4-4': {
      player: {
        position: [-4, 0, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-6, -4, 0],
          id: uuidv4(),
          type: EnemyType.Spider,
        },
        {
          position: [2.3, 0, 0],
          id: uuidv4(),
          type: EnemyType.Snake,
        },
      ],
      objects: [
        {
          position: [-4.5, 3.5, 0],
          id: uuidv4(),
          type: 'lamp',
        },
      ],
      platforms: [
        {
          size: [3, 4, 3],
          position: [-7.5, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [-0.5, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 0, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [6, 4, 3],
          position: [-0.5, 0, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 0, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8.5, 4, 3],
          position: [-0.5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-3' },
          id: uuidv4(),
        },
        {
          size: [3, 1, 3],
          position: [4.5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-3' },
          id: uuidv4(),
        },
        {
          size: [4, 1, 3],
          position: [-6, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-5' },
          id: uuidv4(),
        },
        {
          size: [4, 1, 3],
          position: [5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-5' },
          id: uuidv4(),
        },
      ],
    },
    '4-5': {
      player: {
        position: [-4, 0, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-5, -4, 0],
          id: uuidv4(),
          type: EnemyType.MovingBat,
        },
      ],
      objects: [
        {
          position: [-5, 3.5, 0],
          id: uuidv4(),
          type: 'lamp',
        },
      ],
      platforms: [
        {
          size: [1, 4, 3],
          position: [-8.5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [8.5, 4, 3],
          position: [-0.5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [3, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [-5.5, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [5.5, -4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [4, 1, 3],
          position: [-6, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-4' },
          id: uuidv4(),
        },
        {
          size: [4, 1, 3],
          position: [5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-4' },
          id: uuidv4(),
        },
        {
          size: [4, 1, 3],
          position: [0, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-6' },
          id: uuidv4(),
        },
      ],
    },
    '4-6': {
      player: {
        position: [-4, 0, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [-1, -4, 0],
          id: uuidv4(),
          type: EnemyType.Spider,
        },
      ],
      objects: [
        {
          position: [1.5, 3.5, 0],
          id: uuidv4(),
          type: 'lamp',
        },
      ],
      platforms: [
        {
          size: [7, 4, 3],
          position: [-5.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [5.5, 4, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-3.5, 0, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, -4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [10, 4, 3],
          position: [-0.5, -4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, -4, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [4, 1, 3],
          position: [0, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-5' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-6, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-7' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [5.5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-7' },
          id: uuidv4(),
        },
      ],
    },
    '4-7': {
      player: {
        position: [-7, 0, 0],
        id: uuidv4(),
      },
      enemies: [
        {
          position: [5.5, 0.5, 0],
          id: uuidv4(),
          type: EnemyType.Spider,
        },
        {
          position: [0, -2.5, 0],
          id: uuidv4(),
          type: EnemyType.Bat,
        },
      ],
      objects: [
        {
          position: [5.5, 3.5, 0],
          id: uuidv4(),
          type: 'lamp',
        },
      ],
      platforms: [
        {
          size: [2, 4, 3],
          position: [-8, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [10, 4, 3],
          position: [-0.5, 4, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [3, 4, 3],
          position: [7.5, 4, 0],
          color: new THREE.Color(0x0accaa),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-8.5, 0, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [1, 4, 3],
          position: [-4, 0, 0],
          color: new THREE.Color(0x0acc00),
          type: 'explodable',
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0acc00),
          id: uuidv4(),
        },
        {
          size: [6, 4, 3],
          position: [-6, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [5.5, -4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [-6, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-8' },
          id: uuidv4(),
        },
        {
          size: [2, 1, 3],
          position: [5.5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-8' },
          id: uuidv4(),
        },
        {
          size: [5, 1, 3],
          position: [-0.5, -6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '4-8' },
          id: uuidv4(),
        },
      ],
    },
    '4-8': {
      player: {
        position: [-0.5, 3, 0],
        id: uuidv4(),
      },
      rescueGuy: [
        {
          position: [6.5, -1.5, 0],
          id: uuidv4(),
          actionData: { nextLevel: '3-1' },
        },
      ],
      enemies: [
        {
          position: [0, 0.5, 0],
          id: uuidv4(),
          type: EnemyType.Snake,
        },
      ],
      platforms: [
        {
          size: [6, 4, 3],
          position: [-6, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [7, 4, 3],
          position: [5.5, 4, 0],
          color: new THREE.Color(0xc60ee2),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [-8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [1.5, 4, 3],
          position: [-0.5, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [2, 4, 3],
          position: [8, 0, 0],
          color: new THREE.Color(0x0accaa),
          id: uuidv4(),
        },
        {
          size: [18, 4, 3],
          position: [0, -4, 0],
          color: new THREE.Color(0xf1ccaa),
          id: uuidv4(),
        },
        {
          size: [5, 1, 3],
          position: [-0.5, 6.5, 0],
          color: new THREE.Color(0xff016e),
          type: 'portal',
          actionData: { nextLevel: '2-3' },
          id: uuidv4(),
        },
      ],
    },
  }

  return <BaseLevel levelData={levelData} />
}
