<script lang="ts">
    import { Bookmark } from 'lucide-svelte';
</script>

<span class="bookmark-indicator">
    <Bookmark class="svg-icon" size="12" />
</span>

<style>
    .bookmark-indicator {
        position: absolute;
        top: -3px;
        left: 2px;
       & svg {
            fill: var(--text-muted);
            color: var(--text-muted);
        }
    }
</style>
