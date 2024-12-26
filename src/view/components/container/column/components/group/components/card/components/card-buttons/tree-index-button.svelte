<script lang="ts">
    import { getView } from '../../../../../../../context';
    import { ActiveStatus } from 'src/view/components/container/column/components/group/components/active-status.enum';
    import { getDocumentFormat } from 'src/obsidian/events/workspace/helpers/get-document-format';
    import {
        findSectionPosition
    } from 'src/view/components/container/column/components/group/components/card/components/card-buttons/helpers/find-section-position';
    import {
        findOutlinePosition
    } from 'src/view/components/container/column/components/group/components/card/components/card-buttons/helpers/find-outline-position';
    import {
        openFileAndJumpToLine
    } from 'src/view/components/container/column/components/group/components/card/components/card-buttons/helpers/openFileAndJumpToLine';
    import {
        findHtmlElementPosition
    } from 'src/view/components/container/column/components/group/components/card/components/card-buttons/helpers/find-html-element-position';

    const view = getView();
    export let nodeId: string;
    export let activeStatus: ActiveStatus | null;
    export let section: string;
    export let hasChildren: boolean;

    // eslint-disable-next-line no-undef
    const openFile = async () => {
        if (!view.file) return;

        const format = getDocumentFormat(view);
        const i =
            format === 'sections'
                ? findSectionPosition(view, nodeId)
                : format === 'html-element'
                  ? findHtmlElementPosition(view, nodeId)
                  : findOutlinePosition(view, nodeId);
        if (typeof i === 'undefined') return;
        const targetLine = i + (format === 'sections' ? 1 : 0);
        const lines = view.data.split('\n');
        const nextLine = lines[targetLine] || '';
        await openFileAndJumpToLine(
            view,
            targetLine,
            nextLine.length,
        );
    };
    const classes: Partial<Record<ActiveStatus, string>> = {
        [ActiveStatus.node]: 'is-active',
        [ActiveStatus.child]: 'is-active-child',
        [ActiveStatus.parent]: 'is-active-parent',
        [ActiveStatus.sibling]: 'is-active-parent',
    };
</script>

<div
    aria-label="Reveal in editor"
    class={'tree-index ' +
        (activeStatus ? classes[activeStatus] : '') +
        (hasChildren ? ' has-children' : '')}
    on:click={openFile}
>
    {section}
</div>

<style>
    .tree-index {
        position: absolute;
        bottom: 3px;
        right: 8px;
        opacity: 0.8;
        font-size: 12px;
        cursor: pointer;
        transition: opacity 200ms;
    }
    .is-active {
        opacity: 0.3;
    }

    .is-active-child {
        opacity: 0.3;
    }

    .is-active-parent {
        opacity: 0.6;
    }

    .tree-index:hover {
        opacity: 0.8;
    }
    :global(.is-mobile){
        & .tree-index {
            opacity: 0.8;
        }
    }

    .has-children {
        font-style: italic;

    }
</style>
