const messages = require("../model/messages");


module.exports.findMessagesByGenre = async (req, res) => {
    try {
        const genreMessages = await messages.find({ genre: req.params.genreSlug })
            .populate('sender', 'userName') // This swaps the ID for the actual User object
            .sort({ createdAt: 1 });        // Sort so oldest is at top, newest at bottom

        res.status(200).json(genreMessages);
    } catch (err) {
        res.status(400).json({ message: "Error fetching messages", error: err });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const Mes = await messages.find();
        res.status(200).json(Mes);
    } catch (err) {
        res.status(400).json(err);
    }
};

