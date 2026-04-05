import { z } from "zod";

export const CoordinateSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const CreateLevelSchema = z.object({
  title: z.string(),
  index: z.number(),
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
export const EditLevelIndexSchema = z.object({
  id: z.guid(),
  index: z.number()
});
export const EditLevelImageSchema = z.object({
  id: z.guid(),
  imageUrl: z.url()
});
export const EditLevelSolutionsSchema = z.object({
  id: z.guid(),
  solutions: z.array(z.object({
    id: z.guid(),
    x: z.number(),
    y: z.number(),
  })),
});

export type CoordinateInput = z.infer<typeof CoordinateSchema>;
export type CreateLevelInput = z.infer<typeof CreateLevelSchema>;
export type EditLevelInput = z.infer<typeof EditLevelSchema>;
export type EditIndexInput = z.infer<typeof EditLevelIndexSchema>;
export type EditImageInput = z.infer<typeof EditLevelImageSchema>;
export type EditSolutionsInput = z.infer<typeof EditLevelSolutionsSchema>;

