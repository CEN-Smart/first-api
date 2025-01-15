import { z } from 'zod';

export const updateSchema = z.object({
	status: z.enum(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED'], {
		required_error:
			'Status must be one of IN_PROGRESS, LIVE, DEPRECATED, ARCHIVED',
	}),
	title: z.string().min(3),
	body: z.string(),
	version: z.string().optional(),
	assets: z.string().optional(),
});
