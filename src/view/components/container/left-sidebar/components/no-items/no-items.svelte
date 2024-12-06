<script lang="ts">

    export let variant: 'recent'|'pinned'
</script>

<div class="pane-empty">
    {variant === 'pinned'
        ? "No pinned nodes found"
        : "No recent nodes found"}
</div>
