import {
    ComparisonOperator,
    ConditionNode,
    NodeStyle,
    StyleRuleCondition,
    StyleRuleTarget,
    StyleVariant,
} from 'src/stores/settings/types/style-rules-types';
import { LineageView } from 'src/view/view';

export const ruleEventHandlers = (view: LineageView, ruleId: string) => {
    const documentPath = () => view.file?.path ?? '';

    const updateStyle = (id: string, style: Partial<NodeStyle>) => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/update-style',
            payload: { documentPath: documentPath(), id, style },
        });
    };

    const updateCondition = (updates: Partial<StyleRuleCondition>) => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/update-condition',
            payload: {
                documentPath: documentPath(),
                ruleId: ruleId,
                updates,
            },
        });
    };

    const handleScopeChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({ scope: target.value as StyleRuleTarget });
    };

    const handlePropertyChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({
            property: target.value as ConditionNode['property'],
        });
    };

    const handleOperatorChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({ operator: target.value as ComparisonOperator });
    };

    const handleValueChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateCondition({ value: target.value });
    };
    const handleValueBChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateCondition({ valueB: parseFloat(target.value) });
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
        handleScopeChange,
        handlePropertyChange,
        handleOperatorChange,
        handleValueChange,
        handleValueBChange,
        handleColorChange,
        handleStyleVariantChange,
    };
};
