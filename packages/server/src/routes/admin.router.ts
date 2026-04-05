import { Request, Response, NextFunction, Router } from "express";
import { create, update, updateImage, updateIndex, updateSolutions } from "../controllers/level.controller.js";
import { AppError } from "../errors/index.js";

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
router.patch("/level/:id/index", requireAdminSecret, updateIndex);
router.patch("/level/:id/image", requireAdminSecret, updateImage);
router.patch("/level/:id/solutions", requireAdminSecret, updateSolutions);

export default router;
