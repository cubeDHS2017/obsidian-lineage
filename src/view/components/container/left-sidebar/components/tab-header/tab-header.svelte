<script lang="ts">
    import { Clock, Pin } from 'lucide-svelte';
    import ClickableIcon from './components/clickable-icon.svelte';
    import { LeftSidebarActiveTabStore } from '../../../../../../stores/settings/derived/view-settings-store';
    import { LeftSidebarTab } from '../../../../../../stores/settings/settings-type';
    import { getView } from '../../../context';
    import { lang } from 'src/lang/lang';

    const view = getView();
    const activeTab = LeftSidebarActiveTabStore(view);
    const setActiveTab = (tab: LeftSidebarTab) => {
        view.plugin.settings.dispatch({
            type: 'view/left-sidebar/set-active-tab',
            payload: { tab },
        });
    };

</script>

<div class="sidebar-tabs-header">
    <div class="tab-header-buttons">
        <ClickableIcon
            hasEnabledItems={false}
            isActive={$activeTab==="pinned-cards"}
            label={lang.sidebar_tab_pinned_cards}
            onClick={() => setActiveTab("pinned-cards")}
        >
            <Pin class="svg-icon" />
        </ClickableIcon>
        <ClickableIcon
            hasEnabledItems={false}
            isActive={$activeTab==="recent-cards"}
            label={lang.sidebar_tab_recent_cards}
            onClick={() => setActiveTab("recent-cards")}
        >
            <Clock class="svg-icon" />
        </ClickableIcon>
    </div>
</div>

<style>
    .sidebar-tabs-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        align-self: center;
        justify-self: center;
        box-sizing: border-box;
        height: auto;
    }

    .tab-header-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
</style>
