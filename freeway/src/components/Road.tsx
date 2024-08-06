import { useBox } from '@react-three/cannon'

const Road = ({ tex, position, color, type = '' }) => {
  const blockSize = [30, 0.2, 2]
  const [ref, api] = useBox(() => ({
    args: [blockSize[0], blockSize[1], blockSize[2]],
    type: 'Kinematic',
    mass: 0,
    position: [position[0] * blockSize[0], position[1], position[2] * blockSize[2]],
    material: { friction: 1, restitution: 0.2 },
    isTrigger: false,
    userData: { type },
  }))

  return (
    <>
      <mesh ref={ref} receiveShadow>
        <boxGeometry args={[blockSize[0], blockSize[1], blockSize[2]]} />
        <meshStandardMaterial map={tex} />
      </mesh>
    </>
  )
}

export default Road
