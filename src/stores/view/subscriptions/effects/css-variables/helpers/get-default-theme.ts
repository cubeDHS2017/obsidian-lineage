import { getTheme } from 'src/obsidian/helpers/get-theme';
import { Theme } from 'src/stores/settings/settings-type';

type DefaultTheme = Pick<Theme, 'activeBranchBg' | 'containerBg'>;
const darkTheme = {
    containerBg: '#373d4c',
    activeBranchBg: '#5b637a',
} satisfies DefaultTheme;
const lightTheme = {
    containerBg: '#899cb3',
    activeBranchBg: '#cedbeb',
} satisfies DefaultTheme;

export const getDefaultTheme = () => {
    const theme = getTheme();
    return theme === 'light' ? lightTheme : darkTheme;
};
