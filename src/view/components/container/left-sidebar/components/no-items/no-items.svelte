<script lang="ts">

    import { lang } from 'src/lang/lang';

    export let variant: 'recent'|'pinned'

</script>

<div class="pane-empty">
    {variant === 'pinned'?
        lang.sidebar_no_pinned_cards:
        lang.sidebar_no_recent_cards
        }
</div>
