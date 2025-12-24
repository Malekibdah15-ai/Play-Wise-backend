const User = require('../model/User.js');

module.exports.findAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch (err){
        res.json(err);
    }
}

module.exports.findOneSingleUser = async (req, res) => {

    try{
        const user = await User.findOne({ _id: req.params.id });
        res.json(user);
    }catch(err){
        res.json(err)
    }
}

module.exports.createNewUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.json({ user });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ errors: err.errors });
        }
        return res.json(err);
    }
}