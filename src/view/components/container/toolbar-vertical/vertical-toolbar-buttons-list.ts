import { LineageView } from 'src/view/view';
import { HiddenVerticalToolbarButtons } from 'src/stores/settings/derived/view-settings-store';
import { derived } from 'svelte/store';
import { ToolbarButton } from 'src/view/modals/vertical-toolbar-buttons/vertical-toolbar-buttons';
import { lang } from 'src/lang/lang';
import {
    HistoryIcon,
    Keyboard,
    Minus as ZoomOut,
    Palette,
    PanelRightInactive as PanelRight,
    Plus as ZoomIn,
    Redo2 as RedoIcon,
    RotateCcw,
    ScanSearch,
    Settings,
    Undo2 as UndoIcon,
} from 'lucide-svelte';
import { CustomIcon, customIcons } from 'src/helpers/load-custom-icons';
import { VerticalToolbarActions } from 'src/view/components/container/toolbar-vertical/vertical-toolbar-actions';

export type ToolbarButtonsGroup = {
    id: string;
    buttons: {
        label: string;
        onClick: (e: MouseEvent) => void;
        icon: typeof PanelRight | CustomIcon;
        id: ToolbarButton;
    }[];
};

export const VerticalToolbarButtonsList = (
    view: LineageView,
    restoreZoom: () => void,
    showZoomPopupMenu: (event: MouseEvent) => void,
) => {
    const hiddenControlsBarButtons = HiddenVerticalToolbarButtons(view.plugin);
    const h = new VerticalToolbarActions(view);

    return derived([hiddenControlsBarButtons], ([hiddenControlsBarButtons]) => {
        const set = new Set(hiddenControlsBarButtons);
        const buttons: ToolbarButtonsGroup[] = [
            {
                id: 'minimap',
                buttons: [
                    {
                        label: lang.controls_toggle_minimap,
                        onClick: h.toggleMinimap,
                        icon: PanelRight,
                        id: 'minimap',
                    },
                ],
            },
            {
                id: 'settings',
                buttons: [
                    {
                        label: lang.controls_settings,
                        onClick: h.toggleSettings,
                        icon: Settings,
                        id: 'settings',
                    },
                    {
                        label: lang.controls_hotkeys,
                        onClick: h.toggleHelp,
                        icon: Keyboard,
                        id: 'hotkeys',
                    },
                    {
                        label: lang.controls_rules,
                        onClick: h.toggleStyleRules,
                        icon: Palette,
                        id: 'style-rules',
                    },
                ],
            },
            {
                id: 'scroll',
                buttons: [
                    {
                        label: lang.controls_toggle_scrolling_mode_horizontal,
                        onClick: h.toggleScrollModeH,
                        icon: customIcons.alignH,
                        id: 'center-active-node-h',
                    },
                    {
                        label: lang.controls_toggle_scrolling_mode_vertical,
                        onClick: h.toggleScrollModeV,
                        icon: customIcons.alignV,
                        id: 'center-active-node-v',
                    },
                ],
            },
            {
                id: 'display',
                buttons: [
                    {
                        label: lang.controls_single_column,
                        onClick: h.toggleOutlineMode,
                        icon: customIcons.outline,
                        id: 'outline-mode',
                    },
                    {
                        label: lang.controls_gap_between_cards,
                        onClick: h.toggleGap,
                        icon: customIcons.gap,
                        id: 'space-between-cards',
                    },
                ],
            },
            {
                id: 'history',
                buttons: [
                    {
                        label: lang.controls_history,
                        onClick: h.toggleSnapshotsModal,
                        icon: HistoryIcon,
                        id: 'snapshots-list',
                    },
                    {
                        label: lang.controls_history_undo,
                        onClick: h.handlePreviousClick,
                        icon: UndoIcon,
                        id: 'undo',
                    },
                    {
                        label: lang.controls_history_redo,
                        onClick: h.handleNextClick,
                        icon: RedoIcon,
                        id: 'redo',
                    },
                ],
            },
            {
                id: 'zoom',
                buttons: [
                    {
                        label: lang.controls_zoom_in,
                        onClick: h.zoomIn,
                        icon: ZoomIn,
                        id: 'zoom-in',
                    },
                    {
                        label: lang.controls_zoom_reset,
                        onClick: restoreZoom,
                        icon: RotateCcw,
                        id: 'zoom-reset',
                    },
                    {
                        label: lang.controls_zoom_presets,
                        onClick: showZoomPopupMenu,
                        icon: ScanSearch,
                        id: 'zoom-presets',
                    },
                    {
                        label: lang.controls_zoom_out,
                        onClick: h.zoomOut,
                        icon: ZoomOut,
                        id: 'zoom-out',
                    },
                ],
            },
        ];

        return buttons
            .map((group) => {
                return {
                    id: group.id,
                    buttons: group.buttons.filter((b) => !set.has(b.id)),
                };
            })
            .filter((g) => g.buttons.length > 0);
    });
};
