import * as async_hooks from "node:async_hooks";
import {AsyncHook} from "async_hooks";

// for request context, currently for "traceId" in microservices flow
export class AsyncContextManager {
    private store: Map<number, any> = new Map();
    private asyncHook: AsyncHook

    constructor() {
        this.asyncHook = async_hooks.createHook({
            init: (asyncId, type, triggerAsyncId) => {
                if (this.store.has(triggerAsyncId)) {
                    this.store.set(asyncId, this.store.get(triggerAsyncId));
                }
            },
            destroy: (asyncId) => {
                this.store.delete(asyncId);
            },
        });

        this.asyncHook.enable();
    }

    run(callback: () => void) {
        const asyncId = async_hooks.executionAsyncId();
        this.store.set(asyncId, new Map());

        try {
            callback();
        } finally {
            this.store.delete(asyncId);
        }
    }

    getStore() {
        return this.store.get(async_hooks.executionAsyncId()) || new Map();
    }
}