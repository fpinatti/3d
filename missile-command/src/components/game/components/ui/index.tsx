import React from 'react'
import { Billboard, Center, Html, Text } from '@react-three/drei'
import useGameStore from '@/store/useGameStore'

const GameUi = () => {
  const { score, level, defensesLeft } = useGameStore()
  const defenses = Array.from({ length: defensesLeft }, (_, index) => index)
  return (
    <>
      {/* <Html
        as="div"
        position={[0, 0, 0]}
        style={{
          padding: '20px',
          color: 'white',
          fontSize: '18px',
          fontFamily: 'Arial, sans-serif',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        transform={false}
        prepend
        center={false}
        // fullscreen
      >
        <div>
          <strong style={{ fontSize: '24px' }}>Score: {score}</strong>
        </div>
        {/* <div>Level: {level}</div>
      </Html> */}
      <Billboard follow={true} position={[0, 1, 7]}>
        {/* <Center>
          {defenses.map((_, index) => {
            return (
              <mesh key={index} position={[index, 1.2, 9]} scale={0.2}>
                <sphereGeometry args={[0.7, 4, 4]} />
                <meshBasicMaterial color="red" />
              </mesh>
            )
          })}
        </Center> */}
        <Text position={[-5, 0.2, 5]} fontSize={0.5} color="white" anchorX="left" anchorY="top">
          Score: {score}
        </Text>
        {/* <Text
        position={[0, -0.6, 0]}
        fontSize={0.4}
        color="white"
        anchorX="left"
        anchorY="top"
      >
        {`Level: ${level}`}
      </Text> */}
      </Billboard>
    </>
  )
}

export default GameUi
