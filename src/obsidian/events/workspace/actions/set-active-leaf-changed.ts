import Lineage from 'src/main';

export const setActiveLeafChanged = (plugin: Lineage) => {
    plugin.documents.dispatch({
        type: 'WORKSPACE/ACTIVE_LEAF_CHANGE',
    });
};
