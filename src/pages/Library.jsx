import { useState } from "react";
import GameCard from "../components/GameCard";
import GameModal from "../components/GameModal";
import { useLibraryContext } from "../contexts/LibraryContext";

export default function Library() {
  const [selectedGame, setSelectedGame] = useState(null);
  const { myLibrary, handleRemoveFromLibrary } = useLibraryContext();

  if (myLibrary.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <h2 className="text-lg font-semibold text-store-heading mb-6">My Library</h2>
        <div className="text-center py-20 border border-dashed border-store-border rounded-lg bg-store-card/30">
          <div className="text-3xl mb-3">🎮</div>
          <h3 className="text-base font-semibold text-store-heading mb-1">Library Kosong</h3>
          <p className="text-store-text-dim text-sm">
            Belum ada game yang ditambahkan. Kunjungi Store untuk menemukan game.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 animate-fadeInUp">
      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-store-heading">
          My Library
          <span className="text-store-text-dim text-sm font-normal ml-2">
            ({myLibrary.length} game)
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {myLibrary.map((gameItem) => (
          <GameCard 
            key={gameItem.id} 
            game={gameItem} 
            onAction={() => alert(`Memulai ${gameItem.name}...`)} 
            actionText="PLAY"
            onViewDetails={setSelectedGame}
            onRemove={handleRemoveFromLibrary}
          />
        ))}
      </div>
    </div>
  );
}