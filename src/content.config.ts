import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const personal = defineCollection({
	loader: glob({ pattern: 'personal.md', base: './src/contents' }),
	schema: z.object({
		avatar: z.string().optional(),
		name_ja: z.string(),
		name_en: z.string(),
		department_ja: z.string(),
		department_en: z.string().optional(),
		grade_ja: z.string(),
		grade_en: z.string().optional(),
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
				company_ja: z.string(),
				company_en: z.string().optional(),
				startMonth: z.string(),
				finishMonth: z.string().optional(),
				hpLink: z.string().optional(),
				position_ja: z.string(),
				position_en: z.string().optional(),
			}),
		),
	}),
});

const research = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/research' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		authors_ja: z.string(),
		authors_en: z.string().optional(),
		conference: z.string(),
		award_ja: z.string().optional(),
		award_en: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

const development = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/development' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		name_ja: z.string(),
		name_en: z.string().optional(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		repository: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/projects' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		name_ja: z.string(),
		name_en: z.string().optional(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

const awards = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/awards' }),
	schema: z.object({
		date: z.coerce.date(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		summary_ja: z.string().optional(),
		summary_en: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

const education = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/education' }),
	schema: z.object({
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		institution_ja: z.string(),
		institution_en: z.string().optional(),
		laboratory: z
			.object({
				name_ja: z.string(),
				name_en: z.string().optional(),
				siteUrl: z.string().optional(),
			})
			.optional(),
	}),
});

const certifications = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/certifications' }),
	schema: z.object({
		date: z.coerce.date(),
		name_ja: z.string(),
		name_en: z.string().optional(),
	}),
});

export const collections = { personal, research, development, projects, awards, education, certifications };
