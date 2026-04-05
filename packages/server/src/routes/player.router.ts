import { Router } from "express";
import { create } from "../controllers/player.controller.js";

const router = Router();

router.post("/", create);

export default router;
