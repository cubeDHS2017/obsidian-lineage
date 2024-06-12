export const getFileNameFromContent = (text: string) => {
    const lines = text
        .split('\n')
        .map((line) => line.trim().replace(/\s+/g, ' '))
        .filter((line) => line);

    if (lines.length === 0) return;
    let result: string | undefined = undefined;
    if (lines[0].startsWith('# ')) {
        result = lines[0].replace(/^# /, '').substring(0, 100);
    } else if (lines[0].startsWith('- ')) {
        result = lines[0].replace(/^- /, '').substring(0, 100);
    } else {
        result = lines.join(' ');
    }

    return result.substring(0, 100);
};
