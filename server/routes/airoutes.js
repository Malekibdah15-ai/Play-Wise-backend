const express = require("express");
const { getRecommendations ,getNews } = require("../controllers/aicontroller");

const router = express.Router();
router.post("/recommend", getRecommendations);
router.post("/news", getNews);
module.exports = router;


