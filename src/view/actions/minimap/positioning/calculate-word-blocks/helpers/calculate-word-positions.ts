import { splitLineIntoChunks } from 'src/view/actions/minimap/positioning/calculate-word-blocks/helpers/split-line-into-chunks';

const chars = new Set(['#', '*', '-', '>', '/', '~', '[', ']', '.', '=']);

export enum ChunkType {
    heading = 1,
    period = 2,
    bullet = 3,
    highlight = 4,
    bold_italic = 5,
    wikilink = 6,
    tag = 8,
    other = 9,
}

const chunksWithoutSpaces = new Set([
    ChunkType.heading,
    ChunkType.highlight,
    ChunkType.bold_italic,
    ChunkType.wikilink,
]);

const charToChunkType: Record<string, ChunkType> = {
    '#': ChunkType.heading,
    '-': ChunkType.bullet,
    '.': ChunkType.period,
    '=': ChunkType.highlight,
    '*': ChunkType.bold_italic,
    '>': ChunkType.other,
    '/': ChunkType.other,
    '~': ChunkType.other,
    '[': ChunkType.wikilink,
    ']': ChunkType.wikilink,
};

type WordPosition = {
    word: string;
    lineNumber: number;
    xInChars: number;
    lengthInChars: number;
    chunkType: ChunkType | null;
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
    const isEmptyCard = !content.trim();
    let lines: string[] = [];
    if (isEmptyCard) {
        lines.push('new');
    } else {
        lines = content.split('\n');
    }
    const positions: WordPosition[] = [];
    let currentLine = 0;
    for (const line of lines) {
        let currentX = 0;
        const chunks = splitLineIntoChunks(line);

        let wrappingCharType = null;
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            if (!chunk) continue;
            const chunkLength = chunk.length;

            if (currentX + chunkLength > availableLineCharacters) {
                currentLine++;
                currentX = 0;
            }
            const isSpace = chunk === ' ';
            if (isSpace) {
                // space breaks tags
                if (wrappingCharType === ChunkType.tag) {
                    wrappingCharType = null;
                }
                // don't render spaces in highlights and wikilinks
                else if (
                    wrappingCharType &&
                    chunksWithoutSpaces.has(wrappingCharType)
                ) {
                    positions.push({
                        word: chunk,
                        lineNumber: currentLine,
                        xInChars: currentX,
                        lengthInChars: 1,
                        chunkType: wrappingCharType,
                    });
                }
                currentX += 1;
            } else {
                const isChar = chars.has(chunk);
                let charType = isChar ? charToChunkType[chunk] : null;
                if (isChar) {
                    if (
                        (chunk === '=' && chunks[i + 1] === '=') ||
                        (chunk === '[' && chunks[i + 1] === '[') ||
                        // **text**
                        (chunk === '*' && chunks[i + 1] === '*') ||
                        // *text*
                        (chunk === '*' && chunks[i - 1] !== '*')
                    ) {
                        if (wrappingCharType) {
                            wrappingCharType = null;
                        } else {
                            wrappingCharType = charType;
                        }
                    } else if (chunk === ']' && chunks[i + 1] === ']') {
                        if (wrappingCharType) {
                            wrappingCharType = null;
                        }
                    }
                    // heading
                    else if (
                        chunk === '#' &&
                        i === 0 &&
                        (chunks[i + 1] === ' ' || chunks[i + 1] === '#')
                    ) {
                        wrappingCharType = charType;
                    }
                    // tag
                    else if (chunk === '#' && !wrappingCharType) {
                        charType = ChunkType.tag;
                        wrappingCharType = charType;
                    }
                    // bullet point
                    else if (
                        chunk === '-' &&
                        i === 0 &&
                        chunks[i + 1] === ' '
                    ) {
                        wrappingCharType = charType;
                    } else if (chunk === '/') {
                        charType = null;
                    }
                }

                positions.push({
                    word: chunk,
                    lineNumber: currentLine,
                    xInChars: currentX,
                    lengthInChars: chunkLength,
                    chunkType: charType || wrappingCharType,
                });
                currentX += chunkLength;
            }
        }
        currentLine++;
    }

    return {
        words: positions,
        totalLines: currentLine + 1,
        empty: isEmptyCard,
    };
};
