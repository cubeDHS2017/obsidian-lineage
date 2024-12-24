import { chunkPositionsCache } from 'src/view/actions/minimap/render-minimap/helpers/shapes/helpers/chunk-positions-cache';

export enum ChunkType {
    heading = 'heading',
    period = 'period',
    bullet = 'bullet',
    highlight = 'highlight',
    bold_italic = 'bold_italic',
    wikilink = 'wikilink',
    tag = 'tag',
    strikethrough = 'strikethrough',
    task = 'task',
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

export type ChunkPositionResult = {
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
    lineType: ChunkType | null;
};

const abbrevRegex =
    /\b(dr|mr|mrs|ms|e\.g|e\.i|sr|jr|st|ave|rd|no|vs|etc|vol|ed|pp)\b/i;

const unhallowedTagCharacters = new Set([
    '^',
    '.',
    '!',
    '`',
    '*',
    '%',
    '?',
    '"',
    '~',
    '@',
    "'",
    '(',
    ')',
    '!',
    '{',
    '}',
    '[',
    ']',
    '^',
    '%',
    '$',
    '+',
    '=',
    '\\',
]);

export const calculateChunkPositions = (
    content: string,
    availableLineCharacters: number,
    nodeId: string,
    canvasId: string,
): ChunkPositionResult => {
    const cache = chunkPositionsCache.getCachedResult(
        canvasId,
        nodeId,
        content,
        availableLineCharacters,
    );
    if (cache) {
        return cache;
    }
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
        lineType: null,
    };

    for (let i = 0; i < content.length; i++) {
        const chunk = content[i];
        if (chunk === '\n') {
            state.line++;
            state.lineType = null;
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
                    state.lineType = state.type;
                }
                // tag
                else if (
                    chunk === '#' &&
                    !unhallowedTagCharacters.has(nextChunk)
                ) {
                    // switch from "heading" to "tag"
                    state.type = ChunkType.tag;
                    state.category = Category.block_without_space;
                }

                // bullet point
                else if (chunk === '-' && state.x === 0) {
                    state.category = Category.full_line_container;
                    if (
                        nextChunk === ' ' &&
                        content[i + 2] === '[' &&
                        content[i + 4] === ']'
                    ) {
                        // switch from "bullet" to "task"
                        state.type = ChunkType.task;
                    }
                    state.lineType = state.type;
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
                        state.type = state.previousType;
                    }
                } else {
                    state.type = state.previousType;
                }
            }
        }
        if (state.x + 1 > availableLineCharacters) {
            state.line++;
            state.x = 0;
            state.lineType = null;
        } else if (!state.type && state.lineType) {
            // fallback to heading/task/bullet point types
            state.type = state.lineType;
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
                type: state.type,
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

    const result = {
        chunks: positions,
        totalLines: state.line + 1,
        empty: isEmptyCard,
    };
    chunkPositionsCache.cacheResult(
        canvasId,
        nodeId,
        content,
        availableLineCharacters,
        result,
    );
    return result;
};
