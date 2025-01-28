import { create } from 'zustand'

export type GlobalState = {
  currentLevel: string
}

export type GlobalActions = {
  setCurrentLevel: (newState: string) => void
}

export type GlobalStore = GlobalState & GlobalActions

export const initState: GlobalState = {
  currentLevel: '1-2',
}

const useGlobal = create<GlobalStore>((set) => ({
  ...initState,
  setCurrentLevel: (newState: string) => set({ currentLevel: newState }),
}))

export default useGlobal
