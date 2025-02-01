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
  snapshotPlayerPosition: [number, number, number] | null
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
  setSnapshotPlayerPosition: (value: [number, number, number] | null) => void
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
  snapshotPlayerPosition: null,
}

const usePlayer = create<PlayerStore>((set) => ({
  ...initState,
  setAxisX: (value: number) => {
    if (value > 0) set({ direction: 'right' })
    if (value < 0) set({ direction: 'left' })
    // const direction = value > 0 ? 'right' : 'left'
    set({ axisX: value })
  },
  setAxisY: (value: number) => set({ axisY: value }),
  setTriggerLaser: (value: boolean) => set({ triggerLaser: value }),
  setBombExplode: (value: boolean) => set({ bombExplode: value }),
  setPlayerPosition: (value: [number, number, number]) =>
    set({ playerPosition: value }),
  setSnapshotPlayerPosition: (value: [number, number, number]) =>
    set({ snapshotPlayerPosition: value }),
  addBomb: (value: IBomb) => {
    set((state) => {
      return {
        bombsPlanted: [...state.bombsPlanted, value],
      }
    })
  },
  clearAllBombs: () => {
    set({ bombsPlanted: [] })
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
