import { N_CHARS_OF_SPACE } from 'src/view/actions/minimap/constants';

type WordPosition = {
    word: string;
    lineNumber: number;
    xInChars: number;
    lengthInChars: number;
};

type WordPositionResult = {
    words: WordPosition[];
    totalLines: number;
    empty: boolean;
};

export const calculateWordPositions = (
    content: string,
    availableLineCharacters: number,
): WordPositionResult => {
    let words: string[] = [];
    const isEmptyCard = !content.trim();
    if (isEmptyCard) {
        words.push('new');
    } else {
        words = content.split(/\s+/);
    }
    const positions: WordPosition[] = [];
    let currentLine = 0;
    let currentX = 0;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (!word) continue;
        const wordLength = word.length;

        if (currentX + wordLength > availableLineCharacters) {
            currentLine++;
            currentX = 0;
        }

        positions.push({
            word,
            lineNumber: currentLine,
            xInChars: currentX,
            lengthInChars: wordLength,
        });

        currentX += wordLength + N_CHARS_OF_SPACE;
    }

    return {
        words: positions,
        totalLines: currentLine + 1,
        empty: isEmptyCard,
    };
};
