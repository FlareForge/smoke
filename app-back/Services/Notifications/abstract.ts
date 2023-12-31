import { Service } from "../service";

export type NotificationsEvents = {
    event: "notification-updated";
    listener: () => void;
}

export default class AbstractNotifications extends Service<NotificationsEvents>{
    
    async getNotifications(): Promise<any[]> {
        return [];
    }

    async readNotification(_notification: any): Promise<boolean> {
        return false;
    }
}