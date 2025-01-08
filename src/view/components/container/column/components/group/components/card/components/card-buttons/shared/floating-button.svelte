<script lang="ts">
    import classNames from 'classnames';
    import { Direction } from '../../../../../../../../../../../stores/document/document-store-actions';

    export let classes = '';
    export let position: Direction | 'down-right' | 'up-right';
    export let label: string
    const positionClasses = {
        up: 'position-top',
        right: 'position-right',
        down: 'position-bottom',
        'down-right': 'position-bottom-right',
        'up-right': 'position-top-right',
    };
</script>

<button
    aria-label={label}
    class={classNames(
        classes,
        positionClasses[position],
        'lineage-floating-button',
    )}
    on:click
>
    <slot />
</button>

