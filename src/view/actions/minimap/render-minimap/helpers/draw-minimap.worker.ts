import {
    drawMinimap,
    DrawWordMinimapProps,
} from 'src/view/actions/minimap/render-minimap/helpers/draw-minimap';

type State = {
    canvases: {
        [canvasId: string]: {
            canvas: OffscreenCanvas;
            ctx: OffscreenCanvasRenderingContext2D;
        };
    };
};

const state: State = {
    canvases: {},
};
export type CanvasWorkerProps =
    | { canvas: OffscreenCanvas; canvasId: string }
    | {
          canvasId: string;
          event: 'destroy';
      };

self.onmessage = (event: MessageEvent) => {
    const payload = event.data.payload as
        | DrawWordMinimapProps
        | CanvasWorkerProps;
    if ('canvas' in payload) {
        const ctx = payload.canvas.getContext('2d');
        if (ctx) {
            state.canvases[payload.canvasId] = {
                ctx: ctx,
                canvas: payload.canvas,
            };
        }
    } else if ('event' in payload) {
        delete state.canvases[payload.canvasId];
    } else {
        const viewCanvas = state.canvases[payload.canvasId];

        if (!viewCanvas) throw new Error('no canvas context');
        const ctx = viewCanvas.ctx;
        const canvas = viewCanvas.canvas;
        drawMinimap(payload, canvas, ctx);
    }
    self.postMessage({
        id: event.data.id,
        payload: 0,
    });
};
