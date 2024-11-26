import {
    MinimapDomElements,
    MinimapProps,
    MinimapState,
} from 'src/view/actions/minimap/minimap';
import { debounce } from 'obsidian';
import { drawMinimapWorker } from 'src/view/actions/minimap/worker-instances';
import { minimapTheme } from 'src/view/actions/minimap/minimap-theme';

// offscreen canvas can only be passed to a worker once
const transferred: { [canvasId: string]: true } = {};

const renderMinimap = async (
    state: MinimapState,
    props: MinimapProps,
    dom: MinimapDomElements,
) => {
    if (!transferred[state.canvasId]) {
        await drawMinimapWorker.run(
            { canvas: dom.offscreen, canvasId: state.canvasId },
            dom.offscreen,
        );
        transferred[state.canvasId] = true;
    }
    await drawMinimapWorker.run({
        wordBlocks: state.shapes.wordBlocks,
        activeCardId: props.activeCardId,
        canvasId: state.canvasId,
        canvasHeight: state.totalDrawnHeight_cpx,
        lines: state.shapes.indentationLines,
        theme: minimapTheme.current,
    });
};

export const debouncedRenderMinimap = debounce(renderMinimap, 16);
