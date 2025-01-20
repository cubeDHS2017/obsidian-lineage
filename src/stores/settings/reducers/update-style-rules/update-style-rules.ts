import {
    NodeStyle,
    StyleRule,
    StyleRuleCondition,
} from '../../types/style-rules-types';
import { id } from 'src/helpers/id';
import { Settings } from 'src/stores/settings/settings-type';
import { fixConditionTypes } from 'src/stores/settings/reducers/update-style-rules/helpers/fix-condition-types';
import { handleDND } from 'src/stores/settings/reducers/update-style-rules/handle-dnd';

export type MoveNodePayload = {
    documentPath: string;
    droppedId: string;
    targetId: string;
    position: 'before' | 'after';
};

export type StyleRulesAction =
    | { type: 'settings/style-rules/add'; payload: { documentPath: string } }
    | {
          type: 'settings/style-rules/update';
          payload: {
              documentPath: string;
              id: string;
              rule: Partial<StyleRule>;
          };
      }
    | {
          type: 'settings/style-rules/update-style';
          payload: {
              documentPath: string;
              id: string;
              style: Partial<NodeStyle>;
          };
      }
    | {
          type: 'settings/style-rules/delete';
          payload: { documentPath: string; id: string };
      }
    | {
          type: 'settings/style-rules/move';
          payload: MoveNodePayload;
      }
    | {
          type: 'settings/style-rules/update-condition';
          payload: {
              documentPath: string;
              ruleId: string;
              updates: Partial<StyleRuleCondition>;
          };
      }
    | {
          type: 'settings/style-rules/enable-rule';
          payload: { documentPath: string; id: string };
      }
    | {
          type: 'settings/style-rules/disable-rule';
          payload: { documentPath: string; id: string };
      };

export const updateStyleRules = (
    settings: Pick<Settings, 'styleRules'>,
    action: StyleRulesAction,
) => {
    let state: { rules: StyleRule[] };
    state = settings.styleRules.documents[action.payload.documentPath];
    if (!state) {
        if (action.type !== 'settings/style-rules/add') {
            throw new Error('Document does not have any style rules');
        }
        settings.styleRules.documents[action.payload.documentPath] = {
            rules: [],
        };
        state = settings.styleRules.documents[action.payload.documentPath];
    }
    if (action.type === 'settings/style-rules/add') {
        const newRule: StyleRule = {
            id: id.styleRule(),
            name: '',
            enabled: true,
            condition: {
                type: 'condition',
                scope: 'self',
                property: 'content',
                operator: 'contains',
                value: '',
                enabled: true,
            },
            style: {
                color: '#fff',
                styleVariant: 'left-border',
            },
            priority: 0,
        };
        state.rules = [...state.rules, newRule];
    } else if (action.type === 'settings/style-rules/update') {
        const { id, rule } = action.payload;
        const index = state.rules.findIndex((r) => r.id === id);
        if (index !== -1) {
            state.rules[index] = { ...state.rules[index], ...rule };
            fixConditionTypes(state.rules[index]);
            state.rules = [...state.rules];
        }
    } else if (action.type === 'settings/style-rules/delete') {
        state.rules = state.rules.filter(
            (rule) => rule.id !== action.payload.id,
        );
    } else if (action.type === 'settings/style-rules/move') {
        state.rules = handleDND(state.rules, action.payload);
    } else if (action.type === 'settings/style-rules/update-style') {
        const index = state.rules.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
            state.rules[index] = {
                ...state.rules[index],
                // @ts-ignore
                style: {
                    ...state.rules[index].style,
                    ...action.payload.style,
                },
            };
            state.rules = [...state.rules];
        }
    } else if (action.type === 'settings/style-rules/update-condition') {
        const { ruleId, updates } = action.payload;
        const index = state.rules.findIndex((r) => r.id === ruleId);
        if (index !== -1) {
            state.rules[index] = {
                ...state.rules[index],
                // @ts-ignore
                condition: {
                    ...state.rules[index].condition,
                    ...updates,
                },
            };
            fixConditionTypes(state.rules[index]);
            state.rules = [...state.rules];
        }
    } else if (action.type === 'settings/style-rules/enable-rule') {
        const index = state.rules.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
            state.rules[index].enabled = true;
            state.rules = [...state.rules];
        }
    } else if (action.type === 'settings/style-rules/disable-rule') {
        const index = state.rules.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
            state.rules[index].enabled = false;
            state.rules = [...state.rules];
        }
    }
};
