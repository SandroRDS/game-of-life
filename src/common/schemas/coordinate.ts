import z from 'zod';

const coordinateSchema = z
  .object({
    x: z.number().int().positive(),
    y: z.number().int().positive(),
  });

export default coordinateSchema;
