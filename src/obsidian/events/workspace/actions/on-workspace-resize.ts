import Lineage from 'src/main';

export const onWorkspaceResize = (plugin: Lineage) => {
    plugin.documents.dispatch({
        type: 'WORKSPACE/RESIZE',
    });
};
