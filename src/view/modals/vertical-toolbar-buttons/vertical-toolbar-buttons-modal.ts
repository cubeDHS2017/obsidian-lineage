import { Modal } from 'obsidian';
import Lineage from 'src/main';
import Content from 'src/view/modals/vertical-toolbar-buttons/components/vertical-toolbar-icons-selection-modal.svelte';
import { lang } from 'src/lang/lang';

export type ModalProps = {
    plugin: Lineage;
};

export class VerticalToolbarButtonsModal extends Modal {
    private resolve: (value: unknown) => void;
    private subscriptions: Set<() => void> = new Set();

    constructor(private props: ModalProps) {
        super(props.plugin.app);
    }
    open = () => {
        this.setTitle(lang.settings_vertical_toolbar_icons_desc);
        this.initState();
        new Content({
            target: this.contentEl,
            props: {
                plugin: this.props.plugin,
                close: this.close,
            },
        });

        const promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
        super.open();

        return promise;
    };

    close = () => {
        this.resolve(undefined);
        super.close();
        for (const unsub of this.subscriptions) {
            unsub();
        }
    };

    initState = () => {};
}
