import { findTaskLineIndex } from 'src/stores/view/subscriptions/effects/checkbox-listener/helpers/update-checkbox/find-task-line-index';
import { updateTaskLine } from 'src/stores/view/subscriptions/effects/checkbox-listener/helpers/update-checkbox/update-task-line';

export const updateCheckbox = (
    taskIndex: number,
    content: string,
    checked: boolean,
) => {
    const lines = content.split('\n');
    const taskLineIndex = findTaskLineIndex(lines, taskIndex);

    if (taskLineIndex === -1) {
        return;
    }

    const task = lines[taskLineIndex];
    lines[taskLineIndex] = updateTaskLine(task, checked);
    return {
        task: task.replace(/^\s*([-*+]\s*\[)[ x](\]) /i, ''),
        content: lines.join('\n'),
    };
};
