import { DB_NAME, DB_URI } from '$env/static/private';
import { PollModel, PollResponseModel } from '$lib/schemas/mongoose';
import type { Poll, PollResponse } from '$lib/schemas/poll';
import mongoose, { Mongoose } from 'mongoose';

let m: Mongoose | null;

export const initDb = async () => {
	if (!m) {
		m = await mongoose.connect(DB_URI, {
			dbName: DB_NAME ?? 'dev'
		});
	}

	return m;
};

export const createPoll = async (poll: Poll) => {
	return await new PollModel(poll).save();
};

export const getPollById = async (id: string): Promise<Poll | null> => {
	const result = await PollModel.findOne({ id }).exec();
	return result?.toObject() ?? null;
};

export const createPollResponse = async (res: PollResponse) => {
	return new PollResponseModel(res).save();
};
