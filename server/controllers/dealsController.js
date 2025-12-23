import { geminiModel } from "../config/gemini.js";

export const getBestDeal = async (req, res) => {
  const { gameName } = req.body;

  try {
    const prompt = `
Find the cheapest available deal for the game "${gameName}".

Return JSON only:
{
  "game": "${gameName}",
  "platform": "Platform name",
  "price": "$19.99",
  "buyLink": "https://example.com"
}
`;

    const result = await geminiModel.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gemini deal fetch failed" });
  }
};
