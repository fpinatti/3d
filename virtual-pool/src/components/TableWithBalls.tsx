// import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from 'react'
import { useDrag } from '@use-gesture/react'
import Ball, { BallOwner } from './Ball'
import Table from './Table'
import { Vector3 } from 'three'
import WhiteBall from '../assets/ball_white.jpg'
import Ball1 from '../assets/ball_1.jpg'
import Ball2 from '../assets/ball_2.jpg'
import Ball3 from '../assets/ball_3.jpg'
import Ball4 from '../assets/ball_4.jpg'
import Ball5 from '../assets/ball_5.jpg'
import Ball6 from '../assets/ball_6.jpg'
import Ball7 from '../assets/ball_7.jpg'
import Ball8 from '../assets/ball_8.jpg'
import Ball9 from '../assets/ball_9.jpg'
import Ball10 from '../assets/ball_10.jpg'
import Ball11 from '../assets/ball_11.jpg'
import Ball12 from '../assets/ball_12.jpg'
import Ball13 from '../assets/ball_13.jpg'
import Ball14 from '../assets/ball_14.jpg'
import Ball15 from '../assets/ball_15.jpg'
import { Stage } from '@react-three/drei'
import { useDispatch, useSelector } from 'react-redux'
import { gameStatus } from '../store/slices/gameSlice.js'
import BallEffect from './BallEffect'

let ballDirection: Vector3

const TableWithBalls = () => {
  const whiteBall = useRef(null)
  const ballY = 3.8

  const [ballPositions, setBallPositions] = useState([])
  const [ballEffect, setBallEffect] = useState(false)

  const gameState = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const ballSize = 0.3
  const ballSpacing = 0.2

  // on reset game
  if (gameState === 'reset') {
    dispatch(gameStatus('playing'))
  }

  useEffect(() => {
    setBallPositions([
      {
        id: 1,
        position: [-3, ballY, 0],
        texture: WhiteBall,
        type: BallOwner.Player,
      },
      {
        id: 2,
        position: [ballSize * 13 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * 0.5],
        texture: Ball1,
        type: BallOwner.CPU,
      },
      {
        id: 3,
        position: [ballSize * 14 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * 0.5],
        texture: Ball2,
        type: BallOwner.CPU,
      },
      {
        id: 4,
        position: [ballSize * 14 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * -0.5],
        texture: Ball3,
        type: BallOwner.CPU,
      },
      {
        id: 5,
        position: [ballSize * 15 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * -1],
        texture: Ball4,
        type: BallOwner.CPU,
      },
      {
        id: 6,
        position: [ballSize * 15 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * 1],
        texture: Ball5,
        type: BallOwner.CPU,
      },
      {
        id: 7,
        position: [ballSize * 15 - ballSpacing * 1.5, ballY, 0],
        texture: Ball6,
        type: BallOwner.CPU,
      },
      {
        id: 8,
        position: [ballSize * 16 - ballSpacing, ballY, (ballSize + ballSpacing) * -0.5],
        texture: Ball7,
        type: BallOwner.CPU,
      },
      {
        id: 9,
        position: [ballSize * 16 - ballSpacing, ballY, (ballSize + ballSpacing) * -1.5],
        texture: Ball8,
        type: BallOwner.CPU,
      },
      {
        id: 10,
        position: [ballSize * 16 - ballSpacing, ballY, (ballSize + ballSpacing) * 1.5],
        texture: Ball9,
        type: BallOwner.CPU,
      },
      {
        id: 11,
        position: [ballSize * 16 - ballSpacing, ballY, (ballSize + ballSpacing) * 0.5],
        texture: Ball10,
        type: BallOwner.CPU,
      },
      {
        id: 12,
        position: [ballSize * 17, ballY, (ballSize + ballSpacing) * -2],
        texture: Ball11,
        type: BallOwner.CPU,
      },
      {
        id: 13,
        position: [ballSize * 17, ballY, -ballSize - ballSpacing],
        texture: Ball12,
        type: BallOwner.CPU,
      },
      {
        id: 14,
        position: [ballSize * 17, ballY, 0],
        texture: Ball13,
        type: BallOwner.CPU,
      },
      {
        id: 15,
        position: [ballSize * 17, ballY, ballSize + ballSpacing],
        texture: Ball14,
        type: BallOwner.CPU,
      },
      {
        id: 16,
        position: [ballSize * 17, ballY, (ballSize + ballSpacing) * 2],
        texture: Ball15,
        type: BallOwner.CPU,
      },
    ])
  }, [])

  const shootBall = (fxX, fxY) => {
    // console.log(fxX, fxY)
    setBallEffect(false)
    whiteBall.current.applyTorqueImpulse({ x: 0, y: fxX, z: fxY }, true)
    ballDirection.y = 0
    whiteBall.current.applyImpulse(ballDirection, true)
  }

  const clickTable = (evt) => {
    const direction = new Vector3()
    const calcDirection = direction.subVectors(evt.point, whiteBall.current.translation())
    const force = Math.max(calcDirection.length() * 0.3, 2)
    ballDirection = calcDirection.normalize().multiplyScalar(force)
    setBallEffect(true)
  }

  return (
    <>
      {ballEffect && <BallEffect onShootBall={shootBall} />}
      <Stage adjustCamera intensity={0.4} shadows="contact" environment="apartment" preset={'rembrandt'}>
        {ballPositions.map((element) => {
          return (
            gameState === 'playing' && (
              <Ball
                key={element.id}
                propRef={element.type === BallOwner.Player ? whiteBall : null}
                size={[0.2]}
                position={element.position}
                material={element.material}
                type={element.type}
                idx={element.id}
                texture={element.texture}
              />
            )
          )
        })}
        <Table clickTable={clickTable} position={[0, 0, 0]} />
      </Stage>
    </>
  )
}

export default TableWithBalls
