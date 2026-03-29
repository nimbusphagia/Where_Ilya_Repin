import { Router } from "express";
import { create, update } from "../controllers/level.controller";

const router = Router();
router.post("/level", create);
router.patch("/level/:id", update);

export default router;
