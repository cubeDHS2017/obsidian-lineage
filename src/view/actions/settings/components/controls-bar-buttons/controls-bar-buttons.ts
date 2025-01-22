import { Setting } from 'obsidian';
import { LineageView } from 'src/view/view';
import { lang } from 'src/lang/lang';
import { VerticalToolbarButtonsModal } from 'src/view/modals/vertical-toolbar-buttons/vertical-toolbar-buttons-modal';

export const ControlsBarButtons = (
    container: HTMLElement,
    view: LineageView,
) => {
    new Setting(container)
        .setName(lang.settings_vertical_toolbar_icons)
        .setDesc(lang.settings_vertical_toolbar_icons_desc)
        .addButton((cb) => {
            cb.setButtonText('Manage');
            cb.onClick(() => {
                const modal = new VerticalToolbarButtonsModal({
                    plugin: view.plugin,
                });
                modal.open();
            });
        });
};
