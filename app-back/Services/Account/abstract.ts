import { Service } from "../service";

export default class AbstractAuth extends Service {
    async login(_type: string, _options: any): Promise<boolean> {
        return false;
    }

    async isLogged(_type: string, _options: any = {}): Promise<boolean> {
        return false;
    }

    async getUserData(_type: string, _options: any = {}): Promise<any> {
        return null;
    }

    async setUserData(_type: string, _data: any = {}): Promise<any> {
        return null;
    }

    async changeAvatar(_type: string, _data: any = {}): Promise<boolean> {
        return true;
    }
}
