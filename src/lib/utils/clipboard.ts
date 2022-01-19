/**
 * Borrowed from Angelos Chalaris
 * @see https://www.30secondsofcode.org/articles/s/copy-text-to-clipboard-with-javascript
 */
export const copyToClipboard = async (str: string): Promise<void | string> => {
	if (navigator?.clipboard?.writeText) return navigator.clipboard.writeText(str);
	return Promise.reject('The Clipboard API is not available.');
};
