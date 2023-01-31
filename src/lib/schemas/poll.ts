import z from 'zod';

export const pollChoiceSchema = z.object({
	id: z.string(),
	value: z.any()
});

export const pollSectionSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
	required: z.boolean(),
	description: z.string().min(0),
	mode: z.enum(['singlechoice', 'multiplechoice', 'order', 'date']),
	choices: z.array(pollChoiceSchema).min(1)
});

export const pollSchema = z.object({
	id: z.string(),
	title: z.string().min(1),
	author: z.string(),
	description: z.string().min(0),
	publishedAt: z.number().min(0),
	mode: z.enum(['normal', 'random', 'singlerandom']),
	requireAuth: z.boolean(),
	allowMultipleSubmissions: z.boolean(),
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
