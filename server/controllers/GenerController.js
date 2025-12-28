const Gener = require("../model/Gener")

module.exports.findAllCom = async (req, res) => {
    try {
        const AllCom =  await Gener.find();
        res.status(200).json(AllCom) 
    }catch (err){
        res.status(400).json(err)
    }
}
