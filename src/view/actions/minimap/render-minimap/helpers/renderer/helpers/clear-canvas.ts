export const clearCanvas = (ctx: OffscreenCanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
