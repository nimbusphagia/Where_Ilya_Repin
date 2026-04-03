import z from "zod";
import { CoordinateSchema } from "./level.schema";

/*
model Game {
  id        String    @id @default(uuid())
  player    Player?   @relation(fields: [playerId], references: [id], onDelete: Cascade)
  playerId  String?
  level     Level     @relation(fields: [levelId], references: [id], onDelete: Cascade)
  levelId   String
  startedAt DateTime  @default(now())
  solvedAt  DateTime?
  timeMs    Int?
}
*/
export const GameSchema = z.object({
  id: z.guid(),
  playerId: z.guid(),
  levelId: z.guid(),
  startedAt: z.date(),
  solvedAt: z.date(),
  timeMs: z.number()
})
export const StartGameSchema = z.object({
  levelId: z.guid(),
})
export const CreateGameSchema = z.object({
  levelId: z.uuid(),
});
export const RegisterUserSchema = z.object({
  id: z.guid(),
  levelId: z.uuid(),
  username: z.string(),
});
export const EndGameSchema = z.object({
  id: z.guid(),
  levelId: z.uuid(),
});
export const SolutionSchema = CoordinateSchema.extend({
  solved: z.boolean()
});

export type Solution = z.infer<typeof SolutionSchema>;
export type CreateGameInput = z.infer<typeof CreateGameSchema>;
export type StopGameInput = z.infer<typeof EndGameSchema>;
export type GameUserInput = z.infer<typeof RegisterUserSchema>;
export type Game = z.infer<typeof GameSchema>;
