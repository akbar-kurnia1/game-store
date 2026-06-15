import { useState } from "react";
import { useLibraryContext } from "../contexts/LibraryContext";

export default function GameCard({ game, onAction, actionText, onViewDetails, onRemove }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { handleToggleWishlist, isInWishlist, isInLibrary } = useLibraryContext();

  const wishlisted = isInWishlist(game.id);
  const inLibrary = isInLibrary(game.id);

  return (
    <div className="bg-store-card rounded-lg overflow-hidden border border-store-border flex flex-col h-full hover:border-store-accent/40 hover:-translate-y-0.5 transition-all duration-200 group">
      
      <div
        className="overflow-hidden h-40 bg-store-dark relative cursor-pointer"
        onClick={() => onViewDetails && onViewDetails(game)}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton-shimmer"></div>
        )}
        <img 
          src={game.cover} 
          alt={game.name} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(game.id);
            }}
            className="absolute top-2 left-2 w-7 h-7 rounded-full bg-red-500/80 flex items-center justify-center text-white text-sm cursor-pointer hover:bg-red-600 transition-colors"
            title="Remove from Library"
          >
            ✕
          </button>
        )}

        {!inLibrary && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist(game);
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white text-sm cursor-pointer hover:bg-black/70 transition-colors"
            title={wishlisted ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
          >
            {wishlisted ? "★" : "☆"}
          </button>
        )}
      </div>
      
      <div className="flex flex-col p-4 flex-grow">
        <h2
          className="text-sm font-semibold text-store-heading line-clamp-2 leading-snug mb-1.5 cursor-pointer hover:text-store-accent transition-colors"
          onClick={() => onViewDetails && onViewDetails(game)}
        >
          {game.name}
        </h2>
        <span className="genre-tag mb-3">
          {game.genre}
        </span>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-store-border">
          <span className="badge-free">Free</span>
          <button 
            onClick={() => onAction(game)} 
            className="btn-primary text-xs px-4 py-1.5"
          >
            {actionText}
          </button>
        </div>
      </div>

    </div>
  );
}