const express = require("express");
const router = express.Router();

const { getRecommendations, getNews } = require("../controllers/aicontroller");
const { getDailyChallenges } = require("../controllers/challengesController");
const { filterMessage } = require("../controllers/chatFilterController");
const { getBestDeal } = require("../controllers/dealsController");
const { matchmaker } = require("../controllers/matchmakerController");

// GET routes
router.get("/challenges", getDailyChallenges);

// POST routes
router.post("/chat-filter", filterMessage);
router.post("/deal", getBestDeal);
router.post("/matchmaker", matchmaker);
router.post("/recommend", getRecommendations);
router.post("/news", getNews);

module.exports = router;

