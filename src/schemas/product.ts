import { z } from 'zod';

export const productSchema = z.object({
	name: z.string().min(3),
});
