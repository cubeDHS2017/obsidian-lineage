<script lang="ts">
    import { getView } from './context';
    import { OutlineModeStore } from '../../../stores/settings/derived/view-settings-store';
    import { onDestroy } from 'svelte';
    import Container from './container.svelte';

    const view = getView();

    let unmounting = false;
    let interval: ReturnType<typeof setTimeout> | null = null;

    const unsubscribe = OutlineModeStore(view).subscribe((state, action, isInitialRun) => {
        if(isInitialRun) return
        unmounting = true;
        if (interval) clearTimeout(interval);
        interval = setTimeout(() => {
            unmounting = false;
        }, 16);
    });
    onDestroy(() => {
        unsubscribe();
    });

    const outlineMode = OutlineModeStore(view);
</script>

{#if !unmounting}
    <Container outlineMode={$outlineMode} />
{/if}
