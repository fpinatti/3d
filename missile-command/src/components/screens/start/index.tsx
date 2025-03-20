import React,   from 'react'
import { Text, Plane } from '@react-three/drei'
import useGameStore from '../../../store/useGameStore'

const StartScreen = () => {
  const { startGame } = useGameStore()

  return (
    <group position={[0, 0, -5]}>
      {/* Background overlay */}
      <Plane args={[30, 20]} position={[0, 0, -1]}>
        <meshBasicMaterial color="yellow" transparent opacity={0.7} />
      </Plane>

      {/* Game title */}
      <Text
        // ref={titleRef}
        position={[0, 2, 0]}
        fontSize={1.5}
        color="#ff4444"
        // font="/fonts/Orbitron-Bold.ttf"
        anchorX="center"
        anchorY="middle"
      >
        MISSILE COMMAND
      </Text>

      {/* Game instructions */}
      <Text position={[0, 0.5, 0]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
        Defend your cities from incoming missiles!
      </Text>

      <Text position={[0, 0, 0]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
        Click to launch counter-missiles and save humanity.
      </Text>

      {/* Start button */}
      <group position={[0, -1, 0]} onClick={startGame}>
        <Plane args={[4, 1]} position={[0, 0, -0.1]}>
          <meshBasicMaterial color="#ff4444" />
        </Plane>
        <Text position={[0, 0, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          START GAME
        </Text>
      </group>
    </group>
  )
}

export default StartScreen
