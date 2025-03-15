import usePlayer from '@/hooks/store/usePlayer'
import { Joystick } from 'react-joystick-component'

const getUniqueRandomNumber = () => {
  const date = new Date()
  const uniqueString = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
  const uniqueNumber = parseInt(uniqueString, 10)
  return uniqueNumber
}

const Controls = () => {
  const { setAxisX, setAxisY, setTriggerLaser, addBomb, playerPosition } =
    usePlayer()
  return (
    <div className="flex gap-4">
      <Joystick
        size={100}
        minDistance={0.2}
        sticky={false}
        baseColor="red"
        stickColor="blue"
        move={(evt) => {
          setAxisX(evt.x || 0)
        }}
        stop={() => {
          setAxisX(0)
        }}
      ></Joystick>
      <button
        onMouseDown={() => {
          setAxisY(2)
        }}
        onMouseUp={() => {
          setAxisY(0)
        }}
        onTouchStart={() => {
          setAxisY(2)
        }}
        onTouchEnd={() => {
          setAxisY(0)
        }}
      >
        JET
      </button>
      <button
        onMouseDown={() => {
          setTriggerLaser(true)
        }}
        onMouseUp={() => {
          setTriggerLaser(false)
        }}
      >
        LASER
      </button>
      <button
        onMouseDown={() => {
          addBomb({
            position: [
              playerPosition[0],
              playerPosition[1],
              playerPosition[2] + 1,
            ],
            isExploded: false,
            id: getUniqueRandomNumber(),
          })
        }}
      >
        BOMB
      </button>
    </div>
  )
}

export default Controls
