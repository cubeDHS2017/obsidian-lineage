export const lang = {
    open_in_editor: 'Open in editor',
    open_in_lineage: 'Open in Lineage',
    toggle_lineage_view: 'Toggle view',
    export_document: 'Export document',
    create_new_document: 'Create new document',
    new_document: 'New document',
    change_format_to_document: 'File format: sections',
    change_format_to_outline: 'File format: outline (experimental)',
    format_headings: 'Format headings',
    extract_branch: 'Extract branch to a new document',
    error_apply_snapshot_while_editing: 'Cannot apply a snapshot while editing',
    error_delete_last_node: 'Cannot delete this card',
    error_generic:
        'Something went wrong\nFurther details may be available in the developer console',
    cant_split_card_that_has_children: 'Cannot split a card that has children',
    cant_split_card_identical: 'The result is the same as the input',
    cant_merge_multiple_nodes: 'Cannot merge multiple cards',
    error_parent_not_found: (full: string) =>
        `Could not find the parent section of ${full}`,
};
