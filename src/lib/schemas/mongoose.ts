import mongoose, { Schema } from 'mongoose';
import type { Poll } from './poll';

export const pollDatabaseSchema = new Schema<Poll>(
	{
		id: String,
		title: String,
		author: String,
		description: String,
		publishedAt: Number,
		mode: String,
		requireAuth: Boolean,
		allowMultipleSubmissions: Boolean,
		sections: [Schema.Types.Mixed]
	},
	{
		toJSON: {
			transform: (_, v) => {
				delete v._id;
			}
		},
		toObject: {
			transform: (_, v) => {
				delete v._id;
			}
		}
	}
);

export const PollModel = mongoose.models.poll ?? mongoose.model('poll', pollDatabaseSchema);
