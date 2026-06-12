import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function useGameDetail(id) {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/game?id=${id}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.id) {
          throw new Error("Detail game tidak ditemukan.");
        }

        setGameData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { gameData, loading, error };
}
