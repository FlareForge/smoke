import AbstractStorage from "./abstract";
import { Game } from "./abstract";
const Store = require('electron-store');
const crypto = require('crypto');
const { ipcRenderer } = require("electron");
export default class LocalStorage extends AbstractStorage {

    #store = new Store();

    async getGames(){
        return this.#store.get('games', {}) as Record<string, Game>;
    }

    async getGame(id){
        const currentGames = this.#store.get('games', {});
        return currentGames[id] || null;
    }

    async addGame(game){
        const id = crypto.createHash('sha256').update(JSON.stringify({path: game.path})).digest('hex');
        game.id = id;
        const currentGames = this.#store.get('games', {});
        if(!game.id) return;
        const currentGame = currentGames[game.id];
        if(currentGame) for (const key in currentGame) game[key] = currentGame[key] || game[key];
        if(game.image?.startsWith?.('http')) game.image = await ipcRenderer.invoke('create-local-image', {
            url: game.image,
            name: game.image.split('/').pop()
        });
        if(game.banner?.startsWith?.('http')) game.banner = await ipcRenderer.invoke('create-local-image', {
            url: game.banner,
            name: game.banner.split('/').pop()
        });
        this.#store.set('games', {
            ...this.#store.get('games', {}),
            [game.id]: game,
        });
        this.emit('game-added', game)
    }

    async setGame(game){
        const currentGames = this.#store.get('games', {});
        if(game.image?.startsWith?.('http')) game.image = await ipcRenderer.invoke('create-local-image', {
            url: game.image,
            name: game.image.split('/').pop()
        });
        if(game.banner?.startsWith?.('http')) game.banner = await ipcRenderer.invoke('create-local-image', {
            url: game.banner,
            name: game.banner.split('/').pop()
        });
        this.#store.set('games', {
            ...this.#store.get('games', {}),
            [game.id]: {
                ...currentGames[game.id],
                ...game,
            },
        });
    }

    async removeGame(game){
        const currentGames = this.#store.get('games', {});
        if(!currentGames[game.id]) return;
        if(currentGames[game.id].image?.startsWith?.('file://')) ipcRenderer.invoke('delete-local-image', {
            path: currentGames[game.id].image,
        });
        if(currentGames[game.id].banner?.startsWith?.('file://')) ipcRenderer.invoke('delete-local-image', {
            path: currentGames[game.id].banner,
        });
        delete currentGames[game.id];
        this.#store.set('games', currentGames);
    }

    async store(id, data){
        this.#store.set("storage."+id, data);
    }

    async get(id, _default = null){
        return this.#store.get("storage."+id, _default);
    }

    async delete(id){
        this.#store.delete("storage."+id);
    }
    
    async clear(location){
        switch(location){
            case 'games':
                const currentGames = this.#store.get('games', {});
                for (const game in currentGames) {
                    if(currentGames[game].image?.startsWith?.('file://')) ipcRenderer.invoke('delete-local-image', {
                        path: currentGames[game].image,
                    });
                    if(currentGames[game].banner?.startsWith?.('file://')) ipcRenderer.invoke('delete-local-image', {
                        path: currentGames[game].banner,
                    });
                }
                this.#store.set('games', {});
                break;
            case 'all':
                this.clear('games');
                break;
        }
        
    }
}