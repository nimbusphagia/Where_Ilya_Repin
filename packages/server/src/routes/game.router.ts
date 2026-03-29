import { Router } from "express";
import { startGame, endGame } from "../controllers/game.controller";

const router = Router();

router.post("/", startGame);
router.post("/:id", endGame);

export default router;
