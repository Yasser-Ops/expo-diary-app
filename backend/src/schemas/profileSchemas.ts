import { z } from 'zod';

const avatarUrlSchema = z
  .string()
  .url()
  .or(z.string().startsWith('file://'))
  .optional()
  .or(z.literal('').transform(() => undefined));

export const updateProfileSchema = z.object({
  name: z.string().min(1),
  avatarUrl: avatarUrlSchema,
});
