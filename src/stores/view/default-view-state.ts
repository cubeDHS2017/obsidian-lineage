import { ViewState } from 'src/stores/view/view-state-type';
import { NodeId } from 'src/stores/document/document-state-type';

export const defaultViewState = (): ViewState => ({
    search: {
        query: '',
        results: new Set(),
        searching: false,
        showInput: false,
        fuzzySearch: false,
        showAllNodes: true,
    },
    ui: {
        controls: {
            showHistorySidebar: false,
            showHelpSidebar: false,
            showSettingsSidebar: false,
            showStyleRulesModal: false,
        },
    },
    document: {
        editing: {
            activeNodeId: '',
            isInSidebar: false,
        },
        activeBranch: {
            group: '',
            childGroups: new Set<string>(),
            sortedParentNodes: [],
            column: '',
        },
        dnd: {
            node: '',
            childGroups: new Set<string>(),
        },
        activeNode: '',
        activeNodesOfColumn: {},
        selectedNodes: new Set<string>(),
        pendingConfirmation: {
            disableEdit: null,
            deleteNode: new Set<string>(),
        },
    },
    navigationHistory: {
        items: [],
        state: {
            activeIndex: -1,
            canGoBack: false,
            canGoForward: false,
        },
        context: undefined,
    },
    pinnedNodes: {
        activeNode: '',
    },
    recentNodes: {
        activeNode: '',
    },
    styleRules: {
        rules: new Map(),
    },
    keyboard: {
        shift: false,
    },
});
export type ActiveBranch = {
    childGroups: Set<string>;
    sortedParentNodes: NodeId[];
    group: string;
    column: string;
};
export type DNDState = {
    childGroups: Set<string>;
    node: string;
};
export type EditingState = {
    activeNodeId: string;
    isInSidebar: boolean;
};
