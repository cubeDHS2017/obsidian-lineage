<script lang="ts">
    import { Pin } from 'lucide-svelte';
</script>

<span class="pin-indicator">
    <Pin class="svg-icon" size="12" />
</span>

<style>
    .pin-indicator {
        position: absolute;
        top:0;
        left: 0;
       & svg {
            fill: var(--text-muted);
            color: var(--text-muted);
        }
    }
</style>
