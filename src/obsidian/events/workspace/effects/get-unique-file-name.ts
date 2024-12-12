import { sanitizeFileName } from 'src/helpers/sanitize-file-name';

export const getUniqueFileName = (
    folderPath: string,
    files: string[],
    basename: string,
): string => {
    basename = sanitizeFileName(basename);
    let index = 1;
    let newFileName = basename;

    while (files.includes(`${newFileName}`)) {
        newFileName = `${basename} (${index})`;
        index++;
    }

    return `${folderPath}/${newFileName}`;
};
