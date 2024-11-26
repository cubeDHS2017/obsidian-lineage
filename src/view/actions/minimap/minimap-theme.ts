import { getTheme } from 'src/obsidian/helpers/get-theme';
import { ChunkType } from 'src/view/actions/minimap/positioning/calculate-word-blocks/helpers/calculate-word-positions';

export type MinimapTheme = {
    wordBlockEmptyInactive: string;
    wordBlockEmptyActive: string;
    wordBlockInactive: string;
    indentLine: string;
    wordBlockActive: string;
    chars: ThemeChunkColors;
};
type ChunkColors = {
    [key in ChunkType]: string;
};
type ThemeChunkColors = {
    inactive: ChunkColors;
    active: ChunkColors;
};

const themeChunkColors: ThemeChunkColors = {
    active: {
        [ChunkType.highlight]: '#FFFF00', // yellow
        [ChunkType.wikilink]: '#800080', // purple
        [ChunkType.bold_italic]: '#FFC0CB', // pink
        [ChunkType.heading]: '#008000', // green
        [ChunkType.period]: '#ffffff', // blue
        [ChunkType.bullet]: '#FFA500aa', // orange
        [ChunkType.tag]: '#fb464c', // red
        [ChunkType.other]: '#800080', // purple
    },
    inactive: {
        [ChunkType.heading]: '#00800080', // green
        [ChunkType.period]: '#ffffff70', // blue
        [ChunkType.bullet]: '#FFA50080', // orange
        [ChunkType.bold_italic]: '#FFC0CB80', // pink
        [ChunkType.highlight]: '#FFFF0080', // yellow
        [ChunkType.other]: '#80008080', // purple
        [ChunkType.tag]: '#fb464c', // red
        [ChunkType.wikilink]: '#800080', // purple
    },
};

const themes = {
    dark: {
        wordBlockActive: '#999999',
        wordBlockInactive: '#99999966',
        wordBlockEmptyActive: '#027affaa',
        wordBlockEmptyInactive: '#027aff55',
        indentLine: 'rgba(83, 223, 221, 0.5)',
        chars: themeChunkColors,
    },
    light: {
        wordBlockActive: '#70707099',
        wordBlockInactive: '#70707050',
        wordBlockEmptyActive: '#086dddaa',
        wordBlockEmptyInactive: '#086ddd55',
        indentLine: 'rgba(83, 223, 221, 0.7)',
        chars: themeChunkColors,
    },
};

export const minimapTheme = {
    current: themes.light,
};

export const refreshMinimapTheme = () => {
    minimapTheme.current = themes[getTheme()];
};
