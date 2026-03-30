import { Request, Response, NextFunction } from "express";
import { listAllLevels, getLevelById, listTop10ByLevelId, createLevel, editLevel } from "../services/level.service";
import { CreateLevelSchema, EditLevelSchema } from "../schemas/level.schema";
import { IdParamsSchema } from "../schemas/controller.schema";

export async function getLevels(req: Request, res: Response, next: NextFunction) {

  try {
    const levels = await listAllLevels();
    return res.status(200).json(levels);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}
export async function getLevel(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = IdParamsSchema.parse(req.params);
    const level = await getLevelById(id);
    return res.status(200).json(level);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}
export async function getLeaderboard(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = IdParamsSchema.parse(req.params);
    const leaderboard = await listTop10ByLevelId(id);
    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}

// Admin
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const input = CreateLevelSchema.parse(req.body);
    const level = await createLevel(input);
    return res.status(201).json(level);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}
export async function update(req: Request, res: Response, next: NextFunction) {

  try {
    const input = EditLevelSchema.parse({
      id: req.params.id,
      ...req.body,
    });
    const level = await editLevel(input);
    return res.status(200).json(level);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}
