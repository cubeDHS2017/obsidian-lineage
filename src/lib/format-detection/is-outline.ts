export const isOutline = (text: string) => {
    const lines = text.split('\n').filter((x) => x.trim());
    if (lines.length <= 1) return false;
    let level = 0;
    for (const line of lines) {
        if (!line) continue;
        const match = line.match(/^(\t*)- (.*)/);
        if (match) {
            const itemLevel = match[1].length + 1;
            if (itemLevel - level > 1) {
                return false;
            }
            level = itemLevel;
        } else {
            const match = line.match(/^(\t*) {2}/);
            if (match) {
                const itemLevel = (match[1] ? match[1].length : 0) + 1;
                if (itemLevel !== level) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    return true;
};
