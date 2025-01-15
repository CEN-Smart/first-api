import { z } from 'zod';

export const updatePasswordSchema = z.object({
	username: z.string().min(3),
	newPassword: z.string().min(6),
});
