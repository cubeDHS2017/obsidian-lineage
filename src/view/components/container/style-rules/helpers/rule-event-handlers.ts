import {
    ComparisonOperator,
    ConditionNode,
    StyleRule,
    StyleRuleCondition,
    StyleRuleTarget,
} from 'src/stores/settings/types/style-rules-types';
import { LineageView } from 'src/view/view';

export const ruleEventHandlers = (view: LineageView, ruleId: string) => {
    const documentPath = () => view.file?.path ?? '';
    const toggleRule = (id: string, enabled: boolean) => {
        view.plugin.settings.dispatch({
            type: enabled
                ? 'settings/style-rules/enable-rule'
                : 'settings/style-rules/disable-rule',
            payload: { documentPath: documentPath(), id },
        });
    };

    const deleteRule = () => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/delete',
            payload: { documentPath: documentPath(), id: ruleId },
        });
    };
    const updateRule = (id: string, rule: Partial<StyleRule>) => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/update',
            payload: { documentPath: documentPath(), id, rule },
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
        updateRule(ruleId, { color: target.value });
    };

    const handleToggleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        toggleRule(ruleId, target.checked);
    };

    return {
        handleScopeChange,
        handlePropertyChange,
        handleOperatorChange,
        handleValueChange,
        handleValueBChange,
        handleColorChange,
        handleToggleChange,
        deleteRule,
    };
};
