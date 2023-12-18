import AbstractInjection from "../abstractInjection";
const path = require('path');
const fs = require('fs');
const { ipcRenderer } = require('electron');

const exec = async (path, args) => await ipcRenderer.invoke("start-process", { path, args, detach: true });

export default class XDeltaInjection extends AbstractInjection{

    async installMod(game, mod){
        const gameId = game.id;
        const gamePath = game.path; 
        const storeId = 'gamemods.xdelta.'+gameId;
        const gameModsInfos = this.services.Storage.get(storeId, {}) as Record<string, any>;

        if (!gameModsInfos.backupPath) {
            const pathStart = await ipcRenderer.invoke('get-app-path', 'userData');
            const filename = path.basename(gamePath);
            const backupFilePath = path.join(pathStart, 'backups/xdelta', gameId, filename);
            const backupPath = path.dirname(backupFilePath);
            fs.mkdirSync(backupPath, { recursive: true });
            fs.copyFileSync(gamePath, backupFilePath);
            gameModsInfos.backupPath = backupFilePath;
            gameModsInfos.patches = [];
            this.services.Storage.store(storeId, gameModsInfos);
        }

        await this.injectXDeltaPatch(gamePath, mod.path);

        gameModsInfos.patches.push(mod);
        this.services.Storage.store(storeId, gameModsInfos);
    }

    async uninstallMod(game, mod){
        const gameId = game.id;
        const gamePath = game.path;
        const storeId = 'gamemods.xdelta.'+gameId;
        const gameModsInfos = this.services.Storage.get(storeId, {}) as Record<string, any>;

        const patches = gameModsInfos.patches;
        const patchIndex = patches.findIndex(patch => patch.id === mod.id);
        patches.splice(patchIndex, 1);
        
        await this.restoreGame(game);

        for (let i = 0; i < patches.length; i++) {
            const patch = patches[i];
            await this.injectXDeltaPatch(gamePath, patch.path);
        }

        this.services.Storage.store(storeId, gameModsInfos);
    }

    async restoreGame(game){
        const gameId = game.id;
        const storeId = 'gamemods.xdelta.'+gameId;
        const gameModsInfos = this.services.Storage.get(storeId, {}) as Record<string, any>;

        const backupPath = gameModsInfos.backupPath;
        const gamePath = game.path;

        if(!backupPath) return;
        await fs.promises.copyFile(backupPath, gamePath);
    }

    async injectXDeltaPatch(sourcePath, patchPath){
        const toolsPath = await ipcRenderer.invoke('get-bin-path');
        const exePath = path.join(toolsPath, 'xdelta.exe');
        const destinationPath = path.join(path.dirname(sourcePath), 'temp.nds');
        const args = ['-d', '-s', sourcePath, patchPath, destinationPath];
        const disabled = true;
        if (!disabled)
        await exec(exePath, args)
        fs.copyFileSync(destinationPath, sourcePath);
        fs.unlinkSync(destinationPath);
    }
}