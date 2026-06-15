import { Link } from "react-router-dom";
import { useLibraryContext } from "../contexts/LibraryContext";

export default function GameModal({ game, onClose }) {
  const { handleAddToLibrary, handleToggleWishlist, isInWishlist, isInLibrary, handleRemoveFromLibrary } = useLibraryContext();

  if (!game) return null;

  const wishlisted = isInWishlist(game.id);
  const inLibrary = isInLibrary(game.id);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-store-card border border-store-border rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-fadeInUp">
        
        <div className="relative">
          <img
            src={game.cover}
            alt={game.name}
            className="w-full h-48 md:h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 cursor-pointer text-lg"
          >
            ✕
          </button>
          <span className="absolute bottom-3 left-3 badge-free">{game.genre}</span>
        </div>

        <div className="p-5 md:p-6">
          <h2 className="text-xl font-bold text-store-heading mb-2">{game.name}</h2>

          {game.shortDescription && (
            <p className="text-store-text text-sm leading-relaxed mb-4">
              {game.shortDescription}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm mb-5">
            {game.developer && (
              <div>
                <span className="text-store-text-dim">Developer</span>
                <p className="text-store-heading">{game.developer}</p>
              </div>
            )}
            {game.publisher && (
              <div>
                <span className="text-store-text-dim">Publisher</span>
                <p className="text-store-heading">{game.publisher}</p>
              </div>
            )}
            {game.platform && (
              <div>
                <span className="text-store-text-dim">Platform</span>
                <p className="text-store-heading">{game.platform}</p>
              </div>
            )}
            {game.releaseDate && (
              <div>
                <span className="text-store-text-dim">Release Date</span>
                <p className="text-store-heading">{game.releaseDate}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-store-border">
            {inLibrary ? (
              <button
                onClick={() => { handleRemoveFromLibrary(game.id); onClose(); }}
                className="bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30 font-semibold text-sm px-5 py-2 rounded transition-colors cursor-pointer"
              >
                Remove from Library
              </button>
            ) : (
              <button
                onClick={() => { handleAddToLibrary(game); onClose(); }}
                className="btn-primary text-sm px-5 py-2"
              >
                Add to Library
              </button>
            )}

            <Link
              to={`/game/${game.id}`}
              onClick={onClose}
              className="text-sm px-5 py-2 rounded bg-store-hover text-store-heading hover:bg-store-border transition-colors"
            >
              Lihat Detail Lengkap →
            </Link>

            {!inLibrary && (
              <button
                onClick={() => handleToggleWishlist(game)}
                className={`text-sm px-4 py-2 rounded border cursor-pointer transition-colors ${
                  wishlisted
                    ? "border-store-accent text-store-accent"
                    : "border-store-border text-store-text-dim hover:text-store-heading"
                }`}
              >
                {wishlisted ? "★ Wishlisted" : "☆ Wishlist"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
