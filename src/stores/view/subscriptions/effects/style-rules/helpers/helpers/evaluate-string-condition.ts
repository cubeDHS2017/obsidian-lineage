import { StringOperator } from 'src/stores/settings/types/style-rules-types';

export const evaluateStringCondition = (
    value: string,
    operator: StringOperator,
    target: string,
): boolean => {
    switch (operator) {
        case 'equals':
            return value === target;
        case 'not-equals':
            return value !== target;
        case 'empty':
            return !value;
        case 'not-empty':
            return !!value;
        case 'contains':
            return value.includes(target);
        case 'not-contains':
            return !value.includes(target);
        case 'starts-with':
            return value.startsWith(target);
        case 'not-starts-with':
            return !value.startsWith(target);
        case 'ends-with':
            return value.endsWith(target);
        case 'not-ends-with':
            return !value.endsWith(target);
        case 'matches-regex':
            return new RegExp(target).test(value);
        case 'not-matches-regex':
            return !new RegExp(target).test(value);
        default:
            return false;
    }
};
