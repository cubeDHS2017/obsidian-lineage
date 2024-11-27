import { getTheme } from 'src/obsidian/helpers/get-theme';
import { ChunkType } from 'src/view/actions/minimap/positioning/calculate-word-blocks/helpers/calculate-chunk-positions';

export type MinimapTheme = {
    wordBlock: string;
    indentLine: string;
    chars: {
        [ChunkType.heading]: string;
        [ChunkType.period]: string;
        [ChunkType.bullet]: string;
        [ChunkType.highlight]: string;
        [ChunkType.bold_italic]: string;
        [ChunkType.wikilink]: string;
        [ChunkType.tag]: string;
        [ChunkType.strikethrough]: string;
    };
};

const themes = {
    dark: {
        wordBlock: '#999999aa',
        indentLine: 'rgba(83, 223, 221, 0.5)',
        chars: {
            [ChunkType.highlight]: '#e0de71', // obsidian yellow
            [ChunkType.wikilink]: '#027aff', // obsidian blue
            [ChunkType.bold_italic]: '#fb464c', // obsidian red
            [ChunkType.heading]: '#44cf6e', // obsidian green
            [ChunkType.bullet]: '#fa99cd', // obsidian pink
            [ChunkType.tag]: '#e9973f', // obsidian orange
            [ChunkType.period]: '#ffffff', // white
            [ChunkType.strikethrough]: '#a882ff', // obsidian purple
        },
    },
    light: {
        wordBlock: '#707070cc',
        indentLine: 'rgba(83, 223, 221,1)',
        chars: {
            [ChunkType.highlight]: '#e0ac00', // obsidian yellow
            [ChunkType.wikilink]: '#086ddd', // obsidian blue
            [ChunkType.bold_italic]: '#e93147', // obsidian red
            [ChunkType.heading]: '#08b94e', // obsidian green
            [ChunkType.bullet]: '#d53984', // obsidian pink
            [ChunkType.tag]: '#ec7500', // obsidian orange
            [ChunkType.period]: '#777', // gray
            [ChunkType.strikethrough]: '#7852ee', // obsidian purple
        },
    },
};

export const minimapTheme = {
    current: themes.dark,
};

export const refreshMinimapTheme = () => {
    minimapTheme.current = themes[getTheme()];
};
