export const copy = <T>(val: T): T => JSON.parse(JSON.stringify(val));

export const limit = (val: string, length: number) =>
	val.length >= length ? val.slice(0, length) + '...' : val;

const sectionTypeLabels = {
	multiplechoice: 'Multiple choice',
	singlechoice: 'Single choice',
	date: 'Date'
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
