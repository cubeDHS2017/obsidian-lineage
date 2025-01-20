export const getLineCount = (content: string) => {
    return content.split('\n').filter((line) => line.trim().length > 0).length;
};
