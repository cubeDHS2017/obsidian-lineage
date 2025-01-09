<script lang="ts">
export let conflicts: number
</script>

{#if conflicts}
    <div class="conflicts-indicator">
        {conflicts} command{conflicts === 1
            ? ''
            : 's'} with conflicts
    </div>
{/if}

<style>
    .conflicts-indicator {
        font-size: 12px;
        color: var(--color-red);
    }
</style>
