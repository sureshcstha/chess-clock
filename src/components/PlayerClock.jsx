const PlayerClock = ({ player, isActive, time, moves, onClick }) => {
  return (
    <div
      className={`p-24 border rounded ${isActive ? "bg-blue-200" : ""}`}
      onClick={onClick}
    >
      <h2 className="text-xl">{player}</h2>
      <p className="text-4xl">{time}</p>
      <p className="text-lg">Moves: {moves}</p>
    </div>
  );
};

export default PlayerClock;
