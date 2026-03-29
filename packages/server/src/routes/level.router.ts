import { Router } from "express";
import { create, getLeaderboard, getLevel, getLevels, update } from "../controllers/level.controller"

const router = Router();

router.get("/", getLevels);
router.get("/:id", getLevel);
router.get("/:id/leaderboard", getLeaderboard);

export default router;
