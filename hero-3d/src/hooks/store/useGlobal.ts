import { create } from 'zustand'

export type GlobalState = {
  currentLevel: string
  isLamp: boolean
}

export type GlobalActions = {
  setCurrentLevel: (newLevel: string) => void
  setLamp: (newState: boolean) => void
}

export type GlobalStore = GlobalState & GlobalActions

export const initState: GlobalState = {
  currentLevel: '2-1',
  isLamp: true,
}

const useGlobal = create<GlobalStore>((set) => ({
  ...initState,
  setCurrentLevel: (newLevel: string) => {
    set({ currentLevel: newLevel })
  },
  setLamp: (newState: boolean) => {
    set({ isLamp: newState })
  },
}))

export default useGlobal
