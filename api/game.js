const API_URL = process.env.FREETOGAME_API_URL;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing 'id' query parameter" });
  }

  try {
    const response = await fetch(`${API_URL}/game?id=${id}`);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `FreeToGame API responded with status ${response.status}`,
      });
    }

    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1200");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
