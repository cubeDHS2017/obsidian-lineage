export const resizeOffscreenCanvas = (
    ctx: OffscreenCanvasRenderingContext2D,
    tempCtx: OffscreenCanvasRenderingContext2D,
    newHeight: number,
) => {
    if (tempCtx) {
        tempCtx.drawImage(ctx.canvas, 0, 0);
    }

    ctx.canvas.height = newHeight;

    if (tempCtx) {
        ctx.drawImage(tempCtx.canvas, 0, 0);
    }
};
