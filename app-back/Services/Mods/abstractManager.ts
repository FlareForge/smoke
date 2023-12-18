import { Service } from "../abstract";
import { Game } from "../Storage/abstract";

export type Mod = {
    id: string;
    injection: string;
    name: string;
    path: string;
};

export default class AbstractModManager extends Service {

    async installMod(_game: Game, _mod: Mod){}

    async uninstallMod(_game: Game, _mod: Mod){}

    async restoreGame(_game: Game){}
}