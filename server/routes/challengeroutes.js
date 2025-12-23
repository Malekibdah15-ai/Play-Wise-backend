import express from "express";
import { getDailyChallenges } from "../controllers/challengesController.js";

const router = express.Router();
router.get("/", getDailyChallenges);

export default router;
