const express = require("express");
const { getRecommendations ,getNews } = require("../controllers/aicontroller");

router.post("/recommend", getRecommendations);
router.post("/news", getNews);
module.exports = router;



