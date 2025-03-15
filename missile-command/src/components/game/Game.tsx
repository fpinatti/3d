'use client'

import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense, useState } from 'react'
import { GameScene } from './GameScene'
import { OrbitControls } from '@react-three/drei'
import GameOver from './components/gameover'
import GameUi from './components/ui'

export default function Game() {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [showCollisionTest, setShowCollisionTest] = useState(true)

  const handleScoreUpdate = (points: number) => {
    setScore((prev) => prev + points)
  }

  const handleGameOver = () => {
    setGameOver(true)
  }

  const handleNextLevel = () => {
    setLevel((prev) => prev + 1)
  }

  const restartGame = () => {
    setScore(0)
    setLevel(1)
    setGameOver(false)
  }

  return (
    <div className="w-full h-screen relative">
      {/* Game UI */}
      <GameUi score={score} level={level} />

      {/* Game Over Screen */}
      {gameOver && <GameOver restartGame={restartGame} score={score} />}

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 15, 20], fov: 50 }}>
        <Suspense fallback={null}>
          <Physics debug>
            <GameScene
              level={level}
              onScoreUpdate={handleScoreUpdate}
              onGameOver={handleGameOver}
              onNextLevel={handleNextLevel}
            />
            <OrbitControls />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}
