const { askOpenAI } = require("../utils/askOpenAI.js");

const getDailyChallenges = async (req, res) => {
  try {
    const prompt = `
Generate 3 daily gaming challenges.

Return ONLY valid JSON.
Do not include explanations or text.

Format:
[
  { "challenge": "Challenge text" }
]
`;

    const raw = await askOpenAI(prompt);

    const json = raw.substring(
      raw.indexOf("["),
      raw.lastIndexOf("]") + 1
    );

    const data = JSON.parse(json);

    res.json(data);
  } catch (error) {
    console.error("OpenAI challenges error:", error);
    res.status(500).json({ error: "AI challenges failed" });
  }
};
module.exports = { getDailyChallenges };