import React from 'react'
import { Billboard, Center, Html } from '@react-three/drei'
import useGameStore from '@/store/useGameStore'

const GameUi = () => {
  const { score, level, defensesLeft } = useGameStore()
  const defenses = Array.from({ length: defensesLeft }, (_, index) => index)
  console.log('defenses', defenses)
  return (
    <>
      <Html
        as="div"
        position={[0, 0, 0]}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          padding: '20px',
          color: 'white',
          fontSize: '18px',
          fontFamily: 'Arial, sans-serif',
          userSelect: 'none',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
        }}
        transform={false}
        prepend
        center={false}
        // fullscreen
      >
        <div style={{ marginTop: '10px' }}>
          <strong style={{ fontSize: '24px' }}>Score: {score}</strong>
        </div>
        <div>Level: {level}</div>
      </Html>
      <Billboard follow={true} position={[0, 1, 7]}>
        <Center>
          {defenses.map((_, index) => {
            return (
              <mesh key={index} position={[index, 1.2, 9]} scale={0.2}>
                <sphereGeometry args={[0.7, 4, 4]} />
                <meshBasicMaterial color="red" />
              </mesh>
            )
          })}
        </Center>
        {/* <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="left"
        anchorY="top"
      >
        {`Score: ${score}`}
      </Text>
      <Text
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
