import React from "react";

interface IGameOverProps {
  restartGame: () => void;
  score: number;
}

const GameOver = ({ restartGame, score }: IGameOverProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over</h2>
        <p className="text-white text-xl mb-4">Final Score: {score}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={restartGame}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
