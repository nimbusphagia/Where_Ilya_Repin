import { NextFunction, Request, Response } from "express"

export type MiddlewareArgs = {
  req: Request,
  res: Response,
  next?: NextFunction,
  err?: Error
}
