export default function Navbar({ totalFavorites }) {
    return (
        <nav className="border-b-2 border-black bg-white px-4 md:px-8 py-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="font-bold text-2xl">
          My Game Collections
        </div>

        <div className="flex gap-6 font-bold text-sm">
          <span className="cursor-pointer border-b-2 border-black pb-1">Library</span>
          <span className="cursor-pointer text-gray-400 hover:text-black transition-colors pb-1">Store</span>
          <span className="cursor-pointer text-gray-400 hover:text-black transition-colors pb-1">Community</span>
        </div>

        <div className="border-2 border-black px-3 py-1 font-bold text-sm bg-gray-200">
          <span>⭐</span> Favorites: {totalFavorites}
        </div>
  
      </nav>
    );
  }