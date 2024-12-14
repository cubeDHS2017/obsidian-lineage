import { getTheme } from 'src/obsidian/helpers/get-theme';
import { ChunkType } from 'src/view/actions/minimap/positioning/calculate-word-blocks/helpers/calculate-chunk-positions';

export type MinimapTheme = {
    wordBlock: string;
    indentLine: string;
    card_active: string;
    card_searchResult: string;
    chars: {
        [ChunkType.heading]: string;
        [ChunkType.period]: string;
        [ChunkType.bullet]: string;
        [ChunkType.highlight]: string;
        [ChunkType.bold_italic]: string;
        [ChunkType.wikilink]: string;
        [ChunkType.tag]: string;
        [ChunkType.strikethrough]: string;
        [ChunkType.task]: string;
    };
};

const themes = {
    dark: {
        card_active: '#a9a9a9a',
        card_searchResult: '#e0de71', // obsidian yellow
        wordBlock: '#999999aa',
        indentLine: '#ffffff55',
        chars: {
            [ChunkType.highlight]: '#e0de71', // obsidian yellow
            [ChunkType.wikilink]: '#027aff', // obsidian blue
            [ChunkType.bold_italic]: '#fb464c', // obsidian red
            [ChunkType.heading]: '#44cf6e', // obsidian green
            [ChunkType.bullet]: '#fa99cd', // obsidian pink
            [ChunkType.tag]: '#e9973f', // obsidian orange
            [ChunkType.period]: '#ffffff88', // white
            [ChunkType.strikethrough]: '#a882ff', // obsidian purple
            [ChunkType.task]: '#17e7e0', // cyan
        },
    },
    light: {
        wordBlock: '#707070cc',
        card_active: '#aaaaaa',
        card_searchResult: '#e0ac00', // obsidian yellow
        indentLine: '#77777750',
        chars: {
            [ChunkType.highlight]: '#e0ac00', // obsidian yellow
            [ChunkType.wikilink]: '#086ddd', // obsidian blue
            [ChunkType.bold_italic]: '#e93147', // obsidian red
            [ChunkType.heading]: '#08b94e', // obsidian green
            [ChunkType.bullet]: '#d53984', // obsidian pink
            [ChunkType.tag]: '#ec7500', // obsidian orange
            [ChunkType.period]: '#777', // gray
            [ChunkType.strikethrough]: '#7852ee', // obsidian purple
            [ChunkType.task]: '#17e7e0', // cyan
        },
    },
};

export const minimapTheme = {
    current: themes.dark,
};

export const refreshMinimapTheme = () => {
    minimapTheme.current = themes[getTheme()];
};
