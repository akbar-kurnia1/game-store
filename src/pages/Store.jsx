import { useState, useRef } from "react";
import GameCard from "../components/GameCard";
import GameModal from "../components/GameModal";
import useGames from "../hooks/useGames";

export default function Store({ onGetGame, onToggleWishlist, wishlist }) {
  const [selectedGame, setSelectedGame] = useState(null);
  const featuredRef = useRef(null);

  const {
    loading,
    error,
    searchQuery,
    heroGames,
    heroIndex,
    setHeroIndex,
    heroImages,
    currentHero,
    featuredGames,
    activeGenre,
    setActiveGenre,
    uniqueGenres,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedGames,
    filteredCatalog,
    getPageNumbers,
  } = useGames();

  const isInWishlist = (gameId) => {
    return wishlist.some((item) => item.id === gameId);
  };

  const scrollFeatured = (direction) => {
    if (!featuredRef.current) return;
    const amount = 400;
    featuredRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <div className="skeleton-shimmer h-72 rounded-lg mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="skeleton-shimmer h-56 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto text-center py-20">
        <p className="text-red-400 font-semibold mb-2">Terjadi Kesalahan</p>
        <p className="text-store-text-dim text-sm">{error}</p>
      </div>
    );
  }

  if (searchQuery) {
    return (
      <div className="max-w-7xl mx-auto animate-fadeInUp">
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onGetGame={onGetGame}
          onWishlist={onToggleWishlist}
          isWishlisted={selectedGame ? isInWishlist(selectedGame.id) : false}
        />
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Hasil pencarian "{searchQuery}"
          </h2>
          <p className="text-store-text-dim text-sm mt-1">
            {filteredCatalog.length} game ditemukan
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {paginatedGames.length > 0 ? (
            paginatedGames.map((gameItem) => (
              <GameCard
                key={gameItem.id}
                game={gameItem}
                onAction={onGetGame}
                actionText="GET"
                onWishlist={onToggleWishlist}
                isWishlisted={isInWishlist(gameItem.id)}
                onViewDetails={setSelectedGame}
              />
            ))
          ) : (
            <p className="col-span-full text-center py-10 text-store-text-dim">
              Tidak ada game yang cocok.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={getPageNumbers()}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto">

      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onGetGame={onGetGame}
        onWishlist={onToggleWishlist}
        isWishlisted={selectedGame ? isInWishlist(selectedGame.id) : false}
      />

      {currentHero && (
        <div className="relative h-72 md:h-96 rounded-lg overflow-hidden animate-fadeInUp">
          <img
            src={heroImages[currentHero.id] || currentHero.cover}
            alt={currentHero.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-store-dark via-store-dark/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-store-dark via-transparent to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-md">
            <span className="genre-tag mb-2 inline-block">{currentHero.genre}</span>
            <h1 className="text-xl md:text-3xl font-bold text-white mb-3">
              {currentHero.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="badge-free">Free to Play</span>
              <button onClick={() => onGetGame(currentHero)} className="btn-primary text-sm px-6 py-2">
                Add to Library
              </button>
            </div>
          </div>

          <button
            onClick={() => setHeroIndex((prev) => (prev - 1 + heroGames.length) % heroGames.length)}
            className="scroll-arrow scroll-arrow-left"
          >
            ‹
          </button>
          <button
            onClick={() => setHeroIndex((prev) => (prev + 1) % heroGames.length)}
            className="scroll-arrow scroll-arrow-right"
          >
            ›
          </button>

          <div className="absolute bottom-4 right-4 md:right-8 flex gap-1.5">
            {heroGames.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === heroIndex ? "bg-white w-5" : "bg-white/30 hover:bg-white/50"
                  }`}
              ></button>
            ))}
          </div>
        </div>
      )}

      {featuredGames.length > 0 && (
        <div className="animate-fadeInUp">
          <h2 className="text-base font-semibold text-white mb-4">Featured & Recommended</h2>
          <div className="relative">
            <button onClick={() => scrollFeatured("left")} className="scroll-arrow scroll-arrow-left">
              ‹
            </button>

            <div ref={featuredRef} className="flex overflow-x-auto snap-x gap-4 pb-2 hide-scrollbar">
              {featuredGames.map((game) => (
                <div
                  key={game.id}
                  className="w-4/5 md:w-3/5 lg:w-1/2 snap-center shrink-0 relative h-56 md:h-72 rounded-lg overflow-hidden border border-store-border group"
                >
                  <img
                    src={heroImages[game.id] || game.cover}
                    alt={game.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-store-dark via-store-dark/20 to-transparent flex flex-col justify-end p-5">
                    <span className="genre-tag mb-1">{game.genre}</span>
                    <h3 className="text-white text-lg font-bold mb-2">{game.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="badge-free">Free</span>
                      <button onClick={() => onGetGame(game)} className="btn-primary text-xs px-4 py-1.5">
                        Add to Library
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => scrollFeatured("right")} className="scroll-arrow scroll-arrow-right">
              ›
            </button>
          </div>
        </div>
      )}

      <div className="mb-10 animate-fadeInUp">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
          <h2 className="text-base font-semibold text-white">Browse Games</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {uniqueGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${activeGenre === genre
                    ? "bg-store-accent text-white border-store-accent"
                    : "bg-store-card text-store-text-dim border-store-border hover:border-store-text-dim hover:text-white"
                  }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {paginatedGames.length > 0 ? (
            paginatedGames.map((gameItem) => (
              <GameCard
                key={gameItem.id}
                game={gameItem}
                onAction={onGetGame}
                actionText="GET"
                onWishlist={onToggleWishlist}
                isWishlisted={isInWishlist(gameItem.id)}
                onViewDetails={setSelectedGame}
              />
            ))
          ) : (
            <p className="col-span-full text-center py-10 text-store-text-dim">
              Tidak ada game di genre ini.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={getPageNumbers()}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

function PaginationBar({ currentPage, totalPages, pageNumbers, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded bg-store-card border border-store-border text-store-text-dim hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
      >
        ‹ Prev
      </button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-store-text-dim">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 text-sm rounded border cursor-pointer ${currentPage === page
                ? "bg-store-accent text-white border-store-accent"
                : "bg-store-card border-store-border text-store-text-dim hover:text-white"
              }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded bg-store-card border border-store-border text-store-text-dim hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
      >
        Next ›
      </button>
    </div>
  );
}