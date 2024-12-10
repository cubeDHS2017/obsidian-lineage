const applyNbsp = (text: string) => {
    const lines = text.split('\n');
    let mutated = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) continue;
        const previousLine = lines[i - 1];
        const skipNbsp =
            i > 0 &&
            (previousLine.startsWith('- ') || previousLine.startsWith('> '));
        if (!skipNbsp) {
            lines[i] = '&nbsp;';
            mutated = true;
        }
    }
    return mutated ? lines.join('\n') : text;
};

export const formatText = (text: string) => {
    if (/\s+(\^[a-zA-Z0-9]{4,})$/.test(text)) {
        text = text.replace(
            /\s+(\^[a-zA-Z0-9]{4,})$/gm,
            ' <sup class="cm-blockid" data-block-id="$1">$1</sup>',
        );
    }
    if (/%%/.test(text)) {
        text = text.replace(
            /%%(.*?)%%/gms,
            `<span class="cm-comment">%\u200B%$1%\u200B%</span>`,
        );
    }
    if (/<!--/.test(text)) {
        text = text.replace(
            /<!--(.*?)-->/gms,
            '<span class="cm-comment">&lt;!--$1--&gt;</span>',
        );
    }

    if (/^\s*$/gm.test(text)) {
        text = applyNbsp(text);
    }
    return text;
};
