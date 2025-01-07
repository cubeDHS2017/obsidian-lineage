import { Theme } from 'src/stores/settings/settings-type';

export const cssVariables = {
    colors: {
        activeBranchBg: '--background-active-parent',
        activeBranchColor: '--color-active-parent',
        containerBg: '--background-container',
    } satisfies Partial<Record<keyof Theme, string>>,
    cardWidth: '--node-width',
    cardIndentationWidth: '--node-indentation-width',
    nodeGap: '--node-gap-setting',
    minCardHeight: '--min-node-height',
    zoomLevel: '--zoom-level',
    viewWidth: '--view-width',
    viewHeight: '--view-height',
    inactiveCardOpacity: '--inactive-card-opacity',
};
