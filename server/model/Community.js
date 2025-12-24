const mongoose = require('mongoose')

const communityPostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CommunityPost", communityPostSchema);
