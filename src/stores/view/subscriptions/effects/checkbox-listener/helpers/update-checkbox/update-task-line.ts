export const updateTaskLine = (line: string, checked: boolean): string => {
    return line.replace(
        /^([-*+]\s*\[)[ x](\].*)$/i,
        `$1${checked ? 'x' : ' '}$2`,
    );
};
