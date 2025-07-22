import z from 'zod';

export const cellularAutomatonSizeSchema = z.object({
  horizontal: z.number().int().positive(),
  vertical: z.number().int().positive(),
});
