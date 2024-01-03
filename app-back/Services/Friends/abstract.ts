import { Service } from "../service";

export type FriendsEvents = {
    event: "friends-updated";
    listener: () => void;
}

export default class AbstractFriends extends Service<FriendsEvents>{

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

    async getFriends(): Promise<any[]> {
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