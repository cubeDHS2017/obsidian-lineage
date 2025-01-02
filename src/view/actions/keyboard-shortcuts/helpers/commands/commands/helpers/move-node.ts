import { AllDirections } from 'src/stores/document/document-store-actions';
import { saveNodeContent } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';
import { LineageView } from 'src/view/view';

type EditingState = {
    editedNode: string;
};

const restoreEditingState = (view: LineageView, state: EditingState) => {
    setTimeout(() => {
        view.viewStore.dispatch({
            type: 'view/main/enable-edit',
            payload: {
                nodeId: state.editedNode,
            },
        });
    });
};

export const moveNode = async (view: LineageView, direction: AllDirections) => {
    let state: null | EditingState = null;
    if (view.inlineEditor.nodeId) {
        state = {
            editedNode: view.inlineEditor.nodeId,
        };
    }
    saveNodeContent(view);

    const document = view.viewStore.getValue().document;
    view.documentStore.dispatch({
        type: 'DOCUMENT/MOVE_NODE',
        payload: {
            direction,
            activeNodeId: document.activeNode,
            selectedNodes: document.selectedNodes,
        },
    });

    if (state) restoreEditingState(view, state);
};
