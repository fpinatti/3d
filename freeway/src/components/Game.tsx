// import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDrag } from '@use-gesture/react'
import Ball, { BallOwner } from './Player'
import Table from './Road'
import { RepeatWrapping, Wrapping, Vector3, ClampToEdgeWrapping } from 'three'
import { Cylinder, Stage, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import { gameStatus } from '../store/slices/gameSlice.js'
import Player from './Player'
import Road from './Road'
import Enemy from './Enemy'
import ScoreBoard from './ScoreBoard'
import asphaltTexture from '../assets/asphalt-road.jpg'
import brickTexture from '../assets/floor.jpg'
import car1 from '../assets/ambulance.glb'
import car2 from '../assets/delivery.glb'
import car3 from '../assets/delivery-flat.glb'
import car4 from '../assets/hatchback-sports.glb'
import car5 from '../assets/suv-luxury.glb'
import car6 from '../assets/taxi.glb'
import building1 from '../assets/large_buildingB.glb'
import building2 from '../assets/large_buildingD.glb'
import building3 from '../assets/low_buildingC.glb'
import building4 from '../assets/low_wideA.glb'
import cloud from '../assets/cloud.glb'
import Scenery from './Scenery'

// const roadBlocks = [...Array(30)]

const Game = () => {
  const car1Model = useGLTF(car1)
  const car2Model = useGLTF(car2)
  const car3Model = useGLTF(car3)
  const car4Model = useGLTF(car4)
  const car5Model = useGLTF(car5)
  const car6Model = useGLTF(car6)

  const building1Model = useGLTF(building1)
  const building2Model = useGLTF(building2)
  const building3Model = useGLTF(building3)
  const building4Model = useGLTF(building4)

  const cloudModel = useGLTF(cloud)

  const asphalt = useTexture(asphaltTexture)
  const brick = useTexture(brickTexture)
  //   asphalt.wrapS = RepeatWrapping
  //   asphalt.wrapT = RepeatWrapping
  brick.repeat.set(0.3, 0.3)
  asphalt.repeat.set(0.11, 1)

  const gameState = useSelector((state) => state.game)

  //   asphalt.offset.x = 0
  //   asphalt.offset.y = 0
  // const [texture1, texture2] = useTexture([texture1, texture2])
  // on reset game
  //   if (gameState === 'reset') {
  //     dispatch(gameStatus('playing'))
  //   }
  //   console.log(car1Model)
  const enemyBlocks = useMemo(() => {
    return [
      <Enemy type={car1Model} key={0} speed={3} position={[13, 0.3, -18]} />,
      <Enemy type={car2Model} key={1} speed={3} keepDistance={-7} position={[18, 0.3, -18]} />,
      <Enemy type={car1Model} key={2} speed={4} position={[13, 0.3, -16]} />,
      <Enemy type={car3Model} key={3} speed={4} keepDistance={-8} position={[20, 0.3, -16]} />,
      <Enemy type={car4Model} key={4} speed={4} keepDistance={-31} position={[43, 0.3, -16]} />,
      <Enemy type={car5Model} key={5} speed={2} position={[12, 0.3, -14]} />,
      <Enemy type={car6Model} key={6} speed={2} keepDistance={-13} position={[22, 0.3, -14]} />,
      <Enemy type={car6Model} key={7} speed={4} position={[9, 0.3, -12]} />,
      <Enemy type={car4Model} key={8} speed={6} position={[9, 0.3, -12]} />,
      <Enemy type={car6Model} key={9} speed={3} position={[8, 0.3, -10]} />,
      <Enemy type={car2Model} key={10} speed={3} position={[-8, 0.3, -8]} />,
      <Enemy type={car6Model} key={11} speed={6} position={[-10, 0.3, -6]} />,
      <Enemy type={car1Model} key={12} speed={5} position={[-13, 0.3, -4]} />,
      <Enemy type={car5Model} key={13} speed={5} keepDistance={6} position={[-16, 0.3, -4]} />,
      <Enemy type={car1Model} key={14} speed={12} keepDistance={6} position={[-20, 0.3, -4]} />,
      <Enemy type={car2Model} key={15} speed={8} keepDistance={12} position={[-20, 0.3, -4]} />,
      <Enemy type={car1Model} key={16} speed={6} position={[-11, 0.3, -2]} />,
      <Enemy type={car3Model} key={17} speed={4.5} keepDistance={8} position={[-13, 0.3, -2]} />,
      <Enemy type={car5Model} key={18} speed={2.6} position={[-5, 0.3, 0]} />,
    ]
  }, [])

  return (
    <>
      <Stage adjustCamera={false} intensity={0.3}>
        <Road tex={brick} position={[0, 0, -10]} color={'gold'} type={'win'} />
        <Road tex={asphalt} position={[0, 0, -9]} color={'blue'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, -8]} color={'grey'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, -7]} color={'blue'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, -6]} color={'fuchsia'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, -5]} color={'blue'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, -4]} color={'yellow'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, -3]} color={'blue'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, -2]} color={'darkgreen'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, -1]} color={'blue'} type={'ground'} />
        <Road tex={asphalt} position={[0, 0, 0]} color={'pink'} type={'ground'} />
        <Road tex={brick} position={[0, 0, 1]} color={'brown'} type={'ground'} />
        <Scenery model={building1Model} rotation={[0, Math.PI * 0.25, 0]} position={[-4, 0.2, -20.5]} scale={2} />
        <Scenery model={building2Model} rotation={[0, Math.PI * -0.25, 0]} position={[-1.7, 0.2, -20.9]} scale={2} />
        <Scenery model={building3Model} rotation={[0, Math.PI * 0.25, 0]} position={[0.4, 0.2, -20.6]} scale={3} />
        <Scenery model={building1Model} rotation={[0, Math.PI * -0.25, 0]} position={[2, 0.2, -20.5]} scale={2} />
        <Scenery model={building4Model} rotation={[0, Math.PI * 0.25, 0]} position={[4, 0.2, -20.3]} scale={2} />
        <Scenery model={building2Model} rotation={[0, Math.PI * -0.25, 0]} position={[6.7, 0.2, -20.9]} scale={2} />
        <Scenery model={building4Model} rotation={[0, Math.PI * 0.25, 0]} position={[-6, 0.2, -20.3]} scale={2} />
        <Scenery model={building2Model} rotation={[0, Math.PI * -0.25, 0]} position={[-8, 0.2, -20.9]} scale={3} />
        <Scenery model={building2Model} rotation={[0, Math.PI * 0.25, 0]} position={[6.7, 0.2, -20.9]} scale={2.5} />
        <Scenery model={building4Model} rotation={[0, Math.PI * -0.75, 0]} position={[9.5, 0.2, -20.3]} scale={2} />
        {gameState === 'playing' && (
          <>
            {enemyBlocks.map((element, index) => {
              return element
            })}
          </>
        )}
        {/* clouds */}
        <Player />
        <Scenery model={cloudModel} rotation={[0, 0, 0]} position={[-3, 8, -20]} scale={2} />
        <Scenery model={cloudModel} rotation={[0, 0, 0]} position={[4, 7, -21]} scale={2} />
        <Scenery model={cloudModel} rotation={[0, 0, 0]} position={[-5, 5.5, -19]} scale={2} />
      </Stage>
    </>
  )
}

export default Game
