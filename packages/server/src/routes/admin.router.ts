import { Request, Response, NextFunction, Router } from "express";
import { create, update } from "../controllers/level.controller";
import { AppError } from "../errors";

export function requireAdminSecret(req: Request, res: Response, next: NextFunction) {
  try {
    const secret = req.headers["admin-secret"];

    if (!secret || secret !== process.env.ADMIN_SECRET) {
      throw new AppError('Unauthorized', 401);
    }
    next()
  } catch (error) {
    next(error);
  }
}
const router = Router();

router.post("/level", requireAdminSecret, create);
router.patch("/level/:id", requireAdminSecret, update);

export default router;
