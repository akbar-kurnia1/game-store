import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GAMES_PER_PAGE = 20;
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGenre, setActiveGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroImages, setHeroImages] = useState({});

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${API_BASE}/games`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Data game tidak tersedia. Silakan coba lagi nanti.");
        }

        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.title,
          cover: item.thumbnail,
          genre: item.genre,
          shortDescription: item.short_description,
          developer: item.developer,
          publisher: item.publisher,
          platform: item.platform,
          releaseDate: item.release_date,
        }));

        setGames(formattedData);

        const hdSlice = data.slice(0, 12);
        const detailPromises = hdSlice.map((item) =>
          fetch(`${API_BASE}/game?id=${item.id}`)
            .then((res) => res.json())
            .then((detail) => ({
              id: item.id,
              image:
                detail.screenshots && detail.screenshots.length > 0
                  ? detail.screenshots[0].image
                  : item.thumbnail,
            }))
            .catch(() => ({ id: item.id, image: item.thumbnail }))
        );

        const hdDetails = await Promise.all(detailPromises);
        const imageMap = {};
        hdDetails.forEach((h) => {
          imageMap[h.id] = h.image;
        });
        setHeroImages(imageMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const heroGames = games.slice(0, 5);

  useEffect(() => {
    if (heroGames.length === 0) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroGames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroGames.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeGenre, searchQuery]);

  const featuredGames = games.slice(5, 12);
  const catalogGames = games.slice(12);

  let filteredCatalog = catalogGames;

  if (searchQuery) {
    filteredCatalog = games.filter((game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (activeGenre !== "All") {
    filteredCatalog = catalogGames.filter(
      (game) => game.genre === activeGenre
    );
  }

  const allGenres = catalogGames.map((g) => g.genre);
  const uniqueGenres = ["All", ...new Set(allGenres)];

  const totalPages = Math.ceil(filteredCatalog.length / GAMES_PER_PAGE);
  const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
  const paginatedGames = filteredCatalog.slice(
    startIndex,
    startIndex + GAMES_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const currentHero = heroGames[heroIndex];

  return {
    games,
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
  };
}
