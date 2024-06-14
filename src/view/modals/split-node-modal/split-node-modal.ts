import { Modal } from 'obsidian';
import Lineage from 'src/main';
import Content from './components/modal-content.svelte';
import { get, Writable, writable } from 'svelte/store';
import { hasNHeadings } from 'src/lib/format-detection/has-n-headings';
import { isOutline } from 'src/lib/format-detection/is-outline';
import { mapContent } from 'src/view/modals/split-node-modal/helpers/map-content';
import { SplitNodeMode } from 'src/stores/document/reducers/split-node/split-node';

export type SplitNodeCallbacks = {
    accept: () => void;
    reject: () => void;
};

export type SplitNodeModalState = {
    content: Writable<string>;
    mode: Writable<SplitNodeMode | null>;
    disabledModes: Set<SplitNodeMode>;
};

export type SplitNodeModalProps = {
    plugin: Lineage;
    callbacks: SplitNodeCallbacks;
    nodeContent: string;
};

export class SplitNodeModal extends Modal {
    state: SplitNodeModalState;
    private resolve: (value: unknown) => void;
    private subscriptions: Set<() => void> = new Set();

    constructor(private props: SplitNodeModalProps) {
        super(props.plugin.app);
    }
    open = () => {
        this.setTitle('Choose how to split this card');
        this.initState();
        new Content({
            target: this.contentEl,
            props: {
                state: this.state,
                props: this.props,
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

    initState = () => {
        this.state = {
            content: writable(this.props.nodeContent),
            mode: writable(null),
            disabledModes: new Set(),
        };

        if (hasNHeadings(this.props.nodeContent)) {
            this.state.mode.set('headings');
        } else {
            this.state.disabledModes.add('headings');
        }
        if (isOutline(this.props.nodeContent)) {
            this.state.mode.set('outline');
        } else {
            this.state.disabledModes.add('outline');
        }

        const unsubFromMod = this.state.mode.subscribe((mode) => {
            if (mode)
                this.state.content.set(
                    mapContent(this.props.nodeContent, mode),
                );
        });

        this.state.content.set(
            mapContent(this.props.nodeContent, get(this.state.mode)),
        );

        this.subscriptions.add(unsubFromMod);
    };
}
