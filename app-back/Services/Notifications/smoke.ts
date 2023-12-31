import { BASE_URL, anonKey } from "../smoke.config";
import AbstractNotifications from "./abstract";
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

export default class SmokeNotifications extends AbstractNotifications{

    #notifications = [];
    #checkInterval = null;

    async reload(){
        await super.reload();
        this.handleStart();
        return null;
    }

    async handleStart() {
        await this.updateNotifications();
        this.#checkInterval = setInterval(() => {
            this.updateNotifications();
        }, 60000);
    }

    async updateNotifications() {
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        if(!token) return this.#notifications = [];
        const result = await fetch(`/notifications`, {}, token);
        this.#notifications = result.notifications.map(notification => ({
            ...notification,
            smoke_id: notification.id,
        }))
        this.emit('notification-updated')
    }

    async getNotifications() {
        return this.#notifications;
    }

    async readNotification(_notification: any) {
        if(!_notification.smoke_id) return false;
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        await fetch(`/notifications-read`, { id: _notification.smoke_id }, token);
        await this.updateNotifications();//!!!
        return true;
    }

    async clean() {
        await super.clean();
        clearInterval(this.#checkInterval);    
    }

}