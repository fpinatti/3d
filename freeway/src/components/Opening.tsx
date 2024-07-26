import { Html } from '@react-three/drei'
import { useDispatch, useSelector } from 'react-redux'
import { gameStatus } from '../store/slices/gameSlice.js'
import styles from './styles/Opening.module.css'

const Opening = () => {
  const dispatch = useDispatch()

  const startGame = () => {
    dispatch(gameStatus('playing'))
  }

  const gameState = useSelector((state) => state.game)

  return (
    <>
      {gameState === 'start' && (
        <Html as="section" wrapperClass={styles.opening} prepend fullscreen sprite>
          <h1>Virtual Pool</h1>
          <p>a physics experiment</p>
          <button onClick={startGame}>start game</button>
        </Html>
      )}
    </>
  )
}

export default Opening
