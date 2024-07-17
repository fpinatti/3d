import { Html } from '@react-three/drei'
import { useDispatch, useSelector } from 'react-redux'
import { gameStatus } from '../store/slices/gameSlice.js'
import styles from './styles/EndGame.module.css'

const EndGame = () => {
  const dispatch = useDispatch()

  const resetGame = () => {
    dispatch(gameStatus('reset'))
  }

  const gameState = useSelector((state) => state.game)

  return (
    <>
      {gameState === 'end' && (
        <Html as="section" wrapperClass={styles.endgame} prepend fullscreen sprite>
          <h1>End of game</h1>
          <button onClick={resetGame}>replay</button>
        </Html>
      )}
    </>
  )
}

export default EndGame
