import { MinimapRenderer } from 'src/view/actions/minimap/render-minimap/minimap-renderer';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { MinimapTheme } from 'src/view/actions/minimap/minimap-theme';
import { chunkPositionsCache } from 'src/view/actions/minimap/render-minimap/helpers/shapes/helpers/chunk-positions-cache';

type State = {
    canvases: {
        [canvasId: string]: {
            minimap: MinimapRenderer;
        };
    };
};

const state: State = {
    canvases: {},
};
export type CanvasWorkerProps =
    | {
          type: 'worker/initialize';
          payload: {
              canvas: OffscreenCanvas;
              canvasId: string;
              theme: MinimapTheme;
          };
      }
    | {
          payload: {
              canvasId: string;
          };
          type: 'worker/destroy';
      }
    | MinimapEvent
    | {
          type: 'minimap/set/document';
          payload: {
              document: LineageDocument;
              activeNodeId: string;
              canvasId: string;
          };
      };

export type MinimapEvent = {
    type: 'minimap/update-theme';
    payload: {
        theme: MinimapTheme;
        canvasId: string;
    };
};

self.onmessage = (message: MessageEvent) => {
    const event = message.data.payload as CanvasWorkerProps;
    let result = null;
    if (event.type === 'worker/initialize') {
        const ctx = event.payload.canvas.getContext('2d');
        if (ctx) {
            state.canvases[event.payload.canvasId] = {
                minimap: new MinimapRenderer(
                    ctx,
                    event.payload.canvas,
                    event.payload.theme,
                ),
            };
        }
    } else if (event.type === 'worker/destroy') {
        delete state.canvases[event.payload.canvasId];
        chunkPositionsCache.deleteCanvasCache(event.payload.canvasId);
    } else {
        const viewCanvas = state.canvases[event.payload.canvasId];
        if (!viewCanvas) {
            throw new Error('no canvas context');
        }
        if (event.type === 'minimap/update-theme') {
            viewCanvas.minimap.setTheme(event.payload.theme);
        } else if (event.type === 'minimap/set/document') {
            result = viewCanvas.minimap.setDocument(
                event.payload.document,
                event.payload.activeNodeId,
                event.payload.canvasId,
            );
        }
    }

    self.postMessage({
        id: message.data.id,
        payload: result,
    });
};
