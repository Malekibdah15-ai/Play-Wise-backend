import express from "express";
import { filterMessage } from "../controllers/chatFilterController.js";

const router = express.Router();
router.post("/", filterMessage);

export default router;
