import z from 'zod';

export const intervalDurationSchema = z.number().positive();
