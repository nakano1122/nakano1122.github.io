/**
 * Timeline item interface
 */
export interface TimelineItem {
	title: string;
	subtitle?: string;
	meta: string;
	link?: {
		url: string;
		label: string;
	};
}

/**
 * Convert education data to timeline items
 */
export function convertEducationToTimeline(
	education: Array<{ institution: string; period: string }>
): TimelineItem[] {
	return education.map((edu) => ({
		title: edu.institution,
		meta: edu.period,
	}));
}

/**
 * Convert internship data to timeline items
 */
export function convertInternshipToTimeline(
	internships: Array<{ company: string; position: string; period: string; hpLink?: string }>
): TimelineItem[] {
	return internships.map((internship) => ({
		title: internship.company,
		subtitle: internship.position,
		meta: internship.period,
		...(internship.hpLink && {
			link: {
				url: internship.hpLink,
				label: `${internship.company}のホームページを開く`,
			},
		}),
	}));
}

/**
 * Convert awards data to timeline items (reverse order)
 */
export function convertAwardsToTimeline(
	awards: Array<{ event: string; award: string; date: string }>
): TimelineItem[] {
	return [...awards].reverse().map((award) => ({
		title: award.event,
		subtitle: award.award,
		meta: award.date,
	}));
}

/**
 * Convert laboratory data to timeline items
 */
export function convertLaboratoryToTimeline(
	laboratories: Array<{ name: string; period: string; siteUrl?: string }>
): TimelineItem[] {
	return laboratories.map((lab) => ({
		title: lab.name,
		meta: lab.period,
		...(lab.siteUrl && {
			link: {
				url: lab.siteUrl,
				label: `${lab.name}のホームページを開く`,
			},
		}),
	}));
}
