import { UndoRedoAction } from 'src/stores/document/reducers/history/undo-action';
import { SelectSnapshotAction } from 'src/stores/document/reducers/history/select-snapshot';
import { NodePosition } from 'src/lib/tree-utils/find/find-node-position';
import { LoadDocumentAction } from 'src/stores/document/reducers/load-document-from-file/load-document-from-file';
import { CreateNodeAction } from 'src/stores/document/reducers/insert-node/insert-node';
import { SetNodeContentAction } from 'src/stores/document/reducers/content/set-node-content';
import { DropAction } from 'src/stores/document/reducers/drop-node/drop-node';
import { DeleteNodeAction } from 'src/stores/document/reducers/delete-node/delete-node';
import { MoveNodeAction } from 'src/stores/document/reducers/move-node/move-node';
import { MergeNodeAction } from 'src/stores/document/reducers/merge-node/merge-node';
import { FormatHeadingsAction } from 'src/stores/document/reducers/content/format-content/format-headings';
import { PasteNodeAction } from 'src/stores/document/reducers/clipboard/paste-node/paste-node';
import { ExtractNodeAction } from 'src/stores/document/reducers/extract-node/extract-node';
import { SplitNodeAction } from 'src/stores/document/reducers/split-node/split-node';
import { BookmakNodeAction } from 'src/stores/document/reducers/bookmarks/bookmark-node';
import { RemoveNodeBookmarkAction } from 'src/stores/document/reducers/bookmarks/remove-node-bookmark';
import { RefreshBookmarksAction } from 'src/stores/document/reducers/bookmarks/refresh-bookmarks';
import { LoadBookmarksAction } from 'src/stores/document/reducers/bookmarks/load-bookmarks';
import { RefreshGroupParentIdsAction } from 'src/stores/document/reducers/meta/refresh-group-parent-ids';

export type VerticalDirection = 'up' | 'down';
export type Direction = VerticalDirection | 'right';
export type AllDirections = Direction | 'left';
export type SavedDocument = {
    data: string;
    position: NodePosition | null;
    frontmatter: string;
};
type ResetStoreAction = { type: 'RESET_STORE' };
type SetFilePathAction = {
    type: 'FS/SET_FILE_PATH';
    payload: {
        path: string | null;
    };
};

export type DocumentStoreAction = DocumentAction | HistoryAction;

export type DocumentAction =
    | LoadDocumentAction
    | CreateNodeAction
    | ResetStoreAction
    | SetNodeContentAction
    | DropAction
    | SetFilePathAction
    | DeleteNodeAction
    | MoveNodeAction
    | MergeNodeAction
    | FormatHeadingsAction
    | DocumentClipboardActions
    | ExtractNodeAction
    | SplitNodeAction
    | {
          type: 'FILE/UPDATE_FRONTMATTER';
          payload: {
              frontmatter: string;
          };
      }
    | BookmarkActions
    | MetaActions;

export type HistoryAction = UndoRedoAction | SelectSnapshotAction;
export type UndoableAction =
    | SetNodeContentAction
    | CreateNodeAction
    | DeleteNodeAction
    | DropAction
    | MoveNodeAction
    | MergeNodeAction
    | LoadDocumentAction
    | FormatHeadingsAction
    | PasteNodeAction
    | CutNodeAction
    | ExtractNodeAction
    | SplitNodeAction;

export type CopyNodeAction = {
    type: 'DOCUMENT/COPY_NODE';
    payload: {
        nodeId: string;
        selectedNodes?: Set<string>;
    };
};

export type CutNodeAction = {
    type: 'DOCUMENT/CUT_NODE';
    payload: {
        nodeId: string;
        selectedNodes?: Set<string>;
    };
};

export type DocumentClipboardActions =
    | CopyNodeAction
    | PasteNodeAction
    | CutNodeAction;

export type BookmarkActions =
    | BookmakNodeAction
    | RemoveNodeBookmarkAction
    | RefreshBookmarksAction
    | LoadBookmarksAction;

export type MetaActions = RefreshGroupParentIdsAction;
