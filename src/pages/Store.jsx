import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

export default function Store({ onGetGame }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("https://api.codetabs.com/v1/proxy?quest=https://www.freetogame.com/api/games");
        const data = await response.json();

        const formattedData = data.slice(0, 40).map(item => ({
          id: item.id,
          name: item.title,
          cover: item.thumbnail,
          genre: item.genre
        }));
        
        setGames(formattedData); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, []);

  if (loading) return <p className="text-center text-zinc-500 mt-20">Loading games...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">Error: {error}</p>;

  const topGames = games.slice(0, 10);
  const featuredGames = games.slice(10, 15);
  const bottomGames = games.slice(15, 40);
  const allGenres = bottomGames.map(game => game.genre);
  const uniqueGenres = ["All", ...new Set(allGenres)];
  const filteredBottomGames = activeGenre === "All" 
    ? bottomGames 
    : bottomGames.filter(game => game.genre === activeGenre);

  return (
    <div className="flex flex-col gap-14">
      
      <div>
        <h2 className="text-lg font-bold mb-4 text-white">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topGames.map((gameItem) => (
            <GameCard key={gameItem.id} game={gameItem} onAction={onGetGame} actionText="GET" />
          ))}
        </div>
      </div>

      {featuredGames.length > 0 && (
        <div className="w-full">
          <h2 className="text-lg font-bold mb-4 text-white">Featured Discovery</h2>
          <div className="flex overflow-x-auto snap-x gap-6 pb-4">
            {featuredGames.map(game => (
              <div key={game.id} className="w-11/12 md:w-2/3 lg:w-1/2 snap-center shrink-0 relative h-80 md:h-96 rounded-xl overflow-hidden border border-zinc-800 group">
                
                <img 
                  src={game.cover} 
                  alt={game.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <span className="text-zinc-400 font-bold text-xs mb-2 uppercase">
                    {game.genre}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                    {game.name}
                  </h3>
                  <button 
                    onClick={() => onGetGame(game)}
                    className="w-fit px-6 py-2.5 bg-white text-zinc-950 font-bold rounded hover:bg-zinc-300 transition"
                  >
                    Add to Library
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-lg font-bold text-white">More to Explore</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {uniqueGenres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                  activeGenre === genre 
                    ? "bg-white text-zinc-950 border-white" 
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredBottomGames.length > 0 ? (
            filteredBottomGames.map((gameItem) => (
              <GameCard key={gameItem.id} game={gameItem} onAction={onGetGame} actionText="GET" />
            ))
          ) : (
            <p className="col-span-full text-center py-10 text-zinc-600">No games found in this genre.</p>
          )}
        </div>
      </div>

    </div>
  );
}