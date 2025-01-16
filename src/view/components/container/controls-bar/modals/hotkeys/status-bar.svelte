<script lang="ts">
    import { Settings } from 'lucide-svelte';
    import { Menu } from 'obsidian';
    import { lang } from 'src/lang/lang';
    import { getView } from 'src/view/components/container/context';
    import {
        AltPrimaryModifier
    } from 'src/view/actions/keyboard-shortcuts/helpers/commands/presets/alt-primary-modifier';
    import {
        NavigateWhileEditing
    } from 'src/view/actions/keyboard-shortcuts/helpers/commands/presets/navigate-while-editing';

    export let conflicts: number;
    const view = getView();

    const showMenu = (e: MouseEvent) => {
        const menu = new Menu();
        menu.addItem((item) => {
            item.setTitle(lang.modals_hk_reset_hotkeys);

            item.onClick(() => {
                view.plugin.settings.dispatch({
                    type: 'settings/hotkeys/reset-all',
                });
            });
        });
        menu.addItem((item) => {
            item.setTitle(lang.modals_hk_load_alt_hotkeys_preset);
            item.onClick(() => {
                view.plugin.settings.dispatch({
                    type: 'settings/hotkeys/apply-preset',
                    payload: { preset: AltPrimaryModifier },
                });
            });
        });
        menu.addItem((item) => {
            item.setTitle(lang.modals_hk_load_nav_while_editing_preset);
            item.onClick(() => {
                view.plugin.settings.dispatch({
                    type: 'settings/hotkeys/apply-preset',
                    payload: { preset: NavigateWhileEditing },
                });
                const maintainEditMode =
                    view.plugin.settings.getValue().view.maintainEditMode;
                if (!maintainEditMode) {
                    view.plugin.settings.dispatch({
                        type: 'settings/view/set-maintain-edit-mode',
                        payload: {
                            maintain: true
                        }
                    });
                }
            });
        });
        menu.showAtMouseEvent(e);
    };
</script>

<div class="hotkeys-status-bar">
    {#if conflicts}
        <span class="conflicts-indicator">
            {conflicts} command{conflicts === 1 ? '' : 's'} with conflicts
        </span>
    {/if}
    <span class="hotkeys-menu" on:click={showMenu}>
        <Settings class="svg-icon" />
    </span>
</div>

<style>
    .hotkeys-status-bar {
        display: flex;
        align-items: center;
    }
    .conflicts-indicator {
        font-size: 12px;
        color: var(--color-red);
    }

    .hotkeys-menu {
        margin-left: auto;
        padding: 3px;
        cursor: pointer;
        transition: opacity ease 100ms;
        opacity: 0.7;
        & svg {
            width: 14px;
            height: 14px;
        }
        &:hover {
            opacity: 1;
        }
    }
</style>
