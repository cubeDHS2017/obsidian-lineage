import { getTheme } from 'src/obsidian/helpers/get-theme';
import { ChunkType } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-chunk-positions';

export type MinimapTheme = {
    isLightTheme: boolean;
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
        [ChunkType.comma]: string;
    };
};

const themes = {
    dark: {
        isLightTheme: false,
        card_active: '#a9a9a9a',
        card_searchResult: '#e0de7177',
        wordBlock: '#99999966',
        indentLine: '#ffffff55',
        chars: {
            [ChunkType.highlight]: '#e0de7177', // brighter yellow
            [ChunkType.wikilink]: '#027aff77', // brighter blue
            [ChunkType.bold_italic]: '#fb464c66', // brighter red
            [ChunkType.heading]: '#44cf6e77', // brighter green
            [ChunkType.bullet]: '#fa99cd66', // brighter pink
            [ChunkType.tag]: '#e9973f77', // brighter orange
            [ChunkType.period]: '#ffffff88', // white
            [ChunkType.strikethrough]: '#a882ff66', // brighter purple
            [ChunkType.task]: '#17e7e077', // brighter cyan
            [ChunkType.comma]: '#17e7e088', // white
        },
    },
    light: {
        isLightTheme: true,
        wordBlock: '#70707088',
        card_active: '#aaaaaa',
        card_searchResult: '#e0ac0077',
        indentLine: '#777777aa',
        chars: {
            [ChunkType.highlight]: '#e0ac0077', // brighter yellow
            [ChunkType.wikilink]: '#086ddd77', // brighter blue
            [ChunkType.bold_italic]: '#e9314777', // brighter red
            [ChunkType.heading]: '#08b94e77', // brighter green
            [ChunkType.bullet]: '#d5398477', // brighter pink
            [ChunkType.tag]: '#ec750077', // brighter orange
            [ChunkType.period]: '#777777ee', // original gray
            [ChunkType.strikethrough]: '#7852ee77', // brighter purple
            [ChunkType.task]: '#17e7e077', // brighter cyan
            [ChunkType.comma]: '#11b3b3', //  brighter cyan
        },
    },
};

export const minimapTheme = {
    current: themes.dark,
};

export const refreshMinimapTheme = () => {
    minimapTheme.current = themes[getTheme()];
};
