// import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from 'react'
import Ball, { BallOwner } from './Ball'
import Table from './Table'
import { Vector3 } from 'three'

const TableWithBalls = ({ position, size }) => {
  const whiteBall = useRef(null)
  const ballY = 4.5

  console.log('render table with balls')

  const [ballPositions, setBallPositions] = useState([])
  const [ballInHole, setBallInHole] = useState()

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
        position: [3, ballY, 0],
        material: 'red',
        type: BallOwner.CPU,
      },
      {
        id: 3,
        position: [3.5, ballY, 0.5],
        material: 'yellow',
        type: BallOwner.CPU,
      },
      {
        id: 4,
        position: [3.5, ballY, -0.5],
        material: 'blue',
        type: BallOwner.CPU,
      },
      {
        id: 5,
        position: [4, ballY, 1],
        material: 'orange',
        type: BallOwner.CPU,
      },
      {
        id: 6,
        position: [4, ballY, -1],
        material: 'purple',
        type: BallOwner.CPU,
      },
      {
        id: 7,
        position: [4, ballY, 0],
        material: 'blue',
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
            size={[1]}
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
