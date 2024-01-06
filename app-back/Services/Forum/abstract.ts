import { Service } from "../service";

export default class AbstractForum extends Service {

    async getPosts(_game: any): Promise<any> {
        return [];
    }

    async getFeaturedPost(_game: any): Promise<any> {
        return {};
    }

    async newPost(_game: any, _post: any): Promise<any> {
        return {};
    }
}