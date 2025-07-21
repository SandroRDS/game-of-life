import z from 'zod';

const coordinateSchema = z.object({
  x: z.number().int().gte(0),
  y: z.number().int().gte(0),
});

export default coordinateSchema;
