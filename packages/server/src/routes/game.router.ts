import { Router } from "express";
import { startGame, endGame, registerGame, getGames } from "../controllers/game.controller.js";

const router = Router();

router.get("/", getGames);
router.post("/", startGame);
router.patch("/:id", endGame);
router.patch("/:id/user", registerGame);

export default router;
