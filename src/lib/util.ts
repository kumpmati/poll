export const copy = <T>(val: T): T => JSON.parse(JSON.stringify(val));

export const limit = (val: string, length: number) =>
	val.length >= length ? val.slice(0, length) + '...' : val;
