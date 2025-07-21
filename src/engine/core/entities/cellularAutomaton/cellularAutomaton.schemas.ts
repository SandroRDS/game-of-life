import z from 'zod';

export const cellularAutomatonOptionsSchema = z.object({
  horizontalLength: z.number().int().positive(),
  verticalLength: z.number().int().positive(),
});
