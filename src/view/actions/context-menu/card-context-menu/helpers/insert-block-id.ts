const getExistingBlockId = (lines: string[]) => {
    const reversed = [...lines].reverse();
    for (let line of reversed) {
        line = line.trim();
        const match = /\s+\^([a-zA-Z0-9]{4,})$/.exec(line);
        if (match) {
            return match[1];
        }
    }
};

export const generateBlockId = () => Math.random().toString(36).substring(2, 8);

export const insertBlockId = (
    text: string,
    __id__?: string,
):
    | {
          text: string;
          blockId: string;
      }
    | undefined => {
    const lines = text.trimEnd().split('\n');
    const existingId = getExistingBlockId(lines);
    if (existingId) {
        return {
            blockId: existingId,
            text,
        };
    } else {
        const lastLine = lines[lines.length - 1];
        let blockId: string | null = null;
        if (lastLine) {
            blockId = __id__ || generateBlockId();
            lines[lines.length - 1] = lines[lines.length - 1] + ` ^${blockId}`;
            return {
                blockId,
                text: lines.join('\n'),
            };
        }
    }
};
