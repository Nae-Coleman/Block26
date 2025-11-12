import { useGame } from "./GameContext";

export default function GameBoard() {
  const { moles, whackMole } = useGame();

  return (
    <div className="game-board">
      {moles.map((hasMole, index) => (
        <div
          key={index}
          className={`hole ${hasMole ? "mole" : ""}`}
          onClick={() => hasMole && whackMole(index)}
        ></div>
      ))}
    </div>
  );
}

//useGame() lets us access holes and whackMole() from the context.
//Each hole in the array is shown as a little square (or “hole”).
//If hole.hasMole is true, we give it a class of "mole" so CSS shows the mole image.
//When you click it, it calls whackMole(index) to increase your score!
