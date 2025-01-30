import { create } from 'zustand'

export interface IBomb {
  position: [number, number, number]
  isExploded: boolean
  id: number
}

export type PlayerState = {
  axisX: number
  axisY: number
  direction: 'left' | 'right'
  triggerLaser: boolean
  bombExplode: boolean
  bombsPlanted: IBomb[]
  playerPosition: [number, number, number]
}

export type PlayerActions = {
  setAxisX: (value: number) => void
  setAxisY: (value: number) => void
  //   setDirection: (value: string) => void
  setTriggerLaser: (value: boolean) => void
  setBombExplode: (value: boolean) => void
  addBomb: (value: IBomb) => void
  clearAllBombs: () => void
  explodeBomb: (id: number, value: boolean) => void
  setPlayerPosition: (value: [number, number, number]) => void
}

export type PlayerStore = PlayerState & PlayerActions

export const initState: PlayerState = {
  axisX: 0,
  axisY: 0,
  direction: 'right',
  triggerLaser: false,
  bombExplode: false,
  bombsPlanted: [],
  playerPosition: [0, 0, 0],
}

const usePlayer = create<PlayerStore>((set) => ({
  ...initState,
  setAxisX: (value: number) => {
    // const direction = value > 0 ? 'right' : 'left'
    set({ axisX: value, direction: value > 0 ? 'right' : 'left' })
  },
  setAxisY: (value: number) => set({ axisY: value }),
  setTriggerLaser: (value: boolean) => set({ triggerLaser: value }),
  setBombExplode: (value: boolean) => set({ bombExplode: value }),
  setPlayerPosition: (value: [number, number, number]) =>
    set({ playerPosition: value }),
  addBomb: (value: IBomb) => {
    set((state) => {
      return {
        bombsPlanted: [...state.bombsPlanted, value],
      }
    })
  },
  clearAllBombs: () => {
    set({ bombsPlanted: [] })
    // set((state) => {
    //   state.bombsPlanted = []
    //   // bombsPlanted: [],
    // })
  },
  explodeBomb: (id, value) => {
    set((state) => {
      const bombToExplode = state.bombsPlanted.findIndex(
        (bomb) => bomb.id === id,
      )
      const updatedBombs = [...state.bombsPlanted]
      updatedBombs[bombToExplode].isExploded = value
      return { bombsPlanted: updatedBombs }
    })
  },
  //   setDirection: (direction: string) => {
  //     set({ direction: direction })
  //   },
}))

export default usePlayer
