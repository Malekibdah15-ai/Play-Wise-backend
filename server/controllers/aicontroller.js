const { askGemini } = require("../utils/askGemini");

const getRecommendations = async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "userInput is required" });
  }

  try {
    const prompt = `
Return ONLY valid JSON.
No explanation. No markdown.

[
  {
    "name": "Game name",
    "genre": ["Genre"],
    "description": "Short description",
    "rating": 1-5
  }
]

User preferences: ${userInput}
`;

    const text = await askGemini(prompt);

    const json = text.substring(
      text.indexOf("["),
      text.lastIndexOf("]") + 1
    );

    res.json(JSON.parse(json));
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Gemini AI failed", details: err.message });
  }
};

module.exports = { getRecommendations };
