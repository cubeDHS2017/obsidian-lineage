import { MarkdownRenderer } from 'obsidian';
import { getPlugin, getView } from 'src/view/components/container/context';
import { contentStore } from 'src/stores/document/derived/content-store';

export const markdownPreviewAction = (element: HTMLElement, nodeId: string) => {
    const plugin = getPlugin();
    const view = getView();
    const store = view.documentStore;

    const render = (content: string) => {
        if (view && element) {
            element.empty();
            // insert `&nbsp;` in empty lines
            if (content.length > 0) {
                const hasCallout = /^> /gm.test(content);
                if (!hasCallout) content = content.replace(/^$/gm, '&nbsp;');
                content = content.replace(
                    /\s+(\^[a-zA-Z0-9]{4,})$/gm,
                    '<sup class="cm-blockid" data-block-id="$1">$1</sup>',
                );
            }
            MarkdownRenderer.render(
                plugin.app,
                content,
                element,
                store.getValue().file.path as string,
                view,
            );
        }
    };

    const $content = contentStore(view, nodeId);
    const unsub = $content.subscribe((content) => {
        render(content);
    });
    return {
        destroy: () => {
            unsub();
        },
    };
};
