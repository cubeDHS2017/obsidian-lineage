export const htmlCommentRegex = /\s*<span data-section="((\d\.?)*(\d))"\s*\/>/;
export const parseHtmlElementMarker = (line: string) => {
    const results = htmlCommentRegex.exec(line);
    if (results) {
        const result = results[1];
        const split = result.split('.');
        const index = split[split.length - 1] as string;
        const parent = result.substring(0, result.length - index.length - 1);
        return [parent, index, result];
    }
};
