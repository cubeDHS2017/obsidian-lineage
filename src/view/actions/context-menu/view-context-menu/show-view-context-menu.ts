import { LineageView } from 'src/view/view';
import { Menu } from 'obsidian';
import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
import { lang } from 'src/lang/lang';
import { setDocumentFormat } from 'src/obsidian/events/workspace/actions/set-document-format';
import { exportDocument } from 'src/obsidian/commands/helpers/export-document/export-document';

export const showViewContextMenu = (event: MouseEvent, view: LineageView) => {
    const file = view.file;
    if (!file) return;
    const menu = new Menu();

    const format = getDocumentFormat(view);
    const isOutline = format === 'outline';

    menu.addItem((item) =>
        item
            .setTitle(lang.format_headings)
            .setIcon('heading-1')
            .onClick(() => {
                view.documentStore.dispatch({
                    type: 'DOCUMENT/FORMAT_HEADINGS',
                });
            }),
    );

    menu.addSeparator();

    menu.addItem((item) =>
        item
            .setTitle(lang.change_format_to_outline)
            .setIcon('file-cog')
            .onClick(() => {
                setDocumentFormat(view.plugin, file.path, 'outline');
            })
            .setDisabled(isOutline)
            .setChecked(isOutline),
    );

    menu.addItem((item) =>
        item
            .setTitle(lang.change_format_to_document)
            .setIcon('file-cog')
            .onClick(() => {
                setDocumentFormat(view.plugin, file.path, 'document');
            })
            .setDisabled(!isOutline)
            .setChecked(!isOutline),
    );

    menu.addSeparator();

    menu.addItem((item) =>
        item
            .setTitle(lang.export_document)
            .setIcon('file-symlink')
            .onClick(() => {
                exportDocument(view.plugin, file, 'markdown');
            })
            .setDisabled(isOutline),
    );

    menu.showAtMouseEvent(event);
};
