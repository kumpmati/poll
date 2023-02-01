import z from 'zod';

export const pollChoiceSchema = z.object({
	id: z.string(),
	type: z.enum(['string', 'date', 'daterange', 'image', 'freetext']),
	data: z.any()
});

export const pollSectionSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
	description: z.string().min(0),
	type: z.enum(['singlechoice', 'multiplechoice', 'order', 'dates']),
	choices: z.array(pollChoiceSchema).min(1)
});

export const pollSchema = z.object({
	id: z.string(),
	type: z.enum(['all_sections_normal', 'all_sections_random', 'one_section_random']),
	meta: z.object({
		title: z.string().min(1),
		description: z.string().min(0),
		createdAt: z.string().datetime(),
		author: z.string().nullable()
	}),
	sections: z.array(pollSectionSchema).min(1)
});

export type PollChoice = z.infer<typeof pollChoiceSchema>;
export type PollSection = z.infer<typeof pollSectionSchema>;
export type Poll = z.infer<typeof pollSchema>;

export const pollResponseSchema = z.object({
	id: z.string(),
	sectionId: z.string(),
	timestamp: z.number().min(0),
	data: z.array(z.string()) // option ids
});

export type PollResponse = z.infer<typeof pollResponseSchema>;

export const pollResultsSchema = z.object({
	id: z.string(),
	answers: z.array(pollResponseSchema)
});

export type PollResults = z.infer<typeof pollResultsSchema>;
