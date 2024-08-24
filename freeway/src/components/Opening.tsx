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
        <section className={styles.opening}>
          {/* <Html as="section" wrapperClass={styles.opening} prepend fullscreen> */}
          <h1>Freeway</h1>
          <p>why does the chicken cross the road?</p>
          <button onClick={startGame}>start</button>
          {/* </Html> */}
        </section>
      )}
    </>
  )
}

export default Opening
