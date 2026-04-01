import z from "zod";

export const createPlayerSchema = z.object({
  username: z.string(),
});

export type CreatePlayerInput = z.infer<typeof createPlayerSchema>;
