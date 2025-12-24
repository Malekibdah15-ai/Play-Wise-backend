const mongoose = require('mongoose')

const gameDealSchema = new mongoose.Schema({
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  store_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deal_url: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
  },
});

module.exports = mongoose.model("GameDeal", gameDealSchema);
