import { CardRanges } from 'src/stores/minimap/minimap-state-type';

export type MinimapStoreAction =
    | {
          type: 'minimap/set-active-node';
          payload: { id: string };
      }
    | {
          type: 'minimap/set-card-ranges';
          payload: {
              ranges: CardRanges;
              height_cpx: number;
          };
      }
    | {
          type: 'minimap/set-scroll-position';
          payload: {
              position_cpx: number;
          };
      }
    | {
          type: 'minimap/set-container-height';
          payload: {
              height_cpx: number;
          };
      };
