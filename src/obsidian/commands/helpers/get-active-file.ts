import Lineage from 'src/main';

export const getActiveFile = (plugin: Lineage) => {
    const activeFile = plugin.app.workspace.getActiveFile();
    if (activeFile && activeFile.extension === 'md') return activeFile;
};
