import { createContext, useContext, useState, useEffect } from "react";

// Creating the context
const GameContext = createContext();

// Making a provider that holds all the game data
export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState(Array(9).fill(false)); // 9 holes, all empty
  const [isPlaying, setIsPlaying] = useState(false);

  // Start game
  function startGame() {
    setScore(0);
    setMoles(Array(9).fill(false));
    setIsPlaying(true); // always start fresh
  }
  // Stop game
  function stopGame() {
    setIsPlaying(false);
    setMoles(Array(9).fill(false)); // clear moles
  }

  // Whack a mole
  function whackMole(index) {
    if (moles[index]) {
      setScore(score + 1);
      const newMoles = [...moles];
      newMoles[index] = false;
      setMoles(newMoles);
    }
  }

  // Show a random mole
  function popUpRandomMole() {
    const randomIndex = Math.floor(Math.random() * moles.length);
    const newMoles = Array(9).fill(false);
    newMoles[randomIndex] = true;
    setMoles(newMoles);
  }

  // This useEffect makes moles appear automatically while playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        popUpRandomMole();
      }, 2000); // every 1 second
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <GameContext.Provider
      value={{
        score,
        moles,
        isPlaying,
        startGame,
        stopGame,
        whackMole,
        popUpRandomMole,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for easy access
export function useGame() {
  return useContext(GameContext);
}

//GameProvider wraps your whole app — it stores and shares game data.
//useGame() lets any component easily access the score, moles, and functions.
//We’ll call startGame() when the player clicks “Start”.
//popUpRandomMole() will randomly show a mole.
//whackMole(index) adds to the score when you click a mole
