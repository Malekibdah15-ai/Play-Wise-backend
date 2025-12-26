const User = require('../model/User.js');
const bcrypt = require('bcrypt');

module.exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.json(users);
    } catch (err) {
        res.json(err);
    }
}

module.exports.findOneSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.json(user);
    } catch (err) {
        res.json(err)
    }
}
module.exports.createNewUser = async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({
            errors: "This email is already taken" 
        });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
            mes: "The new user has been created"
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(401).json({
                errors: err.errors
            });
        }
        return res.status(500).json({
            errors: "Something went wrong",
            error: err
        });
    }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
        errors: "Email and password are required" 
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({errors: "Invalid email or password"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        errors: "Invalid email or password"  
      });
    }
    return res.status(201).json({
      message: "Login successful",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};
