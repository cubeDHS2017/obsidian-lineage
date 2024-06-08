import Lineage from 'src/main';
import { TFile, TFolder } from 'obsidian';
import invariant from 'tiny-invariant';
import { sanitizeFileName } from 'src/helpers/sanitize-file-name';

const getUniqueFileName = (
    folderPath: string,
    files: string[],
    basename = 'Untitled',
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

export const createNewFile = async (
    plugin: Lineage,
    folder: TFolder,
    data = '',
    basename?: string,
) => {
    invariant(folder);
    const children = folder.children
        .map((c) => (c instanceof TFile ? c.basename : null))
        .filter((f) => f) as string[];
    const path = getUniqueFileName(folder.path, children, basename);
    const newFilePath = path + '.md';

    const file = await plugin.app.vault.create(newFilePath, data);
    invariant(file);
    return file;
};
