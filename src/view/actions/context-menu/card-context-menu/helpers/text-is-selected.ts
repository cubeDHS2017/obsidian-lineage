export const textIsSelected = () => {
    const selectedText = activeWindow.getSelection()?.toString();
    return selectedText && selectedText.length > 0 ? true : false;
};
