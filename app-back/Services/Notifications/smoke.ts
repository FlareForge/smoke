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
    #lastId = null; 
    #stoped = false;

    async reload(){
        await super.reload();
        this.handleStart();
        return null;
    }

    async handleStart() {
        this.startListening();
    }

    async getNotifications() {
        return this.#notifications;
    }

    async readNotification(_notification: any) {
        if(!_notification.smoke_id) return false;
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        await fetch(`/notifications-read`, { id: _notification.smoke_id }, token);
        this.#notifications = this.#notifications.filter(notification => notification.smoke_id !== _notification.smoke_id);
        this.emit('notification-updated')
        return true;
    }

    #firstCall = true;
    async startListening() {
        if(this.#stoped) return;
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        if(!token) return;
        try{
            const result = await fetch(`/notifications`, { lastId: this.#lastId }, token);
            const notifications = result.notifications.map(notification => ({
                ...notification,
                smoke_id: notification.id,
            }))
 
            if(result.newNotifications && notifications && notifications.length > 0) {
                this.#notifications = notifications;
                this.#lastId = notifications[notifications.length - 1].smoke_id;
                this.emit('notification-updated')
                if(!this.#firstCall){
                    const appNotification = new Notification(`${notifications.length} new notification${notifications.length > 1 ? 's' : ''}`, {
                        icon: await ipcRenderer.invoke('get-icon-path', 'icon.png'),
                        body: `${notifications[notifications.length - 1].content}`,
                    });
                    appNotification.onclick = () => {
                        ipcRenderer.invoke('wake-up');
                    }
                }else{
                    this.#firstCall = false;
                }
            }
        }catch(e) {
            console.error(e);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        this.startListening();
    }

    async clean() {
        await super.clean();
        this.#stoped = true;
    }
}