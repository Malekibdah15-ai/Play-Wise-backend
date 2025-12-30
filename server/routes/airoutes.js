const express = require("express");
const { getRecommendations ,getNews,getRawgTrendyGames } = require("../controllers/aicontroller");

router.post("/recommend", getRecommendations);

// this is An API but not for AI 
router.post("/news", getNews);
// and this as will
router.get("/games",getRawgTrendyGames)
module.exports = router;



