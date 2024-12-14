<script lang="ts">
    import { Minus as ZoomOut, Plus as ZoomIn, RotateCcw, ScanSearch } from 'lucide-svelte';
    import { get } from 'svelte/store';
    import { Menu } from 'obsidian';
    import invariant from 'tiny-invariant';
    import { getView } from '../../context';
    import Button from '../../shared/button.svelte';
    import {
        getCombinedBoundingClientRect
    } from 'src/stores/view/subscriptions/effects/align-branch/helpers/get-combined-client-rect';
    import { zoomLevelStore } from 'src/stores/view/derived/zoom-level-store';
    import { maxZoomLevel, minZoomLevel } from 'src/stores/settings/reducers/change-zoom-level';

    export let showControls: boolean;

    const view = getView();

    const zoomIn = () => {
        view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { direction: 'in' },
        });
    };
    const zoomOut = () => {
        view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { direction: 'out' },
        });
    };

    const restoreZoom = () => {
        view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { value: 1 },
        });
    };

    const fitDocumentHeightIntoView = () => {
        invariant(view.container);
        const initialZoomLevel = get(zoomLevelStore(view));
        view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { value: 1 },
        });
        const columns = Array.from(
            view.containerEl.querySelectorAll('.column'),
        ) as HTMLElement[];
        let result = 1;
        if (columns.length) {
            const groupHeights = columns
                .map((c) => {
                    return getCombinedBoundingClientRect(
                        Array.from(
                            (c as HTMLElement).querySelectorAll('.group'),
                        ),
                    ).height;
                })
                .sort((a, b) => a - b);
            const height = groupHeights[groupHeights.length - 1];
            const width = getCombinedBoundingClientRect(columns).width;

            // eslint-disable-next-line no-undef
            const heightScale =
                view.container.getBoundingClientRect().height / (height + 100);
            const widthScale =
                view.container.getBoundingClientRect().width / (width + 100);

            result = Math.min(heightScale, widthScale);
        }
        // restore zoom level
        view.plugin.settings.dispatch({
            type: 'UI/CHANGE_ZOOM_LEVEL',
            payload: { value: initialZoomLevel },
        });
        return result;
    };

    const zoomLevel = zoomLevelStore(view);

    const createZoomMenu = (event: MouseEvent, fitDocumentScale: number) => {
        let lastClickedZoom = get(zoomLevelStore(view));

        const zoomGroups = [
            [{ label: 'Fit height into view', scale: fitDocumentScale }],
            [
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
            ],
        ];

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
                            lastClickedZoom = zoom.scale;
                            view.plugin.settings.dispatch({
                                type: 'UI/CHANGE_ZOOM_LEVEL',
                                payload: { value: zoom.scale },
                            });
                            menu.hide();
                            createZoomMenu(event, fitDocumentScale);
                        });

                    // @ts-ignore
                    const dom = item.dom as HTMLElement | null;
                    if (dom) {
                        dom.addEventListener('mouseenter', () => {
                            hoverZoom = zoom.scale;
                            view.plugin.settings.dispatch({
                                type: 'UI/CHANGE_ZOOM_LEVEL',
                                payload: { value: zoom.scale },
                            });
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
                    view.plugin.settings.dispatch({
                        type: 'UI/CHANGE_ZOOM_LEVEL',
                        payload: { value: lastClickedZoom },
                    });
                }
            });
            menuDom.style.width = '200px';
        }

        menu.showAtPosition({ x: event.pageX, y: event.pageY });
        menu.onHide(() => {
            lastMenuHideEvent_ms = Date.now();
        });
    };

    let lastMenuHideEvent_ms = 0;
    const showZoomPopupMenu = (event: MouseEvent) => {
        // to prevent the click event from hiding and re-showing the menu immediately
        if (Date.now() - lastMenuHideEvent_ms < 100) return;

        createZoomMenu(event, fitDocumentHeightIntoView());
    };
</script>

<div class="buttons-group buttons-group--vertical" data-visible={showControls}>
    <Button
        classes="control-item"
        disabled={$zoomLevel >= maxZoomLevel}
        label="zoom in"
        on:click={zoomIn}
        tooltipPosition="left"
    >
        <ZoomIn class="svg-icon" />
    </Button>
    <Button
        classes="control-item"
        disabled={$zoomLevel === 1}
        label="Restore zoom level"
        active={$zoomLevel !== 1}
        on:click={restoreZoom}
        tooltipPosition="left"
    >
        <RotateCcw class="svg-icon" />
    </Button>

    <Button
        classes="control-item"
        label="Fit document height into view"
        on:click={showZoomPopupMenu}
        tooltipPosition="left"
    >
        <ScanSearch class="svg-icon" />
    </Button>
    <Button
        classes="control-item"
        disabled={$zoomLevel <= minZoomLevel}
        label="Zoom out"
        on:click={zoomOut}
        tooltipPosition="left"
    >
        <ZoomOut class="svg-icon" />
    </Button>
</div>
