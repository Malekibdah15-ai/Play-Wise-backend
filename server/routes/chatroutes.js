const express = require("express");
const { filterMessage } = require("../controllers/chatFilterController.js");

const router = express.Router();
router.post("/", filterMessage);
module.exports = router;
