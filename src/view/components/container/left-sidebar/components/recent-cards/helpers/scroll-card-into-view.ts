export const scrollCardIntoView = (
    container: HTMLElement,
    activeNodeId: string,
) => {
    const activeCard = container.querySelector(
        `#${activeNodeId}`,
    ) as HTMLElement | null;
    if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};
