import { geminiModel } from "../config/gemini.js";

export const filterMessage = async (req, res) => {
  const { message } = req.body;

  try {
    const prompt = `
Check the following message for inappropriate or offensive language.

Respond ONLY in JSON:
{
  "safe": true,
  "reason": ""
}

Message: "${message}"
`;

    const result = await geminiModel.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Gemini moderation failed" });
  }
};
