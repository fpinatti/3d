import { useEffect, useState } from "react";

export const useGame = () => {
	const [frogPosition, setFrogPosition] = useState([0, 0.25, 4]);
	const [cars, setCars] = useState([
	  { id: 1, position: [-6, 0.25, 2], direction: 1, speed: 0.05 },
	  { id: 2, position: [6, 0.25, 1], direction: -1, speed: 0.03 },
	  { id: 3, position: [-5, 0.25, 0], direction: 1, speed: 0.04 },
	  { id: 4, position: [5, 0.25, -1], direction: -1, speed: 0.06 },
	  { id: 5, position: [-7, 0.25, -2], direction: 1, speed: 0.02 },
	]);
	const [gameOver, setGameOver] = useState(false);
	const [gameWon, setGameWon] = useState(false);
  
	// Handle keyboard input
	useEffect(() => {
	  const handleKeyDown = (evt) => {
		if (gameOver || gameWon) return;
  
		const step = 1;
		const newPosition = [...frogPosition];
  
		switch (evt.key) {
		  case 'ArrowUp':
			newPosition[2] -= step;
			break;
		  case 'ArrowDown':
			newPosition[2] += step;
			break;
		  case 'ArrowLeft':
			newPosition[0] -= step;
			break;
		  case 'ArrowRight':
			newPosition[0] += step;
			break;
		}
  
		// Boundary checks
		newPosition[0] = Math.max(-7, Math.min(7, newPosition[0]));
		newPosition[2] = Math.max(-5, Math.min(4, newPosition[2]));
  
		setFrogPosition(newPosition);
  
		// Check if frog reached the other side
		if (newPosition[2] <= -4.5) {
		  setGameWon(true);
		}
	  };
  
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, [frogPosition, gameOver, gameWon]);
  
	// Game loop
	useEffect(() => {
	  if (gameOver || gameWon) return;
  
	  const gameLoop = setInterval(() => {
		// Move cars
		setCars(prevCars => 
		  prevCars.map(car => {
			const newX = car.position[0] + car.direction * car.speed;
			// If car goes off screen, wrap around
			const wrappedX = car.direction > 0 
			  ? newX > 8 ? -8 : newX 
			  : newX < -8 ? 8 : newX;
			
			return {
			  ...car,
			  position: [wrappedX, car.position[1], car.position[2]]
			};
		  })
		);
  
		// Check collisions
		const frogX = frogPosition[0];
		const frogZ = frogPosition[2];
  
		for (const car of cars) {
		  const carX = car.position[0];
		  const carZ = car.position[2];
		  
		  // Simple collision detection
		  if (
			Math.abs(frogX - carX) < 1.4 && 
			Math.abs(frogZ - carZ) < 0.9
		  ) {
			setGameOver(true);
			break;
		  }
		}
	  }, 16); // ~60fps
  
	  return () => clearInterval(gameLoop);
	}, [cars, frogPosition, gameOver, gameWon]);
  
	const resetGame = () => {
	  setFrogPosition([0, 0.25, 4]);
	  setCars([
		{ id: 1, position: [-6, 0.25, 2], direction: 1, speed: 0.05 },
		{ id: 2, position: [6, 0.25, 1], direction: -1, speed: 0.03 },
		{ id: 3, position: [-5, 0.25, 0], direction: 1, speed: 0.04 },
		{ id: 4, position: [5, 0.25, -1], direction: -1, speed: 0.06 },
		{ id: 5, position: [-7, 0.25, -2], direction: 1, speed: 0.02 },
	  ]);
	  setGameOver(false);
	  setGameWon(false);
	};

	return {
		frogPosition,
		cars,
		gameOver,
		gameWon,
		resetGame,
	};
}