type Services = typeof window.app.Services;

export class Service {
    protected services: Services = null;
    static id: string = "";
    
    public async setServices(services: Services) {
        this.services = services;
        await this.init();
    }

    public async init() {
        await this.reload();
    }

    async reload() {
        return true;
    }

    public clean() {
        this.services = null;
    }
}