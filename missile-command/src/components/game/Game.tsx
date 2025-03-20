'use client'

import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense, useEffect } from 'react'
import { GameScene } from './GameScene'
import GameOver from '../screens/gameover'
import GameUi from './components/ui'
import { GameCamera } from './components/GameCamera'
import useGameStore from '../../store/useGameStore'
import StartScreen from '../screens/start'

export default function Game() {
  // Get state and actions from the store
  const { status, level, updateScore, endGame, nextLevel } = useGameStore()

  // Initialize the game when component mounts
  useEffect(() => {
    // startGame()
  }, [])

  // Handle score updates
  const handleScoreUpdate = (points: number) => {
    updateScore(points)
  }

  // Handle game over
  const handleGameOver = () => {
    endGame()
  }

  return (
    <div className="w-full h-screen relative">
      {/* Game UI */}
      {/* 3D Canvas */}
      <Canvas shadows>
        <Suspense fallback={null}>
          <GameUi />
          {/* Game Over Screen */}
          {status === 'game_over' && <GameOver />}
          {/* Init Screen */}
          {status === 'not_initialized' && <StartScreen />}
          <Physics debug>
            {status === 'playing' && (
              <>
                <GameCamera initialPosition={[0, 1, 7]} />
                <GameScene
                  level={level}
                  onScoreUpdate={handleScoreUpdate}
                  onGameOver={handleGameOver}
                  onNextLevel={nextLevel}
                />
              </>
            )}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}
