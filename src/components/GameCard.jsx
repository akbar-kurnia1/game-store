import {useState} from "react";
export default function GameCard({ game, onFavoriteChange }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [rating, setRating] = useState(0);
    const handleIncrease = () => {
        if (rating < 5) {
            setRating(rating + 1);
        }
    };
    const handleDecrease = () => {
        if (rating > 0) {
            setRating(rating - 1);
        }
    }
    const toggleFavorite = () => {
      const newStatus = !isFavorite;
      setIsFavorite(newStatus);
      onFavoriteChange(newStatus);
    };
    return (
        <div className="border-2 border-black bg-white flex flex-col items-center p-3 h-full">
      <img 
        src={game.cover} 
        alt={game.name} 
        className="w-full h-auto aspect-3/4 object-cover border border-black mb-3" 
      />
      <div className="flex flex-col items-center w-full text-center gap-1.5">
      <h2 className="text-base font-bold line-clamp-2 min-h-12 flex items-center justify-center w-full">
        {game.name}
        </h2>
        <p className="text-xs text-gray-700">{game.genre}</p>
        <button 
          onClick={toggleFavorite}
          className="text-xl cursor-pointer"
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
        <div className="flex items-center gap-1.5 mt-1 w-full justify-center relative">
          <button 
            onClick={handleDecrease}
            className="w-6 h-6 border-2 border-black bg-gray-200 font-bold hover:bg-gray-300 cursor-pointer flex items-center justify-center text-xs"
          >
            -
          </button>
          
          <span className="text-sm font-bold w-4 text-center">{rating}</span>
          
          <button 
            onClick={handleIncrease}
            className="w-6 h-6 border-2 border-black bg-gray-200 font-bold hover:bg-gray-300 cursor-pointer flex items-center justify-center text-xs"
          >
            +
          </button>

        {rating === 1 && (
          <span className="absolute right-0 font-bold text-red-600 text-xs">
            Very Bad
          </span>
        )}
        {rating === 2 && (
          <span className="absolute right-0 font-bold text-orange-600 text-xs">
            Bad
          </span>
        )}
        {rating === 3 && (
          <span className="absolute right-0 font-bold text-yellow-600 text-xs">
            Not Bad
          </span>
        )}
        {rating === 4 && (
          <span className="absolute right-0 font-bold text-green-600 text-xs">
            Good
          </span>
        )}
        {rating === 5 && (
          <span className="absolute right-0 font-bold text-purple-600 text-xs">
            Masterpiece
          </span>
        )}
        </div>
      </div>
    </div>
  );
}