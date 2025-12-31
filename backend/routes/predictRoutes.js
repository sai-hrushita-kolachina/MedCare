import express from "express";
import { analyzeSymptoms } from "../controllers/predictController.js";

const router = express.Router();

router.post("/analyzeSymptoms", analyzeSymptoms);

export default router;
