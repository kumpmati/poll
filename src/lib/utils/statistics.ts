import type { Poll, PollResponse } from '$lib/schemas/poll';
import { isDateString } from '.';

export type PollStatistics = {
	totalAnswers: number;
	totalAnswersPerSection: Record<string, number>;
	answersPerChoice: Record<string, number>;

	// the larger the number, the lower the priority (0=top priority)
	choiceAnswerIndexTotal: Record<string, number>;

	numDates: Record<string, number>;
};

/**
 * Calculates the statistics for a poll.
 *
 * EXPENSIVE CALL, YOU SHOULD CACHE/MEMOIZE THIS
 */
export const calculateStatistics = (poll: Poll, responses: PollResponse[]): PollStatistics => {
	const stats: PollStatistics = {
		totalAnswers: responses.length,
		totalAnswersPerSection: {},
		answersPerChoice: {},
		choiceAnswerIndexTotal: {},
		numDates: {}
	};

	for (const section of poll.sections) {
		stats.totalAnswersPerSection[section.id] = responses.filter(
			(r) => r.sectionAnswers[section.id]
		).length;

		for (const r of responses) {
			r.sectionAnswers[section.id].forEach((sa, i) => {
				stats.answersPerChoice[sa.id] ||= 0;
				stats.answersPerChoice[sa.id] += 1;

				stats.choiceAnswerIndexTotal[sa.id] ||= 0;
				stats.choiceAnswerIndexTotal[sa.id] += section.choices.length - i;

				if (section.type === 'dates' && isDateString(sa.userData)) {
					stats.numDates[sa.userData] ||= 0;
					stats.numDates[sa.userData] += 1;
				}
			});
		}
	}

	return stats;
};
