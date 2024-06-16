export const sortKeys = (obj: { [key: string]: string }): string[] => {
    return Object.keys(obj).sort((a, b) => {
        const aParts = a.split('.');
        const bParts = b.split('.');

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
            if (aParts[i] === undefined) return -1;
            if (bParts[i] === undefined) return 1;
            const diff = Number(aParts[i]) - Number(bParts[i]);
            if (diff !== 0) return diff;
        }
        return 0;
    });
};
