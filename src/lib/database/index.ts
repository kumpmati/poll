import { DB_NAME, DB_URI } from '$env/static/private';
import { PollModel } from '$lib/schemas/mongoose';
import type { Poll } from '$lib/schemas/poll';
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
