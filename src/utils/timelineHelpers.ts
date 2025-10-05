/**
 * Timeline item interface
 */
export interface TimelineItem {
	title: string;
	subtitle?: string;
	meta: string;
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
	internships: Array<{ company: string; position: string; period: string }>
): TimelineItem[] {
	return internships.map((internship) => ({
		title: internship.company,
		subtitle: internship.position,
		meta: internship.period,
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
