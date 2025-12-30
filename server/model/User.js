const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    minlength: [5, "Username must be at least 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
  },
  communities: {
      type: String,
      ref: "Genre",
      default: []
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"]
  },
}, { 
    timestamps: true,
    collection: "User"
});

module.exports = mongoose.model("User", userSchema);