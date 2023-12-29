import { Service } from "../service";

export default class AbstractMessages extends Service {

    async sendPrivateMessage(_user: any, _message: string): Promise<boolean> {
        return false;
    }

    async getPrivateMessages(_user: any): Promise<any[]> {
        return [];
    }

    async setCallback(_target: any, _callback: Function): Promise<void> {
        return;
    }
}