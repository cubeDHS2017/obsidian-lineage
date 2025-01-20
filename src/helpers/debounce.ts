/* eslint-disable @typescript-eslint/no-explicit-any */

type DebounceFunction<T extends (...args: any[]) => any> = (
    ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number,
): DebounceFunction<T> => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
