import z from "zod";

export const CreateGameSchema = z.object({
  levelId: z.uuid(),
});
export const EditGameSchema = z.object({
  id: z.uuid(),
  username: z.string().optional(),
  levelId: z.uuid(),
});
export type CreateGameInput = z.infer<typeof CreateGameSchema>;
export type EditGameInput = z.infer<typeof EditGameSchema>;
