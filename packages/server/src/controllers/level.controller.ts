import type { MiddlewareArgs } from "../types/controller.type";
import { listAllLevels, getLevelById, listTop10ByLevelId, createLevel, editLevel } from "../services/level.service";
import { Coordinate } from "../../prisma/generated/client";
import { CoordinateDTO } from "../types/service.type";

export async function getLevels({ req, res, next }: MiddlewareArgs) {
  try {
    const levels = await listAllLevels();
    return res.status(201).json(levels);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}
export async function getLevel({ req, res, next }: MiddlewareArgs) {
  try {
    const id = req.params.id as string;
    const level = await getLevelById(id);
    return res.status(201).json(level);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}
export async function getLeaderboard({ req, res, next }: MiddlewareArgs) {
  try {
    const id = req.params.id as string;
    const leaderboard = await listTop10ByLevelId(id);
    return res.status(201).json(leaderboard);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}

// Admin
export async function create({ req, res, next }: MiddlewareArgs) {
  const title = req.body.title as string;
  const imageUrl = req.body.imageUrl as string;
  const solutions = req.body.solutions as CoordinateDTO[];
  try {
    const level = await createLevel({ title, imageUrl, solutions });
    return res.status(201).json(level);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}
export async function update({ req, res, next }: MiddlewareArgs) {
  const id = req.params.id as string;
  const title = req.body.title as string;
  const imageUrl = req.body.imageUrl as string;
  const solutions = req.body.solutions as Coordinate[];
  try {
    const level = await editLevel({ id, title, imageUrl }, solutions);
    return res.status(201).json(level);
  } catch (error) {
    console.error(error);
    next!(error)
  };
}
