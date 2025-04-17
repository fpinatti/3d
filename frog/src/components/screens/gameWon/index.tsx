import React from 'react'

interface GameWonProps {
  resetGame: () => void
}
const GameWon = ({resetGame}:GameWonProps) => {
  return (
	<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div className="bg-white p-6 rounded-lg text-center">
		<h2 className="text-2xl font-bold text-green-600 mb-4">You Won!</h2>
		<button 
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onClick={resetGame}
		>
			Play Again
		</button>
		</div>
	</div>
  )
}

export default GameWon