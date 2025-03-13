import { useState, useRef, useEffect } from 'react'
import { Vector3 } from 'three'
import { ThreeEvent } from '@react-three/fiber'
import gsap from 'gsap' // Add this import

export type Position3D = [number, number, number]

export interface City {
  id: number
  position: Position3D
  destroyed: boolean
}

export interface Missile {
  id: number
  position: Position3D
  target: Position3D
}

export interface Explosion {
  id: number
  position: Position3D
  time: number
}

export interface GameState {
  cities: City[]
  missiles: Missile[]
  explosions: Explosion[]
  defenses: Missile[]
  defensesLeft: number
  enemyMissilesDestroyed: number
  enemyMissilesTotal: number
  isActive: boolean
}

export function useGameLogic({
  level,
  onScoreUpdate,
  onGameOver,
  onNextLevel,
}: {
  level: number
  onScoreUpdate: (points: number) => void
  onGameOver: () => void
  onNextLevel: () => void
}) {
  const [cities, setCities] = useState<City[]>([
    { id: 1, position: [-10, 0, 0], destroyed: false },
    { id: 2, position: [-6, 0, 0], destroyed: false },
    { id: 3, position: [-2, 0, 0], destroyed: false },
    { id: 4, position: [2, 0, 0], destroyed: false },
    { id: 5, position: [6, 0, 0], destroyed: false },
    { id: 6, position: [10, 0, 0], destroyed: false },
  ])

  const [missiles, setMissiles] = useState<Missile[]>([])
  const [explosions, setExplosions] = useState<Explosion[]>([])
  const [defenses, setDefenses] = useState<Missile[]>([])

  const [defensesLeft, setDefensesLeft] = useState(10)
  const [enemyMissilesDestroyed, setEnemyMissilesDestroyed] = useState(0)
  const [enemyMissilesTotal, setEnemyMissilesTotal] = useState(level * 5)

  const gameRef = useRef({ active: true, timeToNextMissile: 0 })

  // Initialize level
  useEffect(() => {
    // Reset game state for new level
    setMissiles([])
    setExplosions([])
    setDefenses([])
    setDefensesLeft(10 + level * 2)
    setEnemyMissilesDestroyed(0)
    setEnemyMissilesTotal(level * 5)
    gameRef.current.active = true

    // Reset cities if starting a new game
    if (level === 1) {
      setCities(cities.map((city) => ({ ...city, destroyed: false })))
    }

    // Cleanup function
    return () => {
      gameRef.current.active = false
    }
  }, [level])

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!gameRef.current.active || defensesLeft <= 0) return

    // Get the clicked point in 3D space
    const clickPoint: Position3D = [event.point.x, event.point.y, event.point.z]

    // Create a new defense missile
    const newDefense = {
      id: Date.now(),
      position: [0, 3, 0] as Position3D,
      target: clickPoint,
    }

    // Start GSAP animation for the new defense missile
    // animateDefenseMissile(newDefense)

    setDefenses((prev) => [...prev, newDefense])
    setDefensesLeft((prev) => prev - 1)
  }

  const updateGame = (delta: number) => {
    if (!gameRef.current.active) return

    // Spawn enemy missiles
    // spawnEnemyMissiles(delta)

    // Update missiles
    // updateMissiles(delta)

    // Update defense missiles
    updateDefenseMissiles(delta)

    // Update explosions and check for missile hits
    // updateExplosions(delta)

    // Check game state
    checkGameState()
  }

  const spawnEnemyMissiles = (delta: number) => {
    gameRef.current.timeToNextMissile -= delta
    if (gameRef.current.timeToNextMissile <= 0 && missiles.length < enemyMissilesTotal) {
      // Random position at the top of the screen
      const startX = (Math.random() - 0.5) * 30
      const startPosition: Position3D = [startX, 20, 0]

      // Target a random city or a point on the ground
      const targetIndex = Math.floor(Math.random() * cities.length)
      const targetPosition = cities[targetIndex].destroyed
        ? ([startX + (Math.random() - 0.5) * 5, 0, 0] as Position3D)
        : cities[targetIndex].position

      const newMissile = {
        id: Date.now(),
        position: startPosition,
        target: targetPosition,
      }

      setMissiles((prev) => [...prev, newMissile])

      // Set time until next missile based on level (faster at higher levels)
      gameRef.current.timeToNextMissile = Math.max(0.5, 3 - level * 0.2)
    }
  }

  const updateMissiles = (delta: number) => {
    setMissiles((prev) => {
      return prev.filter((missile) => {
        const targetVector = new Vector3(...missile.target)
        const missileVector = new Vector3(...missile.position)
        const direction = targetVector.clone().sub(missileVector).normalize()

        // Move missile toward target
        const speed = 5 * delta
        const newPosition: Position3D = [
          missile.position[0] + direction.x * speed,
          missile.position[1] + direction.y * speed,
          missile.position[2] + direction.z * speed,
        ]

        // Check if missile has reached target
        const distance = missileVector.distanceTo(targetVector)
        if (distance < 0.5) {
          // Create explosion
          setExplosions((prev) => [
            ...prev,
            {
              id: Date.now(),
              position: missile.position,
              time: 0,
            },
          ])

          // Check if missile hit a city
          const hitCity = cities.find(
            (city) =>
              !city.destroyed &&
              Math.abs(city.position[0] - missile.position[0]) < 1.5 &&
              Math.abs(city.position[1] - missile.position[1]) < 1.5
          )

          if (hitCity) {
            setCities((prev) =>
              prev.map((city) => (city.id === hitCity.id ? { ...city, destroyed: true } : city))
            )
          }

          return false
        }

        missile.position = newPosition
        return true
      })
    })
  }

  // Add this new function to handle GSAP animations
  // const animateDefenseMissile = (defense: Missile) => {
  //   // Calculate duration based on distance (for consistent speed)
  //   const startVector = new Vector3(...defense.position)
  //   const targetVector = new Vector3(...defense.target)
  //   const distance = startVector.distanceTo(targetVector)
  //   console.log(defense)
  //   const duration = distance / 5 // Adjust divisor to control speed
  //   // gsap.to(defense.position, {
  //   //   '0': defense.target[0],
  //   //   '1': defense.target[1],
  //   //   '2': defense.target[2],
  //   //   duration,
  //   //   ease: 'none',
  //   //   // onComplete: () => {
  //   //   //   // Create explosion when missile reaches target
  //   //   //   setExplosions((prev) => [
  //   //   //     ...prev,
  //   //   //     {
  //   //   //       id: Date.now(),
  //   //   //       position: [...defense.position] as Position3D,
  //   //   //       time: 0,
  //   //   //     },
  //   //   //   ])

  //   //   //   // Remove the defense missile
  //   //   //   setDefenses((prev) => prev.filter((d) => d.id !== defense.id))
  //   //   // },
  //   //   // onUpdate: () => {
  //   //   //   // Force a re-render to update the missile position
  //   //   //   setDefenses((prev) => [...prev])
  //   //   // },
  //   // })
  // }

  const updateDefenseMissiles = (delta: number) => {
    // GSAP is now handling the movement, so we only need to check
    // if any defense missiles need to be removed (e.g., if game state changes)
    if (!gameRef.current.active) {
      // Kill all animations if game is no longer active
      defenses.forEach((defense) => {
        gsap.killTweensOf(defense.position)
      })
    }
  }

  const updateExplosions = (delta: number) => {
    setExplosions((prev) => {
      const updatedExplosions = prev.map((explosion) => {
        // Increment explosion time
        explosion.time += delta

        // Check if explosion hit any missiles
        missiles.forEach((missile) => {
          const missileVector = new Vector3(...missile.position)
          const explosionVector = new Vector3(...explosion.position)
          const distance = missileVector.distanceTo(explosionVector)

          // If missile is within explosion radius
          if (distance < 2) {
            // Remove missile
            setMissiles((prev) => prev.filter((m) => m.id !== missile.id))
            // Increment score
            onScoreUpdate(100)
            setEnemyMissilesDestroyed((prev) => prev + 1)
          }
        })

        return explosion
      })

      // Remove old explosions
      return updatedExplosions.filter((explosion) => explosion.time < 1)
    })
  }

  const checkGameState = () => {
    // Check if all cities are destroyed
    const allCitiesDestroyed = cities.every((city) => city.destroyed)
    if (allCitiesDestroyed) {
      gameRef.current.active = false
      onGameOver()
    }

    // Check if level is complete
    if (enemyMissilesDestroyed + missiles.length >= enemyMissilesTotal && missiles.length === 0) {
      gameRef.current.active = false

      // Bonus points for remaining cities and defenses
      const remainingCities = cities.filter((city) => !city.destroyed).length
      onScoreUpdate(remainingCities * 100 + defensesLeft * 50)

      // Wait a moment before starting next level
      setTimeout(() => {
        onNextLevel()
      }, 2000)
    }
  }

  return {
    cities,
    missiles,
    explosions,
    setDefenses,
    defenses,
    defensesLeft,
    isActive: gameRef.current.active,
    handleClick,
    updateGame,
  }
}
