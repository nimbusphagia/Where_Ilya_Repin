import { z } from "zod";

export const CoordinateSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const CreateLevelSchema = z.object({
  title: z.string(),
  imageUrl: z.url(),
  solutions: z.array(CoordinateSchema),
});
export const EditLevelSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  imageUrl: z.string(),
  solutions: z.array(z.object({
    id: z.uuid(),
    x: z.number(),
    y: z.number(),
  })),
});

export type CoordinateInput = z.infer<typeof CoordinateSchema>;
export type CreateLevelInput = z.infer<typeof CreateLevelSchema>;
export type EditLevelInput = z.infer<typeof EditLevelSchema>;
