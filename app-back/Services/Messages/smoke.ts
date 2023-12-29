import { BASE_URL, anonKey } from "../smoke.config";
import AbstractMessages from "./abstract";
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

export default class SmokeMessages extends AbstractMessages {

    #callback = null;	
    #target = null;
    #lastId = null;

    async reload(){
        await super.reload();
        this.#lastId = null;
        this.#callback = null;
        this.#target = null;
        return null;
    }

    async getPrivateMessages(user) {
        if(!user.smoke_id) return [];
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        const result = await fetch(`/chat-room`, { room: user.smoke_id, isPrivate: true}, token);
        if(!result.messages) return [];
        this.#lastId = result.messages[result.messages.length - 1].id;
        return result.messages;
    }
    

    async sendPrivateMessage(user, message) {
        if(!user.smoke_id) return false;
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        const { message: newMessage } = await fetch(`/send-message`, { room: user.smoke_id, isPrivate: true, message: message}, token);
        if(!newMessage) return false;
        this.#lastId = newMessage.id;
        return true;
    }

    async setCallback(target, callback) {
        this.#target = target;
        this.#callback = callback;
        if(!this.#target || !this.#callback) return;
        this.startListening();
    }

    async startListening() {
        if(!this.#callback) return;
        if(!this.#target) return;
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        const room = this.#target.smoke_id ? this.#target.smoke_id : this.#target.smoke_id; // will have groups
        try{
            const result = await fetch(`/chat-listen`, { room, isPrivate: !!this.#target.smoke_id, lastId: this.#lastId }, token);
            const { messages } = result;
            if(messages) {
                this.#callback(messages);
                this.#lastId = messages[messages.length - 1].id;
            }
        }catch(e) {
            console.error(e);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        this.startListening();
    }

}