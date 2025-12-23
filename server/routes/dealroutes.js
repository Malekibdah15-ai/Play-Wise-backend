import express from "express";
import { getBestDeal } from "../controllers/dealsController.js";

const router = express.Router();
router.post("/", getBestDeal);

export default router;
