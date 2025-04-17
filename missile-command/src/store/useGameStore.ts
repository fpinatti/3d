// import { City } from '@/components/game/hooks/useGameLogic'
import { CityProps } from '@/components/city'
import { create } from 'zustand'

// Game state types
export type GameStatus = 'not_initialized' | 'playing' | 'paused' | 'game_over' | 'level_complete'

interface GameSettings {
  soundEnabled: boolean
  musicEnabled: boolean
  difficulty: 'easy' | 'normal' | 'hard'
  missileSpeed: number
  enemySpawnRate: number
}

interface GameStateState {
  // Game status
  status: GameStatus
  level: number
  score: number
  highScore: number
  cities: CityProps[]

  // Game settings
  settings: GameSettings

  // Player stats
  defensesLeft: number
  // citiesRemaining: number
  enemyMissilesDestroyed: number
  enemyMissilesTotal: number
}

interface GameStateActions {
  // Actions
  initGame: () => void
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  nextLevel: () => void
  restartGame: () => void

  // Score and stats
  updateScore: (points: number) => void
  setDefensesLeft: (amount: number) => void
  // decrementDefensesLeft: () => void
  // setCitiesRemaining: (amount: number) => void
  // decrementCitiesRemaining: () => void
  // incrementEnemyMissilesDestroyed: () => void
  setCities: (cities: CityProps[]) => void
  destroyCity: (id: number) => void

  // Settings
  updateSettings: (newSettings: Partial<GameSettings>) => void
  toggleSound: () => void
  toggleMusic: () => void
  setDifficulty: (difficulty: 'easy' | 'normal' | 'hard') => void
}

// Default settings based on difficulty
const getDifficultySettings = (difficulty: 'easy' | 'normal' | 'hard'): Partial<GameSettings> => {
  switch (difficulty) {
    case 'easy':
      return { missileSpeed: 5, enemySpawnRate: 3000 }
    case 'normal':
      return { missileSpeed: 7, enemySpawnRate: 2000 }
    case 'hard':
      return { missileSpeed: 10, enemySpawnRate: 1000 }
    default:
      return { missileSpeed: 7, enemySpawnRate: 2000 }
  }
}

// Create the store
const useGameStore = create<GameStateState & GameStateActions>((set, get) => ({
  // Initial state
  status: 'not_initialized',
  level: 1,
  score: 0,
  highScore: 0,
  cities: [],

  settings: {
    soundEnabled: true,
    musicEnabled: true,
    difficulty: 'normal',
    missileSpeed: 7,
    enemySpawnRate: 2000,
  },

  defensesLeft: 0,
  // citiesRemaining: 6,
  enemyMissilesDestroyed: 0,
  enemyMissilesTotal: 5,

  // Game flow actions
  initGame: () => set({ status: 'not_initialized' }),
  startGame: () => set({ status: 'playing' }),
  pauseGame: () => set((state) => (state.status === 'playing' ? { status: 'paused' } : {})),
  resumeGame: () => set((state) => (state.status === 'paused' ? { status: 'playing' } : {})),
  setCities: (cities) => {
    set({ cities })
  },
  destroyCity: (id: number) => {
    set((state) => {
      // Find the city with the matching id and mark it as destroyed
      const updatedCities = state.cities.map((city) =>
        city.id === id ? { ...city, destroyed: true } : city
      )

      // Calculate how many cities are still intact
      // const remainingCities = updatedCities.filter((city) => !city.destroyed).length

      // Update citiesRemaining count
      return {
        cities: updatedCities,
        // citiesRemaining: remainingCities,
      }
    })

    // Check if all cities are destroyed to trigger game over
    const { cities } = get()
    const anyCityIsLeft = cities.find((city) => city.destroyed === false)
    if (!anyCityIsLeft) {
      get().endGame()
    }
  },
  endGame: () => {
    const { score } = get()
    const highScore = Math.max(score, get().highScore)

    set({
      status: 'game_over',
      highScore,
    })
  },

  nextLevel: () =>
    set((state) => ({
      status: 'playing',
      level: state.level + 1,
      enemyMissilesDestroyed: 0,
      enemyMissilesTotal: state.level * 5 + 5,
      // defensesLeft: state.defensesLeft + 5,
    })),
  restartGame: () =>
    set({
      status: 'playing',
      level: 1,
      score: 0,
      // defensesLeft: 10,
      // citiesRemaining: 6,
      enemyMissilesDestroyed: 0,
      enemyMissilesTotal: 5,
      cities: [],
    }),

  // Score and stats actions
  updateScore: (points) =>
    set((state) => ({
      score: state.score + points,
    })),

  setDefensesLeft: (amount) => set({ defensesLeft: amount }),

  // decrementDefensesLeft: () =>
  //   set((state) => ({
  //     defensesLeft: Math.max(0, state.defensesLeft - 1),
  //   })),

  // setCitiesRemaining: (amount) => set({ citiesRemaining: amount }),

  // decrementCitiesRemaining: () =>
  //   set((state) => {
  //     const newCitiesRemaining = Math.max(0, state.citiesRemaining - 1)

  //     // If no cities remain, end the game
  //     if (newCitiesRemaining === 0) {
  //       get().endGame()
  //     }

  //     return { citiesRemaining: newCitiesRemaining }
  //   }),

  // incrementEnemyMissilesDestroyed: () =>
  //   set((state) => {
  //     const newEnemyMissilesDestroyed = state.enemyMissilesDestroyed + 1

  //     // Check if level is complete
  //     if (newEnemyMissilesDestroyed >= state.enemyMissilesTotal) {
  //       set({ status: 'level_complete' })

  //       // Add bonus points for remaining cities and defenses
  //       const bonusPoints = state.citiesRemaining * 100 + state.defensesLeft * 50
  //       get().updateScore(bonusPoints)
  //     }

  //     return { enemyMissilesDestroyed: newEnemyMissilesDestroyed }
  //   }),

  // Settings actions
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  toggleSound: () =>
    set((state) => ({
      settings: { ...state.settings, soundEnabled: !state.settings.soundEnabled },
    })),

  toggleMusic: () =>
    set((state) => ({
      settings: { ...state.settings, musicEnabled: !state.settings.musicEnabled },
    })),

  setDifficulty: (difficulty) =>
    set((state) => ({
      settings: {
        ...state.settings,
        difficulty,
        ...getDifficultySettings(difficulty),
      },
    })),
}))

export default useGameStore
