export const splitLineIntoChunks = (line: string): string[] => {
    return line.split(/(?<=\W)|(?=\W)/);
};
