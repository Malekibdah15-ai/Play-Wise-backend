const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("Game", gameSchema);
