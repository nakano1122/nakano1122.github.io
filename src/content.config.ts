import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const personal = defineCollection({
	loader: glob({ pattern: 'personal.md', base: './src/contents' }),
	schema: z.object({
		avatar: z.string().optional(),
		name: z.string(),
		nameEn: z.string(),
		department: z.string(),
		grade: z.string(),
		email: z.object({ user: z.string(), domain: z.string() }),
		github: z.string(),
		atcoder: z
			.object({
				url: z.string(),
				rank: z.string(),
			})
			.optional(),
		jobHistory: z.array(
			z.object({
				company: z.string(),
				startMonth: z.string(),
				finishMonth: z.string().optional(),
				hpLink: z.string().optional(),
				position: z.string(),
			}),
		),
	}),
});

const research = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/research' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		title: z.string(),
		authors: z.string(),
		conference: z.string(),
		award: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

const development = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/development' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		name: z.string(),
		title: z.string(),
		repository: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/projects' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		name: z.string(),
		title: z.string(),
		links: z.array(z.string()).optional(),
	}),
});

const awards = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/awards' }),
	schema: z.object({
		date: z.coerce.date(),
		title: z.string(),
		summary: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

const education = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/education' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		institution: z.string(),
		laboratory: z
			.object({
				name: z.string(),
				siteUrl: z.string().optional(),
			})
			.optional(),
	}),
});

const certifications = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/certifications' }),
	schema: z.object({
		date: z.coerce.date(),
		name: z.string(),
	}),
});

export const collections = { personal, research, development, projects, awards, education, certifications };
