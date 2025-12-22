import { z } from 'zod';

export const createEntrySchema = z.object({
  title: z.string().min(1),
  body: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  mood: z.string().optional(),
  location: z.string().optional(),
});

export const updateEntrySchema = createEntrySchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided' }
);
