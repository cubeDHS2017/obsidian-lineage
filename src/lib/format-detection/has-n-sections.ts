import { parseDelimiter } from 'src/lib/data-conversion/helpers/delimiter';

export const hasNSections = (input: string, n = 2): boolean => {
    const lines = input.split('\n');
    let count = 0;
    for (const line of lines) {
        if (parseDelimiter(line)) {
            count++;
            if (count >= n) return true;
        }
    }
    return false;
};
