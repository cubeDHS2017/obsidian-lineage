export const findTaskLineIndex = (
    lines: string[],
    taskIndex: number,
): number => {
    let currentTaskIndex = -1;

    return lines.findIndex((line) => {
        if (line.match(/^\s*[-*+]\s*\[[ x]\]/i)) {
            currentTaskIndex++;
            return currentTaskIndex === taskIndex;
        }
        return false;
    });
};
