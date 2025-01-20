import { getCardsOfColumns } from '../../../getters/lineage-view/card/get-cards-of-columns';
import { delay, SHORT } from '../../../general/delay';
import { MARKDOWN_PREVIEW } from '../../../getters/lineage-view/card/get-card-text';
import { LINEAGE_INLINE_EDITOR } from '../../../getters/lineage-view/card/get-inline-editor';

export const selectCard = async (
    column: number,
    cardNumber: number,
    mode: 'preview' | 'edit' = 'preview',
) => {
    const card = (await getCardsOfColumns())[column][cardNumber];
    await card.click();
    await card.waitForSelector(
        mode === 'preview' ? MARKDOWN_PREVIEW : LINEAGE_INLINE_EDITOR,
    );
    await delay(SHORT);
};
