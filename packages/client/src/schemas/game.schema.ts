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
export const StartGameSchema = z.object({
  id: z.guid(),
  levelId: z.guid(),
  startedAt: z.date(),
})
export const CreateGameSchema = z.object({
  levelId: z.uuid(),
});
export const EditGameSchema = z.object({
  id: z.guid(),
  playerId: z.uuid(),
  levelId: z.uuid(),
});
export const SolutionSchema = CoordinateSchema.extend({
  solved: z.boolean()
});

export type Solution = z.infer<typeof SolutionSchema>;
export type CreateGameInput = z.infer<typeof CreateGameSchema>;
export type EditGameInput = z.infer<typeof EditGameSchema>;
