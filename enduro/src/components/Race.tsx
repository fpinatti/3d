// import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from 'react'
import { useDrag } from '@use-gesture/react'
import Ball, { BallOwner } from './Player'
import Table from './Road'
import { Vector3 } from 'three'
import { Cylinder, Stage } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import { gameStatus } from '../store/slices/gameSlice.js'
import Player from './Player'
import Road from './Road'
import Enemy from './Enemy'

// const roadBlocks = [...Array(30)]

const Race = ({ joystickPos }) => {
  // on reset game
  //   if (gameState === 'reset') {
  //     dispatch(gameStatus('playing'))
  //   }

  const blocksRoad = [
    { pos: [0, 0, 0] },
    { pos: [0, 0, 1] },
    { pos: [0, 0, 2] },
    { pos: [0, 0, 3] },
    { pos: [0, 0, 4] },
    { pos: [-1, 0, 4] },
    { pos: [-2, 0, 4] },
    { pos: [-3, 0, 4] },
    { pos: [-4, 0, 4] },
    { pos: [-4, 0, 3] },
    { pos: [-4, 0, 2] },
    { pos: [-4, 0, 1] },
    { pos: [-4, 0, 0] },
    { pos: [-3, 0, 0] },
    { pos: [-2, 0, 0] },
    { pos: [-1, 0, 0] },
  ]

  return (
    <>
      <Stage adjustCamera={false} intensity={0.4} environment="city" preset={'rembrandt'}>
        {blocksRoad.map((element, index) => {
          return <Road key={index} position={element.pos} />
        })}

        <Player joystickPos={joystickPos} />
        <Enemy
          speed={2}
          path={[
            { position: { x: 0, y: 0.3, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            { position: { z: 7.5 }, rotation: { y: Math.PI * -0.51 } },
            { position: { x: -16.5 }, rotation: { y: Math.PI * 0.98 } },
            { position: { z: -0.5 }, rotation: { y: Math.PI * 0.5 } },
            { position: { x: 0.1 }, rotation: { y: 0.01 } },
          ]}
        />
        <Enemy
          speed={1}
          path={[
            { position: { x: 2, y: 0.3, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            { position: { z: 8.5 }, rotation: { y: Math.PI * -0.51 } },
            { position: { x: -15.5 }, rotation: { y: Math.PI * 0.98 } },
            { position: { z: 0.6 }, rotation: { y: Math.PI * 0.5 } },
            { position: { x: 2 }, rotation: { y: 0.01 } },
          ]}
        />
        {/* <mesh position={[0, 2, 0]}>
          <boxGeometry args={[3, 1, 1]} />
          <meshStandardMaterial color={'yellow'} />
        </mesh> */}
      </Stage>
    </>
  )
}

export default Race
