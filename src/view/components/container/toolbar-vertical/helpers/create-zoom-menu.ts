import { get } from 'svelte/store';
import { zoomLevelStore } from 'src/stores/view/derived/zoom-level-store';
import { Menu } from 'obsidian';
import { showMinimapStore } from 'src/stores/settings/derived/scrolling-store';
import { LineageView } from 'src/view/view';
import { fitDocumentHeightIntoView } from 'src/view/components/container/toolbar-vertical/helpers/fit-document-height-into-view';
import { fitBranchIntoView } from 'src/view/components/container/toolbar-vertical/helpers/fit-branch-into-view';

type State = {
    menuHeight: number;
    menuWidth: number;
    lastMenuHideEvent_ms: number;
};

type DynamicZoomValue = (view: LineageView) => Promise<number>;

type Props = {
    event: MouseEvent;
    view: LineageView;
    state: State;
};

type ZoomOption = {
    label: string;
    scale: number | DynamicZoomValue;
};

const staticZoomOptions: ZoomOption[] = [
    { label: '5%', scale: 0.05 },
    { label: '10%', scale: 0.1 },
    { label: '20%', scale: 0.2 },
    { label: '30%', scale: 0.3 },
    { label: '40%', scale: 0.4 },
    { label: '50%', scale: 0.5 },
    { label: '60%', scale: 0.6 },
    { label: '70%', scale: 0.7 },
    { label: '80%', scale: 0.8 },
    { label: '90%', scale: 0.9 },
    { label: '100%', scale: 1.0 },
    { label: '125%', scale: 1.25 },
    { label: '150%', scale: 1.5 },
    { label: '175%', scale: 1.75 },
    { label: '200%', scale: 2.0 },
];

const dynamicZoomOptions = [
    {
        label: 'Fit document height into view',
        scale: fitDocumentHeightIntoView,
    },
    {
        label: 'Fit active branch into view',
        scale: fitBranchIntoView,
    },
];

export const createZoomMenu = (props: Props) => {
    let lastClickedZoom = get(zoomLevelStore(props.view));

    const zoomGroups: ZoomOption[][] = [dynamicZoomOptions, staticZoomOptions];

    const apply = async (zoom: ZoomOption, isClick: boolean) => {
        const newValue =
            typeof zoom.scale === 'number'
                ? zoom.scale
                : await zoom.scale(props.view);
        if (isClick) {
            lastClickedZoom = newValue;
        } else {
            hoverZoom = newValue;
        }
        props.view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: {
                value: newValue,
            },
        });
    };
    const menu = new Menu();
    let hoverZoom = lastClickedZoom;

    for (const group of zoomGroups) {
        const groupIndex = zoomGroups.indexOf(group);
        if (groupIndex > 0) menu.addSeparator();

        for (const zoom of group) {
            menu.addItem((item) => {
                item.setTitle(zoom.label)
                    .setChecked(zoom.scale === lastClickedZoom)
                    .onClick(() => {
                        apply(zoom, true);
                        menu.hide();
                        createZoomMenu(props);
                    });

                // @ts-ignore
                const dom = item.dom as HTMLElement | null;
                if (dom) {
                    dom.addEventListener('mouseenter', () => {
                        apply(zoom, false);
                    });
                }
            });
        }
    }

    // when mouse leaves the menu, reapply the last clicked zoom level
    // @ts-ignore
    const menuDom = menu.dom as HTMLElement | null;
    if (menuDom) {
        menuDom.addEventListener('mouseleave', () => {
            if (hoverZoom !== lastClickedZoom) {
                props.view.plugin.settings.dispatch({
                    type: 'UI/CHANGE_ZOOM_LEVEL',
                    payload: { value: lastClickedZoom },
                });
            }
        });
        menuDom.style.width = '220px';
    }

    if (menuDom && !props.state.menuHeight) {
        menu.showAtPosition({ x: props.event.pageX, y: props.event.pageY });
        const rect = menuDom.getBoundingClientRect();
        props.state.menuHeight = rect.height;
        props.state.menuWidth = rect.width;
        menu.close();
    }
    const buttonRect = (
        props.event.target as HTMLElement
    ).getBoundingClientRect();
    menu.showAtPosition({
        x: get(showMinimapStore(props.view))
            ? buttonRect.left - props.state.menuWidth - 10
            : buttonRect.left - 10,
        y: buttonRect.top + buttonRect.height / 2 - props.state.menuHeight / 2,
    });
    menu.onHide(() => {
        props.state.lastMenuHideEvent_ms = Date.now();
    });
};
