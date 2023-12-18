import AbstractAccount from "./abstract";
const keytar = require('keytar');
const { ipcRenderer } = require("electron");

const fetch = async (url, data, token = null): Promise<any> => {
    return await ipcRenderer.invoke('fetch',{
        url: `${BASE_URL}${url}`,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token || anonKey}`,
                ...(token ? { "apiKey": anonKey } : {})
            },
            body: JSON.stringify(data || {}	)
        },
        result: 'json'
    })
}

export default class SmokeAccount extends AbstractAccount {

    #token: string = "";
    #userData: any = {};

    init() {
        super.init();
        this.handleStart();
    }

    async handleStart() {
        const token = await this.getSession();
        const creditentials = await this.getCreditentials();
        let logedIn = false;
        if(token) try{ if(await this.login("token", { token: token })) logedIn = true;}catch(e) {}
        if(!logedIn && creditentials) try{if(await this.login("email", creditentials)) logedIn = true;}catch(e) {}
    }

    private async saveSession(token) {
        this.#token = token;
        await keytar.setPassword("app://flareforgesmoke", "smoketoken", token);
    }

    private async getSession() {
        const token = await keytar.getPassword("app://flareforgesmoke", "smoketoken");
        return token;
    }

    private async saveCreditentials(email, password) {
        await keytar.setPassword("app://flareforgesmoke", "smokecreditentials", JSON.stringify({email, password}));
    }

    private async getCreditentials() {
        const creditentials = await keytar.getPassword("app://flareforgesmoke", "smokecreditentials");
        if(!creditentials) return null;
        return JSON.parse(creditentials);
    }
    
    private async fetchUserData() {
        this.#userData = await fetch(`/account`, {}, this.#token);
        if(this.#userData.avatar) this.#userData.avatar = `${BASE_STORE}/${this.#userData.avatar}`;
    }

    async getUserData(type: string, _options?: any) {
        switch(type) {
            case "email":
            case "token":
                return this.#userData;
            default:
                return null;
        }
    }

    async setUserData(type: string, data: any) {    
        switch(type) {
            case "email":
            case "token":
                this.#userData = data;
                await fetch(`/account-edit`, { newData: data }, this.#token);
                break;
            default:
                break;
        }
    }

    async changeAvatar(_type: string, _data?: any) {
        switch(_type) {
            case "email":
            case "token":
                const base64 = _data.base64.split(';base64,').pop();
                const buffer = Buffer.from(base64, 'base64');
                const mimeType = "image/jpeg"
                const result = await new Promise((resolve, reject) => {
                    ipcRenderer.invoke('fetch',{
                        url: `${BASE_URL}/account-avatar`,
                        options: {
                            method: "POST",
                            headers: {
                                "Content-Type": mimeType,
                                "Authorization": `Bearer ${this.#token}`,
                                "apiKey": anonKey
                            },
                            body: buffer
                        },
                        result: 'json'
                    })
                    .then((result) => resolve(result))
                    .catch((err) => reject(err));
                }) as any;
                if(!result.success) return false;
                await this.fetchUserData();
                return true;
            default:
                return false;
        }
    }

    async login(type: string, opts: any): Promise<boolean> {
        let response;
        switch(type) {
            case "email":
                response = await fetch(`/auth`, {type, data:opts})
                if(!response.access_token) return false;
                this.saveSession(response.access_token);
                this.saveCreditentials(opts.email, opts.password);
                this.fetchUserData();
                return true
            case "token":
                response = await fetch(`/auth`, {type, data:opts})
                if(!response.access_token) return false
                this.saveSession(opts.token);
                this.fetchUserData();
                return true
            case "discord": // need more here
                return false;
            default:
                return false;
        }
    }

    async isLogged(type: string, _opts: any = {}): Promise<boolean> {
        switch(type) {
            case "token":
            case "email":
                return Boolean(this.#token);
            default:
                return false;
        }
    }

}

const BASE_URL = "https://mgwbnslnolkjpugojhun.supabase.co/functions/v1";
const BASE_STORE = "https://mgwbnslnolkjpugojhun.supabase.co/storage/v1/object/public";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nd2Juc2xub2xranB1Z29qaHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI0NDIzNDgsImV4cCI6MjAxODAxODM0OH0.Dy3cDpZK7S3COmLNVQZh0SurojdJkGR6ksQJILdwNhI";
