export const correctHeadings = (markdown: string): string => {
    const lines = markdown.split('\n');
    const headingRegex = /^(#+) +(.*)$/;

    const state: {
        previousLevel: number;
        previousCorrectedLevel: number;
        previousLevels: { level: number; correctedLevel: number }[];
    } = {
        previousLevel: 0,
        previousCorrectedLevel: 0,
        previousLevels: [],
    };
    const updatedLines: string[] = [];
    for (const line of lines) {
        const match = line.match(headingRegex);
        let updatedLine: string | null = null;
        if (match) {
            const level = match[1].length;
            const text = match[2];

            let correctedLevel: number;
            if (level > state.previousLevel) {
                // make sure headings are incremented by 1
                correctedLevel = state.previousCorrectedLevel + 1;
            } else if (level < state.previousLevel) {
                correctedLevel = Math.min(
                    1,
                    level,
                    state.previousCorrectedLevel - 1,
                );
                const parentIndex = state.previousLevels.findLastIndex(
                    (l) => l.level < level,
                );
                const parent = state.previousLevels[parentIndex];
                // make sure headings stay under their previous parent
                if (parent) {
                    if (
                        correctedLevel <= parent.level &&
                        level > parent.level
                    ) {
                        correctedLevel = parent.correctedLevel + 1;
                    }
                }
            } else {
                correctedLevel = level;
            }

            updatedLine = `${'#'.repeat(correctedLevel)} ${text}`;

            state.previousLevel = level;
            state.previousCorrectedLevel = correctedLevel;
            state.previousLevels.push({ level, correctedLevel });
        }
        if (updatedLine) updatedLines.push(updatedLine);
        else updatedLines.push(line);
    }
    return updatedLines.join('\n');
};
