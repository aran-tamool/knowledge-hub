export const generateSnippetNumber = (text: string): number => {
  return text
    .replace(/\s+/g, '')
    .slice(0, 10)
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

export const cleanText = (text: string): string => {
  if (!text) return '';
  // Remove special characters and replace multiple spaces with a single space
  return text
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
};
