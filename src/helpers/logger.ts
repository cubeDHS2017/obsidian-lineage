/* eslint-disable no-console */

type Logger = {
    debug: (...message: unknown[]) => void;
    info: (...message: unknown[]) => void;
    warn: (...message: unknown[]) => void;
    error: (...message: unknown[]) => void;
};

export const __dev__ = process.env.NODE_ENV === 'development';
const createLogger = (): Logger => {
    const debug = (...message: string[]) => {
        if (__dev__) {
            console.log(`[DEBUG]: `, ...message);
        }
    };

    const info = (...message: string[]) => {
        if (__dev__) {
            console.log(`[INFO]: `, ...message);
        }
    };

    const warn = (...message: string[]) => {
        if (__dev__) {
            console.warn(`[WARN]: `, ...message);
        }
    };

    const error = (...message: string[]) => {
        console.error(`[ERROR]: `, ...message);
    };

    return { debug, info, warn, error };
};

export const logger = createLogger();

/*let i = 0;
export const AlignBranchLogger = (action: PluginAction) => {
    const id = i++;
    let t = 0;
    return {
        log: (...params: any[]) => {
            const delta = t > 0 ? Date.now() - t : 0;
            t = Date.now();
            console.log(`[${id}] [${action.type}] [${delta}]`, ...params);
        },
    };
}*/
