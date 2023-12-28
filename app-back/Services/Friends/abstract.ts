import { Service } from "../service";

export default class AbstractFriends extends Service {

    async requestFriend(_id: string): Promise<boolean> {
        return false;
    }

    async acceptFriend(_id: string): Promise<boolean> {
        return false;
    }

    async rejectFriend(_id: string): Promise<boolean> {
        return false;
    }

    async removeFriend(_id: string): Promise<boolean> {
        return false;
    }

    async getFriends(): Promise<string[]> {
        return [];
    }

    async getFriendRequests(): Promise<string[]> {
        return [];
    }

    async getFriendRequestsSent(): Promise<string[]> {
        return [];
    }

    async isFriend(_id: string): Promise<boolean> {
        return false;
    }

}