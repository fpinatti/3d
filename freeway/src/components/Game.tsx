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

const Game = () => {
  // on reset game
  //   if (gameState === 'reset') {
  //     dispatch(gameStatus('playing'))
  //   }
  const enemyBlocks = [
    <Enemy key={0} speed={0.7} position={[8, 0.3, -18]} />,
    <Enemy key={1} speed={0.7} keepDistance={-6} position={[13, 0.3, -18]} />,
    <Enemy key={2} speed={3} position={[10, 0.3, -16]} />,
    <Enemy key={3} speed={3} keepDistance={-6} position={[14, 0.3, -16]} />,
    <Enemy key={4} speed={3} keepDistance={-10} position={[16, 0.3, -16]} />,
    <Enemy key={5} speed={2} position={[8, 0.3, -14]} />,
    <Enemy key={6} speed={2} keepDistance={-13} position={[18, 0.3, -14]} />,
    <Enemy key={7} speed={2} position={[6, 0.3, -12]} />,
    <Enemy key={8} speed={3} position={[6, 0.3, -12]} />,
    <Enemy key={9} speed={2} position={[5, 0.3, -10]} />,
    <Enemy key={10} speed={1} position={[-5, 0.3, -8]} />,
    <Enemy key={11} speed={2} position={[-5, 0.3, -6]} />,
    <Enemy key={12} speed={4} position={[-9, 0.3, -4]} />,
    <Enemy key={13} speed={4} position={[-9, 0.3, -4]} />,
    <Enemy key={14} speed={4} keepDistance={6} position={[-13, 0.3, -4]} />,
    <Enemy key={15} speed={4} keepDistance={12} position={[-17, 0.3, -4]} />,
    <Enemy key={16} speed={1.6} position={[-7, 0.3, -2]} />,
    <Enemy key={17} speed={1.6} keepDistance={4} position={[-9, 0.3, -2]} />,
    <Enemy key={18} speed={2} position={[-5, 0.3, 0]} />,
  ]

  return (
    <>
      <Stage adjustCamera={false} intensity={0.4} environment="city" preset={'rembrandt'}>
        {enemyBlocks.map((element, index) => {
          return element
        })}
        <Road position={[0, 0, -10]} color={'gold'} />
        <Road position={[0, 0, -9]} color={'blue'} />
        <Road position={[0, 0, -8]} color={'grey'} />
        <Road position={[0, 0, -7]} color={'blue'} />
        <Road position={[0, 0, -6]} color={'fuchsia'} />
        <Road position={[0, 0, -5]} color={'blue'} />
        <Road position={[0, 0, -4]} color={'yellow'} />
        <Road position={[0, 0, -3]} color={'blue'} />
        <Road position={[0, 0, -2]} color={'darkgreen'} />
        <Road position={[0, 0, -1]} color={'blue'} />
        <Road position={[0, 0, 0]} color={'pink'} />
        <Road position={[0, 0, 1]} color={'brown'} />
        <Player />
      </Stage>
    </>
  )
}

export default Game
