import express from "express";
import cors from "cors";
import fetch from "node-fetch"; 

const app = express();

app.use(cors());

app.get("/api/random", async (req, res) => {
  try {
    // Fetch random quote data from AnimeChan API
    const response = await fetch('https://animechan.io/api/v1/quotes/random');
    if (!response.ok) {
      throw new Error(`AnimeChan API responded with status ${response.status}`);
    }
    const data = await response.json();
    
    const quoteData = data.data;
    
    // Fetch anime image from Jikan API using the anime name
    const animeName = quoteData.anime.name;
    const jikanResponse = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`);

    if (!jikanResponse.ok) {
      throw new Error(`Jikan API responded with status ${jikanResponse.status}`);
    }
    const jikanData = await jikanResponse.json();
    
    // Check if anime image exists, otherwise use a placeholder image
    const animeImage = jikanData.data[0]?.images?.jpg?.image_url || "https://via.placeholder.com/150";

    // Return both the quote and the anime image to the frontend
    res.json({
      quote: quoteData.content,
      anime: quoteData.anime.name,
      character: quoteData.character.name,
      animeImage: animeImage, 
    });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ err: "Failed to fetch data from APIs" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
