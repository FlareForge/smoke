import { Service } from "../service";

export type Game = {
    id: string;
    name: string;
    description: string;
    path: string;
    image: string;
    banner: string;
    emulator: string;

    timePlayed?: number;
    emulatorPath?: string;
    commands?: string[];
    emulatorConfig?: any;
    mapping?: any;
};

export default class AbstractStorage extends Service {

    async getGames(): Promise<Record<string,Game>> {
        return {}
    }

    async getGame(_id): Promise<Game> {
        return null;
    }

    async addGame(_game: Game){
        return null;
    }

    async setGame(_game: Game){
        return null;
    }

    async removeGame(_game: Game){
        return null;
    }

    async store(_id, _data){
        return null;
    }

    async get(_id, _default = null){
        return null;
    }

    async delete(_id){
        return null;
    }

    async clear(){
        return null;
    }
}