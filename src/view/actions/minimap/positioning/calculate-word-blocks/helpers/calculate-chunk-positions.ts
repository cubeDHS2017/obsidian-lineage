export enum ChunkType {
    heading = 'heading',
    period = 'period',
    bullet = 'bullet',
    highlight = 'highlight',
    bold_italic = 'bold_italic',
    wikilink = 'wikilink',
    tag = 'tag',
    strikethrough = 'strikethrough',
}

export enum Category {
    single_character = 'single_character',
    full_line = 'full_line',
    full_line_container = 'full_line_container', // bullet point
    block_with_space = 'block_with_space',
    block_without_space = 'block_without_space',
}

const charToChunkType: Record<string, ChunkType> = {
    '#': ChunkType.heading,
    '-': ChunkType.bullet,
    '.': ChunkType.period,
    '=': ChunkType.highlight,
    '*': ChunkType.bold_italic,
    _: ChunkType.bold_italic,
    '[': ChunkType.wikilink,
    ']': ChunkType.wikilink,
    '~': ChunkType.strikethrough,
};

type ChunkPosition = {
    chunk: string;
    line: number;
    x_chars: number;
    length_chars: number;
    type: ChunkType | null;
};

type ChunkPositionResult = {
    chunks: ChunkPosition[];
    totalLines: number;
    empty: boolean;
};

type State = {
    chunk: ChunkPosition;
    x: number;
    line: number;
    previousLine: number;
    category: Category | null;
    type: ChunkType | null;
    previousType: ChunkType | null;
    isSpace: boolean;
    isAfterOpeningElement: boolean;
};

const abbrevRegex =
    /\b(dr|mr|mrs|ms|e\.g|e\.i|sr|jr|st|ave|rd|no|vs|etc|vol|ed|pp)\b/i;

export const calculateChunkPositions = (
    content: string,
    availableLineCharacters: number,
): ChunkPositionResult => {
    const isEmptyCard = !content.trim();
    if (isEmptyCard) {
        content = 'empty';
    }
    const positions: ChunkPosition[] = [];
    const state: State = {
        chunk: {
            chunk: '',
            length_chars: -1,
            line: 0,
            type: null,
            x_chars: 0,
        },
        x: 0,
        line: 0,
        type: null,
        previousType: null,
        previousLine: 0,
        category: null,
        isSpace: false,
        isAfterOpeningElement: false,
    };

    for (let i = 0; i < content.length; i++) {
        const chunk = content[i];
        if (chunk === '\n') {
            state.line++;
            state.x = 0;
            if (
                state.category === Category.full_line ||
                state.category === Category.block_without_space ||
                !state.isAfterOpeningElement
            ) {
                state.category = null;
                state.type = null;
                state.previousType = null;
            }
            continue;
        } else if (chunk === ' ') {
            const allowSpace =
                state.category === Category.block_with_space ||
                state.category === Category.full_line ||
                state.category === Category.full_line_container;
            if (!allowSpace) {
                state.type = null;
                // state.x++;
                state.isSpace = true;
            }
        } else if (state.category !== Category.full_line) {
            const chunkType = charToChunkType[chunk];
            if (chunkType) {
                state.type = chunkType;
                const nextChunk = content[i + 1];
                const isBlockWithSpace =
                    (chunk === '=' && nextChunk === '=') ||
                    (chunk === '~' && nextChunk === '~') ||
                    (chunk === '[' && nextChunk === '[') ||
                    (chunk === ']' && nextChunk === ']') ||
                    // **text**
                    (chunk === '*' && nextChunk === '*') ||
                    // *text*
                    (chunk === '*' && content[i - 1] !== '*') ||
                    chunk === '_';

                if (isBlockWithSpace) {
                    if (state.type !== state.previousType) {
                        state.category = Category.block_with_space;
                        state.isAfterOpeningElement = true;
                    } else {
                        state.category = null;
                        state.isAfterOpeningElement = false;
                    }
                }
                // heading
                else if (
                    chunk === '#' &&
                    state.x === 0 &&
                    (nextChunk === ' ' || nextChunk === '#')
                ) {
                    state.category = Category.full_line;
                }
                // tag
                else if (chunk === '#') {
                    state.type = ChunkType.tag;
                    state.category = Category.block_without_space;
                }

                // bullet point
                else if (chunk === '-') {
                    if (state.x === 0 && nextChunk === ' ') {
                        state.category = Category.full_line_container;
                    } else {
                        state.type = state.previousType;
                    }
                } else if (chunk === '.') {
                    const previousChunk =
                        (content[i - 3] || '') +
                        content[i - 2] +
                        content[i - 1];

                    if (
                        !(nextChunk && nextChunk.match(/[A-Z\d]/)) &&
                        !content[i - 1].match(/[.!?]/) &&
                        !abbrevRegex.test(previousChunk) &&
                        !(content[i - 1] === 'e' && nextChunk === 'g') &&
                        !(content[i - 1] === 'i' && nextChunk === 'e')
                    ) {
                        state.category = Category.single_character;
                    } else {
                        state.type = null;
                    }
                }
            }
        }
        if (state.x + 1 > availableLineCharacters) {
            state.line++;
            state.x = 0;
        }
        if (state.line !== state.previousLine) {
            state.chunk.length_chars = state.chunk.chunk.length;
            if (state.chunk.length_chars > 0) {
                positions.push(state.chunk);
            }
            // chunk type is kept
            state.chunk = {
                chunk: chunk,
                line: state.line,
                x_chars: 0,
                length_chars: -1,
                type: state.type,
            };
            state.previousLine = state.line;
        } else if (state.isSpace) {
            state.chunk.length_chars = state.chunk.chunk.length;
            if (state.chunk.length_chars > 0) {
                positions.push(state.chunk);
            }
            state.chunk = {
                chunk: '',
                line: state.line,
                x_chars: state.x + 1,
                length_chars: -1,
                type: null,
            };
            state.isSpace = false;
            state.category = null;
        } else if (
            state.type !== state.previousType ||
            state.category === Category.single_character
        ) {
            state.chunk.length_chars = state.chunk.chunk.length;
            if (state.chunk.length_chars > 0) {
                positions.push(state.chunk);
            }

            state.chunk = {
                chunk: chunk,
                line: state.line,
                x_chars: state.x,
                length_chars: -1,
                type: state.type,
            };
            if (state.category === Category.single_character) {
                state.type = null;
            }
        } else {
            state.chunk.chunk += chunk;
        }

        state.x++;
        state.previousType = state.type;
    }
    state.chunk.length_chars = state.chunk.chunk.length;
    if (state.chunk.length_chars > 0) {
        positions.push(state.chunk);
    }
    return {
        chunks: positions,
        totalLines: state.line + 1,
        empty: isEmptyCard,
    };
};
