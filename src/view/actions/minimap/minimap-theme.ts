import { getTheme } from 'src/obsidian/helpers/get-theme';

export type MinimapTheme = {
    wordBlockEmptyInactive: string;
    wordBlockEmptyActive: string;
    wordBlockInactive: string;
    indentLine: string;
    wordBlockActive: string;
};

const themes = {
    dark: {
        wordBlockActive: '#999999',
        wordBlockInactive: '#99999966',
        wordBlockEmptyActive: '#027affaa',
        wordBlockEmptyInactive: '#027aff55',
        indentLine: 'rgba(83, 223, 221, 0.5)',
    },
    light: {
        wordBlockActive: '#70707099',
        wordBlockInactive: '#70707050',
        wordBlockEmptyActive: '#086dddaa',
        wordBlockEmptyInactive: '#086ddd55',
        indentLine: 'rgba(83, 223, 221, 0.7)',
    },
};

export const minimapTheme = {
    current: themes.light,
};

export const refreshMinimapTheme = () => {
    minimapTheme.current = themes[getTheme()];
};
