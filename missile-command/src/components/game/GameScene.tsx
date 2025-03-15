'use client'

import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { City } from '../city'
import { Missile } from '../missile'
import { useGameLogic } from './hooks/useGameLogic'
import { Defense } from '../defense'

interface GameSceneProps {
  level: number
  onScoreUpdate: (points: number) => void
  onGameOver: () => void
  onNextLevel: () => void
}

export function GameScene({ level, onScoreUpdate, onGameOver, onNextLevel }: GameSceneProps) {
  const { cities, setMissiles, missiles, setDefenses, defenses, handleClick, updateGame } =
    useGameLogic({
      level,
      onScoreUpdate,
      onGameOver,
      onNextLevel,
    })

  // Game loop
  useFrame((_, delta) => {
    updateGame(delta)
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Ground */}
      <RigidBody type="fixed" name="ground">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.5, 0]}>
          <planeGeometry args={[50, 30]} />
          <meshStandardMaterial color="#3a7e4c" />
        </mesh>
      </RigidBody>

      {/* Cities */}
      {cities.map((city) => (
        <City key={city.id} position={city.position} />
      ))}

      {/* Missile Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Enemy Missiles */}
      {missiles.map((missile) => (
        <Missile
          key={missile.id}
          id={missile.id}
          position={missile.position}
          target={missile.target}
          isEnemy={true}
          onCompleteProjectile={() => {
            // Remove the enemy missile
            setMissiles((prev) => prev.filter((m) => m.id !== missile.id))
          }}
        />
      ))}

      {/* Defense Missiles */}
      {defenses.map((defense) => (
        <Defense
          key={defense.id}
          position={defense.position}
          target={defense.target}
          onCompleteProjectile={() => {
            // Remove the defense missile
            setDefenses((prev) => prev.filter((d) => d.id !== defense.id))
          }}
          onCollideWithEnemy={(missileId) => {
            // Remove the defense missile
            setMissiles((prev) => prev.filter((m) => m.id !== missileId))
            // setMissiles((prev) => prev.filter((d) => d.id !== defense.id))
            // setDefenses((prev) => prev.filter((d) => d.id !== defense.id))
          }}
        />
      ))}

      {/* Click handler for firing defense missiles */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        // visible={false}
      >
        <boxGeometry args={[50, 1, 40]} />
        <meshBasicMaterial transparent opacity={0.1} />
      </mesh>
    </>
  )
}
