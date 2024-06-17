import { EditorPosition, MarkdownView, TFile } from 'obsidian';
import { LineageView } from 'src/view/view';
import { AdjustHeight } from 'src/view/actions/inline-editor/expandable-textarea-action';
import { vimEnterInsertMode } from 'src/obsidian/helpers/vim-enter-insert-mode';

const noop = async () => {};

export type InlineMarkdownView = MarkdownView & {
    __setViewData__: MarkdownView['setViewData'];
};
export class InlineEditor {
    private inlineView: InlineMarkdownView;
    private containerEl: HTMLElement;
    private nodeId: string | null = null;
    private target: HTMLElement | null = null;
    private appliedExternalCursor: EditorPosition | null = null;
    private onChangeSubscriptions: Set<() => void> = new Set();
    #mounting: Promise<void> = Promise.resolve();

    constructor(private view: LineageView) {}

    get activeNode() {
        return this.nodeId;
    }

    get mounting() {
        return this.#mounting;
    }

    getContent() {
        return this.inlineView.editor.getValue();
    }

    getCursor() {
        return this.inlineView.editor.getCursor();
    }

    overrideCursor(cursor: EditorPosition) {
        if (this.activeNode) this.setCursor(cursor.line, cursor.ch);
        else this.appliedExternalCursor = cursor;
    }

    setContent(content: string) {
        this.inlineView.__setViewData__(content, true);
    }

    loadNode(target: HTMLElement, nodeId: string) {
        if (!this.view.file) return;
        let resolve = () => {};
        this.#mounting = new Promise((_resolve) => {
            resolve = _resolve;
        });
        this.view.plugin.settings.dispatch({
            type: 'BACKUP/ADD_FILE',
            payload: {
                path: this.view.file.path,
                content: this.view.data,
            },
        });
        const content =
            this.view.documentStore.getValue().document.content[nodeId]
                ?.content || '';
        this.setContent(content);

        if (this.appliedExternalCursor) {
            this.setCursor(
                this.appliedExternalCursor.line,
                this.appliedExternalCursor.ch,
            );
            this.appliedExternalCursor = null;
        } else {
            this.setCursor(
                this.inlineView.editor.lastLine(),
                this.inlineView.editor.getLine(
                    this.inlineView.editor.lastLine(),
                ).length,
            );
        }
        target.append(this.containerEl);
        this.focus();
        AdjustHeight(target)();
        this.nodeId = nodeId;
        this.target = target;
        if (!content) {
            vimEnterInsertMode(this.view.plugin, this.inlineView);
        }
        this.target.addEventListener('focusin', this.setActiveEditor);
        this.setActiveEditor();
        setTimeout(() => resolve(), Math.max(16, content.length / 60));
    }

    focus = () => {
        this.inlineView.editor.focus();
    };

    unloadNode() {
        this.nodeId = null;
        if (this.target) {
            this.view.plugin.app.workspace.activeEditor = null;
            this.target.removeEventListener('focusin', this.setActiveEditor);
            this.target.empty();
            this.target = null;
        }
    }

    async onload() {
        const workspace = this.view.plugin.app.workspace;
        // @ts-ignore

        this.containerEl = document.createElement('div');
        this.containerEl.addClasses(['lineage-inline-editor']);
        // help: how to instantiate a MarkdownView?
        this.inlineView = new MarkdownView({
            containerEl: this.containerEl,
            app: this.view.plugin.app,
            workspace,
        } as never) as InlineMarkdownView;
        this.inlineView.save = noop;
        this.inlineView.requestSave = this.invokeAndDeleteOnChangeSubscriptions;
        this.inlineView.__setViewData__ = this.inlineView.setViewData;
        this.inlineView.setViewData = noop;

        if (this.inlineView.getMode() === 'preview') {
            await this.inlineView.setState(
                { mode: 'source' },
                { history: false },
            );
        }
    }

    onNextChange(subscription: () => void) {
        this.onChangeSubscriptions.add(subscription);
        return () => {
            this.onChangeSubscriptions.delete(subscription);
        };
    }

    async loadFile(file: TFile) {
        this.inlineView.file = file;
        await this.inlineView.onLoadFile(file);
    }

    async unloadFile() {
        const file = this.inlineView.file;
        if (file) {
            this.inlineView.file = null;
            await this.inlineView.onUnloadFile(file);
        }
        this.unloadNode();
    }

    private setActiveEditor = () => {
        this.view.plugin.app.workspace.activeEditor = this.inlineView;
    };

    private invokeAndDeleteOnChangeSubscriptions = () => {
        if (this.onChangeSubscriptions.size)
            for (const subscription of this.onChangeSubscriptions) {
                subscription();
                this.onChangeSubscriptions.delete(subscription);
            }
    };

    private setCursor(line: number, ch: number) {
        this.inlineView.editor.setCursor(line, ch);
    }
}
