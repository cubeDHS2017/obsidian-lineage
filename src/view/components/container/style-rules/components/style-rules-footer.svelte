<script lang="ts">
    import { lang } from '../../../../../lang/lang';
    import { getView } from '../../context';

    const view = getView();
    const addRule = () => {
        const documentPath = view.file?.path as string;
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/add',
            payload: { documentPath },
        });
    };
</script>

<button class="add-rule" on:click={addRule}>{lang.modals_rules_add_rule}</button
>

<style>
    .add-rule {
        padding: 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        align-self: end;
        margin-right: 10px;
    }
</style>
