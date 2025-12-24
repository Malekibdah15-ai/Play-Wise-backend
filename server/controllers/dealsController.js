const { askOpenAI } = require("../utils/askOpenAI.js");

const getBestDeal = async (req, res) => {
  const { gameName } = req.body;

  if (!gameName) {
    return res.status(400).json({ error: "gameName is required" });
  }

  try {
    const prompt = `
You are a game deal finder.

Find the cheapest available deal for the game "${gameName}".

Respond with ONLY valid JSON.
No explanations or extra text.

Format:
{
  "game": "${gameName}",
  "platform": "Platform name",
  "price": "$19.99",
  "buyLink": "https://example.com"
}
`;

    const raw = await askOpenAI(prompt);

    const json = raw.substring(
      raw.indexOf("{"),
      raw.lastIndexOf("}") + 1
    );

    const data = JSON.parse(json);

    if (!data.game || !data.platform || !data.price || !data.buyLink) {
      throw new Error("Invalid AI deal format");
    }

    res.json(data);
  } catch (error) {
    console.error("OpenAI deal error:", error);
    res.status(200).json({
      game: gameName,
      platform: "Unknown",
      price: "N/A",
      buyLink: "",
      note: "Live deal data unavailable",
    });
  }
};
module.exports = { getBestDeal };