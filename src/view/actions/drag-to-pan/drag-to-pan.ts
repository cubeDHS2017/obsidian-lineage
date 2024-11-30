import { LineageView } from 'src/view/view';
import { isEditing } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/is-editing';
import invariant from 'tiny-invariant';

export const dragToPan = (element: HTMLElement, view: LineageView) => {
    let container = element;
    setTimeout(() => {
        const columnsContainer = view.container;
        invariant(columnsContainer);
        container = columnsContainer;
    }, 50);

    let pressed = false;
    let initializedValues = false;
    let container_startX = 0;
    let container_scrollLeft = 0;
    let container_rectLeft = 0;
    const columns_startY: number[] = [];
    const columns_scrollTop: number[] = [];
    const columns_rectTop: number[] = [];
    let columns: HTMLElement[] = [];

    const onMouseMove = (e: MouseEvent) => {
        if (!pressed || e.buttons !== 1) return;

        if (!initializedValues) {
            const rect = container.getBoundingClientRect();
            container_rectLeft = rect.left;
            container_startX = e.clientX - container_rectLeft;
            container_scrollLeft = container.scrollLeft;
            columns = Array.from(container.querySelectorAll('.column'));
            for (let i = 0; i < columns.length; i++) {
                const column = columns[i];
                const rect = column.getBoundingClientRect();
                columns_scrollTop[i] = column.scrollTop;
                columns_startY[i] = e.clientY - rect.top;
                columns_rectTop[i] = rect.top;
            }

            initializedValues = true;
        }

        const _columns_rectTop = Array.from(columns_rectTop);
        const _columns_scrollTop = Array.from(columns_scrollTop);
        const _columns_startY = Array.from(columns_startY);
        requestAnimationFrame(() => {
            const dx = e.clientX - container_rectLeft - container_startX;
            container.scrollLeft = container_scrollLeft - dx;
            for (let i = 0; i < columns.length; i++) {
                const dy = e.clientY - _columns_rectTop[i] - _columns_startY[i];
                const column = columns[i];
                column.scrollTop = _columns_scrollTop[i] - dy;
            }
        });
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' && !pressed) {
            const enabled = !isEditing(view);
            if (enabled) {
                pressed = true;
                container.style.cursor = 'grab';
                e.preventDefault(); // prevent default spacebar scroll
            }
        }
    };

    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === ' ' && pressed) {
            pressed = false;
            initializedValues = false;
            setTimeout(() => {
                container.style.cursor = 'initial';
            }, 50);
        }
    };

    const onMouseDown = (e: MouseEvent) => {
        if (pressed) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    const onMouseUp = (e: MouseEvent) => {
        if (pressed) {
            initializedValues = false;
            e.preventDefault();
            e.stopPropagation();
        }
    };
    const hookEvents = () => {
        element.addEventListener('mousemove', onMouseMove);
        element.addEventListener('keydown', onKeyDown);
        element.addEventListener('keyup', onKeyUp);
        element.addEventListener('mouseup', onMouseUp);
        element.addEventListener('mousedown', onMouseDown);
    };

    const unhookEvents = () => {
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('keydown', onKeyDown);
        element.removeEventListener('keyup', onKeyUp);
        element.removeEventListener('mouseup', onMouseUp);
        element.removeEventListener('mousedown', onMouseDown);
    };

    hookEvents();

    return {
        destroy: () => {
            unhookEvents();
        },
    };
};
