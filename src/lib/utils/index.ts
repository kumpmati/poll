import { boolean } from 'zod';

export const copy = <T>(val: T): T => JSON.parse(JSON.stringify(val));

export const limit = (val: string, length: number) =>
	val.length >= length ? val.slice(0, length) + '...' : val;

const sectionTypeLabels = {
	multiplechoice: 'Multiple choice',
	singlechoice: 'Single choice',
	dates: 'Find a common date',
	order: 'Put in order'
};

export const sectionTypeLabel = (v: keyof typeof sectionTypeLabels): string => {
	return sectionTypeLabels[v] ?? 'Unknown type';
};

export const isURL = (val: any): boolean => {
	try {
		const url = new URL(val);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
};

export const isDateString = (v: any): boolean => {
	try {
		new Date(v);
		return true;
	} catch {
		return false;
	}
};

export const hasDuplicates = <T>(arr: T[]): boolean => {
	return new Set(arr).size !== arr.length;
};

export const hasDuplicateInArray = <T>(arr: T[], value: T): boolean => {
	return arr.filter((v) => v === value).length > 1;
};

export const groupBy = <T, K extends string>(arr: T[], func: (item: T) => K): Record<K, T[]> => {
	const items = {} as Record<K, T[]>;

	for (const item of arr) {
		const key = func(item);

		if (!items[key]) items[key] = [];

		items[key].push(item);
	}

	return items;
};
