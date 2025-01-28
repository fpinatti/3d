import { create } from 'zustand'

export interface IBomb {
  position: [number, number, number]
  isExploded: boolean
  id: number
}

export type PlayerState = {
  axisX: number
  axisY: number
  triggerLaser: boolean
  triggerBomb: boolean
  bombExplode: boolean
  bombsPlanted: IBomb[]
  playerPosition: [number, number, number]
}

export type PlayerActions = {
  setAxisX: (value: number) => void
  setAxisY: (value: number) => void
  setTriggerLaser: (value: boolean) => void
  setTriggerBomb: (value: boolean) => void
  setBombExplode: (value: boolean) => void
  addBomb: (value: IBomb) => void
  explodeBomb: (id: number, value: boolean) => void
  setPlayerPosition: (value: [number, number, number]) => void
}

export type PlayerStore = PlayerState & PlayerActions

export const initState: PlayerState = {
  axisX: 0,
  axisY: 0,
  triggerBomb: false,
  triggerLaser: false,
  bombExplode: false,
  bombsPlanted: [],
  playerPosition: [0, 0, 0],
}

const usePlayer = create<PlayerStore>((set) => ({
  ...initState,
  setAxisX: (value: number) => set({ axisX: value }),
  setAxisY: (value: number) => set({ axisY: value }),
  setTriggerLaser: (value: boolean) => set({ triggerLaser: value }),
  setTriggerBomb: (value: boolean) => set({ triggerBomb: value }),
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
}))

export default usePlayer
