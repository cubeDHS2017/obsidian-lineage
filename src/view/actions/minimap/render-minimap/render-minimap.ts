import { drawIndentGuides } from 'src/view/actions/minimap/render-minimap/helpers/draw-indent-guides';
import {
    MinimapDomElements,
    MinimapProps,
    MinimapState,
} from 'src/view/actions/minimap/minimap';
import { debounce } from 'obsidian';
import { drawWordBlocks } from 'src/view/actions/minimap/render-minimap/helpers/draw-word-blocks';

const renderMinimap = (
    state: MinimapState,
    props: MinimapProps,
    dom: MinimapDomElements,
): void => {
    dom.canvas.height = state.totalDrawnHeight_cpx;

    dom.ctx.clearRect(0, 0, dom.canvas.width, dom.canvas.height);

    drawIndentGuides(dom.ctx, state.shapes.indentationLines);
    drawWordBlocks(dom.ctx, state.shapes.wordBlocks, props.activeCardId);
};

export const debouncedRenderMinimap = debounce(renderMinimap, 50);
