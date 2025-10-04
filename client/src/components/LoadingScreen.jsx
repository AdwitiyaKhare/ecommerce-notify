// LoadingScreen.jsx
import { useState, useEffect } from "react";
import SnakeGame from "./SnakeGame";

function GameCard({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-64 p-4 m-2 border-2 border-gray-600 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
    >
      <h2 className="text-lg font-bold mb-1">{title}</h2>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}

export default function LoadingScreen() {
  const [activeGame, setActiveGame] = useState(null);
  const [serverTime, setServerTime] = useState(0);

  // Increment server "waking up" timer every second
  useEffect(() => {
    const timer = setInterval(() => setServerTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const games = [
    {
      id: "snake",
      title: "Snake",
      description: "Classic snake game. Eat the food and grow!",
      component: <SnakeGame />,
    },
    {
      id: "dummy",
      title: "Coming Soon",
      description: "More fun mini-games will appear here!",
      component: null,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Top header for server loading - always visible */}
      <h1 className="text-xl mb-4 animate-pulse">
        Waking up server... {formatTime(serverTime)}
      </h1>

      {activeGame ? (
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => setActiveGame(null)}
            className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
          >
            ← Back to Games
          </button>
          {games.find((g) => g.id === activeGame)?.component}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              onClick={() => setActiveGame(game.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
