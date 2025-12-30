const ai = require("../config/gemini");

const askGemini = async (prompt) => {
  const response = await ai.models.generateContent({
     model: "gemini-3-flash-preview", 
    // model:"gemini-2.5-flash-lite",
    contents: prompt,
  });
  return response.text;
};

module.exports = { askGemini };
 
