<script lang="ts">
    import { relativeTime } from 'src/helpers/relative-time';
    import { DocumentBackup } from 'src/stores/settings/settings-type';
    import { TFile } from 'obsidian';
    import { openFile } from 'src/obsidian/events/workspace/effects/open-file';
    import Lineage from 'src/main';

    export let path: string;
    export let backup: DocumentBackup;
    export let plugin: Lineage;

    const openPath = () =>{
        const file = plugin.app.vault.getAbstractFileByPath(path);
        if (file && file instanceof TFile)
            openFile(plugin, file, 'split',);
    }
</script>

<p>
    A backup of <a
        on:click={openPath}>{path}</a
    > was found.
</p>

<div style="width: 100%; max-height: 400px; overflow: auto;">
    {#each backup.content.split('\n') as line}
        <div>
            <code>
                {line}
            </code>
        </div>
    {/each}
</div>
<p>
    The backup was created {relativeTime(backup.created).toLowerCase()}.
</p>

<style>
    code {
        background-color: var(--color-base-40);
        padding: 2px 4px;
    }
</style>
