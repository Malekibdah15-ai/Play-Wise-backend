const express = require('express');
const router = express.Router();
const GenerController = require('../controllers/GenerController.js');

router.get("/",GenerController.findAllCom);


module.exports = router