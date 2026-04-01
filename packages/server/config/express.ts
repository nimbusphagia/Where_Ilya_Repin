import 'dotenv/config';
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ZodError } from 'zod';
import { AppError } from '../src/errors';
import { Prisma } from '../prisma/generated/client';
import indexRouter from '../src/routes/index.router';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.CLIENT_URL!,
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "admin-secret"],
}));

app.use('/', indexRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
  }
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
