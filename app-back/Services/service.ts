type Services = typeof window.app.Services;

export class Service<T extends {
    event: string,
    listener: (...args) => void
} = {
    event: null,
    listener: (...args) => void
}>{
    
    static id: string = "";

    protected services: Services = null;
    protected eventEmitter = null;
    
    public async setServices(services: Services) {
        this.services = services;
        await this.init();
    }

    public async setEventEmitter(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    public async init() {
        await this.reload();
    }

    public async emit(event: T["event"], ...args: Parameters<T["listener"]>) {
        if (this.eventEmitter) this.eventEmitter.emit(event, ...args);
    }

    async reload() {
        return true;
    }

    public clean() {
        this.services = null;
        this.eventEmitter = null;
    }
}

export class EventEmitter {

    protected listeners = {};

    on(event, listener) {
        if(!this.listeners[event]) this.listeners[event] = [];
        if(!this.listeners[event].lastId) this.listeners[event].lastId = 0;
        const nextId = (this.listeners[event].lastId + 1) % Number.MAX_SAFE_INTEGER;
        this.listeners[event].push({
            id: nextId,
            li: listener
        })
        this.listeners[event].lastId = nextId;
        return nextId;
    }

    off(event, listenerId) {
        if(!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(listener => listener.id !== listenerId);
    }

    clean(event) {
        if(!this.listeners[event]) return;
        this.listeners[event] = [];
    }

    emit(event, ...args) {
        if(!this.listeners[event]) return;
        this.listeners[event].forEach(listener => listener.li(...args));
    }
}