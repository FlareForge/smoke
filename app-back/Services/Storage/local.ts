import AbstractStorage from "./abstract";
import { Game } from "./abstract";
const Store = require('electron-store');
const crypto = require('crypto');

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
        currentGames[game.id] = game;
        this.#store.set('games', currentGames);
    }

    async setGame(game){
        const currentGames = this.#store.get('games', {});
        currentGames[game.id] = {
            ...currentGames[game.id],
            ...game,
        }
        this.#store.set('games', currentGames);
    }

    async removeGame(game){
        const currentGames = this.#store.get('games', {});
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
    
    async clear(){
        this.#store.clear();
    }
}