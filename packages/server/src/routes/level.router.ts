import { Router } from "express";
import { getLeaderboard, getLevel, getLevels } from "../controllers/level.controller"

const router = Router();

router.get("/", getLevels);
router.get("/:id", getLevel);
router.get("/:id/leaderboard", getLeaderboard)

export default router;
