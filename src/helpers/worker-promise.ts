export class WorkerPromise<Input, Output, Shared = never> {
    private id = 0;
    private worker: Worker;
    private resolvers: Record<
        number,
        (value: Output | PromiseLike<Output>) => void
    > = {};

    constructor(worker: Worker) {
        this.worker = worker;
        this.worker.addEventListener('message', this.onMessage);
    }

    run = (payload: Input, shared?: Shared) => {
        return new Promise<Output>((resolve) => {
            if (this.id === 1000) this.id = 0;
            const id = this.id++;
            this.resolvers[id] = resolve;
            if (shared) {
                // @ts-ignore
                this.worker.postMessage({ id, payload }, [shared]);
            } else this.worker.postMessage({ id, payload });
        });
    };

    terminate = () => {
        this.worker.terminate();
    };

    private onMessage = (
        message: MessageEvent<{ id: number; payload: Output }>,
    ) => {
        const id = message.data.id;
        const resolver = this.resolvers[id];
        if (resolver) {
            resolver(message.data.payload);
            delete this.resolvers[id];
        }
    };
}
