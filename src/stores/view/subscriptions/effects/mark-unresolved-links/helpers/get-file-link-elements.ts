import { LineageView } from 'src/view/view';

export const getFileLinkElements = (view: LineageView) => {
    return Array.from(
        view.contentEl.querySelectorAll('.internal-link'),
    ) as HTMLElement[];
};
