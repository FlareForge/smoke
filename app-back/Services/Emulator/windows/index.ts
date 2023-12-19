import AbstractEmulatorManager, { Emulator } from '../abstractManager';
import NativeEmulator from './native';
import CustomEmulator from './custom';
const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');
const crypto = require('crypto');

export default class WindowsEmulatorManager extends AbstractEmulatorManager {

    #emulators = {
        native: new NativeEmulator(),
    }
    
    #instaling = {};
    #currentLayoutGuide = null;

    async getEmulatorPath(id){
        let installedPath = this.services.Storage.get('emulator.'+id, null);
        if(!installedPath){
            await this.install(id);
            installedPath = this.services.Storage.get('emulator.'+id, null);
        }
        return installedPath;
    }

    async init(){
        super.init();
        const customEmulators = await this.services.Storage.get('customEmulators', {}) as Record<string, Emulator>;
        Object.values(customEmulators).forEach((emulator) => this.initCustomEmulator(emulator));
    }

    async install(id){
        if(this.#instaling[id]) return;
        this.#instaling[id] = true;
        const path = await this.#emulators[id].install();
        this.services.Storage.store('emulator.'+id, path);
        this.#instaling[id] = false;
    }

    async uninstall(id){
        if(this.#emulators[id].custom){
            this.services.Storage.delete('emulator.'+id);
            await this.removeCustomEmulator(id);
        }else{
            this.services.Storage.delete('emulator.'+id);
            await this.#emulators[id].uninstall();
        }
    }
    
    async startGame(game){
        const id = game.emulator;
        const emulatorPath = await this.getEmulatorPath(id);
        this.#currentLayoutGuide = this.#emulators[id].layoutGuide;
        await ipcRenderer.invoke('gamechange', {
            game: game,
            layout: this.#emulators[id].layoutGuide,
        });
        return await this.#emulators[id].startWithGame(game, emulatorPath);
    }

    async uninstallGame(game){
        return this.#emulators[game.emulator].uninstallGame(game);
    }

    shutdownGame(game){
        const path = this.services.Storage.get('emulator.'+game.emulator, null);
        if(!path) return false;
        return this.#emulators[game.emulator].shutdownGame(game, path);
    }

    async isGameRunning(game){
        const path = this.services.Storage.get('emulator.'+game.emulator, null);
        if(!path) return false;
        return await this.#emulators[game.emulator].isGameRunning(game, path);
    }

    async getEmulators(){
        const emulators = await Promise.all(Object.keys(this.#emulators).map(async (key) => ({
            id: key,
            name: this.#emulators[key].name,
            platform: this.#emulators[key].platform,	
            icon: this.#emulators[key].icon,
            link: this.#emulators[key].link,
            custom: !!this.#emulators[key].custom,
            installed: !!(await this.services.Storage.get('emulator.'+key, null)),
        })));
        return emulators.filter((emulator) => emulator.id !== 'native');
    }

    async scanFolder(callback){
        const path = await ipcRenderer.invoke('open-folder-dialog');
        if(!path) return;
        const emulatorsExts = Object.keys(this.#emulators).map((key) => ({
            id: key,
            ext: this.#emulators[key].ext,
        })).filter((emulator) => emulator.ext !== null);
        this.recusiveScanFolder(path, emulatorsExts, callback);
    }

    async getCurrentLayoutGuide(){ 
        return this.#currentLayoutGuide;
    }
    
    async addCustomEmulator(_emulator: Emulator) {
        const customEmulators = await this.services.Storage.get('customEmulators', {});
        _emulator.id = crypto.createHash('sha256').update(JSON.stringify({path: _emulator.path, args: _emulator.args})).digest('hex');
        customEmulators[_emulator.id] = _emulator;
        await this.initCustomEmulator(_emulator);
        await this.install(_emulator.id);
        await this.services.Storage.store('customEmulators', customEmulators);
    }

    async removeCustomEmulator(_id: string) {
        const customEmulators = await this.services.Storage.get('customEmulators', {});
        delete customEmulators[_id];
        delete this.#emulators[_id];
        await this.services.Storage.store('customEmulators', customEmulators);
    }

    async initCustomEmulator(_emulator: Emulator) {
        this.#emulators[_emulator.id] = new CustomEmulator(_emulator);
    }

    recusiveScanFolder(_path, emulators, callback){
        const files = fs.readdirSync(_path);
        files.forEach((file) => {
            const filePath = _path + '/' + file;
            const stat = fs.statSync(filePath);
            if(stat.isDirectory()){
                this.recusiveScanFolder(filePath, emulators, callback);
            }else{
                const ext = path.extname(filePath);
                const find = emulators.find((emu) => emu.ext === ext);
                if(find){
                    callback({
                        emulator: find.id,
                        path: filePath,
                        name: path.basename(filePath, ext),
                    });
                }
            }
        });
    }
};
