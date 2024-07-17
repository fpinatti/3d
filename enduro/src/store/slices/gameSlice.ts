import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'gameState',
  initialState: 'start',
  reducers: {
    gameStatus(state, action) {
      //   state = action
      console.log(action)
      return action.payload
    },
  },
})

export const { gameStatus } = gameSlice.actions
export default gameSlice.reducer
