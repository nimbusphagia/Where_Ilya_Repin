import { z } from "zod";
export const CoordinateSchema = z.object({
  id: z.guid(),
  x: z.number(),
  y: z.number(),
});
export const SimpleCoordinateSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const CreateLevelSchema = z.object({
  title: z.string(),
  imageUrl: z.url(),
  solutions: z.array(CoordinateSchema),
});
export const EditLevelSchema = z.object({
  id: z.guid(),
  index: z.number(),
  title: z.string(),
  imageUrl: z.string(),
  solutions: z.array(z.object({
    id: z.guid(),
    x: z.number(),
    y: z.number(),
  })),
});
export const ThumbnailLevelSchema = z.object({
  id: z.guid(),
  title: z.string(),
  imageUrl: z.string(),
});
export type CoordinateInput = z.infer<typeof SimpleCoordinateSchema>;
export type Coordinate = z.infer<typeof CoordinateSchema>;
export type CreateLevelInput = z.infer<typeof CreateLevelSchema>;
export type LevelInput = z.infer<typeof EditLevelSchema>;
export type ThumbnailLevel = z.infer<typeof ThumbnailLevelSchema>;
