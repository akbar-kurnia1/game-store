export default function GameCard({ game, onAction, actionText }) {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex flex-col h-full hover:border-zinc-500 hover:-translate-y-1 transition group">
      
      <div className="overflow-hidden h-48 bg-zinc-950">
        <img 
          src={game.cover} 
          alt={game.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      <div className="flex flex-col p-5 flex-grow">
        <h2 className="text-base font-bold text-white line-clamp-2 leading-snug mb-1">
          {game.name}
        </h2>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          {game.genre}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
          <span className="text-xs font-bold text-zinc-400 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-full">
            FREE
          </span>
          <button 
            onClick={() => onAction(game)} 
            className="px-5 py-2 bg-white text-zinc-950 text-sm font-bold rounded-lg hover:bg-zinc-200 transition cursor-pointer"
          >
            {actionText}
          </button>
        </div>
      </div>

    </div>
  );
}