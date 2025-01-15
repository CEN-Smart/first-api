import { z } from 'zod';

export const updatePointSchema = z.object({
	name: z.string().min(3),
	description: z.string(),
});
