type Services = typeof window.app.Services;

export class Service {
    protected services: Services = null;
    static id: string = "";
    
    public async setServices(services: Services) {
        this.services = services;
        await this.init();
    }

    public async init() {}

    public clean() {
        this.services = null;
    }

}