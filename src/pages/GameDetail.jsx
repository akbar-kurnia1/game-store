import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function GameDetail({ onGetGame, onToggleWishlist, wishlist, library }) {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const screenshotRef = useRef(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/game?id=${id}`);
        const data = await response.json();
        setGameData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const isWishlisted = wishlist.some((item) => item.id === Number(id));
  const isInLibrary = library.some((item) => item.id === Number(id));

  const scrollScreenshots = (direction) => {
    if (!screenshotRef.current) return;
    screenshotRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10">
        <div className="skeleton-shimmer h-72 rounded-lg mb-6"></div>
        <div className="skeleton-shimmer h-8 w-1/2 rounded mb-4"></div>
        <div className="skeleton-shimmer h-4 w-full rounded mb-2"></div>
        <div className="skeleton-shimmer h-4 w-3/4 rounded"></div>
      </div>
    );
  }

  if (error || !gameData) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        <p className="text-red-400 font-semibold mb-2">Gagal memuat detail game</p>
        <p className="text-store-text-dim text-sm">{error}</p>
        <Link to="/" className="text-store-accent text-sm mt-4 inline-block hover:underline">
          ← Kembali ke Store
        </Link>
      </div>
    );
  }

  const gameForAction = {
    id: gameData.id,
    name: gameData.title,
    cover: gameData.thumbnail,
    genre: gameData.genre,
    shortDescription: gameData.short_description,
    developer: gameData.developer,
    publisher: gameData.publisher,
    platform: gameData.platform,
    releaseDate: gameData.release_date,
  };

  const sysReq = gameData.minimum_system_requirements;

  return (
    <div className="max-w-5xl mx-auto py-6 animate-fadeInUp">
      <Link to="/" className="text-store-text-dim text-sm hover:text-white mb-4 inline-block">
        ← Kembali ke Store
      </Link>

      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
        <img
          src={gameData.thumbnail}
          alt={gameData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-store-dark via-store-dark/40 to-transparent"></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{gameData.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="badge-free">Free to Play</span>
            <span className="genre-tag">{gameData.genre}</span>
            {gameData.platform && (
              <span className="text-store-text-dim">• {gameData.platform}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onGetGame(gameForAction)}
            className="btn-primary text-sm px-6 py-2.5"
            disabled={isInLibrary}
          >
            {isInLibrary ? "✓ Di Library" : "Add to Library"}
          </button>
          <button
            onClick={() => onToggleWishlist(gameForAction)}
            className={`text-sm px-4 py-2.5 rounded border cursor-pointer transition-colors ${
              isWishlisted
                ? "border-store-accent text-store-accent"
                : "border-store-border text-store-text-dim hover:text-white"
            }`}
          >
            {isWishlisted ? "★ Wishlisted" : "☆ Wishlist"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <h2 className="text-base font-semibold text-white mb-3">About This Game</h2>
          <p className="text-store-text text-sm leading-relaxed whitespace-pre-line">
            {gameData.description || gameData.short_description}
          </p>
        </div>

        <div className="bg-store-card border border-store-border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Game Info</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <span className="text-store-text-dim block text-xs">Developer</span>
              <span className="text-white">{gameData.developer}</span>
            </div>
            <div>
              <span className="text-store-text-dim block text-xs">Publisher</span>
              <span className="text-white">{gameData.publisher}</span>
            </div>
            <div>
              <span className="text-store-text-dim block text-xs">Release Date</span>
              <span className="text-white">{gameData.release_date}</span>
            </div>
            {gameData.status && (
              <div>
                <span className="text-store-text-dim block text-xs">Status</span>
                <span className="text-white">{gameData.status}</span>
              </div>
            )}
            {gameData.game_url && (
              <a
                href={gameData.game_url}
                target="_blank"
                rel="noreferrer"
                className="text-store-accent text-xs hover:underline mt-1"
              >
                Kunjungi Website Game →
              </a>
            )}
          </div>
        </div>
      </div>

      {gameData.screenshots && gameData.screenshots.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-white mb-3">Screenshots</h2>
          <div className="relative">
            <button
              onClick={() => scrollScreenshots("left")}
              className="scroll-arrow scroll-arrow-left"
            >
              ‹
            </button>
            <div
              ref={screenshotRef}
              className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar"
            >
              {gameData.screenshots.map((ss) => (
                <img
                  key={ss.id}
                  src={ss.image}
                  alt="Screenshot"
                  loading="lazy"
                  className="h-44 md:h-56 rounded-lg shrink-0 object-cover border border-store-border"
                />
              ))}
            </div>
            <button
              onClick={() => scrollScreenshots("right")}
              className="scroll-arrow scroll-arrow-right"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {sysReq && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-white mb-3">Minimum System Requirements</h2>
          <div className="bg-store-card border border-store-border rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {sysReq.os && (
                <div>
                  <span className="text-store-text-dim block text-xs">OS</span>
                  <span className="text-white">{sysReq.os}</span>
                </div>
              )}
              {sysReq.processor && (
                <div>
                  <span className="text-store-text-dim block text-xs">Processor</span>
                  <span className="text-white">{sysReq.processor}</span>
                </div>
              )}
              {sysReq.memory && (
                <div>
                  <span className="text-store-text-dim block text-xs">Memory</span>
                  <span className="text-white">{sysReq.memory}</span>
                </div>
              )}
              {sysReq.graphics && (
                <div>
                  <span className="text-store-text-dim block text-xs">Graphics</span>
                  <span className="text-white">{sysReq.graphics}</span>
                </div>
              )}
              {sysReq.storage && (
                <div>
                  <span className="text-store-text-dim block text-xs">Storage</span>
                  <span className="text-white">{sysReq.storage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
