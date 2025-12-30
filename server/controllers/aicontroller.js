const { askGemini } = require("../utils/askGemini");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3f2a2d6f8113450f80d5850819bd14f6');
// 3f2a2d6f8113450f80d5850819bd14f6q
const getRecommendations = async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "userInput is required" });
  }

  try {
    const prompt = `
    Return ONLY valid JSON. No markdown.
    Role: You are a Professional Gaming Market Analyst & Consultant.  
    Objective: Analyze the user's input: "${userInput}". 
    Identify the user's gaming needs and return a list of recommended games. For each game, perform a market analysis to find the two best reputable platforms to purchase from (e.g., Steam, Epic Games Store, GOG, PlayStation Store, or Xbox Store) and provide a direct link to the official trailer.

    Strictly return exactly this JSON format:
    {
    "type": "recommendations",
    "analysis_summary": "Short professional analysis of why these games fit the user's input.",
    "games": [
    {
      "name": "Game Title",
      "genre": chose one of this genres only ["fps","battle-royale","fighting","hack-and-slash","rpg","mmorpg","action-adventure","soulslike","rts","moba","tower-defense","turn-based","racing","sports","simulation","survival","horror","puzzle"],
      "description": "A professional, engaging 2-sentence not more than tow lines of description.",
      "detales" : "more detales about the game like cop how many pylers can Xbos players play it not more that one Line ....",
      "rating": 5,
      "trailer_url": "Ensure this is a YouTube EMBED link (e.g., https://www.youtube.com/embed/VIDEO_ID) to avoid iframe errors."  
      "best_deals": 
        {
          "store_name": "Store Name",
          "price":I need real time Pricing "$XX.XX",
          "url": "https://store.link/game"
        }
    }
  ]
}
`;

  const text = await askGemini(prompt);

// This logic now works for BOTH options because both start with {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}") + 1;
    if (start === -1) throw new Error("No JSON found In AI response");

    const jsonString = text.substring(start, end);
    res.json(JSON.parse(jsonString));
    console.log("this is tahe text");
    console.log(jsonString);

    
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Gemini AI failed", details: err.message });
  }
};



const getNews = async (req, res) => {
  const { communities } = req.body;

  if (!communities || !Array.isArray(communities)) {
    return res.status(400).json({ error: "communities array is required" });
  }

  try {
    // 1. Group communities and add "gaming" to ensure context
    // Result: "(GTA OR Valorant) AND gaming"
    const query = `(${communities.join(' OR ')}) AND gaming`;

    const response = await newsapi.v2.everything({
      q: query,
      searchIn: 'title,description', // Focuses search on the main text
      language: 'en',
      sortBy: 'relevancy', // Changed from 'publishedAt' to 'relevancy' to avoid random spam
      pageSize: 10,
      // Optional: restrict to gaming-specific domains
      domains: 'ign.com,gamespot.com,kotaku.com,pcgamer.com,polygon.com' 
    });

    const formattedNews = response.articles.map((article) => ({
      title: article.title,
      category: article.source.name || "Game News",
      image: article.urlToImage || "https://via.placeholder.com/600x400?text=Gaming+News",
      Link: article.url,
      data: new Date(article.publishedAt).toLocaleDateString()
    }));

    res.json({ newsItems: formattedNews });

  } catch (err) {
    console.error("NewsAPI error:", err);
    res.status(500).json({ error: "Failed to fetch news", details: err.message });
  }
};
module.exports = { getRecommendations, getNews };