import { useState, useEffect } from "react";
import PlayerClock from "../components/PlayerClock";

const ChessClock = () => {
  const [presetTime, setPresetTime] = useState(600); // Default preset: 10 minutes (600 seconds)
  const [player1Time, setPlayer1Time] = useState(presetTime);
  const [player2Time, setPlayer2Time] = useState(presetTime);
  const [activePlayer, setActivePlayer] = useState(null); // "player1" or "player2"
  const [isRunning, setIsRunning] = useState(false);
  const [player1Moves, setPlayer1Moves] = useState(0);
  const [player2Moves, setPlayer2Moves] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (activePlayer === "player1") {
          setPlayer1Time((prev) => Math.max(prev - 1, 0));
        } else if (activePlayer === "player2") {
          setPlayer2Time((prev) => Math.max(prev - 1, 0));
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [activePlayer, isRunning]);

  const startOrPauseGame = () => {
    if (isRunning) {
      setIsRunning(false); // Pause the game
    } else {
      if (activePlayer === null) {
        // If the game is starting for the first time
        setPlayer1Moves(0);
        setPlayer2Moves(0);
        setPlayer1Time(presetTime);
        setPlayer2Time(presetTime);
        setActivePlayer("player1");
      }
      setIsRunning(true); // Start or resume the game
    }
  };

  const resetGame = () => {
    setPlayer1Time(presetTime);
    setPlayer2Time(presetTime);
    setPlayer1Moves(0);
    setPlayer2Moves(0);
    setActivePlayer(null);
    setIsRunning(false);
  };

  const switchPlayer = () => {
    if (activePlayer === "player1") {
      setPlayer1Moves((prev) => prev + 1);
      setActivePlayer("player2");
    } else if (activePlayer === "player2") {
      setPlayer2Moves((prev) => prev + 1);
      setActivePlayer("player1");
    }
  };

  const handlePresetChange = (time) => {
    setPresetTime(time);
    setPlayer1Time(time);
    setPlayer2Time(time);
    setIsRunning(false);
    setActivePlayer(null);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Chess Clock</h1>

      {/* Time Preset Buttons */}
      <div className="flex space-x-4 mb-6">
        {[60, 180, 300, 600, 1800, 3600].map((time) => (
          <button
            key={time}
            className={`px-4 py-2 rounded ${
              presetTime === time ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePresetChange(time)}
          >
            {Math.floor(time / 60)} mins
          </button>
        ))}
      </div>

      {/* Timers for Each Player */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <PlayerClock
          player="Player 1"
          isActive={activePlayer === "player1"}
          time={formatTime(player1Time)}
          moves={player1Moves}
          onClick={activePlayer === "player1" && isRunning ? switchPlayer : null}
        />
        <PlayerClock
          player="Player 2"
          isActive={activePlayer === "player2"}
          time={formatTime(player2Time)}
          moves={player2Moves}
          onClick={activePlayer === "player2" && isRunning ? switchPlayer : null}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            isRunning ? "bg-yellow-500" : "bg-green-500"
          } text-white`}
          onClick={startOrPauseGame}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ChessClock;
