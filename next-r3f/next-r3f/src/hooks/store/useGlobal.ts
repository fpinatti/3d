// import { createStore } from 'zustand'
import { create } from 'zustand'

export type GlobalState = {
  isFxEnabled1: boolean
  isFxEnabled2: boolean
  isFxEnabled3: boolean
  isHelicopter: boolean
}

export type GlobalActions = {
  setFx1: (newState: boolean) => void
  setFx2: (newState: boolean) => void
  setFx3: (newState: boolean) => void
  setHelicopter: (newState: boolean) => void
}

export type GlobalStore = GlobalState & GlobalActions

export const initState: GlobalState = {
  isFxEnabled1: false,
  isFxEnabled2: false,
  isFxEnabled3: false,
  isHelicopter: false,
}

const useGlobal = create<GlobalStore>((set) => ({
  ...initState,
  setFx1: (newState: boolean) => set({ isFxEnabled1: newState }),
  setFx2: (newState: boolean) => set({ isFxEnabled2: newState }),
  setFx3: (newState: boolean) => set({ isFxEnabled3: newState }),
  setHelicopter: (newState: boolean) => set({ isHelicopter: newState }),
}))

export default useGlobal
