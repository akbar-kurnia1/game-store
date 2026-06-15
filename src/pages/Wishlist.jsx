import { useState } from "react";
import GameCard from "../components/GameCard";
import GameModal from "../components/GameModal";
import { useLibraryContext } from "../contexts/LibraryContext";

export default function Wishlist() {
  const [selectedGame, setSelectedGame] = useState(null);
  const { myWishlist, handleAddToLibrary } = useLibraryContext();

  return (
    <div className="max-w-7xl mx-auto py-8 animate-fadeInUp">
      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-store-heading">
          ★ Wishlist
          {myWishlist.length > 0 && (
            <span className="text-store-text-dim text-sm font-normal ml-2">
              ({myWishlist.length} game)
            </span>
          )}
        </h2>
      </div>

      {myWishlist.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-store-border rounded-lg bg-store-card/30">
          <div className="text-3xl mb-3">☆</div>
          <h3 className="text-base font-semibold text-store-heading mb-1">Wishlist Kosong</h3>
          <p className="text-store-text-dim text-sm">
            Klik ikon bintang pada game di Store untuk menambahkannya ke sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {myWishlist.map((gameItem) => (
            <GameCard
              key={gameItem.id}
              game={gameItem}
              onAction={handleAddToLibrary}
              actionText="GET"
              onViewDetails={setSelectedGame}
            />
          ))}
        </div>
      )}
    </div>
  );
}
