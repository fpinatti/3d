// import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from 'react'
import Ball, { BallOwner } from './Ball'
import Table from './Table'
import { Vector3 } from 'three'

const TableWithBalls = ({ position, size }) => {
  const whiteBall = useRef(null)
  const ballY = 3.8

  console.log('render table with balls')

  const [ballPositions, setBallPositions] = useState([])
  const [ballInHole, setBallInHole] = useState()

  const ballSize = 0.3
  const ballSpacing = 0.2

  useEffect(() => {
    setBallPositions([
      {
        id: 1,
        position: [-3, ballY, 0],
        material: 'white',
        type: BallOwner.Player,
      },
      {
        id: 2,
        position: [ballSize * 13 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * 0.5],
        material: 'red',
        type: BallOwner.CPU,
      },
      {
        id: 3,
        position: [ballSize * 14 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * 0.5],
        material: 'yellow',
        type: BallOwner.CPU,
      },
      {
        id: 4,
        position: [ballSize * 14 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * -0.5],
        material: 'blue',
        type: BallOwner.CPU,
      },
      {
        id: 5,
        position: [ballSize * 15 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * -1],
        material: 'orange',
        type: BallOwner.CPU,
      },
      {
        id: 6,
        position: [ballSize * 15 - ballSpacing * 1.5, ballY, (ballSize + ballSpacing) * 1],
        material: 'purple',
        type: BallOwner.CPU,
      },
      {
        id: 7,
        position: [ballSize * 15 - ballSpacing * 1.5, ballY, 0],
        material: 'red',
        type: BallOwner.CPU,
      },
      {
        id: 8,
        position: [ballSize * 16 - ballSpacing, ballY, (ballSize + ballSpacing) * -0.5],
        material: 'black',
        type: BallOwner.CPU,
      },
      {
        id: 9,
        position: [ballSize * 16 - ballSpacing, ballY, (ballSize + ballSpacing) * -1.5],
        material: 'pink',
        type: BallOwner.CPU,
      },
      {
        id: 10,
        position: [ballSize * 16 - ballSpacing, ballY, (ballSize + ballSpacing) * 1.5],
        material: 'blue',
        type: BallOwner.CPU,
      },
      {
        id: 11,
        position: [ballSize * 16 - ballSpacing, ballY, (ballSize + ballSpacing) * 0.5],
        material: 'yellow',
        type: BallOwner.CPU,
      },
      {
        id: 12,
        position: [ballSize * 17, ballY, (ballSize + ballSpacing) * -2],
        material: 'blue',
        type: BallOwner.CPU,
      },
      {
        id: 13,
        position: [ballSize * 17, ballY, -ballSize - ballSpacing],
        material: 'darkgreen',
        type: BallOwner.CPU,
      },
      {
        id: 14,
        position: [ballSize * 17, ballY, 0],
        material: 'blue',
        type: BallOwner.CPU,
      },
      {
        id: 15,
        position: [ballSize * 17, ballY, ballSize + ballSpacing],
        material: 'green',
        type: BallOwner.CPU,
      },
      {
        id: 16,
        position: [ballSize * 17, ballY, (ballSize + ballSpacing) * 2],
        material: 'yellow',
        type: BallOwner.CPU,
      },
    ])
  }, [])

  const shootBall = (vecDirection) => {
    whiteBall.current.applyImpulse(vecDirection, true)
  }

  const clickTable = (evt) => {
    const direction = new Vector3()
    const calcDirection = direction.subVectors(evt.point, whiteBall.current.translation())
    shootBall(calcDirection)
  }

  return (
    <>
      {ballPositions.map((element, index) => {
        return (
          <Ball
            key={element.id}
            propRef={element.type === BallOwner.Player ? whiteBall : null}
            size={[0.2]}
            position={element.position}
            material={element.material}
            type={element.type}
            idx={element.id}
          />
        )
      })}
      <Table clickTable={clickTable} position={[0, 0, 0]} />
    </>
  )
}

export default TableWithBalls
