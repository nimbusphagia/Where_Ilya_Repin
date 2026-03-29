import z from "zod";
import { id } from "zod/locales";

export const CreateGameSchema = z.object({
  levelId: z.uuid(),
});
export const EditGameSchema = z.object({
  id: z.uuid(),
  playerId: z.uuid(),
  levelId: z.uuid(),
});
export type CreateGameInput = z.infer<typeof CreateGameSchema>;
export type EditGameInput = z.infer<typeof EditGameSchema>;
