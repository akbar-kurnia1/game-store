import { useState } from "react";
import { gameList } from "./dataGames";
import GameCard from "./components/GameCard";
import Navbar from "./components/Navbar";
function App() {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const handleFavoriteChange = (isAdding) => {
    if (isAdding) {
      setFavoriteCount(favoriteCount + 1);
    } else {
      setFavoriteCount(favoriteCount - 1);
    }
  };
  return (
    <div className=" bg-white min-h-screen text-black">
      <Navbar totalFavorites={favoriteCount} />
      <div className="px-4 md:px-8 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {gameList.map((gameItem) => (
          <GameCard 
          key={gameItem.id}
          game={gameItem}
          onFavoriteChange={handleFavoriteChange}
          />
        ))}
      </div>
    </div>
    <div className="text-center text-sm font-bold py-6 border-t-2 border-black mt-8">
        Copyright © 2026 Akbar-Kurnia1. All rights reserved.
      </div>
    </div>
  );
}
export default App;