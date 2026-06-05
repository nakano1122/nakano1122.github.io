import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const personal = defineCollection({
	loader: glob({ pattern: 'personal.md', base: './src/contents/about' }),
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		keywords: z.string().optional(),
		avatar: z.string().optional(),
		name_ja: z.string(),
		name_en: z.string(),
		department_ja: z.string(),
		department_en: z.string().optional(),
		email: z.object({ user: z.string(), domain: z.string() }),
		github: z.string(),
		atcoder: z
			.object({
				url: z.string(),
				rank: z.string(),
			})
			.optional(),
		zenn: z.string().optional(),
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
	loader: glob({ pattern: '*.md', base: './src/contents/research/topics' }),
	schema: z.object({
		id: z.string(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		summary_ja: z.string(),
		summary_en: z.string().optional(),
		image: z.string().optional(),
		image_ja: z.string().optional(),
		image_en: z.string().optional(),
		status: z.enum(['ongoing', 'completed']).default('ongoing'),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
	}),
});

const papers = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/research/papers' }),
	schema: z.object({
		date: z.coerce.date(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		authors_ja: z.string(),
		authors_en: z.string().optional(),
		conference: z.string(),
		researchId: z.string(),
		award_ja: z.string().optional(),
		award_en: z.string().optional(),
		externalUrl: z.string().optional(),
	}),
});

const developments = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/developments' }),
	schema: z.object({
		id: z.string(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		name_ja: z.string(),
		name_en: z.string().optional(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		image: z.string().optional(),
		image_ja: z.string().optional(),
		image_en: z.string().optional(),
		repository: z.string().optional(),
		links: z.array(z.string()).optional(),
	}),
});

const awards = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/about/awards' }),
	schema: z.object({
		date: z.coerce.date(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		summary_ja: z.string().optional(),
		summary_en: z.string().optional(),
		category: z.enum(['research', 'development', 'education']),
		links: z.array(z.string()).optional(),
	}),
});

const education = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/about/education' }),
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
	loader: glob({ pattern: '*.md', base: './src/contents/about/certifications' }),
	schema: z.object({
		date: z.coerce.date(),
		name_ja: z.string(),
		name_en: z.string().optional(),
	}),
});

const blogs = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/activity/blogs' }),
	schema: z.object({
		date: z.coerce.date(),
		title: z.string(),
		url: z.string(),
		platform: z.enum(['note']),
	}),
});

const talks = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/contents/activity/talks' }),
	schema: z.object({
		date: z.coerce.date(),
		title_ja: z.string(),
		title_en: z.string().optional(),
		event: z.string(),
		url: z.string(),
		type: z.enum(['presentation', 'paper-reading']),
	}),
});

export const collections = { personal, research, papers, developments, awards, education, certifications, blogs, talks };
