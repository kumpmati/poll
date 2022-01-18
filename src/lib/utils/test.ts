export const delay = async (time: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, time));