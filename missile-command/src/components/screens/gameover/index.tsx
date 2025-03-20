import useGameStore from '@/store/useGameStore'
import { Text, Plane } from '@react-three/drei'

const GameOver = () => {
  const { startGame } = useGameStore()
  const restartGame = () => {
    // Reset game state
    startGame()
  }
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
        GAME OVER
      </Text>

      {/* Start button */}
      <group position={[0, -1, 0]} onClick={restartGame}>
        <Plane args={[4, 1]} position={[0, 0, -0.1]}>
          <meshBasicMaterial color="#ff4444" />
        </Plane>
        <Text position={[0, 0, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          RESTART
        </Text>
      </group>
    </group>
  )
}

export default GameOver
