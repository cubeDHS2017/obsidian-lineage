export const removeHtmlElementMarkerInPreviewMode = (el: HTMLElement) => {
    if (el.classList.contains('lng-prev')) return;

    const spans = el.querySelectorAll('span[data-section]');
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const parent = span.parentElement;
        if (!parent) continue;
        const contents = span.childNodes;

        // move the span's content next to it
        for (let j = 0; j < contents.length; j++) {
            const content = contents[j];
            parent.insertBefore(
                content,
                span.nextSibling ? span.nextSibling : span,
            );
        }
    }
};
