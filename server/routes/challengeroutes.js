const express = require("express");
const { getDailyChallenges } = require("../controllers/challengesController.js");

const router = express.Router();
router.get("/", getDailyChallenges);

module.exports = router;
