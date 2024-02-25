import { TextFileView, WorkspaceLeaf } from 'obsidian';

import Component from './components/container/container.svelte';
import TreeEdit from '../main';
import {
    DocumentAction,
    documentReducer,
    DocumentState,
} from 'src/view/store/document-reducer';
import { alignBranchEffect } from 'src/view/store/effects/align-branch-effect';
import { Unsubscriber } from 'svelte/store';
import { saveDocumentEffect } from 'src/view/store/effects/save-document-effect';
import { columnsToJsonTree } from 'src/view/store/helpers/conversion/columns-to-json/columns-to-json-tree';
import { jsonToMarkdown } from 'src/view/store/helpers/conversion/json-to-makdown/json-to-markdown';
import { Store } from 'src/helpers/store';
import { initialDocumentState } from 'src/view/store/helpers/initial-document-state';
import { bringFocusToContainer } from 'src/view/store/effects/bring-focus-to-container';
import { fileHistoryStore } from 'src/features/file-histoy/file-history-store';
import { findNode } from 'src/view/store/helpers/find-node';
import { findNodePosition } from 'src/view/store/helpers/find-branch';
import { stores } from 'src/view/helpers/stores-cache';
import { clone } from 'src/helpers/clone';

export const TREE_VIEW_TYPE = 'tree';

export type DocumentStore = Store<DocumentState, DocumentAction>;

export class TreeView extends TextFileView {
    data: string;
    component: Component;
    store: DocumentStore;
    private readonly onDestroyCallbacks: Set<Unsubscriber> = new Set();
    private loadedInitialData = false;
    constructor(
        leaf: WorkspaceLeaf,
        private plugin: TreeEdit,
    ) {
        super(leaf);
        this.store = new Store(initialDocumentState(), documentReducer);
    }

    getViewData(): string {
        return this.data;
    }

    setViewData(data: string, clear: boolean): void {
        this.data = data;
        if (!this.loadedInitialData) {
            this.loadedInitialData = true;
            this.loadInitialData();
        }
    }

    clear(): void {
        this.data = '';
    }

    getViewType() {
        return TREE_VIEW_TYPE;
    }

    getDisplayText() {
        return 'Ash' + (this.file ? ' - ' + this.file.basename : '');
    }

    async onOpen() {
        this.component = new Component({
            target: this.contentEl,
            props: {
                store: this.store,
            },
        });
    }

    async onClose() {
        if (this.component) {
            this.component.$destroy();
        }
        this.store.dispatch({ type: 'RESET_STORE' });
        for (const s of this.onDestroyCallbacks) {
            s();
        }
    }

    private requestSaveWrapper = async (actionType?: string) => {
        const store = clone(this.store.getValue());
        const data: string = jsonToMarkdown(columnsToJsonTree(store.columns));
        if (data !== this.data) {
            if (actionType !== 'APPLY_SNAPSHOT') {
                const path = this.file?.path;
                if (!path) throw new Error('view does not have a file');
                const node = findNode(
                    store.columns,
                    store.state.activeBranch.node,
                );

                fileHistoryStore.dispatch({
                    type: 'ADD_SNAPSHOT',
                    payload: {
                        data: data,
                        path,
                        position: node
                            ? findNodePosition(store.columns, node)
                            : null,
                        actionType: actionType ? actionType : null,
                    },
                });
            }
            this.setViewData(data, false);
            this.requestSave();
        }
    };
    private loadInitialData = () => {
        if (!this.file) {
            throw new Error('view does not have a file');
        }
        stores[this.file.path] = this.store;
        this.store.dispatch({
            type: 'FS/SET_FILE_PATH',
            payload: {
                path: this.file.path,
            },
        });
        fileHistoryStore.dispatch({
            type: 'ADD_SNAPSHOT',
            payload: {
                data: this.data,
                path: this.file.path,
                position: null,
                actionType: 'INITIAL_DOCUMENT',
            },
        });
        this.onDestroyCallbacks.add(alignBranchEffect(this.store));
        this.onDestroyCallbacks.add(
            saveDocumentEffect(this.store, this.requestSaveWrapper),
        );
        this.onDestroyCallbacks.add(bringFocusToContainer(this.store));
        if (!this.data) this.store.dispatch({ type: 'CREATE_FIRST_NODE' });
        else {
            this.store.dispatch({
                payload: { document: { data: this.data, position: null } },
                type: 'LOAD_DATA',
            });
        }
    };
}
