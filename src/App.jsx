import GameBoard from "./GameBoard";
import { GameProvider, useGame } from "./GameContext";

function GameInfo() {
  const { score, startGame, stopGame, isPlaying } = useGame();

  return (
    <div className="game-info">
      <h1>🐹 Whack-a-Mole!</h1>
      <p>Score: {score}</p>
      <button onClick={startGame}>
        {isPlaying ? "Restart Game" : "Start Game"}
      </button>
      {isPlaying && <button onClick={stopGame}>Stop Game</button>}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameInfo />
      <GameBoard />
    </GameProvider>
  );
}

//GameProvider wraps everything, giving all components access to the game’s context.
//GameInfo shows the score and a Start/Restart button.
//GameBoard shows the actual holes and moles that pop up.
