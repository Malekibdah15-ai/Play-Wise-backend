
const { askOpenAI } = require("../utils/askOpenAI.js");

const getRecommendations = async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "userInput is required" });
  }

  try {
    const prompt = `
You are a video game expert.
Based on the user's preferences, recommend 3 games.

Return ONLY valid JSON.
NO markdown. NO explanations.

Format:
[
  {
    "name": "Game name",
    "genre": ["Genre1", "Genre2"],
    "description": "Short description",
    "rating": 1-5,
    "guide": "Rules and tips"
  }
]

User preferences: ${userInput}
`;

    const text = await askOpenAI(prompt);

    console.log("RAW AI RESPONSE:");
    console.log(text);

    const data = JSON.parse(text);

    res.json(data);
  } catch (error) {
    console.error("FULL AI ERROR:", error);
    res.status(500).json({
      error: "AI recommendation failed",
      details: error.message
    });
  }
};

module.exports = { getRecommendations };
