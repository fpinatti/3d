import { create } from 'zustand'

export type GlobalState = {
  currentLevel: string
}

export type GlobalActions = {
  setCurrentLevel: (newLevel: string) => void
}

export type GlobalStore = GlobalState & GlobalActions

export const initState: GlobalState = {
  currentLevel: '2-4',
}

const useGlobal = create<GlobalStore>((set) => ({
  ...initState,
  setCurrentLevel: (newLevel: string) => {
    set({ currentLevel: newLevel })
  },
}))

export default useGlobal
