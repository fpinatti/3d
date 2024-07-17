import { configureStore } from '@reduxjs/toolkit'
import gameStatus from './slices/gameSlice'
// import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    game: gameStatus,
    // filters: filtersReducer
  },
})
