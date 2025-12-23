import { geminiModel } from "../config/gemini.js";

export const getDailyChallenges = async (req, res) => {
  try {
    const prompt = `
Generate 3 daily gaming challenges.

Return ONLY JSON:
[
  { "challenge": "Challenge text" }
]
`;

    const result = await geminiModel.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gemini challenges failed" });
  }
};
