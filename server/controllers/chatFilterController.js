const { askOpenAI } = require("../utils/askOpenAI.js");
const filterMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const prompt = `
You are a content moderation system.

Analyze the message below and respond with ONLY valid JSON.
No extra text.

Format:
{
  "safe": true,
  "reason": ""
}

Message:
"""${message}"""
`;

    const raw = await askOpenAI(prompt);

    const json = raw.substring(
      raw.indexOf("{"),
      raw.lastIndexOf("}") + 1
    );

    const data = JSON.parse(json);

    if (typeof data.safe !== "boolean") {
      throw new Error("Invalid AI response format");
    }

    res.json(data);
  } catch (error) {
    console.error("OpenAI moderation error:", error);
    res.status(200).json({
      safe: false,
      reason: "Message could not be verified",
    });
  }
};
module.exports = { filterMessage };