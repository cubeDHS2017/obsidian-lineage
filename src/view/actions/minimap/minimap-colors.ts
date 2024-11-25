import { getTheme } from 'src/obsidian/helpers/get-theme';

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

export const minimapColors = {
    current: themes.light,
};

export const updateMinimapColors = () => {
    minimapColors.current = themes[getTheme()];
};
