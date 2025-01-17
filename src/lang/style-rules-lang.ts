import {
    NumericOperator,
    NumericProperty,
    StringOperator,
    StringProperty,
    StyleRuleTarget,
    StyleVariant,
} from 'src/stores/settings/types/style-rules-types';

export const styleRulesLang = {
    targets: {
        self: 'Of card',
        'direct-parent': 'Of immediate parent',
        'any-parent': 'Of any parent',
        'direct-children': 'Of immediate child',
        'any-children': 'Of any child',
    } satisfies Record<StyleRuleTarget, string>,
    operators: {
        contains: 'Contains',
        'not-contains': 'Does not contain',
        equals: 'Equals',
        'not-equals': 'Does not equal',
        empty: 'Is empty',
        'not-empty': 'is not empty',

        'greater-than': 'Is greater than',
        'less-than': 'Is less than',
        between: 'Is between',
        'not-between': 'Is not between',
        'starts-with': 'Starts with',
        'not-starts-with': 'Does not start with',
        'ends-with': 'Ends with',
        'not-ends-with': 'Does not end with',
        'matches-regex': 'Matches regex',
        'not-matches-regex': 'Does not match regex',
    } satisfies Record<NumericOperator | StringOperator, string>,
    properties: {
        depth: 'Depth',
        'character-count': 'Character count',
        'word-count': 'Word count',
        'line-count': 'Line count',
        'direct-children-count': 'Direct children count',
        'total-children-count': 'Total children count',
        content: 'Content',
        headings: 'Headings',
        'headings-word-count': 'Headings word count',
    } satisfies Record<NumericProperty | StringProperty, string>,
    styleVariants: {
        'left-border': 'Left border',
        'background-color': 'Background color',
    } satisfies Record<StyleVariant, string>,
};
