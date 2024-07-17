import { Html } from '@react-three/drei'
import { useDispatch, useSelector } from 'react-redux'
import { gameStatus } from '../store/slices/gameSlice.js'
import styles from './styles/BallEffect.module.css'
import ball from '../assets/ball-fx.png'

const BallEffect = ({ onShootBall }) => {
  const dispatch = useDispatch()

  const onClick = (evt) => {
    const ballRect = evt.target.getBoundingClientRect()
    const effectX = (evt.clientX - ballRect.left) / ballRect.width
    const effectY = (evt.clientY - ballRect.top) / ballRect.height
    onShootBall(effectX - 0.5, effectY - 0.5)
  }

  return (
    <>
      <Html as="section" wrapperClass={styles.balleffect} prepend fullscreen sprite>
        <h1>Effect</h1>
        <img src={ball} onClick={onClick} />
      </Html>
    </>
  )
}

export default BallEffect
