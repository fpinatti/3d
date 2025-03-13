import React from "react";

interface IGameUiProps {
  level: number;
  score: number;
}

const GameUi = ({ level, score }: IGameUiProps) => {
  return (
    <div className="absolute top-0 left-0 z-10 p-4 text-white">
      <div className="text-xl font-bold">Score: {score}</div>
      <div className="text-lg">Level: {level}</div>
    </div>
  );
};

export default GameUi;
