const { GoogleGenAI } = require("@google/genai");

// Uses GEMINI_API_KEY automatically
const ai = new GoogleGenAI({});


module.exports = ai;
