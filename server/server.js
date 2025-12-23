import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/mongoose.config.js";

import aiRoutes from "./routes/airoutes.js";
import dealsRoutes from "./routes/dealroutes.js";
import challengesRoutes from "./routes/challengeroutes.js";
import chatFilterRoutes from "./routes/chatroutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/challenges", challengesRoutes);
app.use("/api/chat-filter", chatFilterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
