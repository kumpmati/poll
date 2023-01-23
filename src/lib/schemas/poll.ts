import z from 'zod';

export const pollOptionSchema = z.object({
	id: z.string(),
	data: z.string()
});

export const pollSectionSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	mode: z.enum(['singlechoice', 'multiplechoice', 'order']),
	options: z.record(pollOptionSchema)
});

export const pollSchema = z.object({
	id: z.string(),
	title: z.string(),
	author: z.string(),
	description: z.string().nullable(),
	publishedAt: z.number().min(0),
	sections: z.record(pollSectionSchema)
});

export type PollOption = z.infer<typeof pollOptionSchema>;
export type PollSection = z.infer<typeof pollSectionSchema>;
export type Poll = z.infer<typeof pollSchema>;

export const pollResponseSchema = z.object({
	id: z.string(),
	timestamp: z.number().min(0),

	// record of choice ids that were submitted
	data: z.record(z.string())
});

export const pollResultsSchema = z.object({
	id: z.string(),
	answers: z.record(pollResponseSchema)
});

export type PollResponse = z.infer<typeof pollResponseSchema>;
export type PollResults = z.infer<typeof pollResultsSchema>;
