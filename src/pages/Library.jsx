import GameCard from "../components/GameCard";

export default function Library({ myGames }) {
  if (myGames.length === 0) {
    return (
      <div className="text-center mt-12 py-20 border border-dashed border-zinc-800 rounded-md">
        <h2 className="text-xl font-bold text-white mb-2">Library Kosong</h2>
        <p className="text-zinc-500 text-sm">Belum ada game yang ditambahkan dari Store.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {myGames.map((gameItem) => (
        <GameCard 
          key={gameItem.id} 
          game={gameItem} 
          onAction={() => alert(`Memulai ${gameItem.name}...`)} 
          actionText="PLAY" 
        />
      ))}
    </div>
  );
}