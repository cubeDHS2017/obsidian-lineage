import { LineageView } from 'src/view/view';
import {
    MenuItemObject,
    renderContextMenu,
} from 'src/obsidian/context-menu/render-context-menu';
import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
import { lang } from 'src/lang/lang';
import { setDocumentFormat } from 'src/obsidian/events/workspace/actions/set-document-format';
import { exportDocument } from 'src/obsidian/commands/helpers/export-document/export-document';
import { saveNodeContent } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';
import { hasNHeadings } from 'src/lib/format-detection/has-n-headings';

export const showViewContextMenu = (event: MouseEvent, view: LineageView) => {
    const file = view.file;
    if (!file) return;

    const format = getDocumentFormat(view);
    const isOutline = format === 'outline';
    const isHtmlElement = format === 'html-element';
    const isHtmlComments = format === 'sections';

    const _hasHeading = hasNHeadings(view.data, 1);
    const menuItems: MenuItemObject[] = [
        {
            title: lang.cm_format_headings,
            icon: 'heading-1',
            action: () => {
                saveNodeContent(view);
                view.documentStore.dispatch({
                    type: 'DOCUMENT/FORMAT_HEADINGS',
                });
            },
            disabled: !_hasHeading,
        },
        { type: 'separator' },
        {
            title: lang.cm_change_format_to_html_element,
            icon: 'file-cog',
            action: () => {
                setDocumentFormat(view.plugin, file.path, 'html-element');
            },
            checked: isHtmlElement,
        },
        {
            title: lang.cm_change_format_to_document,
            icon: 'file-cog',
            action: () => {
                setDocumentFormat(view.plugin, file.path, 'sections');
            },
            checked: isHtmlComments,
        },
        {
            title: lang.cm_change_format_to_outline,
            icon: 'file-cog',
            action: () => {
                setDocumentFormat(view.plugin, file.path, 'outline');
            },
            checked: isOutline,
        },
        { type: 'separator' },
        {
            title: lang.cm_export_document,
            icon: 'file-text',
            action: () => {
                exportDocument(view);
            },
        },
    ];

    renderContextMenu(event, menuItems);
};
