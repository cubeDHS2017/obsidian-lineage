import Lineage from 'src/main';
import { LineageView } from 'src/view/view';

export const getActiveLineageView = (plugin: Lineage) => {
    return plugin.app.workspace.getActiveViewOfType(LineageView);
};
