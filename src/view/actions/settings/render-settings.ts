import { getView } from 'src/view/components/container/context';
import { FontSize } from 'src/view/actions/settings/components/font-size';
import { BackgroundColor } from 'src/view/actions/settings/components/background-color';
import { ActiveBranchColor } from 'src/view/actions/settings/components/active-branch-color';
import { CardWidth } from 'src/view/actions/settings/components/card-width';
import { LimitCardHeight } from 'src/view/actions/settings/components/limit-card-height';
import { DefaultDocumentFormat } from 'src/view/actions/settings/components/default-document-format';
import { CardsGap } from 'src/view/actions/settings/components/cards-gap';
import { CardIndentationWidth } from 'src/view/actions/settings/components/card-indentation-width';
import { MaintainEditMode } from 'src/view/actions/settings/components/maintain-edit-mode';
import { Setting } from 'obsidian';
import { lang } from 'src/lang/lang';

export const renderSettings = (element: HTMLElement) => {
    const view = getView();
    const settingsStore = view.plugin.settings;
    const render = () => {
        DefaultDocumentFormat(element, settingsStore);
        MaintainEditMode(element, settingsStore);
        new Setting(element).setHeading().setName(lang.settings_appearance);
        BackgroundColor(element, settingsStore);
        ActiveBranchColor(element, settingsStore);
        FontSize(element, settingsStore);
        new Setting(element).setHeading().setName(lang.settings_layout);
        CardWidth(element, settingsStore);
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
