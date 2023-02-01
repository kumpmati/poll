import mongoose, { Schema } from 'mongoose';
import type { Poll } from './poll';

export const pollDatabaseSchema = new Schema<Poll>(
	{
		id: String,
		meta: Schema.Types.Mixed,
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
