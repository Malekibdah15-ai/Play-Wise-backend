const mongoose = require('mongoose')

const communityPostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  genre: {
    type :String,
    required: true,
    index: true
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
