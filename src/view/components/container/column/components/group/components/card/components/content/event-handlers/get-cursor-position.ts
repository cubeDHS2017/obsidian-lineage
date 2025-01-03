export const getCursorPosition = (
    markdownText: string,
    event: MouseEvent,
): { line: number; ch: number } | null => {
    const range = document.caretRangeFromPoint(event.clientX, event.clientY);
    if (!range) return null;

    const lines = markdownText.split('\n');
    const clickedText = range.startContainer.textContent || '';
    const offset = range.startOffset;
    /* const target = event.target! as HTMLElement;
    const children = Array.from((event.currentTarget as HTMLElement).children);    const index = children.findIndex(        (parent) => parent === target || parent.contains(target),    );    const parentOfTarget = children[index];*/
    const start = Math.max(0, offset - 10);
    const end = Math.min(clickedText.length, offset + 10);
    const context = clickedText.slice(start, end);

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].contains(context)) {
            const startInLine = lines[i].indexOf(context) + (offset - start);
            return {
                line: i,
                ch: startInLine,
            };
        }
    }

    return null;
};
