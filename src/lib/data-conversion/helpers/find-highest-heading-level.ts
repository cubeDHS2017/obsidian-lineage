export const findHighestHeadingLevel = (lines: string[]) => {
    return lines.reduce((acc, val) => {
        const match = val.match(/^(#+) +(.*)$/);
        if (match) {
            const level = match[1].length;
            if (level < acc) acc = level;
        }
        return acc;
    }, 6);
};
