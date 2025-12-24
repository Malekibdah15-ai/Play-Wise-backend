const { openai } = require("../config/openAi.js");

const askOpenAI = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

module.exports = { askOpenAI };
