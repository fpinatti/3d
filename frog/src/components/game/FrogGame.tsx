import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Road } from '../road';
import { Frog } from '../frog';
import { Car } from '../car';
import { useGame } from './hooks/useGame';
import GameOver from '../screens/gameOver';
import GameWon from '../screens/gameWon';

// Game objects
const FrogGame = () => {
  const {frogPosition, cars, gameOver, resetGame, gameWon} = useGame()

  return (
    <div className="relative w-full h-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <Road />
        <Frog position={frogPosition} />
        
        {cars.map(car => (
          <Car 
            key={car.id}
            position={car.position}
            direction={car.direction}
            speed={car.speed}
          />
        ))}
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      
      {gameOver && (
       <GameOver resetGame={resetGame} />
      )}
      
      {gameWon && (
        <GameWon resetGame={resetGame} />
      )}
      
      <div className="absolute top-4 left-4 text-white">
        <p>Use arrow keys to move the frog</p>
        <p>Reach the other side without getting hit!</p>
      </div>
    </div>
  );
};

export default FrogGame;