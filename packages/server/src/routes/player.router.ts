import { Router } from "express";
import { relative } from "path";
import { createPlayer } from "../controllers/player.controller";

const router = Router();

router.post("/", createPlayer);

export default router;
