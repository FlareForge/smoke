type Services = typeof window.app.Services;

export class Service {
    protected services: Services = null;
    static id: string = "";
    
    public setServices(services: Services) {
        this.services = services;
        this.init();
    }

    public init() {}

    public clean() {
        this.services = null;
    }

}