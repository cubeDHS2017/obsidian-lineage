import { getView } from 'src/view/components/container/context';
import { FontSize } from 'src/view/actions/settings/components/font-size';
import { BackgroundColor } from 'src/view/actions/settings/components/background-color';
import { ActiveBranchColor } from 'src/view/actions/settings/components/active-branch-color';
import { CardWidth } from 'src/view/actions/settings/components/card-width';
import { ScrollingBehavior } from 'src/view/actions/settings/components/scrolling-behavior';
import { LimitCardHeight } from 'src/view/actions/settings/components/limit-card-height';
import { DefaultDocumentFormat } from 'src/view/actions/settings/components/default-document-format';
import { ColumnsGap } from 'src/view/actions/settings/components/columns-gap';
import { CardsGap } from 'src/view/actions/settings/components/cards-gap';
import { CardIndentationWidth } from 'src/view/actions/settings/components/card-indentation-width';
import { MaintainEditMode } from 'src/view/actions/settings/components/maintain-edit-mode';
import { Setting } from 'obsidian';

export const renderSettings = (element: HTMLElement) => {
    const view = getView();
    const settingsStore = view.plugin.settings;
    const render = () => {
        DefaultDocumentFormat(element, settingsStore);
        MaintainEditMode(element, settingsStore);
        ScrollingBehavior(element, settingsStore);
        new Setting(element).setHeading().setName('Appearance');
        BackgroundColor(element, settingsStore);
        ActiveBranchColor(element, settingsStore);
        FontSize(element, settingsStore);
        new Setting(element).setHeading().setName('Layout');
        CardWidth(element, settingsStore);
        ColumnsGap(element, settingsStore);
        CardsGap(element, settingsStore);
        CardIndentationWidth(element, settingsStore);
        LimitCardHeight(element, settingsStore);
    };
    render();
    return {
        update: () => {
            render();
        },
    };
};
