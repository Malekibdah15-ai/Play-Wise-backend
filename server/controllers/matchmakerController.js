const { askGemini } = require("../utils/askGemini");

const matchmaker = async (req, res) => {
  const { mood, genre, time } = req.body;

  const prompt = `
You are a video game expert.

IMPORTANT RULES:
- You MUST return ALL fields
- NEVER omit a field
- If unsure, invent realistic values
- Return ONLY JSON (no text, no markdown)

Recommend ONE video game based on:
Mood: ${mood}
Genre: ${genre}
Play time: ${time}

Return ONLY valid JSON in this exact format:
{
  "name": "Game name",
  "reason": "Why this game fits the user",
  "rating": 1-5,
  "image": "Direct image URL of the game cover",
  "store": "Store name (Steam, Epic Games, PlayStation)",
  "price": "$19.99",
  "buyLink": "Official store purchase link"
}

Rules:
- Use a real popular game
- Image must be a real public image URL
- Buy link must look realistic
- Do NOT include markdown or text outside JSON
`;

  try {
    const result = await askGemini(prompt);

    
    const json = result.substring(
      result.indexOf("{"),
      result.lastIndexOf("}") + 1
    );

    res.json(JSON.parse(json));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI recommendation failed" });
  }
};

module.exports = { matchmaker };
