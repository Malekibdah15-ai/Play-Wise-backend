const express = require("express");
const router = express.Router();

const { getRecommendations } = require("../controllers/aicontroller");
const { getDailyChallenges } = require("../controllers/challengesController");
const { filterMessage } = require("../controllers/chatFilterController");
const { getBestDeal } = require("../controllers/dealsController");


router.post("/recommend", getRecommendations);


router.get("/challenges", getDailyChallenges);


router.post("/chat-filter", filterMessage);


router.post("/deal", getBestDeal);

module.exports = router;



