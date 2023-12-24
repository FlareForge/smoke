import { Game } from "../Storage/abstract";
import { Mod } from "./abstractManager";
import { Service } from "../service";

export default class AbstractInjection extends Service {

    async installMod(_game: Game, _mod: Mod){}

    async uninstallMod(_game: Game, _mod: Mod){}
    
    async restoreGame(_game: Game){}
}