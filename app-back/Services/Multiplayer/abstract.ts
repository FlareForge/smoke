import { Service } from "../service";

export default class AbstractMultiplayer extends Service {

    async getServers(_game: any): Promise<any> {
        return [];
    }

    async playOnServer(_game: any, _server: any): Promise<any> {
        return false;
    }

    async gameSupportMultiplayer(_game: any): Promise<boolean> {
        return false;
    }

    async gameHasMultiplayerMod(_game: any): Promise<boolean> {
        return false;
    }
}