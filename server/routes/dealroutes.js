const express = require("express");
const { getBestDeal } = require("../controllers/dealsController.js");


const router = express.Router();
router.post("/", getBestDeal);

module.exports = router;
