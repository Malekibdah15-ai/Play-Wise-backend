const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This links to your User model
    required: true
  },
  content: {
    type: String,
    required: [true, "Message content cannot be empty"],
    trim: true
  },
  genre: {
    type: String, // We use the slug here (e.g., 'fps', 'rpg')
    required: true,
    index: true // Makes searching by genre much faster
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Message", messageSchema);