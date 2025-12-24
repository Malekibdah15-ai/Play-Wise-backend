const express = require("express");
const { getRecommendations } = require("../controllers/aicontroller.js");

const router = express.Router();
router.post("/recommend", getRecommendations);

module.exports = router;


