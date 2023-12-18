import AbstractModManager from '../abstractManager';
import AbstractInjection from '../abstractInjection';
// import XDeltaInjection from './xdelta';

export default class WindowsModManager extends AbstractModManager {

    #injections: Record<string,AbstractInjection> = {
        // xdelta: new XDeltaInjection(),
    }

    init(){
        super.init();
        Object.values(this.#injections).forEach(injection => injection.setServices(this.services));
    }

    async installMod(game, mod){
        const id = mod.injection;
        await this.#injections[id].installMod(game, mod);
    }

    async uninstallMod(game, mod){
        const id = mod.injection;
        await this.#injections[id].uninstallMod(game, mod);
    }

    async restoreGame(_game){
    }
};
