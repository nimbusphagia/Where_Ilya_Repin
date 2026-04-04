import z from "zod";

export const createPlayerSchema = z.object({
  username: z.string().min(3),
});

export type CreatePlayerInput = z.infer<typeof createPlayerSchema>;
