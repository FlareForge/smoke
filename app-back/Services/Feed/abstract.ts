import { Service } from "../service";

export default class AbstractFeed extends Service {

    async getGameInformation(_game: any): Promise<any> {
        return {};
    }

    async newPost(_game: any, _post: any): Promise<any> {
        return {};
    }
}