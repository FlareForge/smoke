import { BASE_STORE, BASE_URL, anonKey } from "../smoke.config";
import AbstractFriends from "./abstract";
const { ipcRenderer } = require("electron");

const fetch = async (url, data, token = null): Promise<any> => {
    return await ipcRenderer.invoke('fetch',{
        url: `${BASE_URL}${url}`,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token || anonKey}`,
                ...(token ? { "apiKey": anonKey } : {})
            },
            body: JSON.stringify(data || {}	)
        },
        result: 'json'
    })
}

export default class SmokeFriends extends AbstractFriends {

    #friends = [];

    async reload(){
        await super.reload();
        this.handleStart();
        return null;
    }

    async handleStart() {
        await this.updateFriends();
    }

    async updateFriends() {
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        if(!token) return this.#friends = [];
        const result = await fetch(`/friends`, {}, token);
        console.info("FRIENDS", result.friends)
        this.#friends = result.friends.map(friend => ({
            ...friend,
            avatar: `${BASE_STORE}/${friend.avatar}`,
            smoke_id: friend.id,
        }))
    }

    async getFriends() {
        return this.#friends;
    }

    async requestFriend(username: string) {
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        await fetch(`/friends-add`, { username }, token);
        await this.updateFriends();//!!!
        return true;
    }



}