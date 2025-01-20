export const clearCanvasRange = (
    ctx: OffscreenCanvasRenderingContext2D,
    y_start: number,
    y_end: number,
) => {
    ctx.clearRect(0, y_start, ctx.canvas.width, y_end - y_start);
};
