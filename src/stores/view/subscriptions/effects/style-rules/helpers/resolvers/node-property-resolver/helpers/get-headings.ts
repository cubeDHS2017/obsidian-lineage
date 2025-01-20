export const getHeadings = (content: string): string[] => {
    const headings = content.match(/^#{1,6} .*/gm) ?? [];
    return headings.map((heading) => heading.replace(/^#{1,6} /, ''));
};
