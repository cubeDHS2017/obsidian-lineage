import {
    NodeStyle,
    StyleVariant,
} from 'src/stores/settings/types/style-rules-types';
import { LineageView } from 'src/view/view';

export const ruleStyleEditorEventHandlers = (
    view: LineageView,
    ruleId: string,
) => {
    const documentPath = () => view.file?.path ?? '';

    const updateStyle = (id: string, style: Partial<NodeStyle>) => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/update-style',
            payload: { documentPath: documentPath(), id, style },
        });
    };

    const handleColorChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateStyle(ruleId, { color: target.value });
    };

    const handleStyleVariantChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateStyle(ruleId, {
            styleVariant: target.value as StyleVariant,
        });
    };

    return {
        handleColorChange,
        handleStyleVariantChange,
    };
};
