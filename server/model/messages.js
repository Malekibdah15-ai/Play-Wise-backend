const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, "Message content cannot be empty"],
    trim: true
  },
  time : {
    type: Date,
    default: Date.now
  },
  genre: {
    type: String, 
    required: true,
    index: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Message", messageSchema);