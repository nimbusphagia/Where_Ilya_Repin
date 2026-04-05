import { Router } from "express";
import { getLeaderboard, getLevel, getLevels, getNextLevel } from "../controllers/level.controller.js"

const router = Router();

router.get("/", getLevels);
router.get("/:id", getLevel);
router.get("/id/:index", getNextLevel);
router.get("/:id/leaderboard", getLeaderboard);

export default router;
