// import { createStore } from 'zustand'
import { create } from 'zustand'

export type GlobalState = {
  isFxEnabled1: boolean
  isFxEnabled2: boolean
  isFxEnabled3: boolean
}

export type GlobalActions = {
  setFx1: (newState: boolean) => void
  setFx2: (newState: boolean) => void
  setFx3: (newState: boolean) => void
}

export type GlobalStore = GlobalState & GlobalActions

export const initState: GlobalState = {
  isFxEnabled1: false,
  isFxEnabled2: false,
  isFxEnabled3: false,
}

const useGlobal = create<GlobalStore>((set) => ({
  ...initState,
  setFx1: (newState: boolean) => set({ isFxEnabled1: newState }),
  setFx2: (newState: boolean) => set({ isFxEnabled2: newState }),
  setFx3: (newState: boolean) => set({ isFxEnabled3: newState }),
}))

export default useGlobal

// export const useGlobal = (initState: GlobalState = defaultInitState) => {
//   return createStore<GlobalStore>()((set) => ({
//     ...initState,
//     setFx1: (newState) => set({ isFxEnabled1: newState }),
//     setFx2: (newState) => set({ isFxEnabled2: newState }),
//     setFx3: (newState) => set({ isFxEnabled3: newState }),
//   }))
// }

// interface GlobalState {
//   // state
//   isFxEnabled1: boolean
//   isFxEnabled2: boolean
//   isFxEnabled3: boolean
//   // actions
//   setFx1: (newState: boolean) => void
//   setFx2: (newState: boolean) => void
//   setFx3: (newState: boolean) => void
// }

// const useGlobal = create<GlobalState>((set) => ({
//   isFxEnabled1: false,
//   isFxEnabled2: false,
//   isFxEnabled3: false,
//   setFx1: (newState) => set({ isFxEnabled1: newState }),
//   setFx2: (newState) => set({ isFxEnabled2: newState }),
//   setFx3: (newState) => set({ isFxEnabled3: newState }),
// }))

// export default useGlobal

// export type CounterState = {
//   count: number
// }

// export type CounterActions = {
//   decrementCount: () => void
//   incrementCount: () => void
// }

// export type CounterStore = CounterState & CounterActions

// export const defaultInitState: CounterState = {
//   count: 0,
// }

// export const createCounterStore = (
//   initState: CounterState = defaultInitState,
// ) => {
//   return createStore<CounterStore>()((set) => ({
//     ...initState,
//     decrementCount: () => set((state) => ({ count: state.count - 1 })),
//     incrementCount: () => set((state) => ({ count: state.count + 1 })),
//   }))
// }
