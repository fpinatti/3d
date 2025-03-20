import { useState, useEffect } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import useGameStore from '@/store/useGameStore'
import { Position3D } from '@/types/global'
import { MissileProps } from '@/components/missile'
import { ExplosionProps } from '@/components/explosion'
import { DefenseProps } from '@/components/defense'

export function useGameLogic({
  level,
}: {
  level: number
  onScoreUpdate: (points: number) => void
  onGameOver: () => void
  onNextLevel: () => void
}) {
  const { defensesLeft, setCities, setDefensesLeft } = useGameStore()

  const [missiles, setMissiles] = useState<MissileProps[]>([])
  const [explosions, setExplosions] = useState<ExplosionProps[]>([])
  const [defenses, setDefenses] = useState<DefenseProps[]>([])

  // const [defensesLeft, setDefensesLeft] = useState(defensesLeft)
  const [enemyMissilesDestroyed, setEnemyMissilesDestroyed] = useState(0)
  const [enemyMissilesTotal, setEnemyMissilesTotal] = useState(level * 5)

  let currentCities = useGameStore.getState().cities

  // Initialize level
  useEffect(() => {
    // Reset game state for new level
    setMissiles([])
    setExplosions([])
    setEnemyMissilesDestroyed(0)
    setEnemyMissilesTotal(level * 5)

    setCities([
      { id: 1, position: [-10, 0, 0], destroyed: false },
      { id: 2, position: [-6, 0, 0], destroyed: false },
      { id: 3, position: [-2, 0, 0], destroyed: false },
      { id: 4, position: [2, 0, 0], destroyed: false },
      { id: 5, position: [6, 0, 0], destroyed: false },
      { id: 6, position: [10, 0, 0], destroyed: false },
    ])

    setDefensesLeft(3)

    currentCities = useGameStore.getState().cities

    const spanMissileInterval = setInterval(() => {
      spawnEnemyMissiles()
      spawnEnemyMissiles()
      spawnEnemyMissiles()
    }, 3000)
    // const setInterval(spanMissileInterval, 3000)

    // Cleanup function
    return () => {
      clearInterval(spanMissileInterval)
      // gameRef.current.active = false
    }
  }, [level])

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (defensesLeft < 1) return
    setDefensesLeft(defensesLeft - 1)
    // spawnEnemyMissiles()
    // if (!gameRef.current.active || defensesLeft <= 0) return

    // Get the clicked point in 3D space
    // const clickPoint: Position3D = [event.point.x, event.point.y, event.point.z]
    const clickPoint: Position3D = [event.point.x, event.point.y, 0]

    // Divide the screen into three segments
    // Assuming the screen width is from -25 to 25 (total width of 50 units)
    const screenWidth = 30
    const segmentWidth = screenWidth / 3

    // Determine which segment was clicked
    let initialX = 0
    if (event.point.x < -segmentWidth / 2) {
      // Left segment
      initialX = -segmentWidth
    } else if (event.point.x > segmentWidth / 2) {
      // Right segment
      initialX = segmentWidth
    } else {
      // Middle segment
      initialX = 0
    }

    // Create a new defense missile
    const newDefense = {
      id: Date.now(),
      position: [initialX, 3, 0] as Position3D,
      target: clickPoint,
    }

    // Start GSAP animation for the new defense missile
    // animateDefenseMissile(newDefense)
    setDefenses((prev) => [...prev, newDefense])
    // setDefensesLeft(defensesLeft - 1)
  }

  const updateGame = () => {
    // Check game state
    checkGameState()
  }

  const spawnEnemyMissiles = () => {
    // Random position at the top of the screen
    const startX = (Math.random() - 0.5) * 30
    const startPosition: Position3D = [startX, 30 + (Math.random() * 10 - 5), 0]

    // Target a random city or a point on the ground
    const targetIndex = Math.floor(Math.random() * currentCities.length)

    let targetPosition = [0, 0, 0]
    if (currentCities.length) {
      targetPosition = currentCities[targetIndex].destroyed
        ? ([startX + (Math.random() - 0.5) * 5, 0, 0] as Position3D)
        : currentCities[targetIndex].position
    }

    const newMissile = {
      id: Date.now() + Math.random() * 10000,
      position: startPosition,
      target: targetPosition,
      setExplosions,
    }

    setMissiles((prev) => [...prev, newMissile])
  }

  const checkGameState = () => {
    // Check if all cities are destroyed
    // const allCitiesDestroyed = cities.every((city) => city.destroyed)
    // // console.log(allCitiesDestroyed)
    // if (allCitiesDestroyed) {
    //   // gameRef.current.active = false
    //   endGame()
    // }
  }

  return {
    setMissiles,
    missiles,
    explosions,
    setDefenses,
    defenses,
    defensesLeft,
    // isActive: gameRef.current.active,
    handleClick,
    updateGame,
    currentCities,
  }
}
