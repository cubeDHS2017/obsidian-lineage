<script lang="ts">

    export let variant: 'recent'|'pinned'
</script>

<div class="pane-empty">
    {variant === 'pinned'
        ? "No pinned cards found"
        : "No recent cards found"}
</div>
