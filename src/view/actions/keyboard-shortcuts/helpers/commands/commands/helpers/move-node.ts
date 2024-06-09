import { AllDirections } from 'src/stores/document/document-store-actions';
import { saveNodeContent } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/save-node-content';
import { LineageView } from 'src/view/view';

export const moveNode = (view: LineageView, direction: AllDirections) => {
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
};
