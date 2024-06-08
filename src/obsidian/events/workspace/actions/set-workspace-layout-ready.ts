import Lineage from 'src/main';

export const setWorkspaceLayoutReady = (plugin: Lineage) => {
    plugin.documents.dispatch({
        type: 'WORKSPACE/LAYOUT_READY',
    });
};
