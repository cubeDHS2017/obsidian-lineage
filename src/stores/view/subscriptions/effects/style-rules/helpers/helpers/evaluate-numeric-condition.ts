import { NumericOperator } from 'src/stores/settings/types/style-rules-types';

export const evaluateNumericCondition = (
    value: number,
    operator: NumericOperator,
    target: number,
    targetB?: number,
): boolean => {
    switch (operator) {
        case 'equals':
            return value === target;
        case 'not-equals':
            return value !== target;
        case 'empty':
            return value === 0;
        case 'not-empty':
            return value !== 0;
        case 'greater-than':
            return value > target;
        case 'less-than':
            return value < target;
        case 'between':
            return targetB !== undefined && value >= target && value <= targetB;
        case 'not-between':
            return targetB !== undefined && (value < target || value > targetB);
        default:
            return false;
    }
};
