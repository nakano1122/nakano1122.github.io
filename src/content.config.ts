import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const details = defineCollection({
	loader: glob({ pattern: '*/**/*.md', base: './src/contents/details' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		title: z.string().optional(),
		name: z.string().optional(),
		authors: z.string().optional(),
		conference: z.string().optional(),
		award: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

export const collections = { details };
