export const getFileNameFromContent = (text: string) => {
    const lines = text
        .split('\n')
        .map((line) => line.trim().replace(/\s+/g, ' '))
        .filter((line) => line);

    if (lines.length === 0) return;

    let result: string | undefined = undefined;

    const headingLine = lines.find((line) => /^(#+)\s(.+)/.test(line));
    if (headingLine) {
        const headingMatch = headingLine.match(/^(#+)\s(.+)/);
        result = headingMatch![2];
    } else if (lines[0].startsWith('- ')) {
        result = lines[0].replace(/^- /, '');
    } else {
        result = lines.join(' ');
    }

    return result.substring(0, 100).trim();
};
