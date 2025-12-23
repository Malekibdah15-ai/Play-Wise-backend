import { geminiModel } from "../config/gemini.js";

export const getRecommendations = async (req, res) => {
  const { userInput } = req.body;

  try {
    const prompt = `
You are a video game expert.
Based on the user's preferences, recommend 3 games.

Return ONLY a JSON array with this format:
[
  {
    "name": "Game name",
    "genre": ["Genre1", "Genre2"],
    "description": "Short description",
    "rating": 1-5,
    "guide": "Rules and tips for beginners and advanced players"
  }
]

User preferences: ${userInput}
`;

    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    const data = JSON.parse(text);
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gemini recommendation failed" });
  }
};
