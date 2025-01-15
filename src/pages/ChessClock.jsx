import { useState, useEffect } from "react";
import PlayerClock from "../components/PlayerClock";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

  // UseEffect to show alert when either player's time reaches 0
  useEffect(() => {
    if (player1Time === 0 || player2Time === 0) {
      MySwal.fire({
        title: "Time's Up!",
        html: `Player ${
          player1Time === 0 ? "1" : "2"
        }'s time is up. Please reset the timer.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Reset Timer",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          resetGame();
        } else {
          setIsRunning(false); // Pause the game
        }
      });
    }
  }, [player1Time, player2Time]); // Watch both player times

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
    if (!isRunning) return; // Prevent switching when the game is paused

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
      <h1 className="text-2xl font-bold mb-4" aria-label="Chess Clock Application">
        Chess Clock
      </h1>

      {/* Time Preset Buttons */}
      <div className="flex space-x-4 mb-6">
        {[60, 180, 300, 600, 1800, 3600].map((time) => (
          <button
            key={time}
            className={`px-4 py-2 rounded ${
              presetTime === time ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePresetChange(time)}
            aria-label={`Set timer to ${Math.floor(time / 60)} minutes`}
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
          aria-label={`Player 1 timer: ${formatTime(player1Time)}. Moves: ${player1Moves}`}
        />
        <PlayerClock
          player="Player 2"
          isActive={activePlayer === "player2"}
          time={formatTime(player2Time)}
          moves={player2Moves}
          onClick={activePlayer === "player2" && isRunning ? switchPlayer : null}
          aria-label={`Player 2 timer: ${formatTime(player2Time)}. Moves: ${player2Moves}`}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-4">
        {(player1Time > 0 && player2Time > 0) && (
          <button
            className={`px-4 py-2 rounded ${
              isRunning ? "bg-yellow-500" : "bg-green-500"
            } text-white`}
            onClick={startOrPauseGame}
            aria-label={isRunning ? "Pause the game" : "Start the game"}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
        )}
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            MySwal.fire({
              title: "Reset the clock?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              reverseButtons: true, // Ensures "No" appears first
            }).then((result) => {
              if (result.isConfirmed) {
                resetGame();
              }
            });
          }}
          aria-label="Reset the game timer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ChessClock;
